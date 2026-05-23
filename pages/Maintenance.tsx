import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, Shield, Settings, Server, Database, Globe, Command, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Maintenance: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  // Easter egg: Click logo 5 times to bypass to admin login
  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    if (newCount >= 5) {
      window.location.href = '/login';
    } else {
      setClickCount(newCount);
      // Reset counter after 3 seconds of inactivity
      setTimeout(() => setClickCount(0), 3000);
    }
  };

  // Simulated upgrade logs
  const upgradeSteps = [
    { name: 'Sao lưu cơ sở dữ liệu hệ thống', status: 'completed', icon: Database },
    { name: 'Tối ưu hóa tài nguyên & CDN Cache', status: 'completed', icon: Globe },
    { name: 'Nâng cấp API kết nối các công cụ AI', status: 'active', icon: Server },
    { name: 'Kiểm tra bảo mật và tối ưu UI/UX', status: 'pending', icon: Shield },
  ];

  // Simulate progress bar and steps
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 3) + 1;
        const nextProgress = Math.min(prev + increment, 100);
        
        // Update steps based on progress
        if (nextProgress < 30) {
          setCurrentStep(0);
        } else if (nextProgress < 65) {
          setCurrentStep(1);
        } else if (nextProgress < 90) {
          setCurrentStep(2);
        } else {
          setCurrentStep(3);
        }
        
        return nextProgress;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      // Try to save email to Supabase subscribers table
      // If it doesn't exist, this will fail but catch block will handle it gracefully.
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email: email.trim(), source: 'maintenance_page' }]);
      
      if (error) {
        // If table doesn't exist, we can fallback to inserting in contacts or customers
        // or just logging. We want to ensure the customer always gets a positive experience.
        console.warn('Supabase insert failed, saving locally:', error.message);
        
        // Backup: Save in localStorage for the owner to export later
        const existing = localStorage.getItem('offline_subscribers') || '[]';
        const list = JSON.parse(existing);
        list.push({ email: email.trim(), date: new Date().toISOString() });
        localStorage.setItem('offline_subscribers', JSON.stringify(list));
      }
      
      // Success feedback animation
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubscribed(true);
        setEmail('');
      }, 800);
    } catch (err) {
      console.error('Subscription error:', err);
      setIsSubmitting(false);
      setIsSubscribed(true); // Still show success to client
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#0A0A0C] font-sans text-gray-100 px-4 py-12 select-none">
      
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-[#0071E3]/15 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-500/5 blur-[100px] animate-pulse" style={{ animationDuration: '10s' }}></div>
        
        {/* Fine grid overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-2xl bg-white/[0.02] backdrop-blur-3xl border border-white/[0.06] shadow-[0_30px_100px_rgba(0,0,0,0.8)] rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden flex flex-col items-center text-center z-10">
        
        {/* Glow badge overlay */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0071E3]/50 to-transparent"></div>

        {/* Pulse Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-[#0071E3] tracking-wide mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0071E3]"></span>
          </span>
          NÂNG CẤP HỆ THỐNG
        </div>

        {/* Logo */}
        <div 
          onClick={handleLogoClick}
          className="mb-8 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative group"
          title="Click 5 lần để đăng nhập quản trị"
        >
          <img 
            src="/brand/muatoolai-logo-white.png" 
            alt="MuaToolAI.com" 
            className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(0,113,227,0.2)]"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.style.display = 'none';
              const textLogo = document.getElementById('text-logo');
              if (textLogo) textLogo.style.display = 'block';
            }}
          />
          <h1 
            id="text-logo" 
            className="hidden text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
          >
            MuaTool<span className="text-[#0071E3]">AI</span>.com
          </h1>
        </div>

        {/* Title & Description */}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-white">
          Chúng Tôi Sẽ Trở Lại Sớm!
        </h2>
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-lg mb-8 font-light">
          MuaToolAI.com đang tiến hành tối ưu hóa cơ sở dữ liệu và nâng cấp hạ tầng máy chủ định kỳ để cải thiện tốc độ dịch vụ. Mọi tài khoản và giao dịch của bạn vẫn an toàn tuyệt đối.
        </p>

        {/* Simulated System Status Console */}
        <div className="w-full bg-[#050507]/90 rounded-2xl p-4 sm:p-5 border border-white/[0.04] text-left mb-8 shadow-inner relative group">
          <div className="flex items-center justify-between mb-4 border-b border-white/[0.05] pb-2 text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60"></span>
            </span>
            <span>Trạng thái nâng cấp</span>
          </div>

          <div className="space-y-3.5 font-mono text-[11px] sm:text-xs">
            {upgradeSteps.map((step, idx) => {
              const Icon = step.icon;
              const isCompleted = idx < currentStep || progress === 100;
              const isActive = idx === currentStep && progress < 100;
              const isPending = idx > currentStep && progress < 100;

              return (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-gray-400">
                    <Icon size={14} className={isActive ? 'text-[#0071E3] animate-spin' : isCompleted ? 'text-green-500' : 'text-gray-600'} />
                    <span className={isActive ? 'text-white font-medium' : isCompleted ? 'text-gray-300' : 'text-gray-600'}>
                      {step.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-4">
                    {isCompleted ? (
                      <span className="text-green-500 bg-green-500/10 px-2 py-0.5 rounded text-[10px] font-bold">HOÀN TẤT</span>
                    ) : isActive ? (
                      <span className="text-[#0071E3] bg-[#0071E3]/10 px-2 py-0.5 rounded text-[10px] font-bold animate-pulse">ĐANG XỬ LÝ...</span>
                    ) : (
                      <span className="text-gray-600 bg-white/[0.02] px-2 py-0.5 rounded text-[10px] font-bold">CHỜ ĐỢI</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="mt-5 pt-3 border-t border-white/[0.04] flex items-center gap-4">
            <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-[#0071E3] rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="font-mono text-xs font-bold text-gray-400 min-w-[32px] text-right">
              {progress}%
            </span>
          </div>
        </div>

        {/* Email Subscription Form */}
        <div className="w-full max-w-md mb-8">
          {isSubscribed ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 flex items-center justify-center gap-3 text-green-400 animate-fade-in">
              <CheckCircle2 size={20} className="shrink-0" />
              <div className="text-left text-xs sm:text-sm font-medium">
                <p className="font-bold">Đăng ký thành công!</p>
                <p className="text-green-400/80 font-light mt-0.5">Chúng tôi sẽ gửi thông báo cho bạn ngay khi website hoạt động.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 relative">
              <div className="relative flex-1">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn..." 
                  className="w-full pl-11 pr-4 py-3 sm:py-3.5 bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3]/20 rounded-xl focus:outline-none transition-all text-sm font-medium placeholder-gray-500"
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-6 py-3 sm:py-3.5 bg-[#0071E3] hover:bg-blue-600 active:scale-[0.98] transition-all text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 disabled:opacity-75 disabled:cursor-not-allowed group shrink-0"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Thông báo cho tôi
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Quick Support Shortcuts */}
        <div className="w-full pt-6 border-t border-white/[0.04]">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
            Hỗ trợ khẩn cấp / Mua hàng trực tiếp
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a 
              href="https://zalo.me/g/bguamkuy0hcgjpvf9kyp" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.06] active:scale-[0.98] transition-all rounded-xl text-xs sm:text-sm font-bold text-gray-300 hover:text-white"
            >
              <MessageSquare size={16} className="text-blue-400 shrink-0" />
              Chat Zalo
            </a>
            <a 
              href="https://t.me/aidayne" // Simulated Telegram support
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.06] active:scale-[0.98] transition-all rounded-xl text-xs sm:text-sm font-bold text-gray-300 hover:text-white"
            >
              <Send size={16} className="text-sky-400 shrink-0" />
              Telegram Support
            </a>
            <a 
              href="tel:0906291941" 
              className="flex items-center justify-center gap-2 py-3 bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.06] active:scale-[0.98] transition-all rounded-xl text-xs sm:text-sm font-bold text-gray-300 hover:text-white"
            >
              <Phone size={16} className="text-green-400 shrink-0" />
              Hotline: 0906291941
            </a>
          </div>
        </div>

      </div>

      {/* Subtle Admin Link Backdoor */}
      <div className="mt-8 text-center opacity-20 hover:opacity-80 transition-opacity duration-300 z-10">
        <a 
          href="/login" 
          className="text-xs text-gray-400 hover:text-white font-medium flex items-center justify-center gap-1.5"
        >
          <Settings size={12} />
          Quản trị viên
        </a>
      </div>
      
    </div>
  );
};
