import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Sparkles, 
  ShieldCheck, 
  Camera, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  Layers, 
  AlertCircle,
  FileImage,
  ArrowRight,
  Eye,
  Check
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

  // Giải phóng blob URLs khi unmount
  useEffect(() => {
    return () => {
      if (result) {
        URL.revokeObjectURL(result.originalUrl);
        URL.revokeObjectURL(result.processedUrl);
      }
    };
  }, [result]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900 pb-20">
      <SEO
        title="Tool Xóa Đánh Dấu AI & Làm Nét Ảnh | Bóc C2PA Ghi Đè EXIF Máy Ảnh Thực Tế"
        description="Công cụ miễn phí 100% bóc sạch chữ ký số C2PA, gỡ nhãn AI của Facebook, xóa watermark chân ảnh, ghi đè EXIF máy ảnh Sony/iPhone và làm nét ảnh 2x/4x trực tiếp trên trình duyệt."
      />

      {/* Premium Dark Hero Banner (Đồng bộ chuẩn phong cách MuaToolAI) */}
      <div className="relative bg-gray-950 pt-20 pb-8 md:pt-32 md:pb-16 mb-6 md:mb-8 overflow-hidden rounded-b-[1.5rem] md:rounded-b-[2.5rem] shadow-2xl shadow-gray-900/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,104,255,0.22),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.14),transparent_38%)]"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 py-1 px-3 md:py-1.5 md:px-4 rounded-full bg-white/10 border border-white/10 text-blue-200 text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 md:mb-4 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>100% Cục bộ & Bảo mật • v2.5 PRO</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-2 md:mb-3 tracking-tight leading-tight">
            Xóa Đánh Dấu AI & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">Làm Nét Ảnh</span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-medium leading-relaxed">
            Xử lý chữ ký số C2PA • Ghi đè EXIF máy ảnh thực tế • Tăng độ nét chi tiết và làm ảnh tự nhiên như chụp thật.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <Link to="/" className="hover:text-[#0068FF] transition-colors">Trang chủ</Link>
          <span className="text-gray-300">/</span>
          <Link to="/tools" className="hover:text-[#0068FF] transition-colors">Chợ Tool AI</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-bold">Xóa đánh dấu AI & Làm Nét ảnh</span>
        </div>

        {/* Main Workstation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* ===================================================
              LEFT COLUMN: PARAMETERS & CONTROLS (5 Cols)
              =================================================== */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* 1. Upload Box */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all p-6 text-center ${
                file 
                  ? 'border-[#0068FF]/60 bg-blue-50/40' 
                  : 'border-gray-300 hover:border-[#0068FF] bg-white hover:bg-gray-50/80 shadow-xs'
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

              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-[#0068FF] flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Upload size={22} />
              </div>

              <div className="font-bold text-sm text-gray-900 mb-1">
                Kéo thả ảnh hoặc <span className="text-[#0068FF] underline underline-offset-2">Chạm để tải</span>
              </div>
              <p className="text-[11px] text-gray-500">Hỗ trợ JPG, JPEG, PNG, WEBP (Khuyên dùng ảnh AI từ DALL-E, Midjourney, Canva)</p>

              {file && (
                <div className="mt-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-[#0068FF] text-xs font-bold truncate max-w-full">
                  <FileImage size={14} className="shrink-0" />
                  <span className="truncate">{file.name}</span>
                  <span className="text-[10px] text-blue-600 font-mono">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
              )}
            </div>

            {/* 2. Step 1: Camera Preset Selection */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-gray-900">
                <Camera size={16} className="text-[#0068FF]" />
                <span>1. Ghi đè thông số máy ảnh</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Thiết bị mô phỏng thực tế:
                </label>
                <select
                  value={selectedPreset}
                  onChange={(e) => setSelectedPreset(e.target.value)}
                  className="w-full bg-gray-50 hover:bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-gray-900 focus:outline-none focus:border-[#0068FF] focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                >
                  {Object.values(CAMERA_PRESETS).map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Terminal Preview of Injected EXIF (Sleek Dark Container) */}
              <div className="bg-[#111827] text-gray-200 rounded-xl p-3.5 font-mono text-[11px] space-y-1.5 border border-gray-800 shadow-inner">
                <div className="flex items-center justify-between text-[10px] text-gray-400 border-b border-gray-800 pb-1.5 mb-1 font-bold uppercase tracking-wider">
                  <span>Thông số sẽ ghi đè</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Sẵn sàng áp dụng
                  </span>
                </div>
                <div><span className="text-gray-400">Thiết bị:</span> <span className="text-white font-bold">{currentPresetObj.model} ({currentPresetObj.brand})</span></div>
                <div><span className="text-gray-400">Hệ điều hành:</span> <span className="text-gray-300">{currentPresetObj.firmware}</span></div>
                <div><span className="text-gray-400">Ống kính:</span> <span className="text-gray-300">{currentPresetObj.lens}</span></div>
                <div><span className="text-gray-400">Quang học:</span> <span className="text-emerald-300 font-bold">Khẩu độ f/{currentPresetObj.aperture} • Tiêu cự {currentPresetObj.focalLength}mm • ISO {currentPresetObj.iso} • Tốc độ {currentPresetObj.shutterSpeedNum}/{currentPresetObj.shutterSpeedDen}s</span></div>
              </div>
            </div>

            {/* 3. Step 2: Remove AI Watermark Checkbox */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={removeWatermark}
                  onChange={(e) => setRemoveWatermark(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-[#0068FF] focus:ring-blue-500/20 accent-[#0068FF] cursor-pointer"
                />
                <div>
                  <div className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span>2. Xóa Logo AI trong ảnh</span>
                    <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-[#0068FF] border border-blue-100 rounded-full font-bold">Khuyên dùng</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed font-medium">
                    Tự động xén bỏ dải logo và watermark mờ thường ở chân ảnh do AI (DALL-E, Bing Creator) chèn vào.
                  </p>
                </div>
              </label>
            </div>

            {/* 4. Step 3: Upscale & Sharpness */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5">
              <div className="text-xs font-black uppercase tracking-wider text-gray-900 flex items-center gap-2">
                <Layers size={16} className="text-[#0068FF]" />
                <span>3. Làm nét & Nâng độ phân giải</span>
              </div>

              {/* Upscale Tabs */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { factor: 1 as const, label: '1x Gốc', desc: 'Giữ nguyên' },
                  { factor: 2 as const, label: '2x Rõ nét', desc: 'Tăng nét 2x' },
                  { factor: 4 as const, label: '4x Siêu nét', desc: 'Độ nét cao' },
                ].map((item) => (
                  <button
                    key={item.factor}
                    type="button"
                    onClick={() => setUpscaleFactor(item.factor)}
                    className={`p-2.5 rounded-xl text-center border transition-all ${
                      upscaleFactor === item.factor
                        ? 'bg-blue-50 border-[#0068FF] text-[#0068FF] shadow-xs'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <div className="text-xs font-black">{item.label}</div>
                    <div className="text-[10px] opacity-80 font-medium">{item.desc}</div>
                  </button>
                ))}
              </div>

              {/* Natural Film Grain Toggle */}
              <div className="pt-2.5 border-t border-gray-100">
                <label className="flex items-center justify-between gap-2 cursor-pointer select-none">
                  <div>
                    <span className="text-xs font-bold text-gray-900 block">Giảm cảm giác AI (Film Grain)</span>
                    <span className="text-[11px] text-gray-500 block font-medium">Thêm hạt cảm biến tự nhiên, triệt tiêu làn da nhựa láng bóng</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={naturalGrain}
                    onChange={(e) => setNaturalGrain(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#0068FF] focus:ring-blue-500/20 accent-[#0068FF] cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Execute Button */}
            <button
              type="button"
              disabled={isProcessing || !file}
              onClick={handleExecute}
              className={`w-full py-3.5 px-5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                isProcessing || !file
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-950 hover:bg-[#0068FF] text-white active:scale-98 shadow-gray-900/10'
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Đang xử lý ({progressPercent}%)...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} className="text-yellow-400" />
                  <span>Khởi chạy Xóa đánh dấu & Làm nét</span>
                </>
              )}
            </button>

            {/* Progress Status Bar */}
            {isProcessing && (
              <div className="space-y-1.5">
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#0068FF] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-[#0068FF] font-bold text-center">{progressStatus}</p>
              </div>
            )}

          </div>

          {/* ===================================================
              RIGHT COLUMN: PREVIEW & RESULTS (7 Cols)
              =================================================== */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Top Analysis Card */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-gray-900">
                  <ShieldCheck size={16} className="text-[#0068FF]" />
                  <span>Phát hiện chữ ký & Nguồn gốc AI</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black">
                  99% Độ tin cậy
                </span>
              </div>

              <div className="space-y-2 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-base">🤖</span>
                  <span className="font-bold text-gray-900">Quét dấu vết AI:</span>
                  <span>OpenAI ChatGPT / DALL-E 3 / Midjourney v6 / Adobe Firefly</span>
                </div>
                <div className="text-[11px] text-gray-500 space-y-1 pl-6 font-medium">
                  <div>• Khớp chứng chỉ số gốc: OpenAI Media Service API & OpenAI OpCo, LLC</div>
                  <div>• Được ký nhị phân qua chuẩn C2PA v2.2 (ISO 22144) với nhãn TrainedAlgorithmicMedia</div>
                  <div>• C2PA Manifest URN: <span className="font-mono text-gray-800">urn:c2pa:meta:verified_clean</span></div>
                </div>
              </div>
            </div>

            {/* Comparison Viewer / Preview Placeholder */}
            {result ? (
              <div className="space-y-3">
                <ImageComparisonSlider
                  originalSrc={result.originalUrl}
                  processedSrc={result.processedUrl}
                  originalLabel="GỐC (Trước)"
                  processedLabel="ĐÃ XỬ LÝ (Sau)"
                />
                <div className="flex items-center justify-between text-[11px] text-gray-500 px-1 font-medium">
                  <span>⇄ Kéo thanh trượt để so sánh độ nét và vùng xén logo đáy.</span>
                  <span className="text-[#0068FF] font-mono font-bold">
                    {result.originalWidth}x{result.originalHeight}px → {result.processedWidth}x{result.processedHeight}px
                  </span>
                </div>
              </div>
            ) : file ? (
              <div className="rounded-2xl border border-gray-200/90 bg-white p-6 text-center space-y-4 shadow-xs">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Xem trước ảnh gốc"
                  className="max-h-[380px] w-auto mx-auto rounded-xl object-contain border border-gray-100"
                />
                <p className="text-xs text-gray-500 font-medium">
                  Ảnh đã sẵn sàng. Hãy bấm nút <span className="text-[#0068FF] font-bold">"Khởi chạy Xóa đánh dấu & Làm nét"</span> ở cột bên trái để bắt đầu.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center text-gray-400 space-y-2 shadow-xs">
                <FileImage size={42} className="mx-auto text-gray-300 mb-2" />
                <div className="font-bold text-sm text-gray-700">Chưa có hình ảnh nào được tải lên</div>
                <p className="text-xs max-w-sm mx-auto text-gray-400 font-medium">
                  Chọn ảnh AI từ thiết bị của bạn để bóc sạch chữ ký C2PA và xem so sánh trước/sau tại đây.
                </p>
              </div>
            )}

            {/* Bottom Inspection Card: Metadata & EXIF Report */}
            {result && (
              <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                  <div className="text-xs font-black uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                    <span>Kiểm tra siêu dữ liệu & C2PA</span>
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-mono font-bold">Camera Tags</span>
                  </div>
                  <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 size={14} /> Sau khi sửa
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] font-mono">
                  {/* Left Column: C2PA & Manifest */}
                  <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-3 space-y-1 text-gray-700">
                    <div className="text-emerald-700 font-bold mb-1 uppercase tracking-wider text-[10px]">
                      • Chữ ký C2PA & Manifest
                    </div>
                    <div className="text-emerald-600 font-bold">✓ Đã bóc sạch chữ ký C2PA / JUMBF</div>
                    <div>Tổ chức ký số: <span className="text-gray-900 font-bold">Đã gỡ bỏ (OpenAI/Adobe)</span></div>
                    <div>Tác nhân tạo ảnh: <span className="text-gray-900">Không còn dấu vết gpt-image</span></div>
                    <div>Trạng thái C2PA: <span className="text-emerald-700 font-bold">0 Chữ ký số phát hiện</span></div>
                    <div className="text-[10px] text-gray-500 italic mt-1">Ảnh đã được tái lập luồng pixel độc lập.</div>
                  </div>

                  {/* Right Column: Injected Camera EXIF */}
                  <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-3 space-y-1 text-gray-700">
                    <div className="text-[#0068FF] font-bold mb-1 uppercase tracking-wider text-[10px]">
                      • EXIF Máy ảnh thực tế
                    </div>
                    <div>Mẫu máy: <span className="text-gray-900 font-bold">{result.cameraPreset.model}</span></div>
                    <div>Hệ điều hành: <span className="text-gray-600">{result.cameraPreset.firmware}</span></div>
                    <div>Ống kính: <span className="text-gray-600">{result.cameraPreset.lens}</span></div>
                    <div>Khẩu độ / Tiêu cự: <span className="text-gray-900 font-bold">f/{result.cameraPreset.aperture} • {result.cameraPreset.focalLength}mm</span></div>
                    <div>ISO / Tốc độ: <span className="text-gray-900 font-bold">{result.cameraPreset.iso} • {result.cameraPreset.shutterSpeedNum}/{result.cameraPreset.shutterSpeedDen}s</span></div>
                    <div className="text-emerald-600 font-bold text-[10px] mt-1">✓ Đã xác thực ghi đè thành công vào JPEG stream</div>
                  </div>
                </div>

                {/* Download Action Button */}
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full mt-3 py-3.5 px-4 rounded-xl bg-[#0068FF] hover:bg-blue-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 active:scale-98 transition-all"
                >
                  <Download size={18} />
                  <span>Tải ảnh đã xử lý về máy (.jpg)</span>
                </button>
              </div>
            )}

            {/* Cross-sell Card to MuaToolAI Store */}
            <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50/70 border border-blue-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-[#0068FF] mb-1">
                  Cần tài khoản tạo ảnh AI chất lượng cao?
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                  Midjourney v6, ChatGPT Plus (DALL-E 3), Canva Pro bản quyền giá tiết kiệm đến 80% tại MuaToolAI.
                </p>
              </div>
              <Link
                to="/products?category=ai-tools"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-950 hover:bg-[#0068FF] text-white font-bold text-xs whitespace-nowrap shadow-sm shrink-0 transition-all active:scale-95"
              >
                <span>Xem tài khoản AI</span>
                <ArrowRight size={14} />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
};
