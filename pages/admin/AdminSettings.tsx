
import React from 'react';
import { Bell, CreditCard, Database, Globe, Lock, Mail, Save, Shield, Store, UserCog } from 'lucide-react';

const SettingCard = ({ icon: Icon, title, description, children }: any) => (
  <section className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm overflow-hidden">
    <div className="p-5 sm:p-6 border-b border-gray-100 flex items-start gap-4">
      <div className="w-11 h-11 rounded-2xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
        <Icon size={21} />
      </div>
      <div className="min-w-0">
        <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
    <div className="p-5 sm:p-6 space-y-4">
      {children}
    </div>
  </section>
);

const Field = ({ label, value, placeholder, type = 'text' }: any) => (
  <label className="block">
    <span className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">{label}</span>
    <input
      type={type}
      defaultValue={value}
      placeholder={placeholder}
      className="w-full h-11 rounded-xl bg-gray-50 border border-gray-200 px-4 text-sm font-bold text-gray-800 outline-none transition-all focus:bg-white focus:border-primary/60 focus:ring-4 focus:ring-primary/10"
    />
  </label>
);

const ToggleRow = ({ title, description, enabled = true }: any) => (
  <div className="flex items-center justify-between gap-4 py-2">
    <div className="min-w-0">
      <div className="text-sm font-black text-gray-900">{title}</div>
      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</div>
    </div>
    <button
      type="button"
      className={`relative w-12 h-7 rounded-full transition-colors shrink-0 ${enabled ? 'bg-primary' : 'bg-gray-200'}`}
      aria-label={title}
    >
      <span className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${enabled ? 'translate-x-6 left-0' : 'translate-x-1 left-0'}`} />
    </button>
  </div>
);

export const AdminSettings: React.FC = () => {
  return (
    <div className="space-y-5 sm:space-y-8 animate-fade-in pb-10 max-w-6xl mx-auto">
      <div className="bg-gray-950 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/25 rounded-full blur-3xl -mr-20 -mt-24 pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest text-blue-100 mb-3">
              <Shield size={12} /> Admin Control
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Cài đặt hệ thống</h1>
            <p className="text-sm text-gray-400 mt-2 max-w-2xl">Quản lý thông tin cửa hàng, bảo mật, thông báo và các tích hợp vận hành của MuaToolAI.com.</p>
          </div>
          <button className="h-11 px-5 rounded-xl bg-white text-gray-950 font-black text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shrink-0">
            <Save size={16} /> Lưu thay đổi
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        <SettingCard icon={Store} title="Thông tin cửa hàng" description="Các thông tin hiển thị công khai trên website và hóa đơn.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Tên cửa hàng" value="MuaToolAI.com" />
            <Field label="Tên miền" value="MuaToolAI.com" />
          </div>
          <Field label="Email hỗ trợ" value="support@aidayne.com" />
          <Field label="Số Zalo" value="0906291941" />
        </SettingCard>

        <SettingCard icon={UserCog} title="Tài khoản quản trị" description="Thiết lập thông tin đăng nhập và quyền truy cập admin.">
          <Field label="Email admin" value="admin@aidayne.com" />
          <Field label="Vai trò" value="Administrator" />
          <ToggleRow title="Bảo vệ đăng nhập" description="Yêu cầu xác thực trước khi vào khu vực admin." enabled />
        </SettingCard>

        <SettingCard icon={Bell} title="Thông báo" description="Điều khiển các cảnh báo đơn hàng, khách hàng và hệ thống.">
          <ToggleRow title="Thông báo đơn hàng mới" description="Hiển thị cảnh báo khi có đơn hàng mới." enabled />
          <ToggleRow title="Thông báo khách hàng mới" description="Theo dõi khách hàng đăng ký/tư vấn mới." enabled />
          <ToggleRow title="Báo cáo hệ thống" description="Gửi tổng hợp hoạt động định kỳ." enabled={false} />
        </SettingCard>

        <SettingCard icon={CreditCard} title="Thanh toán & tích hợp" description="Cấu hình phương thức thanh toán và công cụ tự động.">
          <ToggleRow title="Zalo tư vấn" description="Dẫn khách về nhóm Zalo khi bấm nhận giá." enabled />
          <ToggleRow title="SePay tự động" description="Tự động xác nhận giao dịch khi có webhook." enabled={false} />
          <Field label="Webhook URL" placeholder="https://..." />
        </SettingCard>

        <SettingCard icon={Globe} title="SEO & thương hiệu" description="Cấu hình nhận diện mặc định cho website.">
          <Field label="Tiêu đề mặc định" value="MuaToolAI.com - Kho công cụ AI Premium" />
          <Field label="Meta description" value="Tài khoản AI, phần mềm premium và giải pháp số giá tốt." />
        </SettingCard>

        <SettingCard icon={Database} title="Dữ liệu hệ thống" description="Trạng thái kết nối và đồng bộ dữ liệu Supabase.">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-green-50 border border-green-100 p-4">
              <div className="text-[10px] font-black text-green-700 uppercase tracking-wider">Database</div>
              <div className="text-sm font-black text-green-900 mt-1">Đang hoạt động</div>
            </div>
            <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
              <div className="text-[10px] font-black text-blue-700 uppercase tracking-wider">Sync</div>
              <div className="text-sm font-black text-blue-900 mt-1">Ổn định</div>
            </div>
          </div>
          <ToggleRow title="Keep-alive Supabase" description="Giữ database không bị tạm ngưng do ít truy cập." enabled />
        </SettingCard>
      </div>
    </div>
  );
};
