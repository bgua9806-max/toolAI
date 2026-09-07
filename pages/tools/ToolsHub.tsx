import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Wand2, 
  Image as ImageIcon, 
  FileText, 
  Video, 
  ArrowRight, 
  Layers, 
  Lock,
  Check
} from 'lucide-react';
import * as ReactRouterDOM from 'react-router-dom';
import { SEO } from '../../components/SEO';

const { Link } = ReactRouterDOM;

export const ToolsHub: React.FC = () => {
  const TOOLS = [
    {
      id: 'ai-image-cleaner',
      name: 'Xóa Đánh Dấu AI & Làm Nét',
      badge: 'MỚI NHẤT',
      badgeColor: 'bg-blue-50 text-[#0068FF] border border-blue-200/80 font-bold',
      status: 'active',
      path: '/tools/xoa-danh-dau-ai',
      icon: ImageIcon,
      iconColor: 'text-[#0068FF] bg-blue-50 border-blue-100',
      description: 'Bóc sạch chữ ký C2PA, gỡ nhãn AI trên mạng xã hội, xóa watermark và nâng nét ảnh 2x/4x.',
    },
    {
      id: 'prompt-generator',
      name: 'Trợ Lý Prompt Midjourney',
      badge: 'SẮP RA MẮT',
      badgeColor: 'bg-gray-100 text-gray-500 font-bold',
      status: 'upcoming',
      path: '#',
      icon: Wand2,
      iconColor: 'text-purple-600 bg-purple-50 border-purple-100',
      description: 'Gợi ý prompt ảnh chuẩn nhiếp ảnh điện ảnh, thông số f-stop và phong cách thực tế.',
    },
    {
      id: 'remove-bg',
      name: 'Tách Nền Ảnh AI Siêu Tốc',
      badge: 'SẮP RA MẮT',
      badgeColor: 'bg-gray-100 text-gray-500 font-bold',
      status: 'upcoming',
      path: '#',
      icon: Layers,
      iconColor: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      description: 'Tách chủ thể và người chuẩn xác từng sợi tóc chạy trực tiếp trên card đồ họa trình duyệt.',
    },
    {
      id: 'ai-humanizer',
      name: 'Nhân Hóa Văn Bản AI',
      badge: 'SẮP RA MẮT',
      badgeColor: 'bg-gray-100 text-gray-500 font-bold',
      status: 'upcoming',
      path: '#',
      icon: FileText,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-100',
      description: 'Chuyển văn bản từ ChatGPT thành lời văn tự nhiên đời thường, hỗ trợ vượt các bộ lọc quét AI.',
    },
    {
      id: 'video-downloader',
      name: 'Tải Video TikTok & Reels',
      badge: 'SẴN SÀNG',
      badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-bold',
      status: 'active',
      path: '/tools/tai-video',
      icon: Video,
      iconColor: 'text-teal-600 bg-teal-50 border-teal-100',
      description: 'Tải video ngắn TikTok, Facebook Reels chất lượng Full HD không dính logo watermark.',
    }
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900 pb-24">
      <SEO
        title="Chợ Tool AI | Bộ Công Cụ Tiện Ích Trực Tuyến - MuaToolAI"
        description="Kho công cụ AI miễn phí: Xóa đánh dấu AI, bóc C2PA, ghi đè EXIF máy ảnh, upscale làm nét ảnh 2x/4x trực tiếp trên trình duyệt."
      />

      {/* Luxury Minimalist Hero Banner */}
      <div className="relative bg-gray-950 pt-20 pb-8 md:pt-28 md:pb-16 mb-6 md:mb-10 overflow-hidden rounded-b-[1.75rem] md:rounded-b-[2.5rem] shadow-xl shadow-gray-950/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,104,255,0.2),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.12),transparent_40%)]"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-white/10 border border-white/10 text-blue-200 text-[11px] font-bold tracking-wide mb-3 backdrop-blur-md">
            <Sparkles size={12} className="text-emerald-400" />
            Tiện Ích Trực Tuyến Miễn Phí
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight">
            Chợ Tool AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">Cao Cấp</span>
          </h1>

          <p className="text-gray-400 text-xs sm:text-sm font-medium max-w-lg mx-auto leading-relaxed">
            Công cụ tối ưu ảnh và nội dung số. Xử lý trực tiếp trên máy, bảo mật 100% không lưu server.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Minimal Value Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-8">
          <div className="px-3.5 py-3 rounded-2xl bg-white border border-gray-200/80 shadow-2xs flex items-center gap-2.5">
            <Zap size={16} className="text-[#0068FF] shrink-0" />
            <div className="text-xs font-bold text-gray-800">Miễn phí 100%</div>
          </div>
          <div className="px-3.5 py-3 rounded-2xl bg-white border border-gray-200/80 shadow-2xs flex items-center gap-2.5">
            <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
            <div className="text-xs font-bold text-gray-800">Chạy trên Browser</div>
          </div>
          <div className="px-3.5 py-3 rounded-2xl bg-white border border-gray-200/80 shadow-2xs flex items-center gap-2.5">
            <Lock size={16} className="text-purple-600 shrink-0" />
            <div className="text-xs font-bold text-gray-800">Bảo mật dữ liệu</div>
          </div>
          <div className="px-3.5 py-3 rounded-2xl bg-white border border-gray-200/80 shadow-2xs flex items-center gap-2.5">
            <Sparkles size={16} className="text-amber-500 shrink-0" />
            <div className="text-xs font-bold text-gray-800">Tối ưu Reach Ads</div>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
            Bộ công cụ sẵn sàng
          </h2>
          <span className="text-[11px] font-bold text-gray-400">
            {TOOLS.length} tiện ích
          </span>
        </div>

        {/* Minimalist Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isActive = tool.status === 'active';

            const CardContent = (
              <div className={`group relative h-full flex flex-col p-5 rounded-2xl bg-white border transition-all duration-200 ${
                isActive 
                  ? 'border-gray-200/90 shadow-2xs hover:shadow-md hover:border-[#0068FF] hover:-translate-y-0.5' 
                  : 'border-gray-200/60 opacity-75'
              }`}>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-2xs ${tool.iconColor}`}>
                    <Icon size={18} />
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-sm sm:text-base font-black text-gray-900 mb-1.5 group-hover:text-[#0068FF] transition-colors leading-snug">
                  {tool.name}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1 font-medium">
                  {tool.description}
                </p>

                {/* Bottom Action */}
                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold">
                  {isActive ? (
                    <>
                      <span className="text-[#0068FF]">Sử dụng ngay</span>
                      <ArrowRight size={14} className="text-[#0068FF] group-hover:translate-x-1 transition-transform" />
                    </>
                  ) : (
                    <span className="text-gray-400">Đang hoàn thiện</span>
                  )}
                </div>
              </div>
            );

            return isActive ? (
              <Link key={tool.id} to={tool.path} className="block h-full">
                {CardContent}
              </Link>
            ) : (
              <div key={tool.id} className="block h-full cursor-not-allowed">
                {CardContent}
              </div>
            );
          })}
        </div>

        {/* Minimal Banner: Cửa Hàng Bản Quyền */}
        <div className="mt-12 rounded-2xl bg-white border border-gray-200/90 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="max-w-xl text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-black text-gray-900 mb-1">
              Cần tài khoản AI bản quyền chính hãng?
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
              ChatGPT Plus, Midjourney v6, Canva Pro, CapCut Pro giá rẻ hơn gốc đến 80%, bảo hành 1-1 trọn đời.
            </p>
          </div>

          <Link
            to="/products"
            className="px-5 py-2.5 rounded-xl bg-gray-950 hover:bg-[#0068FF] text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shrink-0 transition-all active:scale-95 shadow-xs"
          >
            <span>Xem cửa hàng</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </main>
  );
};
