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
  Flame
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
      badgeColor: 'bg-emerald-500 text-gray-950 font-black',
      status: 'active',
      path: '/tools/xoa-danh-dau-ai',
      icon: ImageIcon,
      gradient: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40',
      iconColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
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
      badgeColor: 'bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30',
      status: 'upcoming',
      path: '#',
      icon: Wand2,
      gradient: 'from-blue-500/10 to-indigo-500/10 border-gray-800',
      iconColor: 'text-blue-400 bg-blue-950/60 border-blue-500/30',
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
      badgeColor: 'bg-purple-500/20 text-purple-400 font-bold border border-purple-500/30',
      status: 'upcoming',
      path: '#',
      icon: Layers,
      gradient: 'from-purple-500/10 to-pink-500/10 border-gray-800',
      iconColor: 'text-purple-400 bg-purple-950/60 border-purple-500/30',
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
      badgeColor: 'bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30',
      status: 'upcoming',
      path: '#',
      icon: FileText,
      gradient: 'from-amber-500/10 to-orange-500/10 border-gray-800',
      iconColor: 'text-amber-400 bg-amber-950/60 border-amber-500/30',
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
      badgeColor: 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30',
      status: 'upcoming',
      path: '#',
      icon: Video,
      gradient: 'from-cyan-500/10 to-blue-500/10 border-gray-800',
      iconColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30',
      description: 'Tải video ngắn TikTok, Facebook Reels, Instagram Reels chất lượng Full HD không bị dính watermark dải mờ của nền tảng.',
      features: [
        'Tải video gốc chuẩn chất lượng cao',
        'Bóc sạch logo và ID chèn viền',
        'Hỗ trợ tải âm thanh MP3 chất lượng cao'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 selection:bg-emerald-500 selection:text-white pt-24 pb-20">
      <SEO
        title="Chợ Tool AI Miễn Phí | Bộ Công Cụ Tiện Ích AI Trực Tuyến - MuaToolAI"
        description="Kho công cụ AI miễn phí 100%: Xóa đánh dấu AI, bóc C2PA, ghi đè EXIF máy ảnh, upscale làm nét ảnh 2x/4x, tạo prompt Midjourney và tách nền siêu tốc trực tiếp trên trình duyệt."
      />

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 text-center relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider mb-4 backdrop-blur-md">
            <Sparkles size={14} />
            <span>Kho Tiện Ích Trực Tuyến Miễn Phí</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Chợ Tool AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Đỉnh Cao</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto mb-8">
            Tổng hợp các công cụ AI hỗ trợ làm content, quảng cáo Facebook, tối ưu hình ảnh và thiết kế. Xử lý trực tiếp trên trình duyệt, không lưu dữ liệu, bảo mật 100% và hoàn toàn miễn phí.
          </p>

          {/* Key Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3 rounded-2xl bg-gray-900/60 border border-gray-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Zap size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Miễn phí 100%</div>
                <div className="text-[10px] text-gray-400">Không giới hạn lượt dùng</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-gray-900/60 border border-gray-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Chạy trên Browser</div>
                <div className="text-[10px] text-gray-400">Không cần cài đặt thêm</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-gray-900/60 border border-gray-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <Lock size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Bảo mật tuyệt đối</div>
                <div className="text-[10px] text-gray-400">Không lưu ảnh về server</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-gray-900/60 border border-gray-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Flame size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Tối ưu Ads & Social</div>
                <div className="text-[10px] text-gray-400">Hỗ trợ tăng Reach bài viết</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Tools Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <span>Danh Sách Công Cụ</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              {TOOLS.length} Tiện ích
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isActive = tool.status === 'active';

            const CardContent = (
              <div className={`group relative h-full flex flex-col p-6 rounded-3xl bg-gray-900/60 border transition-all duration-300 ${
                isActive 
                  ? 'border-gray-800 hover:border-emerald-500/60 hover:bg-gray-900 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1' 
                  : 'border-gray-800/60 opacity-85 hover:opacity-100 hover:border-gray-700'
              }`}>
                {/* Header of Card */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-inner ${tool.iconColor}`}>
                    <Icon size={22} />
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-black text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-5 flex-1">
                  {tool.description}
                </p>

                {/* Features List */}
                <div className="space-y-1.5 mb-6 pt-4 border-t border-gray-800/80 text-[11px] text-gray-300">
                  {tool.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Action Link */}
                <div className="mt-auto">
                  {isActive ? (
                    <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/20 group-hover:bg-emerald-500 text-emerald-300 group-hover:text-gray-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-sm">
                      <span>Sử dụng ngay miễn phí</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  ) : (
                    <div className="w-full py-2.5 px-4 rounded-xl bg-gray-800/60 text-gray-500 font-bold text-xs flex items-center justify-center gap-2 cursor-not-allowed">
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
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-blue-950/60 via-gray-900 to-emerald-950/60 border border-emerald-500/20 p-8 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center md:text-left">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider mb-3 inline-block">
                Hỗ trợ sáng tạo không giới hạn
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Cần Tài Khoản AI Bản Quyền Để Tạo Nội Dung?
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                MuaToolAI cung cấp tài khoản ChatGPT Plus, Midjourney v6, Claude 3.5 Sonnet, Canva Pro, CapCut Pro bản quyền chính hãng với giá tiết kiệm đến 80%, bảo hành 1-1 trọn đời.
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
    </div>
  );
};
