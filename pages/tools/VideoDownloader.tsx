import React, { FormEvent, useMemo, useState } from 'react';
import { AlertCircle, ArrowLeft, Check, CheckCircle2, Clipboard, Download, Facebook, Film, Loader2, Music2, ShieldCheck, Sparkles, Video, Youtube } from 'lucide-react';
import * as ReactRouterDOM from 'react-router-dom';
import { SEO } from '../../components/SEO';

const { Link } = ReactRouterDOM;
type DownloadMode = 'auto' | 'audio' | 'mute';
type VideoQuality = 'max' | '2160' | '1440' | '1080' | '720' | '480';
interface DownloadItem { url: string; filename?: string; type?: string; thumb?: string }
interface DownloadResponse { status: 'tunnel' | 'redirect' | 'picker' | 'error'; url?: string; filename?: string; picker?: DownloadItem[]; error?: string }

const PLATFORMS = [
  { name: 'TikTok', test: /(^|\.)tiktok\.com$/i, icon: Music2, color: 'text-pink-500' },
  { name: 'Facebook', test: /(^|\.)(facebook\.com|fb\.watch)$/i, icon: Facebook, color: 'text-blue-600' },
  { name: 'YouTube', test: /(^|\.)(youtube\.com|youtu\.be)$/i, icon: Youtube, color: 'text-red-500' },
  { name: 'Threads', test: /(^|\.)(threads\.net|threads\.com)$/i, icon: Film, color: 'text-gray-900' },
];
const QUALITIES: Array<{ value: VideoQuality; label: string; hint: string }> = [
  { value: 'max', label: 'Cao nhất', hint: 'Tự động' }, { value: '2160', label: '4K', hint: 'Nếu có' },
  { value: '1440', label: '2K', hint: 'Nếu có' }, { value: '1080', label: '1080p', hint: 'Full HD' },
  { value: '720', label: '720p', hint: 'Dung lượng vừa' }, { value: '480', label: '480p', hint: 'Tải nhanh' },
];
const MODES: Array<{ value: DownloadMode; label: string; description: string }> = [
  { value: 'auto', label: 'Video có âm thanh', description: 'MP4, ưu tiên bản tốt nhất' },
  { value: 'audio', label: 'Chỉ âm thanh', description: 'MP3 chất lượng cao' },
  { value: 'mute', label: 'Video không tiếng', description: 'Giữ nguyên phần hình ảnh' },
];
const detectPlatform = (value: string) => {
  try { const host = new URL(value.trim()).hostname.replace(/^www\./, ''); return PLATFORMS.find((item) => item.test.test(host)); }
  catch { return undefined; }
};

export const VideoDownloader: React.FC = () => {
  const [url, setUrl] = useState('');
  const [quality, setQuality] = useState<VideoQuality>('max');
  const [mode, setMode] = useState<DownloadMode>('auto');
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<DownloadResponse | null>(null);
  const platform = useMemo(() => detectPlatform(url), [url]);
  const PlatformIcon = platform?.icon;

  const paste = async () => {
    try { setUrl((await navigator.clipboard.readText()).trim()); setError(''); setResult(null); }
    catch { setError('Trình duyệt chưa cho phép đọc clipboard. Hãy dán liên kết thủ công.'); }
  };
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setError(''); setResult(null);
    if (!platform) return setError('Liên kết chưa hợp lệ. Công cụ hỗ trợ TikTok, Facebook, YouTube và Threads.');
    if (!confirmed) return setError('Bạn cần xác nhận có quyền tải và sử dụng nội dung này.');
    try {
      setLoading(true);
      const response = await fetch('/api/video-download', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ url: url.trim(), quality, mode }) });
      const data = (await response.json()) as DownloadResponse;
      if (!response.ok || data.status === 'error') throw new Error(data.error || 'Không thể xử lý video này.');
      setResult(data);
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Đã có lỗi khi xử lý liên kết.'); }
    finally { setLoading(false); }
  };
  const downloads: DownloadItem[] = result?.status === 'picker' ? result.picker || [] : result?.url ? [{ url: result.url, filename: result.filename }] : [];

  return <main className="min-h-screen bg-[#F4F7FB] pb-20 text-gray-900">
    <SEO title="Tải Video TikTok, Facebook, YouTube & Threads Chất Lượng Cao" description="Công cụ tải video công khai từ TikTok, Facebook, YouTube và Threads với chất lượng tốt nhất mà nguồn cung cấp." keywords="tải video tiktok không logo, tải video facebook, tải video youtube, tải video threads" canonical="/tools/tai-video" />
    <section className="relative overflow-hidden bg-[#080B12] pb-14 pt-28 text-white md:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(236,72,153,.2),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(37,99,235,.28),transparent_34%),radial-gradient(circle_at_54%_100%,rgba(16,185,129,.12),transparent_35%)]" />
      <div className="absolute inset-0 opacity-[.06] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:36px_36px]" />
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-100"><Sparkles size={14} className="text-cyan-300" /> TikTok · Facebook · YouTube · Threads</div>
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">Tải video chất lượng cao<span className="mt-1 block bg-gradient-to-r from-cyan-300 via-blue-400 to-pink-400 bg-clip-text text-transparent">gọn trong một lần dán</span></h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-300">Dán liên kết công khai, chọn chất lượng và tải file phù hợp. Công cụ giữ nguyên chất lượng nguồn, không tự phóng đại độ phân giải.</p>
      </div>
    </section>
    <div className="relative z-20 mx-auto -mt-6 max-w-5xl px-4 sm:px-6">
      <div className="mb-5 flex items-center gap-2 text-sm font-medium text-gray-500"><Link to="/tools" className="inline-flex items-center gap-1.5 hover:text-blue-600"><ArrowLeft size={15} /> Chợ Tool AI</Link><span>/</span><span className="font-bold text-gray-800">Tải video</span></div>
      <form onSubmit={submit} className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_24px_70px_-30px_rgba(15,23,42,.35)]">
        <div className="border-b border-gray-100 p-5 sm:p-8">
          <label htmlFor="video-url" className="mb-3 block text-base font-black">Liên kết video</label>
          <div className={`flex min-h-16 items-center gap-3 rounded-2xl border-2 bg-gray-50 px-4 focus-within:bg-white ${platform ? 'border-emerald-400' : 'border-gray-200 focus-within:border-blue-500'}`}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">{PlatformIcon ? <PlatformIcon size={21} className={platform.color} /> : <Video size={21} className="text-gray-400" />}</div>
            <input id="video-url" value={url} onChange={(e) => { setUrl(e.target.value); setError(''); setResult(null); }} placeholder="Dán link TikTok, Facebook, YouTube hoặc Threads..." inputMode="url" autoComplete="url" className="min-w-0 flex-1 bg-transparent py-4 text-base font-semibold outline-none placeholder:font-medium placeholder:text-gray-400" />
            {platform && <span className="hidden rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700 sm:block">{platform.name}</span>}
            <button type="button" onClick={paste} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-bold text-gray-700 hover:text-blue-600" aria-label="Dán liên kết"><Clipboard size={16} /><span className="hidden sm:inline">Dán</span></button>
          </div>
        </div>
        <div className="grid lg:grid-cols-2">
          <fieldset className="border-b border-gray-100 p-5 sm:p-8 lg:border-b-0 lg:border-r">
            <legend className="mb-4 text-base font-black">Định dạng tải xuống</legend>
            <div className="space-y-3">{MODES.map((option) => <label key={option.value} className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 ${mode === option.value ? 'border-blue-500 bg-blue-50/70 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300'}`}>
              <input className="sr-only" type="radio" name="mode" checked={mode === option.value} onChange={() => setMode(option.value)} /><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${mode === option.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>{option.value === 'audio' ? <Music2 size={19} /> : <Video size={19} />}</span>
              <span className="min-w-0 flex-1"><span className="block text-sm font-black">{option.label}</span><span className="block text-sm text-gray-500">{option.description}</span></span>{mode === option.value && <CheckCircle2 size={20} className="text-blue-600" />}
            </label>)}</div>
          </fieldset>
          <fieldset className="p-5 sm:p-8"><legend className="mb-4 text-base font-black">Chất lượng video</legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{QUALITIES.map((option) => <label key={option.value} className={`cursor-pointer rounded-2xl border p-3 text-center ${quality === option.value ? 'border-gray-950 bg-gray-950 text-white shadow-lg' : 'border-gray-200 hover:border-gray-400'} ${mode === 'audio' ? 'pointer-events-none opacity-40' : ''}`}><input className="sr-only" type="radio" name="quality" checked={quality === option.value} onChange={() => setQuality(option.value)} disabled={mode === 'audio'} /><span className="block text-sm font-black">{option.label}</span><span className={`mt-1 block text-xs ${quality === option.value ? 'text-gray-300' : 'text-gray-500'}`}>{option.hint}</span></label>)}</div>
            {mode === 'audio' && <p className="mt-3 text-sm text-gray-500">Âm thanh sẽ được xuất ở chất lượng tốt nhất mà nguồn cho phép.</p>}
          </fieldset>
        </div>
        <div className="border-t border-gray-100 bg-gray-50/80 p-5 sm:p-8">
          <label className="mb-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4"><input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="peer sr-only" /><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-gray-300 peer-checked:border-emerald-500 peer-checked:bg-emerald-500 peer-checked:text-white">{confirmed && <Check size={14} strokeWidth={3} />}</span><span className="text-sm leading-relaxed text-gray-600">Tôi xác nhận đây là nội dung của tôi, nội dung được phép tải xuống hoặc tôi đã có quyền sử dụng hợp pháp.</span></label>
          {error && <div role="alert" className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700"><AlertCircle size={19} className="shrink-0" /><span>{error}</span></div>}
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 text-base font-black text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70">{loading ? <><Loader2 size={20} className="animate-spin" /> Đang lấy bản tốt nhất...</> : <><Download size={20} /> Phân tích và tải video</>}</button>
        </div>
      </form>
      {downloads.length > 0 && <section className="mt-6 rounded-[2rem] border border-emerald-200 bg-white p-5 shadow-lg sm:p-8" aria-live="polite"><div className="mb-5 flex items-start gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600"><CheckCircle2 size={24} /></div><div><h2 className="text-lg font-black">Video đã sẵn sàng</h2><p className="mt-1 text-sm text-gray-500">Liên kết tải có thể hết hạn, bạn nên lưu file ngay.</p></div></div><div className="grid gap-3 sm:grid-cols-2">{downloads.map((item, index) => <a key={`${item.url}-${index}`} href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4 hover:border-emerald-400 hover:bg-emerald-50">{item.thumb ? <img src={item.thumb} alt="" className="h-14 w-14 rounded-xl object-cover" /> : <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-950 text-white"><Download size={20} /></span>}<span className="min-w-0 flex-1"><span className="block truncate text-sm font-black">{item.filename || `Tệp ${index + 1}`}</span><span className="mt-1 block text-xs font-bold text-emerald-600">Nhấn để tải xuống</span></span></a>)}</div></section>}
      <section className="mt-8 grid gap-4 sm:grid-cols-3">{[
        { icon: ShieldCheck, title: 'Không lưu nội dung', text: 'Máy chủ chỉ xử lý liên kết và không xây dựng thư viện video của người dùng.' },
        { icon: Sparkles, title: 'Giữ chất lượng nguồn', text: 'Ưu tiên luồng tốt nhất có sẵn, không gắn thêm watermark vào file.' },
        { icon: Download, title: 'Nhiều định dạng', text: 'Tải video có tiếng, video không tiếng hoặc tách riêng âm thanh.' },
      ].map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-gray-200 bg-white p-5"><Icon size={21} className="mb-3 text-blue-600" /><h2 className="text-sm font-black">{title}</h2><p className="mt-2 text-sm leading-relaxed text-gray-500">{text}</p></article>)}</section>
    </div>
  </main>;
};
