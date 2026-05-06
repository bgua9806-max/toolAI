
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search,
  BookOpen,
  TicketPercent, 
  Zap,
  MonitorPlay,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Shield
} from 'lucide-react';

const { Link, useLocation, Outlet } = ReactRouterDOM;

export const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile state
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop collapse state
  const [adminCode, setAdminCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(() => sessionStorage.getItem('khoai_admin_unlocked') === 'true');
  const location = useLocation();

  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminCode.trim() === '190504') {
      sessionStorage.setItem('khoai_admin_unlocked', 'true');
      setIsUnlocked(true);
      setCodeError('');
    } else {
      setCodeError('Mã quản trị không đúng. Vui lòng thử lại.');
      setAdminCode('');
    }
  };

  const MENU_ITEMS = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Tổng quan' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'Đơn hàng' },
    { path: '/admin/products', icon: Package, label: 'Sản phẩm' },
    { path: '/admin/customers', icon: Users, label: 'Khách hàng' },
    { path: '/admin/reviews', icon: MessageSquare, label: 'Đánh giá' },
    { path: '/admin/blog', icon: BookOpen, label: 'Bài viết' },
    { path: '/admin/flash-sale', icon: Zap, label: 'Flash Sale' },
    { path: '/admin/promotions', icon: TicketPercent, label: 'Khuyến mãi' },
    { path: '/admin/hero', icon: MonitorPlay, label: 'Banner' },
    { path: '/admin/settings', icon: Settings, label: 'Cài đặt' },
  ];

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#2563eb_0%,transparent_28%),linear-gradient(135deg,#020617,#111827_55%,#1e1b4b)] flex items-center justify-center p-4 font-sans text-gray-900">
        <div className="w-full max-w-md rounded-[2rem] bg-white/95 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden animate-fade-in-up">
          <div className="p-8 text-center border-b border-gray-100">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-blue-400 text-white flex items-center justify-center shadow-xl shadow-blue-500/30 mb-5">
              <Shield size={30} />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-primary mb-2">Admin Secure Gate</p>
            <h1 className="text-2xl font-black text-gray-950 tracking-tight">Xác thực quản trị viên</h1>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">Vui lòng nhập mã bảo vệ để truy cập khu vực quản trị KhoAI.</p>
          </div>

          <form onSubmit={handleUnlockAdmin} className="p-6 space-y-4">
            <div>
              <label htmlFor="admin-access-code" className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">Mã truy cập</label>
              <input
                id="admin-access-code"
                type="password"
                inputMode="numeric"
                autoComplete="one-time-code"
                autoFocus
                value={adminCode}
                onChange={(e) => {
                  setAdminCode(e.target.value);
                  if (codeError) setCodeError('');
                }}
                placeholder="Nhập mã quản trị"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-center text-2xl font-black tracking-[0.35em] text-gray-950 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
              />
              {codeError && <p className="mt-2 text-center text-xs font-bold text-red-500">{codeError}</p>}
            </div>

            <button type="submit" className="w-full rounded-2xl bg-gray-950 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-gray-900/20 transition-all hover:-translate-y-0.5 hover:bg-primary active:scale-[0.98]">
              Mở khóa quản trị
            </button>
            <Link to="/" className="block text-center text-xs font-bold text-gray-400 hover:text-primary transition-colors">Quay lại trang chủ</Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex text-gray-900 font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
            fixed inset-y-0 left-0 z-50 bg-white/90 backdrop-blur-2xl border-r border-gray-200/60 shadow-lg lg:shadow-none transition-all duration-300 ease-in-out flex flex-col
            w-[260px] /* Compact width for mobile */
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            lg:relative lg:translate-x-0
            ${isCollapsed ? 'lg:w-20' : 'lg:w-72'}
        `}
      >
        {/* Header Logo & Toggle */}
        <div className={`h-16 lg:h-20 flex items-center border-b border-gray-100 shrink-0 transition-all ${isCollapsed ? 'justify-center px-0' : 'justify-between px-5 lg:px-6'}`}>
             {!isCollapsed && (
                 <span className="font-extrabold text-xl lg:text-2xl tracking-tighter text-gray-900 animate-fade-in">
                    KhoAI<span className="text-primary">.Admin</span>
                 </span>
             )}
             {isCollapsed && (
                 <span className="font-extrabold text-2xl text-primary animate-fade-in">A.</span>
             )}

             <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-900">
               <X size={24} />
             </button>

             {/* Desktop Collapse Button */}
             <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
             >
                {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
             </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 lg:py-6 space-y-1 overflow-y-auto custom-scrollbar">
            {MENU_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    group flex items-center gap-3 px-3 py-3 lg:py-3.5 rounded-xl text-sm font-bold transition-all relative
                    ${isActive 
                      ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                >
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} className="shrink-0 transition-transform group-hover:scale-110" />
                  
                  {!isCollapsed && <span className="truncate">{item.label}</span>}

                  {/* Tooltip for Collapsed Mode */}
                  {isCollapsed && (
                      <div className="absolute left-14 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                          {item.label}
                      </div>
                  )}
                </Link>
              );
            })}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-gray-100 shrink-0">
            <div className={`flex items-center gap-3 transition-all ${isCollapsed ? 'justify-center' : 'bg-gray-50 rounded-2xl p-3'}`}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-400 text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0">
                <Shield size={18} />
              </div>
              
              {!isCollapsed && (
                  <div className="flex-1 min-w-0 animate-fade-in">
                    <p className="text-sm font-bold text-gray-900 truncate">Administrator</p>
                    <div className="flex items-center justify-between mt-0.5">
                        <p className="text-[10px] text-gray-500 truncate">admin@aidayne.com</p>
                        <Link to="/login" onClick={() => sessionStorage.removeItem('khoai_admin_unlocked')} className="text-gray-400 hover:text-red-500 transition-colors" title="Đăng xuất">
                            <LogOut size={14} />
                        </Link>
                    </div>
                  </div>
              )}
            </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 lg:h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40 shrink-0">
           <div className="flex items-center gap-4">
              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                 <Menu size={24} />
              </button>
               <h2 className="text-base sm:text-xl font-extrabold text-gray-800 tracking-tight">
                {MENU_ITEMS.find(i => i.path === location.pathname)?.label || 'Dashboard'}
              </h2>
           </div>

           <div className="flex items-center gap-4">
              {/* Global Search */}
              <div className="hidden md:flex items-center relative group">
                 <Search size={18} className="absolute left-3 text-gray-400 group-focus-within:text-primary transition-colors" />
                 <input 
                    type="text" 
                    placeholder="Tìm kiếm nhanh (Cmd+K)..." 
                    className="pl-10 pr-4 py-2.5 bg-gray-100/50 border border-transparent hover:bg-white hover:border-gray-200 focus:bg-white focus:border-primary/50 rounded-xl text-sm focus:ring-4 focus:ring-primary/10 w-64 transition-all font-medium"
                 />
              </div>
              
              {/* Notification */}
              <button className="relative p-2.5 text-gray-500 hover:bg-white hover:shadow-sm hover:text-primary rounded-xl transition-all border border-transparent hover:border-gray-100">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
           </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 scroll-smooth">
           <Outlet />
        </main>
      </div>
    </div>
  );
};
