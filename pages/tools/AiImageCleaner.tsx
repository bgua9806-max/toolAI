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
  SlidersHorizontal,
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
      setErrorMessage("Vui lòng chọn file hình ảnh (JPG, PNG, WEBP)");
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
      setProgressStatus('Bóc tách metadata C2PA...');

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

  useEffect(() => {
    return () => {
      if (result) {
        URL.revokeObjectURL(result.originalUrl);
        URL.revokeObjectURL(result.processedUrl);
      }
    };
  }, [result]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900 pb-24">
      <SEO
        title="Tool Xóa Đánh Dấu AI & Làm Nét Ảnh | Bóc C2PA Ghi Đè EXIF Thực Tế"
        description="Bóc sạch chữ ký số C2PA, xóa nhãn AI của Facebook, xóa watermark chân ảnh, ghi đè EXIF máy ảnh Sony/iPhone và làm nét ảnh 2x/4x."
      />

      {/* Luxury Minimalist Hero Banner */}
      <div className="relative bg-gray-950 pt-20 pb-8 md:pt-28 md:pb-14 mb-6 md:mb-8 overflow-hidden rounded-b-[1.75rem] md:rounded-b-[2.5rem] shadow-xl shadow-gray-950/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,104,255,0.2),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.12),transparent_40%)]"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-white/10 border border-white/10 text-blue-200 text-[11px] font-bold tracking-wide mb-3 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            100% Cục bộ • Không lưu dữ liệu
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight">
            Xóa Đánh Dấu AI & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">Làm Nét Ảnh</span>
          </h1>

          <p className="text-gray-400 text-xs sm:text-sm font-medium">
            Bóc C2PA • Ghi đè EXIF máy ảnh • Nâng nét 2x/4x tự nhiên
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-medium">
          <Link to="/" className="hover:text-[#0068FF] transition-colors">Trang chủ</Link>
          <span className="text-gray-300">/</span>
          <Link to="/tools" className="hover:text-[#0068FF] transition-colors">Chợ Tool</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-bold">Xóa dấu AI</span>
        </div>

        {/* 2-Column Workstation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ===================================================
              LEFT: COMPACT & ELEGANT CONTROLS (5 Cols)
              =================================================== */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* 1. Upload Box */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all p-5 text-center ${
                file 
                  ? 'border-[#0068FF] bg-blue-50/40 shadow-xs' 
                  : 'border-gray-200 hover:border-[#0068FF] bg-white hover:bg-gray-50/60 shadow-xs'
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

              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0068FF] flex items-center justify-center mx-auto mb-2.5 shadow-2xs">
                <Upload size={18} />
              </div>

              <div className="font-bold text-xs sm:text-sm text-gray-900">
                {file ? 'Đổi hình ảnh khác' : 'Tải ảnh lên hoặc kéo thả vào đây'}
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">JPG, PNG, WebP</p>

              {file && (
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-100 text-[#0068FF] text-[11px] font-bold truncate max-w-full">
                  <FileImage size={13} className="shrink-0" />
                  <span className="truncate">{file.name}</span>
                  <span className="text-[10px] text-blue-500 font-mono">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
              )}
            </div>

            {/* 2. Camera Preset Selector */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  <Camera size={14} className="text-[#0068FF]" />
                  Thiết bị ghi đè
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  EXIF Thực tế
                </span>
              </div>

              <select
                value={selectedPreset}
                onChange={(e) => setSelectedPreset(e.target.value)}
                className="w-full bg-gray-50 hover:bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#0068FF] transition-all cursor-pointer"
              >
                {Object.values(CAMERA_PRESETS).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              {/* Minimalist Specs Pill */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono text-gray-600">
                <span>f/{currentPresetObj.aperture}</span>
                <span>•</span>
                <span>{currentPresetObj.focalLength}mm</span>
                <span>•</span>
                <span>ISO {currentPresetObj.iso}</span>
                <span>•</span>
                <span>{currentPresetObj.shutterSpeedNum}/{currentPresetObj.shutterSpeedDen}s</span>
              </div>
            </div>

            {/* 3. Watermark & Grain Toggles */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs space-y-3">
              <label className="flex items-center justify-between gap-3 cursor-pointer select-none">
                <div>
                  <div className="text-xs font-bold text-gray-900">Xóa Watermark chân ảnh</div>
                  <div className="text-[10px] text-gray-400">Tự động xén logo AI ở góc đáy</div>
                </div>
                <input
                  type="checkbox"
                  checked={removeWatermark}
                  onChange={(e) => setRemoveWatermark(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0068FF] focus:ring-0 accent-[#0068FF] cursor-pointer"
                />
              </label>

              <div className="border-t border-gray-100"></div>

              <label className="flex items-center justify-between gap-3 cursor-pointer select-none">
                <div>
                  <div className="text-xs font-bold text-gray-900">Hạt Film Grain tự nhiên</div>
                  <div className="text-[10px] text-gray-400">Khử độ nhựa láng bóng của AI</div>
                </div>
                <input
                  type="checkbox"
                  checked={naturalGrain}
                  onChange={(e) => setNaturalGrain(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0068FF] focus:ring-0 accent-[#0068FF] cursor-pointer"
                />
              </label>
            </div>

            {/* 4. Upscale Pill Selector */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs space-y-2.5">
              <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <Layers size={14} className="text-[#0068FF]" />
                Độ phân giải & Độ nét
              </span>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { factor: 1 as const, label: '1x', sub: 'Gốc' },
                  { factor: 2 as const, label: '2x', sub: 'Rõ nét' },
                  { factor: 4 as const, label: '4x', sub: 'Siêu nét' },
                ].map((item) => (
                  <button
                    key={item.factor}
                    type="button"
                    onClick={() => setUpscaleFactor(item.factor)}
                    className={`py-2 rounded-xl text-center border transition-all ${
                      upscaleFactor === item.factor
                        ? 'bg-blue-50 border-[#0068FF] text-[#0068FF] font-bold shadow-2xs'
                        : 'bg-gray-50 border-gray-200/70 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-xs font-black">{item.label}</div>
                    <div className="text-[10px] opacity-75">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Error Notice */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Main Action Button */}
            <button
              type="button"
              disabled={isProcessing || !file}
              onClick={handleExecute}
              className={`w-full py-3.5 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
                isProcessing || !file
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-950 hover:bg-[#0068FF] text-white active:scale-98 shadow-sm'
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Đang xử lý ({progressPercent}%)...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} className="text-yellow-400" />
                  <span>Xóa dấu AI & Làm nét</span>
                </>
              )}
            </button>

            {/* Status Progress Bar */}
            {isProcessing && (
              <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#0068FF] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-[#0068FF] font-bold text-center">{progressStatus}</p>
              </div>
            )}

          </div>

          {/* ===================================================
              RIGHT: PREVIEW & MINIMALIST RESULTS (7 Cols)
              =================================================== */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Minimalist Status Bar */}
            <div className="bg-white border border-gray-200/80 rounded-2xl px-4 py-3 shadow-xs flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span className="font-bold text-gray-900">Bóc C2PA:</span>
                <span className="text-gray-500">Tự động phát hiện & làm sạch</span>
              </div>
              <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                Sẵn sàng
              </span>
            </div>

            {/* Before / After Preview */}
            {result ? (
              <div className="space-y-2">
                <ImageComparisonSlider
                  originalSrc={result.originalUrl}
                  processedSrc={result.processedUrl}
                  originalLabel="GỐC"
                  processedLabel="ĐÃ XỬ LÝ"
                />
                <div className="flex items-center justify-between text-[11px] text-gray-400 px-1 font-medium">
                  <span>⇄ Kéo thanh trượt để so sánh độ nét</span>
                  <span className="text-[#0068FF] font-mono font-bold">
                    {result.originalWidth}x{result.originalHeight} → {result.processedWidth}x{result.processedHeight}
                  </span>
                </div>
              </div>
            ) : file ? (
              <div className="rounded-2xl border border-gray-200/80 bg-white p-6 text-center space-y-3 shadow-xs">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Ảnh gốc"
                  className="max-h-[360px] w-auto mx-auto rounded-xl object-contain border border-gray-100"
                />
                <p className="text-xs text-gray-400">
                  Nhấn <span className="text-[#0068FF] font-bold">"Xóa dấu AI & Làm nét"</span> để bắt đầu
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center text-gray-400 space-y-1.5 shadow-xs">
                <FileImage size={36} className="mx-auto text-gray-300 mb-2" />
                <div className="font-bold text-xs sm:text-sm text-gray-700">Chưa có hình ảnh</div>
                <p className="text-[11px] text-gray-400 max-w-xs mx-auto">
                  Tải ảnh AI từ thiết bị để bắt đầu xử lý trực tiếp
                </p>
              </div>
            )}

            {/* Minimalist Inspection Metrics */}
            {result && (
              <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-gray-900">
                    Kết quả xử lý
                  </span>
                  <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} /> Hoàn tất
                  </span>
                </div>

                {/* 4 Clean Metric Badges */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-[10px] text-gray-400 font-bold uppercase">C2PA / JUMBF</div>
                    <div className="text-emerald-600 font-black mt-0.5">Đã bóc sạch 100%</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-[10px] text-gray-400 font-bold uppercase">Thiết bị EXIF</div>
                    <div className="text-gray-900 font-black truncate mt-0.5">{result.cameraPreset.model}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-[10px] text-gray-400 font-bold uppercase">Ống kính</div>
                    <div className="text-gray-900 font-black truncate mt-0.5">{result.cameraPreset.lens}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-[10px] text-gray-400 font-bold uppercase">Quang học</div>
                    <div className="text-[#0068FF] font-black mt-0.5">f/{result.cameraPreset.aperture} • ISO {result.cameraPreset.iso}</div>
                  </div>
                </div>

                {/* Download CTA Button */}
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-[#0068FF] hover:bg-blue-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-all"
                >
                  <Download size={16} />
                  <span>Tải ảnh về máy (.jpg)</span>
                </button>
              </div>
            )}

            {/* Minimal Cross-sell Banner */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-xs">
              <div className="min-w-0">
                <div className="text-xs font-black text-gray-900 truncate">
                  Tài khoản Midjourney, ChatGPT Plus bản quyền
                </div>
                <div className="text-[11px] text-gray-500 truncate">
                  Bảo hành 1-1, giá rẻ hơn gốc đến 80%
                </div>
              </div>
              <Link
                to="/products?category=ai-tools"
                className="px-3 py-1.5 rounded-xl bg-gray-950 hover:bg-[#0068FF] text-white font-bold text-xs shrink-0 transition-colors flex items-center gap-1"
              >
                <span>Xem</span>
                <ArrowRight size={12} />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
};
