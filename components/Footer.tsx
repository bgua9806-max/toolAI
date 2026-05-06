
import React from 'react';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';
import * as ReactRouterDOM from 'react-router-dom';

const { Link } = ReactRouterDOM;

export const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-[#0B0D12] text-gray-400 pt-7 lg:pt-10 pb-24 lg:pb-10 text-sm border-t border-white/10">
      <div className="absolute -top-20 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-[2rem] lg:rounded-none border border-white/10 lg:border-0 bg-white/[0.03] lg:bg-transparent p-5 sm:p-0 shadow-2xl shadow-black/20 lg:shadow-none">
          {/* Brand */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:grid lg:grid-cols-[1.2fr_1fr_1fr] gap-6 lg:gap-10">
            <div className="w-full flex flex-col items-center lg:items-start">
              <Link to="/" className="inline-flex items-center gap-2 mb-2">
                <span className="font-extrabold text-2xl text-white tracking-tighter">
                  KhoAI<span className="text-primary">.vn</span>
                </span>
              </Link>
              <p className="text-gray-400/90 leading-relaxed text-[12px] sm:text-[13px] max-w-xs sm:max-w-sm">
                Bản quyền phần mềm & giải trí số uy tín. Tư vấn nhanh qua Zalo, hỗ trợ kích hoạt trực tiếp.
              </p>
              <div className="hidden lg:flex justify-center lg:justify-start gap-2.5 mt-4">
                <a href="https://zalo.me/g/bguamkuy0hcgjpvf9kyp" target="_blank" rel="noreferrer" className="px-4 h-9 rounded-full bg-[#0068FF] flex items-center justify-center text-white font-extrabold text-xs shadow-lg shadow-blue-500/20 hover:bg-blue-600 active:scale-95 transition-all">Zalo tư vấn</a>
                <a href="https://www.facebook.com/profile.php?id=61552104173388&locale=vi_VN" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] active:scale-95 transition-colors text-white"><Facebook size={14} /></a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary active:scale-95 transition-colors text-white"><Instagram size={14} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="hidden lg:contents">
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 lg:p-0 lg:bg-transparent lg:border-0">
                <h3 className="text-white font-extrabold mb-3 text-[10px] uppercase tracking-[0.18em]">Liên kết</h3>
                <ul className="space-y-2 text-[12px] sm:text-[13px]">
                  <li><Link to="/products" className="block py-1 hover:text-white transition-colors">Sản phẩm</Link></li>
                  <li><Link to="/blog" className="block py-1 hover:text-white transition-colors">Tin tức</Link></li>
                  <li><Link to="/order-lookup" className="block py-1 hover:text-white transition-colors">Tra cứu đơn</Link></li>
                </ul>
              </div>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 lg:p-0 lg:bg-transparent lg:border-0">
                <h3 className="text-white font-extrabold mb-3 text-[10px] uppercase tracking-[0.18em]">Hỗ trợ</h3>
                <ul className="space-y-2 text-[12px] sm:text-[13px]">
                  <li><Link to="/contact" className="block py-1 hover:text-white transition-colors">Liên hệ</Link></li>
                  <li><Link to="/blog" className="block py-1 hover:text-white transition-colors">Hướng dẫn</Link></li>
                  <li><a href="https://zalo.me/g/bguamkuy0hcgjpvf9kyp" target="_blank" rel="noreferrer" className="block py-1 hover:text-white transition-colors">Bảo hành</a></li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="w-full rounded-2xl bg-white/[0.04] border border-white/10 p-4 lg:p-0 lg:bg-transparent lg:border-0">
              <h3 className="text-white font-extrabold mb-3 text-[10px] uppercase tracking-[0.18em]">Liên hệ nhanh</h3>
              <div className="grid gap-2 text-[12px] sm:text-[13px]">
                <a href="https://zalo.me/g/bguamkuy0hcgjpvf9kyp" target="_blank" rel="noreferrer" className="flex items-center justify-center lg:justify-start gap-2.5 rounded-xl bg-black/20 lg:bg-transparent px-3 py-2.5 lg:p-0 hover:text-white transition-colors">
                  <Phone size={15} className="text-primary" /> 0374.770.023 (Zalo)
                </a>
                <a href="mailto:support@aidayne.com" className="flex items-center justify-center lg:justify-start gap-2.5 rounded-xl bg-black/20 lg:bg-transparent px-3 py-2.5 lg:p-0 hover:text-white transition-colors">
                  <Mail size={15} className="text-primary" /> support@aidayne.com
                </a>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex border-t border-white/10 mt-5 lg:mt-8 pt-4 lg:pt-5 flex-col items-center lg:flex-row lg:justify-between gap-3">
            <div className="flex flex-wrap justify-center items-center gap-2 text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest font-bold">
              <span className="rounded-full bg-white/[0.06] px-2.5 py-1">Visa</span>
              <span className="rounded-full bg-white/[0.06] px-2.5 py-1">Momo</span>
              <span className="rounded-full bg-white/[0.06] px-2.5 py-1">ZaloPay</span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-gray-600 text-center">© 2024 KhoAI.vn. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
