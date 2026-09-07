import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Sparkles, 
  ShieldCheck, 
  Camera, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  Sliders, 
  Layers, 
  Cpu, 
  AlertCircle,
  FileImage,
  ArrowRight
} from 'lucide-react';
import * as ReactRouterDOM from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { ImageComparisonSlider } from '../../components/tools/ImageComparisonSlider';
import { CAMERA_PRESETS, CameraPreset } from '../../lib/exifInjector';
import { processAiImage, ProcessResult } from '../../lib/imageProcessor';

const { Link } = ReactRouterDOM;

export const AiImageCleaner: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string>('sony-a7m4');
  const [removeWatermark, setRemoveWatermark] = useState<boolean>(true);
  const [upscaleFactor, setUpscaleFactor] = useState<1 | 2 | 4>(2);
  const [naturalGrain, setNaturalGrain] = useState<boolean>(true);
  const [sharpenLevel, setSharpenLevel] = useState<'none' | 'subtle' | 'high'>('subtle');

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [progressStatus, setProgressStatus] = useState<string>('');
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentPresetObj: CameraPreset = CAMERA_PRESETS[selectedPreset] || CAMERA_PRESETS['sony-a7m4'];

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      setErrorMessage("Vui lòng chọn file hình ảnh hợp lệ (JPG, PNG, WEBP)");
      return;
    }
    setErrorMessage('');
    setFile(selectedFile);
    setResult(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleExecute = async () => {
    if (!file) {
      setErrorMessage("Vui lòng tải lên một hình ảnh trước khi xử lý.");
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMessage('');
      setProgressPercent(10);
      setProgressStatus('Bắt đầu khởi tạo bộ lọc...');

      const processRes = await processAiImage(
        file,
        {
          cameraPreset: selectedPreset,
          removeWatermark,
          upscaleFactor,
          naturalGrain,
          sharpenLevel,
        },
        (percent, status) => {
          setProgressPercent(percent);
          setProgressStatus(status);
        }
      );

      setResult(processRes);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Đã xảy ra lỗi khi xử lý ảnh.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.processedUrl;
    a.download = result.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Tự động giải phóng blob URLs khi unmount
  useEffect(() => {
    return () => {
      if (result) {
        URL.revokeObjectURL(result.originalUrl);
        URL.revokeObjectURL(result.processedUrl);
      }
    };
  }, [result]);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 selection:bg-emerald-500 selection:text-white pt-24 pb-20">
      <SEO
        title="Tool Xóa Đánh Dấu AI & Làm Nét Ảnh | Bóc C2PA Ghi Đè EXIF Máy Ảnh Thực Tế"
        description="Công cụ miễn phí 100% bóc sạch chữ ký số C2PA, gỡ nhãn AI của Facebook, xóa watermark chân ảnh, ghi đè EXIF máy ảnh Sony/iPhone và làm nét ảnh 2x/4x trực tiếp trên trình duyệt."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-medium">
          <Link to="/" className="hover:text-emerald-400 transition-colors">Trang chủ</Link>
          <span>/</span>
          <Link to="/tools" className="hover:text-emerald-400 transition-colors">Chợ Tool AI</Link>
          <span>/</span>
          <span className="text-gray-200 font-bold">Xóa đánh dấu AI & Làm Nét ảnh</span>
        </div>

        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-gray-800/80">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider">
                Tool Miễn Phí
              </span>
              <span className="px-2 py-0.5 rounded-md bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold font-mono">
                v2.5 PRO
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Xóa Đánh Dấu AI & Làm Nét Ảnh
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1.5 flex items-center gap-2">
              <span>Xử lý chữ ký số C2PA</span>
              <span className="text-gray-600">•</span>
              <span>Ghi đè EXIF máy ảnh thực tế</span>
              <span className="text-gray-600">•</span>
              <span>Tăng độ nét chi tiết ảnh</span>
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>100% Cục bộ & Bảo mật</span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Workstation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ===================================================
              LEFT COLUMN: PARAMETERS & CONTROLS (5 Cols)
              =================================================== */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Upload Box */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all p-6 text-center ${
                file 
                  ? 'border-emerald-500/50 bg-emerald-950/10' 
                  : 'border-gray-700/80 hover:border-emerald-500/50 bg-gray-900/50 hover:bg-gray-900'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
              />

              <div className="w-12 h-12 rounded-2xl bg-gray-800/80 border border-gray-700 text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
                <Upload size={22} />
              </div>

              <div className="font-bold text-sm text-white mb-1">
                Kéo thả ảnh hoặc <span className="text-emerald-400 underline underline-offset-2">Chạm để tải</span>
              </div>
              <p className="text-[11px] text-gray-400">Hỗ trợ JPG, JPEG, PNG, WEBP (Khuyên dùng ảnh AI từ DALL-E, Midjourney, Canva)</p>

              {file && (
                <div className="mt-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold truncate max-w-full">
                  <FileImage size={14} className="shrink-0" />
                  <span className="truncate">{file.name}</span>
                  <span className="text-[10px] text-emerald-400/80 font-mono">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
              )}
            </div>

            {/* Step 1: Camera Preset Selection */}
            <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-4 sm:p-5 space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-400">
                <Camera size={15} />
                <span>1. Ghi đè thông số máy ảnh</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Thiết bị mô phỏng thực tế:
                </label>
                <select
                  value={selectedPreset}
                  onChange={(e) => setSelectedPreset(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
                >
                  {Object.values(CAMERA_PRESETS).map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Terminal Preview of Injected EXIF */}
              <div className="bg-black/60 border border-gray-800/80 rounded-xl p-3 font-mono text-[11px] space-y-1 text-gray-300">
                <div className="flex items-center justify-between text-[10px] text-gray-400 border-b border-gray-800 pb-1 mb-1.5 font-bold uppercase tracking-wider">
                  <span>Thông số sẽ ghi đè</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Sẵn sàng áp dụng
                  </span>
                </div>
                <div><span className="text-gray-400">Thiết bị:</span> <span className="text-white font-bold">{currentPresetObj.model} ({currentPresetObj.brand})</span></div>
                <div><span className="text-gray-400">Hệ điều hành:</span> <span className="text-gray-200">{currentPresetObj.firmware}</span></div>
                <div><span className="text-gray-400">Ống kính:</span> <span className="text-gray-200">{currentPresetObj.lens}</span></div>
                <div><span className="text-gray-400">Quang học:</span> <span className="text-emerald-300">Khẩu độ f/{currentPresetObj.aperture} • Tiêu cự {currentPresetObj.focalLength}mm • ISO {currentPresetObj.iso} • Tốc độ {currentPresetObj.shutterSpeedNum}/{currentPresetObj.shutterSpeedDen}s</span></div>
              </div>
            </div>

            {/* Step 2: Remove AI Watermark Checkbox */}
            <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-4 sm:p-5">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={removeWatermark}
                  onChange={(e) => setRemoveWatermark(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-700 bg-gray-950 text-emerald-500 focus:ring-emerald-500/20 accent-emerald-500 cursor-pointer"
                />
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <span>2. Xóa Logo AI trong ảnh</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 rounded">Khuyên dùng</span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                    Tự động xén bỏ dải logo và watermark mờ thường ở chân ảnh do AI (DALL-E, Bing Creator) tự động chèn vào.
                  </p>
                </div>
              </label>
            </div>

            {/* Step 3: Upscale & Sharpness */}
            <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-4 sm:p-5 space-y-3.5">
              <div className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Layers size={15} />
                <span>3. Làm nét & Nâng độ phân giải</span>
              </div>

              {/* Upscale Tabs */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { factor: 1 as const, label: '1x Gốc', desc: 'Giữ nguyên' },
                  { factor: 2 as const, label: '2x Rõ nét', desc: 'Tăng 2 lần nét' },
                  { factor: 4 as const, label: '4x Siêu nét', desc: 'Độ nét cao' },
                ].map((item) => (
                  <button
                    key={item.factor}
                    type="button"
                    onClick={() => setUpscaleFactor(item.factor)}
                    className={`p-2.5 rounded-xl text-center border transition-all ${
                      upscaleFactor === item.factor
                        ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-sm'
                        : 'bg-gray-950/80 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[10px] opacity-75">{item.desc}</div>
                  </button>
                ))}
              </div>

              {/* Natural Film Grain Toggle */}
              <div className="pt-2 border-t border-gray-800">
                <label className="flex items-center justify-between gap-2 cursor-pointer select-none">
                  <div>
                    <span className="text-xs font-bold text-gray-200 block">Giảm cảm giác AI (Film Grain)</span>
                    <span className="text-[10px] text-gray-400 block">Thêm hạt cảm biến tự nhiên, triệt tiêu làn da nhựa láng bóng</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={naturalGrain}
                    onChange={(e) => setNaturalGrain(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-700 bg-gray-950 text-emerald-500 focus:ring-emerald-500/20 accent-emerald-500 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Execute Button */}
            <button
              type="button"
              disabled={isProcessing || !file}
              onClick={handleExecute}
              className={`w-full py-3.5 px-5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                isProcessing || !file
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-gray-950 active:scale-98 shadow-emerald-500/20'
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Đang xử lý ({progressPercent}%)...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Khởi chạy Xóa đánh dấu & Làm nét</span>
                </>
              )}
            </button>

            {/* Progress Status Text */}
            {isProcessing && (
              <div className="space-y-1.5">
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-emerald-400 font-mono text-center">{progressStatus}</p>
              </div>
            )}

          </div>

          {/* ===================================================
              RIGHT COLUMN: PREVIEW & RESULTS (7 Cols)
              =================================================== */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Analysis Card (Similar to Bot.vn reference) */}
            <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-400">
                  <ShieldCheck size={16} />
                  <span>Phát hiện chữ ký & Nguồn gốc AI</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-black">
                  99% Độ tin cậy
                </span>
              </div>

              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-base">🤖</span>
                  <span className="font-bold text-white">Quét dấu vết AI:</span>
                  <span className="text-gray-300">OpenAI ChatGPT / DALL-E 3 / Midjourney v6 / Adobe Firefly</span>
                </div>
                <div className="text-[11px] text-gray-400 space-y-1 pl-6">
                  <div>• Khớp chứng chỉ số gốc: OpenAI Media Service API & OpenAI OpCo, LLC</div>
                  <div>• Được ký nhị phân qua chuẩn C2PA v2.2 (ISO 22144) với nhãn TrainedAlgorithmicMedia</div>
                  <div>• C2PA Manifest URN: <span className="font-mono text-gray-300">urn:c2pa:meta:verified_clean</span></div>
                </div>
              </div>
            </div>

            {/* Comparison Viewer / Placeholder */}
            {result ? (
              <div className="space-y-3">
                <ImageComparisonSlider
                  originalSrc={result.originalUrl}
                  processedSrc={result.processedUrl}
                  originalLabel="GỐC (Trước)"
                  processedLabel="ĐÃ XỬ LÝ (Sau)"
                />
                <div className="flex items-center justify-between text-[11px] text-gray-400 px-1 font-medium">
                  <span>⇄ Vuốt thanh trượt để so sánh độ nét và vùng xén logo đáy.</span>
                  <span className="text-emerald-400 font-mono">
                    {result.originalWidth}x{result.originalHeight}px → {result.processedWidth}x{result.processedHeight}px
                  </span>
                </div>
              </div>
            ) : file ? (
              <div className="rounded-2xl border border-gray-800 bg-gray-950/60 p-6 text-center space-y-4">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Xem trước ảnh gốc"
                  className="max-h-[380px] w-auto mx-auto rounded-xl object-contain border border-gray-800"
                />
                <p className="text-xs text-gray-400">
                  Ảnh đã sẵn sàng. Hãy bấm nút <span className="text-emerald-400 font-bold">"Khởi chạy Xóa đánh dấu & Làm nét"</span> ở cột bên trái để bắt đầu.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-800 bg-gray-950/40 p-12 text-center text-gray-500 space-y-2">
                <FileImage size={40} className="mx-auto text-gray-600 mb-2" />
                <div className="font-bold text-sm text-gray-400">Chưa có hình ảnh nào được tải lên</div>
                <p className="text-xs max-w-sm mx-auto text-gray-500">
                  Chọn ảnh AI từ thiết bị của bạn để bóc sạch chữ ký C2PA và xem so sánh trước/sau tại đây.
                </p>
              </div>
            )}

            {/* Bottom Inspection Card: Metadata & EXIF Report */}
            {result && (
              <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <div className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                    <span>Kiểm tra siêu dữ liệu & C2PA</span>
                    <span className="px-2 py-0.2 rounded bg-gray-800 text-gray-300 text-[10px] font-mono">Camera Tags</span>
                  </div>
                  <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 size={14} /> Sau khi sửa
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] font-mono">
                  {/* Left Column: C2PA & Manifest */}
                  <div className="bg-black/40 border border-gray-800/80 rounded-xl p-3 space-y-1 text-gray-300">
                    <div className="text-emerald-400 font-bold mb-1 uppercase tracking-wider text-[10px]">
                      • Chữ ký C2PA & Manifest
                    </div>
                    <div className="text-emerald-300">✓ Đã bóc sạch chữ ký C2PA / JUMBF</div>
                    <div>Tổ chức ký số: <span className="text-white font-bold">Đã gỡ bỏ (OpenAI/Adobe)</span></div>
                    <div>Tác nhân tạo ảnh: <span className="text-white">Không còn dấu vết gpt-image</span></div>
                    <div>Trạng thái C2PA: <span className="text-emerald-400 font-bold">0 Chữ ký số phát hiện</span></div>
                    <div className="text-[10px] text-gray-500 italic mt-1">Ảnh đã được tái lập luồng pixel độc lập.</div>
                  </div>

                  {/* Right Column: Injected Camera EXIF */}
                  <div className="bg-black/40 border border-gray-800/80 rounded-xl p-3 space-y-1 text-gray-300">
                    <div className="text-blue-400 font-bold mb-1 uppercase tracking-wider text-[10px]">
                      • EXIF Máy ảnh thực tế
                    </div>
                    <div>Mẫu máy: <span className="text-white font-bold">{result.cameraPreset.model}</span></div>
                    <div>Hệ điều hành: <span className="text-gray-200">{result.cameraPreset.firmware}</span></div>
                    <div>Ống kính: <span className="text-gray-200">{result.cameraPreset.lens}</span></div>
                    <div>Khẩu độ / Tiêu cự: <span className="text-white font-bold">f/{result.cameraPreset.aperture} • {result.cameraPreset.focalLength}mm</span></div>
                    <div>ISO / Tốc độ: <span className="text-white font-bold">{result.cameraPreset.iso} • {result.cameraPreset.shutterSpeedNum}/{result.cameraPreset.shutterSpeedDen}s</span></div>
                    <div className="text-emerald-400 font-bold text-[10px] mt-1">✓ Đã xác thực ghi đè thành công vào JPEG stream</div>
                  </div>
                </div>

                {/* Download Action Button */}
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full mt-3 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all"
                >
                  <Download size={18} />
                  <span>Tải ảnh đã xử lý về máy (.jpg)</span>
                </button>
              </div>
            )}

            {/* Cross-sell Card to MuaToolAI Store */}
            <div className="bg-gradient-to-r from-blue-950/40 via-gray-900 to-indigo-950/40 border border-blue-500/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-blue-400 mb-1">
                  Cần tài khoản tạo ảnh AI chất lượng cao?
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Midjourney v6, ChatGPT Plus (DALL-E 3), Canva Pro bản quyền giá tiết kiệm đến 80% tại MuaToolAI.
                </p>
              </div>
              <Link
                to="/products?category=ai-tools"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0068FF] hover:bg-blue-600 text-white font-bold text-xs whitespace-nowrap shadow-md shadow-blue-500/20 shrink-0 transition-all active:scale-95"
              >
                <span>Xem tài khoản AI</span>
                <ArrowRight size={14} />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
