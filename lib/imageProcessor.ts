/**
 * Image Processing Engine (100% Client-side Canvas API)
 * - Bóc sạch C2PA, JUMBF và metadata AI
 * - Xóa logo / Watermark AI bằng smart bottom crop
 * - Upscale 1x, 2x, 4x với bộ lọc nội suy đa điểm High-Quality
 * - Tăng độ sắc nét viền (Unsharp Masking Convolution)
 * - Phủ hạt cảm biến Film Grain khử độ láng nhân tạo của AI
 * - Ghi đè EXIF máy ảnh thực tế
 */

import { injectExifIntoJpeg, CAMERA_PRESETS, CameraPreset } from './exifInjector';

export interface ProcessOptions {
  cameraPreset: string;
  removeWatermark: boolean;
  upscaleFactor: 1 | 2 | 4;
  naturalGrain: boolean;
  sharpenLevel: 'none' | 'subtle' | 'high';
}

export interface ProcessResult {
  originalUrl: string;
  processedUrl: string;
  processedBlob: Blob;
  originalSize: number;
  processedSize: number;
  originalWidth: number;
  originalHeight: number;
  processedWidth: number;
  processedHeight: number;
  cameraPreset: CameraPreset;
  c2paStripped: boolean;
  fileName: string;
}

/**
 * Thuật toán làm nét ảnh bằng ma trận tích chập 3x3 (Convolution Unsharp Kernel)
 */
function applyUnsharpMask(ctx: CanvasRenderingContext2D, width: number, height: number, strength: number) {
  if (strength <= 0) return;

  const imgData = ctx.getImageData(0, 0, width, height);
  const src = imgData.data;
  // Tạo bản sao dữ liệu gốc
  const output = ctx.createImageData(width, height);
  const dst = output.data;

  // Ma trận kernel làm nét:
  // [ 0, -k,  0 ]
  // [-k, 1+4k,-k ]
  // [ 0, -k,  0 ]
  const k = strength;
  const center = 1 + 4 * k;

  for (let y = 0; y < height; y++) {
    const yTop = Math.max(0, y - 1);
    const yBot = Math.min(height - 1, y + 1);

    for (let x = 0; x < width; x++) {
      const xLeft = Math.max(0, x - 1);
      const xRight = Math.min(width - 1, x + 1);

      const idx = (y * width + x) * 4;
      const idxT = (yTop * width + x) * 4;
      const idxB = (yBot * width + x) * 4;
      const idxL = (y * width + xLeft) * 4;
      const idxR = (y * width + xRight) * 4;

      for (let c = 0; c < 3; c++) {
        const val = center * src[idx + c] - k * (src[idxT + c] + src[idxB + c] + src[idxL + c] + src[idxR + c]);
        dst[idx + c] = Math.min(255, Math.max(0, Math.round(val)));
      }
      dst[idx + 3] = src[idx + 3]; // Alpha giữ nguyên
    }
  }

  ctx.putImageData(output, 0, 0);
}

/**
 * Thuật toán tạo hạt nhiễu cảm biến máy ảnh (Film Grain / Sensor Noise)
 * Giúp triệt tiêu cảm giác da nhựa láng bóng của AI và phá vỡ các đặc trưng tần số AI
 */
function applyFilmGrain(ctx: CanvasRenderingContext2D, width: number, height: number, intensity: number = 6) {
  if (intensity <= 0) return;

  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    // Tính độ sáng (Luminance)
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    
    // Nhiễu hạt xuất hiện tự nhiên nhiều hơn ở vùng trung tính/tối nhẹ, ít hơn ở vùng quá sáng
    const lumWeight = 1 - Math.abs(lum - 128) / 180;
    const noise = (Math.random() - 0.5) * intensity * lumWeight;

    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }

  ctx.putImageData(imgData, 0, 0);
}

/**
 * Đọc file ảnh từ người dùng thành HTMLImageElement
 */
function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Không thể tải file ảnh"));
    };
    img.src = url;
  });
}

/**
 * Xử lý chính: Bóc C2PA, Xén Watermark, Upscale, Làm nét, Ghi EXIF
 */
export async function processAiImage(
  file: File,
  options: ProcessOptions,
  onProgress?: (percent: number, status: string) => void
): Promise<ProcessResult> {
  onProgress?.(15, "Đang nạp và bóc tách dữ liệu gốc...");
  const img = await loadImageFromFile(file);

  const origW = img.naturalWidth;
  const origH = img.naturalHeight;

  // 1. Tính toán vùng cắt nếu bật xén Watermark AI ở chân ảnh (~2.2% viền dưới)
  let cropH = origH;
  if (options.removeWatermark) {
    cropH = Math.floor(origH * 0.978);
  }

  // 2. Tính toán kích thước sau khi upscale
  const scale = options.upscaleFactor;
  const targetW = origW * scale;
  const targetH = cropH * scale;

  onProgress?.(35, `Đang nâng cấp phân giải (${scale}x: ${targetW}x${targetH}px)...`);

  // 3. Khởi tạo Canvas và vẽ ảnh (Thao tác này tự động bóc sạch 100% C2PA & JUMBF)
  const canvas = document.createElement('canvas');
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  if (!ctx) {
    throw new Error("Không thể khởi tạo bộ xử lý đồ họa Canvas");
  }

  // Cấu hình thuật toán nội suy chất lượng cao
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Vẽ ảnh vào Canvas (Lấy từ [0, 0, origW, cropH] tới [0, 0, targetW, targetH])
  ctx.drawImage(img, 0, 0, origW, cropH, 0, 0, targetW, targetH);

  // 4. Áp dụng thuật toán làm nét (Unsharp Masking)
  onProgress?.(60, "Đang tối ưu độ sắc nét và micro-contrast...");
  const sharpenStrengths = {
    none: 0,
    subtle: 0.18,
    high: 0.38,
  };
  const strength = sharpenStrengths[options.sharpenLevel] || 0.18;
  if (strength > 0) {
    applyUnsharpMask(ctx, targetW, targetH, strength);
  }

  // 5. Áp dụng Film Grain (Khử cảm giác AI, tái lập nhiễu cảm biến ISO)
  if (options.naturalGrain) {
    onProgress?.(75, "Đang hòa trộn hạt cảm biến máy ảnh (Film Grain)...");
    applyFilmGrain(ctx, targetW, targetH, 5.5);
  }

  // 6. Xuất Canvas ra JPEG Blob chất lượng 95%
  onProgress?.(85, "Đang nén dữ liệu pixel...");
  const rawJpegBlob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Lỗi khi kết xuất ảnh JPEG"));
    }, 'image/jpeg', 0.95);
  });

  // 7. Ghi đè EXIF máy ảnh thực tế vào phân đoạn APP1
  onProgress?.(95, "Đang ghi đè EXIF máy ảnh thực tế...");
  const presetKey = options.cameraPreset || 'sony-a7m4';
  const finalJpegBlob = await injectExifIntoJpeg(rawJpegBlob, presetKey);

  const originalUrl = URL.createObjectURL(file);
  const processedUrl = URL.createObjectURL(finalJpegBlob);

  const selectedPreset = CAMERA_PRESETS[presetKey] || CAMERA_PRESETS['sony-a7m4'];

  onProgress?.(100, "Hoàn tất xử lý!");

  return {
    originalUrl,
    processedUrl,
    processedBlob: finalJpegBlob,
    originalSize: file.size,
    processedSize: finalJpegBlob.size,
    originalWidth: origW,
    originalHeight: origH,
    processedWidth: targetW,
    processedHeight: targetH,
    cameraPreset: selectedPreset,
    c2paStripped: true,
    fileName: file.name.replace(/\.[^/.]+$/, "") + `_clean_${selectedPreset.model.toLowerCase()}.jpg`,
  };
}
