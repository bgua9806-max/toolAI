import React, { useState, useMemo } from 'react';
import { 
  Download, 
  Sparkles, 
  Music2, 
  Video, 
  CheckCircle2, 
  AlertCircle, 
  Clipboard, 
  RefreshCw, 
  ArrowRight,
  ShieldCheck,
  Zap,
  ExternalLink,
  Layers,
  User,
  Clock,
  Heart,
  Eye
} from 'lucide-react';
import * as ReactRouterDOM from 'react-router-dom';
import { SEO } from '../../components/SEO';

const { Link } = ReactRouterDOM;

interface VideoMetadata {
  id: string;
  title: string;
  cover: string;
  duration: number;
  playUrl: string;
  hdPlayUrl?: string;
  musicUrl?: string;
  musicTitle?: string;
  authorName: string;
  authorId: string;
  authorAvatar?: string;
  diggCount?: number;
  playCount?: number;
  images?: string[];
}

export const VideoDownloader: React.FC = () => {
  const [inputUrl, setInputUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [downloadingType, setDownloadingType] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [videoData, setVideoData] = useState<VideoMetadata | null>(null);

  // Detect platform from URL
  const detectedPlatform = useMemo(() => {
    const trimmed = inputUrl.trim();
    if (!trimmed) return null;
    if (/tiktok\.com/i.test(trimmed)) return { name: 'TikTok', icon: Music2, color: 'text-pink-500', isSupported: true };
    if (/(facebook\.com|fb\.watch)/i.test(trimmed)) return { name: 'Facebook', icon: Video, color: 'text-blue-600', isSupported: false };
    if (/(youtube\.com|youtu\.be)/i.test(trimmed)) return { name: 'YouTube', icon: Video, color: 'text-red-500', isSupported: false };
    return null;
  }, [inputUrl]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputUrl(text.trim());
        setError('');
      }
    } catch {
      setError('Vui lòng dán liên kết video thủ công vào ô bên dưới.');
    }
  };

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const url = inputUrl.trim();
    if (!url) {
      setError('Vui lòng nhập hoặc dán liên kết video.');
      return;
    }

    if (!/tiktok\.com/i.test(url)) {
      if (/(facebook\.com|fb\.watch|youtube\.com|youtu\.be)/i.test(url)) {
        setError('Hệ thống hiện đang tối ưu tốt nhất cho TikTok không logo. Nền tảng Facebook & YouTube đang được nâng cấp máy chủ cào dữ liệu.');
      } else {
        setError('Liên kết chưa hợp lệ. Vui lòng dán liên kết video TikTok (ví dụ: vt.tiktok.com/... hoặc tiktok.com/@user/video/...)');
      }
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      setVideoData(null);

      const endpoint = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
      const res = await fetch(endpoint, {
        headers: { 'Accept': 'application/json' }
      });

      if (!res.ok) {
        throw new Error('Máy chủ trích xuất video tạm thời bận. Vui lòng thử lại sau vài giây.');
      }

      const json = await res.json();

      if (json.code !== 0 || !json.data) {
        throw new Error(json.msg || 'Không thể bóc tách video này. Hãy kiểm tra xem video có đang để chế độ công khai không.');
      }

      const d = json.data;
      setVideoData({
        id: d.id || String(Date.now()),
        title: d.title || 'Video TikTok Không Logo',
        cover: d.cover || d.origin_cover || '',
        duration: d.duration || 0,
        playUrl: d.play || '',
        hdPlayUrl: d.hdplay || d.play || '',
        musicUrl: d.music || '',
        musicTitle: d.music_info?.title || 'Âm thanh gốc',
        authorName: d.author?.nickname || 'Creator',
        authorId: d.author?.unique_id || '',
        authorAvatar: d.author?.avatar || '',
        diggCount: d.digg_count,
        playCount: d.play_count,
        images: d.images && Array.isArray(d.images) && d.images.length > 0 ? d.images : undefined
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Đã có lỗi xảy ra khi phân tích video.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadFile = async (fileUrl: string, fileName: string, typeKey: string) => {
    try {
      setDownloadingType(typeKey);
      
      // Attempt blob download for direct browser file saving
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error('Không thể tải luồng video');
      
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    } catch (err) {
      console.warn('Direct blob fetch failed, falling back to window.open', err);
      // Fallback: Open file directly in new window
      window.open(fileUrl, '_blank');
    } finally {
      setDownloadingType(null);
    }
  };

  const formatCount = (num?: number) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return String(num);
  };

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900 pb-24">
      <SEO
        title="Tải Video TikTok Không Logo Full HD & MP3 Miễn Phí"
        description="Công cụ tải video TikTok không dính watermark logo, bóc tách chất lượng Full HD và tách nhạc nền MP3 tự động 100% miễn phí."
      />

      {/* Luxury Minimalist Hero Banner */}
      <div className="relative bg-gray-950 pt-20 pb-8 md:pt-28 md:pb-14 mb-6 md:mb-8 overflow-hidden rounded-b-[1.75rem] md:rounded-b-[2.5rem] shadow-xl shadow-gray-950/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,104,255,0.2),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.15),transparent_40%)]"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-white/10 border border-white/10 text-pink-200 text-[11px] font-bold tracking-wide mb-3 backdrop-blur-md">
            <Sparkles size={12} className="text-pink-400" />
            Không Watermark • Chuẩn HD • Tách MP3
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight">
            Tải Video TikTok <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300">Không Logo</span>
          </h1>

          <p className="text-gray-400 text-xs sm:text-sm font-medium max-w-lg mx-auto leading-relaxed">
            Dán liên kết video công khai để tải video sạch không dính watermark hoặc tách nhạc nền MP3 chất lượng cao.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-medium">
          <Link to="/" className="hover:text-[#0068FF] transition-colors">Trang chủ</Link>
          <span className="text-gray-300">/</span>
          <Link to="/tools" className="hover:text-[#0068FF] transition-colors">Chợ Tool</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-bold">Tải Video Không Logo</span>
        </div>

        {/* Input & Form Card */}
        <div className="bg-white border border-gray-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xs mb-8">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <label htmlFor="video-url-input" className="block text-xs sm:text-sm font-bold text-gray-900">
              Dán liên kết video TikTok
            </label>

            <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
              <div className="relative flex-1 flex items-center bg-gray-50 border border-gray-200/80 focus-within:border-[#0068FF] focus-within:bg-white rounded-xl sm:rounded-2xl transition-all px-3.5 py-1">
                <Music2 size={18} className="text-pink-500 shrink-0 mr-2.5" />
                <input
                  id="video-url-input"
                  type="url"
                  value={inputUrl}
                  onChange={(e) => {
                    setInputUrl(e.target.value);
                    setError('');
                  }}
                  placeholder="https://vt.tiktok.com/... hoặc https://www.tiktok.com/@..."
                  className="w-full bg-transparent py-2.5 text-xs sm:text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={handlePaste}
                  className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-[#0068FF] hover:border-blue-200 text-xs font-bold shrink-0 shadow-2xs flex items-center gap-1 transition-all"
                >
                  <Clipboard size={13} />
                  <span>Dán</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading || !inputUrl.trim()}
                className={`py-3 px-6 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shrink-0 ${
                  isLoading || !inputUrl.trim()
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-950 hover:bg-[#0068FF] text-white shadow-xs active:scale-98'
                }`}
              >
                {isLoading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin text-cyan-300" />
                    <span>Đang bóc tách...</span>
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    <span>Lấy link tải</span>
                  </>
                )}
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}
          </form>
        </div>

        {/* Video Result Presentation */}
        {videoData && (
          <div className="bg-white border border-gray-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xs space-y-6 mb-8 animate-in fade-in duration-300">
            
            {/* Header Result */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-500" />
                Đã bóc sạch Watermark
              </span>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Sẵn sàng tải
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Thumbnail / Preview (4 cols) */}
              <div className="md:col-span-4 relative rounded-2xl overflow-hidden bg-gray-950 border border-gray-100 shadow-2xs group">
                <img
                  src={videoData.cover}
                  alt={videoData.title}
                  className="w-full aspect-[9/16] object-cover max-h-[380px] mx-auto transition-transform group-hover:scale-102 duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

                {/* Duration Badge */}
                {videoData.duration > 0 && (
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Clock size={11} />
                    <span>{formatDuration(videoData.duration)}</span>
                  </div>
                )}

                {/* Stats */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  <Heart size={11} className="text-pink-400 fill-pink-400" />
                  <span>{formatCount(videoData.diggCount)}</span>
                </div>
              </div>

              {/* Details & Download Options (8 cols) */}
              <div className="md:col-span-8 space-y-4">
                
                {/* Author Info & Title */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    {videoData.authorAvatar ? (
                      <img src={videoData.authorAvatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                    ) : (
                      <User size={14} className="text-gray-400" />
                    )}
                    <span className="text-xs font-bold text-gray-900">{videoData.authorName}</span>
                    {videoData.authorId && (
                      <span className="text-[11px] text-gray-400 font-mono">@{videoData.authorId}</span>
                    )}
                  </div>

                  <h2 className="text-sm sm:text-base font-bold text-gray-900 leading-snug line-clamp-3">
                    {videoData.title || 'Video TikTok'}
                  </h2>
                </div>

                {/* Download CTA Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  
                  {/* HD Video Download Button */}
                  <button
                    type="button"
                    disabled={downloadingType !== null}
                    onClick={() => handleDownloadFile(
                      videoData.hdPlayUrl || videoData.playUrl,
                      `tiktok_${videoData.authorId || 'video'}_${videoData.id}_HD.mp4`,
                      'hd'
                    )}
                    className="w-full p-3.5 rounded-xl bg-gray-950 hover:bg-[#0068FF] text-white flex items-center justify-between transition-all active:scale-98 shadow-xs group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 text-left">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-cyan-300">
                        {downloadingType === 'hd' ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16} />}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-black flex items-center gap-1.5">
                          <span>Tải Video Không Logo (Bản HD)</span>
                          <span className="text-[10px] bg-cyan-400/20 text-cyan-300 px-1.5 py-0.2 rounded font-mono">1080p</span>
                        </div>
                        <div className="text-[10px] text-gray-400">Độ phân giải nét nhất, không dính logo watermark</div>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>

                  {/* Standard Video Download Button */}
                  <button
                    type="button"
                    disabled={downloadingType !== null}
                    onClick={() => handleDownloadFile(
                      videoData.playUrl,
                      `tiktok_${videoData.authorId || 'video'}_${videoData.id}.mp4`,
                      'sd'
                    )}
                    className="w-full p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-900 flex items-center justify-between transition-all active:scale-98 group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 text-left">
                      <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-gray-700">
                        {downloadingType === 'sd' ? <RefreshCw size={16} className="animate-spin" /> : <Video size={16} />}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-black">
                          Tải Video Không Logo (Bản Chuẩn)
                        </div>
                        <div className="text-[10px] text-gray-500">Tốc độ tải nhanh, dung lượng gọn nhẹ</div>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                  </button>

                  {/* Music MP3 Download Button */}
                  {videoData.musicUrl && (
                    <button
                      type="button"
                      disabled={downloadingType !== null}
                      onClick={() => handleDownloadFile(
                        videoData.musicUrl!,
                        `audio_${videoData.authorId || 'sound'}_${videoData.id}.mp3`,
                        'music'
                      )}
                      className="w-full p-3.5 rounded-xl bg-pink-50/50 hover:bg-pink-50 border border-pink-200 text-pink-950 flex items-center justify-between transition-all active:scale-98 group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 text-left">
                        <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600">
                          {downloadingType === 'music' ? <RefreshCw size={16} className="animate-spin" /> : <Music2 size={16} />}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-black flex items-center gap-1.5 text-pink-900">
                            <span>Tách Nhạc Nền Gốc (.mp3)</span>
                            <span className="text-[10px] bg-pink-200 text-pink-700 px-1.5 py-0.2 rounded font-mono">Audio</span>
                          </div>
                          <div className="text-[10px] text-pink-700/80 truncate max-w-[240px] sm:max-w-[340px]">
                            {videoData.musicTitle}
                          </div>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-pink-400 group-hover:text-pink-600 group-hover:translate-x-1 transition-all" />
                    </button>
                  )}

                </div>

                {/* Photo Slideshow Images (if available) */}
                {videoData.images && videoData.images.length > 0 && (
                  <div className="pt-4 border-t border-gray-100 space-y-2">
                    <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                      <Layers size={14} className="text-[#0068FF]" />
                      <span>Tải ảnh bộ sưu tập Slide ({videoData.images.length} ảnh):</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {videoData.images.map((imgUrl, idx) => (
                        <a
                          key={idx}
                          href={imgUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative rounded-lg overflow-hidden border border-gray-200 aspect-square"
                        >
                          <img src={imgUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                            Tải #{idx + 1}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* Feature Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-10">
          <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0068FF] flex items-center justify-center mb-2">
              <Zap size={16} />
            </div>
            <div className="text-xs font-bold text-gray-900">Bóc Watermark Tự Động</div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Xóa logo mờ TikTok ở góc trên và dưới video mà không làm vỡ hình ảnh.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
              <Sparkles size={16} />
            </div>
            <div className="text-xs font-bold text-gray-900">Chuẩn HD 1080p Gốc</div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Giữ nguyên bitrate cao nhất từ máy chủ, không nén lại chất lượng video.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
              <ShieldCheck size={16} />
            </div>
            <div className="text-xs font-bold text-gray-900">Bảo Mật & Tiện Lợi</div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Không yêu cầu đăng nhập, không lưu trữ dữ liệu cá nhân hay video của bạn.
            </p>
          </div>
        </div>

        {/* Minimal Banner: Cửa Hàng Bản Quyền */}
        <div className="rounded-2xl bg-white border border-gray-200/90 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="max-w-xl text-center sm:text-left">
            <div className="text-xs sm:text-sm font-black text-gray-900 mb-0.5">
              Tài khoản CapCut Pro, Canva Pro bản quyền
            </div>
            <div className="text-[11px] sm:text-xs text-gray-500 font-medium">
              Chỉnh sửa video ngắn chuyên nghiệp, bảo hành 1-1 tại MuaToolAI
            </div>
          </div>

          <Link
            to="/products"
            className="px-4 py-2 rounded-xl bg-gray-950 hover:bg-[#0068FF] text-white font-bold text-xs shrink-0 transition-colors flex items-center gap-1.5"
          >
            <span>Xem cửa hàng</span>
            <ArrowRight size={12} />
          </Link>
        </div>

      </div>
    </main>
  );
};
