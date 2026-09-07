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
  Flame,
  CheckCircle2
} from 'lucide-react';
import * as ReactRouterDOM from 'react-router-dom';
import { SEO } from '../../components/SEO';

const { Link } = ReactRouterDOM;

export const ToolsHub: React.FC = () => {
  const TOOLS = [
    {
      id: 'ai-image-cleaner',
      name: 'Xóa Đánh Dấu AI & Làm Nét Ảnh',
      badge: 'HOT NHẤT',
      badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-black',
      status: 'active',
      path: '/tools/xoa-danh-dau-ai',
      icon: ImageIcon,
      iconColor: 'text-[#0068FF] bg-blue-50 border-blue-100',
      description: 'Bóc sạch chữ ký số C2PA / JUMBF, gỡ nhãn "Nội dung do AI tạo" trên Facebook, xóa watermark chân ảnh và nâng cấp độ phân giải ảnh lên 2x / 4x.',
      features: [
        'Bóc sạch 100% C2PA & Metadata AI',
        'Ghi đè EXIF máy ảnh Sony A7 IV / iPhone 15 Pro',
        'Upscale 2x / 4x tăng nét chi tiết',
        'Phủ hạt Film Grain khử cảm giác da nhựa AI'
      ]
    },
    {
      id: 'prompt-generator',
      name: 'Trợ Lý Tối Ưu Prompt Midjourney & Flux',
      badge: 'SẮP RA MẮT',
      badgeColor: 'bg-blue-50 text-blue-700 border border-blue-200 font-bold',
      status: 'upcoming',
      path: '#',
      icon: Wand2,
      iconColor: 'text-purple-600 bg-purple-50 border-purple-100',
      description: 'Tự động mở rộng ý tưởng thành Prompt Midjourney chuyên nghiệp với góc máy, ánh sáng điện ảnh, thông số f-stop và phong cách nhiếp ảnh chân thực.',
      features: [
        'Hơn 500+ phong cách ánh sáng & nhiếp ảnh',
        'Tối ưu tỷ lệ khung hình --ar 16:9, --v 6.1',
        'Gợi ý Negative Prompt chuẩn'
      ]
    },
    {
      id: 'remove-bg',
      name: 'Tách Nền Ảnh AI Siêu Tốc (Remove BG)',
      badge: 'SẮP RA MẮT',
      badgeColor: 'bg-purple-50 text-purple-700 border border-purple-200 font-bold',
      status: 'upcoming',
      path: '#',
      icon: Layers,
      iconColor: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      description: 'Tách chủ thể người và sản phẩm chính xác từng sợi tóc chạy trực tiếp trên card đồ họa trình duyệt (WebGPU) mà không cần upload ảnh lên server.',
      features: [
        'Tách nền tự động dưới 2 giây',
        'Chính xác từng chi tiết tóc và viền mờ',
        'Xuất file PNG trong suốt không nén'
      ]
    },
    {
      id: 'ai-humanizer',
      name: 'Nhân Hóa Văn Bản AI (AI Humanizer)',
      badge: 'SẮP RA MẮT',
      badgeColor: 'bg-amber-50 text-amber-800 border border-amber-200 font-bold',
      status: 'upcoming',
      path: '#',
      icon: FileText,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-100',
      description: 'Chuyển đổi bài viết từ ChatGPT và Claude thành văn phong tự nhiên đời thường, hỗ trợ vượt qua các bộ lọc nhận diện AI như GPTZero, Turnitin.',
      features: [
        'Văn phong mượt mà giàu cảm xúc',
        'Vượt qua các hệ thống quét AI',
        'Bảo toàn 100% ý nghĩa cốt lõi'
      ]
    },
    {
      id: 'video-downloader',
      name: 'Tải Video TikTok & Reels Không Logo',
      badge: 'SẮP RA MẮT',
      badgeColor: 'bg-cyan-50 text-cyan-800 border border-cyan-200 font-bold',
      status: 'upcoming',
      path: '#',
      icon: Video,
      iconColor: 'text-teal-600 bg-teal-50 border-teal-100',
      description: 'Tải video ngắn TikTok, Facebook Reels, Instagram Reels chất lượng Full HD không bị dính watermark dải mờ của nền tảng.',
      features: [
        'Tải video gốc chuẩn chất lượng cao',
        'Bóc sạch logo và ID chèn viền',
        'Hỗ trợ tải âm thanh MP3 chất lượng cao'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900 pb-20">
      <SEO
        title="Chợ Tool AI Miễn Phí | Bộ Công Cụ Tiện Ích AI Trực Tuyến - MuaToolAI"
        description="Kho công cụ AI miễn phí 100%: Xóa đánh dấu AI, bóc C2PA, ghi đè EXIF máy ảnh, upscale làm nét ảnh 2x/4x, tạo prompt Midjourney và tách nền siêu tốc trực tiếp trên trình duyệt."
      />

      {/* Premium Dark Hero Banner (Đồng bộ chuẩn hệ thống MuaToolAI) */}
      <div className="relative bg-gray-950 pt-20 pb-10 md:pt-32 md:pb-20 mb-6 md:mb-12 overflow-hidden rounded-b-[1.5rem] md:rounded-b-[2.5rem] shadow-2xl shadow-gray-900/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,104,255,0.22),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.14),transparent_38%)]"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 py-1 px-3 md:py-1.5 md:px-4 rounded-full bg-white/10 border border-white/10 text-blue-200 text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 md:mb-5 backdrop-blur-md">
            <Sparkles size={13} className="text-emerald-400" />
            <span>Kho Tiện Ích Trực Tuyến Miễn Phí</span>
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 md:mb-5 tracking-tight leading-tight">
            Chợ Tool AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">Đỉnh Cao</span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-base md:text-lg font-medium leading-relaxed">
            Tổng hợp các công cụ AI hỗ trợ sáng tạo nội dung, quảng cáo Facebook và đồ họa. 100% xử lý trên trình duyệt, bảo mật dữ liệu, không lưu ảnh lên server.
          </p>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Grid (Light Theme) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Zap size={18} />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black text-gray-900">Miễn phí 100%</div>
              <div className="text-[11px] text-gray-500 font-medium">Không giới hạn lượt dùng</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#0068FF] flex items-center justify-center shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black text-gray-900">Chạy trên Trình Duyệt</div>
              <div className="text-[11px] text-gray-500 font-medium">Không cần cài đặt thêm</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <Lock size={18} />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black text-gray-900">Bảo mật tuyệt đối</div>
              <div className="text-[11px] text-gray-500 font-medium">Không lưu ảnh về server</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Flame size={18} />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black text-gray-900">Tối ưu Ads & Social</div>
              <div className="text-[11px] text-gray-500 font-medium">Hỗ trợ tăng Reach bài viết</div>
            </div>
          </div>
        </div>

        {/* Tools Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-2xl font-black text-gray-900 tracking-tight">
              Danh Sách Công Cụ
            </h2>
            <span className="text-xs font-black text-[#0068FF] bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
              {TOOLS.length} Tiện ích
            </span>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isActive = tool.status === 'active';

            const CardContent = (
              <div className={`group relative h-full flex flex-col p-6 rounded-3xl bg-white border transition-all duration-300 ${
                isActive 
                  ? 'border-gray-200/90 shadow-sm hover:shadow-xl hover:border-[#0068FF]/50 hover:-translate-y-1' 
                  : 'border-gray-200/60 opacity-80 hover:opacity-100'
              }`}>
                {/* Header of Card */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-xs ${tool.iconColor}`}>
                    <Icon size={22} />
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-base sm:text-lg font-black text-gray-900 mb-2 group-hover:text-[#0068FF] transition-colors leading-snug">
                  {tool.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-5 flex-1 font-medium">
                  {tool.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-6 pt-4 border-t border-gray-100 text-xs text-gray-700">
                  {tool.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Action Link */}
                <div className="mt-auto">
                  {isActive ? (
                    <div className="w-full py-3 px-4 rounded-2xl bg-gray-950 group-hover:bg-[#0068FF] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98">
                      <span>Sử dụng ngay miễn phí</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  ) : (
                    <div className="w-full py-3 px-4 rounded-2xl bg-gray-100 text-gray-400 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-not-allowed">
                      <span>Đang phát triển...</span>
                    </div>
                  )}
                </div>
              </div>
            );

            return isActive ? (
              <Link key={tool.id} to={tool.path} className="block h-full">
                {CardContent}
              </Link>
            ) : (
              <div key={tool.id} className="block h-full">
                {CardContent}
              </div>
            );
          })}
        </div>

        {/* Banner: Nâng Cấp Tài Khoản Bản Quyền */}
        <div className="mt-14 sm:mt-16 rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,104,255,0.25),transparent_40%)]"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center md:text-left">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-blue-200 text-xs font-black uppercase tracking-wider mb-3 inline-block backdrop-blur-md">
                Hỗ trợ sáng tạo không giới hạn
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 tracking-tight">
                Cần Tài Khoản AI Bản Quyền Để Tạo Nội Dung?
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
                MuaToolAI cung cấp tài khoản ChatGPT Plus, Midjourney v6, Claude 3.5 Sonnet, Canva Pro, CapCut Pro chính hãng với giá tiết kiệm đến 80%, bảo hành 1-1 trọn đời.
              </p>
            </div>

            <Link
              to="/products"
              className="px-6 py-3.5 rounded-2xl bg-[#0068FF] hover:bg-blue-600 text-white font-black text-sm flex items-center gap-2 shadow-xl shadow-blue-500/30 shrink-0 active:scale-95 transition-all"
            >
              <span>Khám Phá Cửa Hàng</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
};
