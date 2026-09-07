import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { CartItem } from '../types';
import { supabase } from '../lib/supabase';
import { 
  ArrowLeft, ShieldCheck, CreditCard, Lock, Package, 
  Copy, Download, Mail, Info, MessageCircle, ExternalLink, Phone, Check, ArrowRight, Zap,
  User, PhoneCall, CheckCircle2, ChevronDown, ChevronUp, ShoppingBag, Sparkles
} from 'lucide-react';

const { useNavigate, Link } = ReactRouterDOM;

interface CheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
}

// Cấu hình thông tin ngân hàng & Zalo hỗ trợ
const BANK_INFO = {
  BANK_ID: 'MB', // MBBank (Ngân hàng TMCP Quân Đội)
  ACCOUNT_NO: '808123456789',
  ACCOUNT_NAME: 'NGUYEN TRONG HUU',
  HOTLINE_ZALO: '0906291941',
  ZALO_GROUP: 'https://zalo.me/g/bguamkuy0hcgjpvf9kyp',
  TEMPLATE: 'compact2' // Giao diện QR VietQR chuẩn
};

export const Checkout: React.FC<CheckoutProps> = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    note: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPaidConfirmed, setIsPaidConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [finalTotal, setFinalTotal] = useState(0);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  // Chuyển hướng nếu giỏ hàng trống khi chưa hoàn tất
  useEffect(() => {
    if (cart.length === 0 && !isSuccess) {
      navigate('/products');
    }
    window.scrollTo(0, 0);
  }, [cart, navigate, isSuccess]);

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.trim() }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const cleanData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        note: formData.note.trim()
      };

      const newOrder = {
        customer_name: cleanData.name,
        email: cleanData.email,
        phone: cleanData.phone,
        total: totalAmount,
        status: 'pending',
        payment_method: paymentMethod === 'qr' ? 'Chuyển khoản QR (Zalo Handover)' : paymentMethod === 'momo' ? 'Ví MoMo' : 'Thẻ quốc tế',
        items: cart
      };

      const { data, error } = await supabase
        .from('orders')
        .insert([newOrder])
        .select()
        .single();

      if (error) throw error;

      setSavedItems([...cart]);
      setFinalTotal(totalAmount);
      setOrderId(data.id);
      setIsSuccess(true);
      clearCart();
      window.scrollTo(0, 0);
      
    } catch (error: any) {
      console.error("Lỗi thanh toán:", error);
      alert('Có lỗi xảy ra khi tạo đơn hàng: ' + (error.message || 'Lỗi kết nối'));
      setIsProcessing(false);
    }
  };

  // Tạo nội dung chuyển khoản: ADN + 6 ký tự đầu của mã đơn
  const transferContent = orderId ? `ADN${orderId.slice(0, 6).toUpperCase()}` : '';
  const qrUrl = `https://img.vietqr.io/image/${BANK_INFO.BANK_ID}-${BANK_INFO.ACCOUNT_NO}-${BANK_INFO.TEMPLATE}.png?amount=${finalTotal}&addInfo=${transferContent}&accountName=${encodeURIComponent(BANK_INFO.ACCOUNT_NAME)}`;

  const itemsSummary = savedItems.length > 0 
    ? savedItems.map(i => `${i.name} (x${i.quantity})`).join(', ')
    : 'Tài khoản phần mềm AI';

  const formattedTotal = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(finalTotal);

  // Soạn sẵn nội dung tin nhắn Zalo đầy đủ
  const zaloPreFilledText = `Chào shop MuaToolAI! Tôi vừa chuyển khoản đơn hàng #${orderId.slice(0, 8).toUpperCase()}.\n` +
    `- Số tiền: ${formattedTotal}\n` +
    `- Sản phẩm: ${itemsSummary}\n` +
    `- Khách hàng: ${formData.name || 'Khách hàng'} (${formData.phone || ''})\n` +
    `- Email nhận tài khoản: ${formData.email || ''}\n` +
    `Tôi gửi ảnh chụp chuyển khoản bên dưới, nhờ shop kiểm tra và gửi tài khoản kích hoạt cho tôi nhé!`;

  const zaloDirectUrl = `https://zalo.me/${BANK_INFO.HOTLINE_ZALO}?text=${encodeURIComponent(zaloPreFilledText)}`;
  const zaloGroupUrl = BANK_INFO.ZALO_GROUP;

  const handleConfirmPaid = async () => {
    setIsPaidConfirmed(true);
    window.scrollTo(0, 0);
    
    if (orderId) {
      try {
        await supabase.from('orders').update({ status: 'processing' }).eq('id', orderId);
      } catch (error) {
        console.error("Lỗi cập trạng thái đơn hàng:", error);
      }
    }

    if (typeof window !== 'undefined') {
      window.open(zaloDirectUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  // =========================================================================
  // MÀN HÌNH SAU KHI TẠO ĐƠN HÀNG THÀNH CÔNG (VIETQR + ZALO HANDOVER)
  // =========================================================================
  if (isSuccess) {
    const showQrView = paymentMethod === 'qr' && !isPaidConfirmed;

    return (
      <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-20 sm:py-24">
        <div className="max-w-xl w-full text-center space-y-6 animate-fade-in-up">
           
           {showQrView ? (
             /* GIAO DIỆN 1: QUÉT MÃ VIETQR & NHẮN ZALO */
             <div className="bg-white rounded-3xl shadow-xl border border-gray-200/80 overflow-hidden text-left">
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 sm:p-7 text-white text-center relative overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/20 shadow-inner">
                        <CreditCard size={28} strokeWidth={2.5} />
                    </div>
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider mb-2">
                        Đơn Hàng #{orderId.slice(0, 8).toUpperCase()}
                    </span>
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight">Thanh toán chuyển khoản VietQR</h1>
                    <p className="text-white/90 text-xs sm:text-sm mt-1 font-medium">
                        Quét mã bên dưới bằng App ngân hàng bất kỳ để hoàn tất
                    </p>
                </div>
                
                <div className="p-5 sm:p-7 space-y-5">
                    {/* 3 Bước nhận tài khoản siêu tốc */}
                    <div className="bg-blue-50/70 border border-blue-200/70 rounded-2xl p-3.5 sm:p-4 space-y-2.5">
                        <div className="flex items-center gap-1.5 text-blue-900 font-extrabold text-xs uppercase tracking-wider">
                            <Zap size={15} className="text-amber-500 fill-amber-500" />
                            <span>Quy trình nhận tài khoản siêu tốc:</span>
                        </div>
                        <div className="space-y-1.5 text-xs text-gray-700 font-medium">
                            <div className="flex items-start gap-2">
                                <span className="w-4.5 h-4.5 rounded-full bg-blue-600 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                                <span>Mở App ngân hàng quét mã QR (tự điền số tiền & nội dung chính xác).</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="w-4.5 h-4.5 rounded-full bg-blue-600 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                                <span>Chụp lại ảnh màn hình chuyển khoản thành công.</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="w-4.5 h-4.5 rounded-full bg-blue-600 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                                <span>Bấm nút <strong>"Tôi Đã Chuyển Khoản"</strong> để gửi bill qua Zalo nhận tài khoản ngay trong <strong>3 - 5 phút</strong>.</span>
                            </div>
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="text-center">
                        <div className="relative group w-fit mx-auto p-3 bg-white rounded-2xl border-2 border-gray-100 shadow-md">
                            <img 
                                src={qrUrl} 
                                alt="VietQR Payment" 
                                className="w-full max-w-[240px] sm:max-w-[270px] mx-auto rounded-xl"
                            />
                            <a 
                                href={qrUrl} 
                                download={`vietqr-${orderId.slice(0, 8)}.png`}
                                className="absolute bottom-4 right-4 bg-white/95 p-2 rounded-xl text-gray-700 hover:text-blue-600 shadow-md transition-all border border-gray-100 active:scale-95"
                                title="Tải mã QR"
                            >
                                <Download size={16} />
                            </a>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-2 font-medium">
                          * Hỗ trợ quét mã bằng tất cả ngân hàng (MB, VCB, TCB, ACB, BIDV, Agribank...)
                        </p>
                    </div>

                    {/* Bank Details Table */}
                    <div className="space-y-2.5 bg-gray-50/80 p-4 rounded-2xl border border-gray-200/70 text-xs sm:text-sm">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200/80">
                            <span className="text-gray-500 font-medium">Ngân hàng</span>
                            <span className="font-extrabold text-gray-900">MB BANK (Quân Đội)</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200/80">
                            <span className="text-gray-500 font-medium">Chủ tài khoản</span>
                            <span className="font-extrabold text-gray-900 uppercase">{BANK_INFO.ACCOUNT_NAME}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200/80">
                            <span className="text-gray-500 font-medium">Số tài khoản</span>
                            <div className="flex items-center gap-2">
                                <span className="font-black text-blue-600 text-base tracking-wider">{BANK_INFO.ACCOUNT_NO}</span>
                                <button 
                                  onClick={() => copyToClipboard(BANK_INFO.ACCOUNT_NO, 'account')} 
                                  className="p-1 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                  title="Sao chép"
                                >
                                  {copiedField === 'account' ? <Check size={16} className="text-emerald-600" /> : <Copy size={16}/>}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200/80">
                            <span className="text-gray-500 font-medium">Số tiền</span>
                            <div className="flex items-center gap-2">
                                <span className="font-black text-rose-600 text-base">{formattedTotal}</span>
                                <button 
                                  onClick={() => copyToClipboard(finalTotal.toString(), 'amount')} 
                                  className="p-1 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                  title="Sao chép"
                                >
                                  {copiedField === 'amount' ? <Check size={16} className="text-emerald-600" /> : <Copy size={16}/>}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 font-medium">Nội dung CK</span>
                            <div className="flex items-center gap-2">
                                <span className="font-extrabold text-gray-900 bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg text-xs font-mono">{transferContent}</span>
                                <button 
                                  onClick={() => copyToClipboard(transferContent, 'content')} 
                                  className="p-1 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                  title="Sao chép"
                                >
                                  {copiedField === 'content' ? <Check size={16} className="text-emerald-600" /> : <Copy size={16}/>}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* CONFIRMATION & ZALO BUTTONS */}
                    <div className="space-y-2.5 pt-1">
                        <button 
                            onClick={handleConfirmPaid}
                            className="w-full py-3.5 px-5 bg-gradient-to-r from-[#0068FF] to-[#0052cc] hover:from-[#0052cc] hover:to-[#0041a8] text-white font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
                        >
                            <MessageCircle size={20} />
                            <span>Tôi Đã Chuyển Khoản 👉 Nhắn Zalo Nhận Tài Khoản</span>
                        </button>
                        
                        <a 
                            href={zaloDirectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-4 bg-gray-50 hover:bg-blue-50 text-gray-800 hover:text-[#0068FF] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 border border-gray-200"
                        >
                            <Phone size={14} />
                            <span>Hotline / Zalo hỗ trợ: {BANK_INFO.HOTLINE_ZALO} (24/7)</span>
                        </a>
                    </div>
                 </div>
             </div>
           ) : (
             /* GIAO DIỆN 2: ĐÃ XÁC NHẬN CHUYỂN KHOẢN */
             <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200/80 text-center space-y-5">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 size={36} strokeWidth={2.5} />
                </div>
                <div>
                    <h2 className="text-xl sm:text-2xl font-black text-gray-900">Đã gửi yêu cầu nhận tài khoản!</h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Chuyên viên MuaToolAI đang đối soát và bàn giao thông tin đăng nhập trong vòng <strong>3 - 5 phút</strong> qua Zalo.
                    </p>
                </div>

                <div className="space-y-2.5">
                    <a 
                        href={zaloDirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-5 bg-[#0068FF] hover:bg-[#0052cc] text-white font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2.5 active:scale-95 transition-all text-center"
                    >
                        <MessageCircle size={20} />
                        <span>Mở Zalo Nhận Tài Khoản Ngay ({BANK_INFO.HOTLINE_ZALO})</span>
                    </a>

                    <a 
                        href={zaloGroupUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 bg-white border border-blue-200 text-[#0068FF] hover:bg-blue-50 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all text-center"
                    >
                        <span>Tham gia Nhóm Zalo Hỗ Trợ Khách Hàng VIP</span>
                        <ExternalLink size={14} />
                    </a>
                </div>

                {/* Tóm tắt đơn */}
                <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-200/70 text-left space-y-2 text-xs sm:text-sm">
                    <div className="font-extrabold text-gray-900 text-xs uppercase tracking-wider pb-1.5 border-b border-gray-200 flex justify-between items-center">
                        <span>Chi tiết đơn:</span>
                        <span className="text-blue-600 font-mono">#{orderId.slice(0, 8).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Sản phẩm:</span>
                        <span className="font-bold text-gray-900 text-right max-w-[65%] line-clamp-1">{itemsSummary}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Email nhận:</span>
                        <span className="font-bold text-gray-900">{formData.email}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Số điện thoại:</span>
                        <span className="font-bold text-gray-900">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 pt-1.5 border-t border-gray-200">
                        <span className="font-bold">Tổng thanh toán:</span>
                        <span className="font-black text-rose-600 text-sm sm:text-base">{formattedTotal}</span>
                    </div>
                </div>
             </div>
           )}
           
           {/* Navigation */}
           <div className="pt-1 flex items-center justify-center gap-3 max-w-sm mx-auto">
              <Link to="/order-lookup" className="flex-1 py-2.5 bg-gray-900 text-white font-bold text-xs rounded-xl shadow hover:bg-black transition-all text-center">
                 Tra cứu đơn hàng
              </Link>
              <Link to="/" className="flex-1 py-2.5 bg-white text-gray-700 font-bold text-xs rounded-xl border border-gray-200 hover:bg-gray-50 transition-all text-center">
                 Về trang chủ
              </Link>
           </div>
        </div>
      </main>
    );
  }

  // =========================================================================
  // MÀN HÌNH NHẬP THÔNG TIN THANH TOÁN (FORM CHECKOUT NÂNG CẤP)
  // =========================================================================
  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-32 lg:pb-16 pt-20 sm:pt-24">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Step Progress Bar */}
        <div className="flex items-center justify-between max-w-md mx-auto mb-5 px-2 text-[11px] sm:text-xs font-bold">
          <div className="flex items-center gap-1 text-emerald-600">
            <CheckCircle2 size={15} /> <span>Giỏ hàng</span>
          </div>
          <div className="w-8 sm:w-12 h-0.5 bg-emerald-500/30"></div>
          <div className="flex items-center gap-1 text-blue-600 font-black">
            <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">2</span>
            <span>Thanh toán</span>
          </div>
          <div className="w-8 sm:w-12 h-0.5 bg-gray-200"></div>
          <div className="flex items-center gap-1 text-gray-400">
            <span className="w-4 h-4 rounded-full bg-gray-200 text-gray-500 text-[10px] flex items-center justify-center">3</span>
            <span>Nhận tài khoản</span>
          </div>
        </div>

        {/* Top Header */}
        <div className="mb-4 sm:mb-6 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate(-1)} 
                className="w-9 h-9 rounded-full bg-white border border-gray-200/80 text-gray-600 hover:text-black shadow-sm flex items-center justify-center active:scale-95 transition-all"
                title="Quay lại"
              >
                 <ArrowLeft size={18} />
              </button>
              <div>
                 <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Thanh toán an toàn</h1>
                 <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
                    Kích hoạt nhanh trong 3 - 5 phút • Bảo mật thông tin tuyệt đối
                 </p>
              </div>
           </div>
           
           <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/80">
              <ShieldCheck size={14} /> Bảo hành 1-1
           </span>
        </div>

        {/* Mobile Quick Cart Preview Accordion */}
        <div className="lg:hidden mb-4 bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
           <button 
             type="button"
             onClick={() => setIsMobileCartOpen(!isMobileCartOpen)}
             className="w-full p-3.5 flex items-center justify-between text-left active:bg-gray-50 transition-colors"
           >
              <div className="flex items-center gap-2.5 min-w-0">
                 <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <ShoppingBag size={16} />
                 </div>
                 <div className="min-w-0">
                    <span className="text-xs font-bold text-gray-900 block truncate">
                       Đơn hàng ({cart.length} sản phẩm)
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium">
                       Bấm để xem chi tiết
                    </span>
                 </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                 <span className="text-sm font-black text-[#0068FF]">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
                 </span>
                 {isMobileCartOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </div>
           </button>

           {isMobileCartOpen && (
              <div className="px-3.5 pb-3.5 pt-1 border-t border-gray-100 space-y-2.5">
                 {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-2.5 py-1">
                       <img 
                         src={item.image} 
                         alt={item.name} 
                         className="w-10 h-10 rounded-lg object-cover border border-gray-100 bg-gray-50 shrink-0" 
                       />
                       <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-gray-900 truncate">{item.name}</h4>
                          <p className="text-[10px] text-gray-400">Số lượng: {item.quantity}</p>
                       </div>
                       <span className="text-xs font-bold text-gray-800 shrink-0">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                       </span>
                    </div>
                 ))}
                 <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>Phí kích hoạt & Hỗ trợ kỹ thuật</span>
                    <span className="text-emerald-600 font-bold">Miễn phí (0đ)</span>
                 </div>
              </div>
           )}
        </div>

        {/* Main Grid: Form Left, Summary Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8">
           
           {/* CỘT TRÁI: FORM THÔNG TIN & PHƯƠNG THỨC THANH TOÁN */}
           <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              
              {/* Khối 1: Thông tin khách hàng nhận tài khoản */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200/80">
                 <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm sm:text-base font-black text-gray-900 flex items-center gap-2">
                       <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-extrabold flex items-center justify-center text-xs">1</span>
                       Thông tin người nhận tài khoản
                    </h2>
                    <span className="text-[11px] text-gray-400 font-medium">Bắt buộc</span>
                 </div>

                 <form id="checkout-form" onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                       <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700 ml-1">Họ và tên</label>
                          <div className="relative">
                             <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                             <input 
                               type="text" 
                               name="name" 
                               required 
                               value={formData.name}
                               onChange={handleInputChange}
                               onBlur={handleBlur}
                               placeholder="Ví dụ: Nguyễn Văn A" 
                               className="w-full pl-9 pr-3.5 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-xs sm:text-sm font-medium outline-none" 
                             />
                          </div>
                       </div>

                       <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700 ml-1">Số điện thoại / Zalo</label>
                          <div className="relative">
                             <PhoneCall className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                             <input 
                               type="tel" 
                               name="phone" 
                               required 
                               value={formData.phone}
                               onChange={handleInputChange}
                               onBlur={handleBlur}
                               placeholder="0912... (Dùng nhận tài khoản qua Zalo)" 
                               className="w-full pl-9 pr-3.5 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-xs sm:text-sm font-medium outline-none" 
                             />
                          </div>
                       </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 ml-1">Email nhận thông tin & sao lưu</label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                            <input 
                              type="email" 
                              name="email" 
                              required 
                              autoComplete="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              placeholder="name@example.com (Dùng nâng cấp chính chủ hoặc gửi key)" 
                              className="w-full pl-9 pr-3.5 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-xs sm:text-sm font-medium outline-none" 
                            />
                        </div>
                        <p className="text-[11px] text-blue-700 bg-blue-50/70 px-2.5 py-1 rounded-lg mt-1 border border-blue-100 flex items-center gap-1.5 font-medium">
                            <Info size={13} className="shrink-0 text-blue-600" />
                            <span>Tài khoản và link kích hoạt sẽ được gửi ngay qua <strong>Zalo</strong> & sao lưu về <strong>Email</strong> này.</span>
                        </p>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 ml-1">Ghi chú thêm (Tùy chọn)</label>
                        <textarea 
                          name="note" 
                          rows={2}
                          value={formData.note}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="Ví dụ: Cần nâng cấp trên email cá nhân, hỗ trợ cài từ xa qua Ultraview..." 
                          className="w-full px-3.5 py-2 bg-gray-50/80 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-xs sm:text-sm font-medium outline-none resize-none" 
                        ></textarea>
                    </div>
                 </form>
              </div>

              {/* Khối 2: Chọn phương thức thanh toán (Gọn gàng & Hiện đại) */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200/80">
                 <div className="flex items-center justify-between mb-3.5">
                    <h2 className="text-sm sm:text-base font-black text-gray-900 flex items-center gap-2">
                       <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-extrabold flex items-center justify-center text-xs">2</span>
                       Chọn phương thức thanh toán
                    </h2>
                    <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                       Miễn phí giao dịch
                    </span>
                 </div>

                 <div className="space-y-2.5">
                    
                    {/* Option 1: QR Code Banking (Ưu tiên số 1 - Khuyên dùng) */}
                    <label className={`flex items-center gap-3 p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer ${
                       paymentMethod === 'qr' 
                         ? 'border-[#0068FF] bg-blue-50/50 ring-1 ring-[#0068FF]/30 shadow-sm' 
                         : 'border-gray-200/90 hover:border-gray-300 bg-white'
                    }`}>
                       <input 
                         type="radio" 
                         name="payment" 
                         value="qr" 
                         checked={paymentMethod === 'qr'} 
                         onChange={(e) => setPaymentMethod(e.target.value)} 
                         className="w-4 h-4 accent-[#0068FF] shrink-0" 
                       />
                       <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-gray-200 shadow-xs text-blue-600 overflow-hidden shrink-0">
                          <img 
                            src={`https://img.vietqr.io/image/${BANK_INFO.BANK_ID}-${BANK_INFO.ACCOUNT_NO}-compact.png`} 
                            className="w-full h-full object-cover p-0.5" 
                            alt="VietQR" 
                          />
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="font-black text-gray-900 text-xs sm:text-sm flex items-center gap-1.5 flex-wrap">
                             <span>Chuyển khoản Ngân hàng (VietQR)</span>
                             <span className="text-[10px] bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.2 rounded-md uppercase">
                                Khuyên dùng
                             </span>
                          </div>
                          <div className="text-[11px] text-gray-500 mt-0.5 line-clamp-1 font-medium">
                             Quét mã QR tự điền số tiền & nội dung • Kích hoạt qua Zalo 3-5 phút
                          </div>
                       </div>
                    </label>

                    {/* Option 2: Momo */}
                    <label className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                       paymentMethod === 'momo' 
                         ? 'border-[#A50064] bg-pink-50/50 ring-1 ring-[#A50064]/30 shadow-sm' 
                         : 'border-gray-200/90 hover:border-gray-300 bg-white'
                    }`}>
                       <input 
                         type="radio" 
                         name="payment" 
                         value="momo" 
                         checked={paymentMethod === 'momo'} 
                         onChange={(e) => setPaymentMethod(e.target.value)} 
                         className="w-4 h-4 accent-[#A50064] shrink-0" 
                       />
                       <div className="w-10 h-10 rounded-lg bg-[#A50064] flex items-center justify-center shadow-xs text-white font-black text-[11px] shrink-0">
                          MoMo
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="font-bold text-gray-900 text-xs sm:text-sm">Ví điện tử MoMo</div>
                          <div className="text-[11px] text-gray-500 font-medium">Quét mã chuyển tiền qua App MoMo tiện lợi</div>
                       </div>
                    </label>

                    {/* Option 3: Visa/Master */}
                    <label className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                       paymentMethod === 'card' 
                         ? 'border-gray-900 bg-gray-50 ring-1 ring-gray-900/20 shadow-sm' 
                         : 'border-gray-200/90 hover:border-gray-300 bg-white'
                    }`}>
                       <input 
                         type="radio" 
                         name="payment" 
                         value="card" 
                         checked={paymentMethod === 'card'} 
                         onChange={(e) => setPaymentMethod(e.target.value)} 
                         className="w-4 h-4 accent-black shrink-0" 
                       />
                       <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center shadow-xs text-white shrink-0">
                          <CreditCard size={18} />
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="font-bold text-gray-900 text-xs sm:text-sm">Thẻ quốc tế (Visa / Mastercard)</div>
                          <div className="text-[11px] text-gray-500 font-medium">Hỗ trợ tư vấn và thanh toán trực tiếp qua Zalo</div>
                       </div>
                    </label>

                 </div>
              </div>

           </div>

           {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG (DESKTOP STICKY & SUMMARY) */}
           <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200/80 sticky top-24 space-y-4 sm:space-y-5">
                 <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h2 className="text-sm sm:text-base font-black text-gray-900 flex items-center gap-2">
                       <Package size={18} className="text-blue-600" /> 
                       <span>Tóm tắt đơn hàng ({cart.length})</span>
                    </h2>
                    <span className="text-[11px] font-bold text-gray-400">
                       {cart.reduce((total, i) => total + i.quantity, 0)} gói
                    </span>
                 </div>
                 
                 {/* Product List */}
                 <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
                    {cart.map((item) => (
                       <div key={item.id} className="flex gap-2.5 items-center">
                          <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0 shadow-xs">
                             <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                             <div className="font-bold text-gray-900 text-xs sm:text-sm truncate">{item.name}</div>
                             <div className="text-[11px] text-gray-500">Số lượng: {item.quantity}</div>
                          </div>
                          <div className="font-black text-gray-900 text-xs sm:text-sm shrink-0">
                             {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                          </div>
                       </div>
                    ))}
                 </div>

                 {/* Price Breakdown */}
                 <div className="border-t border-gray-100 pt-3 space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between text-gray-500 font-medium">
                       <span>Tạm tính</span>
                       <span className="font-bold text-gray-700">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-medium">
                       <span>Phí kích hoạt & Bảo hành 1-1</span>
                       <span className="text-emerald-600 font-bold">Miễn phí (0đ)</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base font-black text-gray-900 pt-2 border-t border-dashed border-gray-200">
                       <span>Tổng thanh toán</span>
                       <span className="text-xl sm:text-2xl font-black text-[#0068FF]">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
                       </span>
                    </div>
                 </div>

                 {/* Desktop Submit Button */}
                 <div className="hidden lg:block pt-1">
                    <button 
                       form="checkout-form"
                       type="submit"
                       disabled={isProcessing}
                       className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm sm:text-base rounded-xl shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                       {isProcessing ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                       ) : (
                          <>
                            <span>Tiến hành chuyển khoản & Nhận key</span>
                            <ArrowRight size={17} />
                          </>
                       )}
                    </button>
                 </div>

                 {/* Trust Assurance */}
                 <div className="pt-2 border-t border-gray-100 space-y-1.5">
                    <div className="flex items-center gap-2 text-[11px] text-gray-600 font-medium">
                       <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                       <span>Bảo hành 1-1 toàn thời gian sử dụng</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-600 font-medium">
                       <Zap size={14} className="text-amber-500 shrink-0" />
                       <span>Bàn giao tài khoản trong 3 - 5 phút qua Zalo</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                       <Lock size={13} className="text-gray-400 shrink-0" />
                       <span>Bảo mật thông tin khách hàng tuyệt đối</span>
                    </div>
                 </div>
              </div>
           </div>

        </div>

        {/* Mobile Sticky Bottom Action Bar */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200/90 shadow-[0_-8px_30px_rgba(0,0,0,0.1)] px-4 py-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
           <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
              <div className="min-w-0">
                 <div className="text-[10px] uppercase font-bold text-gray-500">Tổng thanh toán</div>
                 <div className="text-base sm:text-lg font-black text-[#0068FF] leading-tight">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
                 </div>
              </div>

              <button
                 form="checkout-form"
                 type="submit"
                 disabled={isProcessing}
                 className="h-11 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 active:scale-95 transition-all shrink-0"
              >
                 {isProcessing ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                 ) : (
                    <>
                       <span>Tiếp tục thanh toán</span>
                       <ArrowRight size={15} />
                    </>
                 )}
              </button>
           </div>
        </div>

      </div>
    </main>
  );
};
