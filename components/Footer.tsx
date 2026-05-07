import React from 'react';
import { Facebook, Instagram, Mail, Phone, ArrowRight } from 'lucide-react';
import * as ReactRouterDOM from 'react-router-dom';

const { Link } = ReactRouterDOM;

export const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-[#030712] text-gray-400 pt-16 lg:pt-24 pb-24 lg:pb-12 text-sm border-t border-white/5 mt-auto">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="flex flex-col items-start">
            <Link to="/" className="inline-block mb-6 group">
              <img
                src="/brand/muatoolai-logo-white.png"
                alt="MuaToolAI.com"
                className="h-14 w-auto max-w-[240px] object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed text-[14px] mb-8 max-w-sm">
              Nền tảng cung cấp bản quyền phần mềm & công cụ AI hàng đầu. Tối ưu hiệu suất làm việc, hỗ trợ kích hoạt trực tiếp, bảo hành trọn đời.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://zalo.me/g/bguamkuy0hcgjpvf9kyp" target="_blank" rel="noreferrer" 
                 className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0068FF]/10 text-[#0068FF] hover:bg-[#0068FF] hover:text-white font-bold text-xs transition-all duration-300 border border-[#0068FF]/20 hover:border-transparent">
                Zalo Tư Vấn <ArrowRight size={14} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61552104173388&locale=vi_VN" target="_blank" rel="noreferrer" 
                 className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-300 text-white">
                <Facebook size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" 
                 className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#F58529] hover:to-[#DD2A7B] hover:border-transparent transition-all duration-300 text-white">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-white font-bold mb-6 text-[11px] uppercase tracking-[0.2em]">Khám Phá</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors text-[14px] flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-primary/50 group-hover:scale-150 transition-transform"></span>Trang chủ</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors text-[14px] flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-primary/50 group-hover:scale-150 transition-transform"></span>Cửa hàng</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors text-[14px] flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-primary/50 group-hover:scale-150 transition-transform"></span>Tin tức AI</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-[14px] flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-primary/50 group-hover:scale-150 transition-transform"></span>Liên hệ</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-white font-bold mb-6 text-[11px] uppercase tracking-[0.2em]">Hỗ Trợ</h3>
            <ul className="space-y-4">
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors text-[14px] flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-primary transition-colors"></span>Hướng dẫn mua hàng</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors text-[14px] flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-primary transition-colors"></span>Chính sách bảo hành</Link></li>
              <li><a href="https://zalo.me/g/bguamkuy0hcgjpvf9kyp" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors text-[14px] flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-primary transition-colors"></span>Cộng đồng Zalo</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm h-fit hover:bg-white/[0.03] transition-colors duration-300">
            <h3 className="text-white font-bold mb-6 text-[11px] uppercase tracking-[0.2em]">Liên Hệ Trực Tiếp</h3>
            <div className="space-y-5">
              <a href="https://zalo.me/g/bguamkuy0hcgjpvf9kyp" target="_blank" rel="noreferrer" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                  <Phone size={18} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1 font-medium">Hotline / Zalo</p>
                  <p className="text-sm text-gray-200 font-bold group-hover:text-white transition-colors">0906.291.941</p>
                </div>
              </a>
              <a href="mailto:support@aidayne.com" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors duration-300">
                  <Mail size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1 font-medium">Email Hỗ Trợ</p>
                  <p className="text-sm text-gray-200 font-bold group-hover:text-white transition-colors">support@aidayne.com</p>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-[13px] font-medium">
            © {new Date().getFullYear()} MuaToolAI.com. All rights reserved.
          </p>
          
          {/* Payment Methods */}
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-400 tracking-wider">VISA</div>
            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-400 tracking-wider">MOMO</div>
            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-400 tracking-wider">ZALOPAY</div>
            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-400 tracking-wider">BANK</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
