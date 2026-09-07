
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { CartItem } from '../types';
import { supabase } from '../lib/supabase';
import { 
  ArrowLeft, ShieldCheck, CreditCard, Lock, CheckCircle, Package, 
  Copy, Download, Mail, Info, MessageCircle, ExternalLink, Phone, Check, ArrowRight, Zap 
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
  const [isPaidConfirmed, setIsPaidConfirmed] = useState(false); // Đã bấm xác nhận thanh toán để nhận qua Zalo
  const [orderId, setOrderId] = useState('');
  const [finalTotal, setFinalTotal] = useState(0);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]); // Lưu lại danh sách sản phẩm sau khi clear cart
  const [copiedField, setCopiedField] = useState<string | null>(null);

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

  // Soạn sẵn nội dung tin nhắn Zalo đầy đủ để khách chỉ cần ấn gửi
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

    // Tự động mở tab Zalo để khách nhắn tin gửi bill nhận tài khoản
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
  // MÀN HÌNH SAU KHI TẠO ĐƠN HÀNG THÀNH CÔNG
  // =========================================================================
  if (isSuccess) {
    const showQrView = paymentMethod === 'qr' && !isPaidConfirmed;

    return (
      <main className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-4 py-16">
        <div className="max-w-xl w-full text-center space-y-8 animate-fade-in-up">
           
           {showQrView ? (
             /* -------------------------------------------------------------
                GIAO DIỆN 1: QUÉT MÃ VIETQR & HƯỚNG DẪN NHẮN ZALO
             ------------------------------------------------------------- */
             <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden text-left">
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 sm:p-8 text-white text-center relative overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/20 shadow-inner">
                        <CreditCard size={32} strokeWidth={2.5} />
                    </div>
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider mb-2">
                        Đơn Hàng #{orderId.slice(0, 8).toUpperCase()}
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Thanh toán chuyển khoản VietQR</h1>
                    <p className="text-white/85 text-xs sm:text-sm mt-1.5 font-medium">
                        Quét mã bên dưới bằng ứng dụng ngân hàng bất kỳ để hoàn tất.
                    </p>
                </div>
                
                <div className="p-6 sm:p-8 space-y-6">
                    {/* 3 Bước nhận tài khoản qua Zalo */}
                    <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
                        <div className="flex items-center gap-2 text-blue-900 font-extrabold text-xs uppercase tracking-wider">
                            <Zap size={16} className="text-yellow-500 fill-yellow-500" />
                            <span>Quy trình 3 bước nhận tài khoản siêu tốc:</span>
                        </div>
                        <div className="space-y-2 text-xs text-gray-700 font-medium">
                            <div className="flex items-start gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                                <span>Mở App ngân hàng quét mã QR (số tiền & nội dung tự động điền chính xác).</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                                <span>Chụp lại ảnh màn hình thông báo chuyển khoản thành công.</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                                <span>Bấm nút <strong>"Tôi Đã Chuyển Khoản"</strong> bên dưới để gửi bill qua Zalo nhận tài khoản ngay trong <strong>3 - 5 phút</strong>.</span>
                            </div>
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="text-center">
                        <div className="relative group w-fit mx-auto p-3 bg-white rounded-2xl border-2 border-gray-100 shadow-lg">
                            <img 
                                src={qrUrl} 
                                alt="VietQR Payment" 
                                className="w-full max-w-[260px] sm:max-w-[290px] mx-auto rounded-xl"
                            />
                            <a 
                                href={qrUrl} 
                                download={`vietqr-${orderId.slice(0, 8)}.png`}
                                className="absolute bottom-5 right-5 bg-white/95 p-2.5 rounded-xl text-gray-700 hover:text-blue-600 shadow-md transition-all border border-gray-100 active:scale-95"
                                title="Tải mã QR"
                            >
                                <Download size={18} />
                            </a>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-2 italic">
                            * Hỗ trợ tất cả ngân hàng: Vietcombank, Techcombank, MBBank, VPBank, ACB, BIDV, Agribank...
                        </p>
                    </div>

                    {/* Bank Details Table with One-Click Copy */}
                    <div className="space-y-3 bg-gray-50 p-5 rounded-2xl border border-gray-100 text-xs sm:text-sm">
                        <div className="flex justify-between items-center pb-2.5 border-b border-gray-200">
                            <span className="text-gray-500">Ngân hàng</span>
                            <span className="font-extrabold text-gray-900">MB BANK (Quân Đội)</span>
                        </div>
                        <div className="flex justify-between items-center pb-2.5 border-b border-gray-200">
                            <span className="text-gray-500">Chủ tài khoản</span>
                            <span className="font-extrabold text-gray-900 uppercase">{BANK_INFO.ACCOUNT_NAME}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2.5 border-b border-gray-200">
                            <span className="text-gray-500">Số tài khoản</span>
                            <div className="flex items-center gap-2">
                                <span className="font-black text-blue-600 text-base tracking-wider">{BANK_INFO.ACCOUNT_NO}</span>
                                <button 
                                  onClick={() => copyToClipboard(BANK_INFO.ACCOUNT_NO, 'account')} 
                                  className="p-1 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                  title="Sao chép"
                                >
                                  {copiedField === 'account' ? <Check size={16} className="text-green-600" /> : <Copy size={16}/>}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pb-2.5 border-b border-gray-200">
                            <span className="text-gray-500">Số tiền</span>
                            <div className="flex items-center gap-2">
                                <span className="font-black text-red-600 text-base">{formattedTotal}</span>
                                <button 
                                  onClick={() => copyToClipboard(finalTotal.toString(), 'amount')} 
                                  className="p-1 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                  title="Sao chép"
                                >
                                  {copiedField === 'amount' ? <Check size={16} className="text-green-600" /> : <Copy size={16}/>}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">Nội dung CK</span>
                            <div className="flex items-center gap-2">
                                <span className="font-extrabold text-gray-900 bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg text-xs font-mono">{transferContent}</span>
                                <button 
                                  onClick={() => copyToClipboard(transferContent, 'content')} 
                                  className="p-1 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                  title="Sao chép"
                                >
                                  {copiedField === 'content' ? <Check size={16} className="text-green-600" /> : <Copy size={16}/>}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* CONFIRMATION & ZALO BUTTONS */}
                    <div className="space-y-3 pt-2">
                        <button 
                            onClick={handleConfirmPaid}
                            className="w-full py-4 px-6 bg-gradient-to-r from-[#0068FF] to-[#0052cc] hover:from-[#0052cc] hover:to-[#0041a8] text-white font-black text-base sm:text-lg rounded-2xl shadow-xl shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3 animate-pulse"
                        >
                            <MessageCircle size={24} />
                            <span>Tôi Đã Chuyển Khoản 👉 Nhắn Zalo Nhận Tài Khoản</span>
                        </button>
                        
                        <a 
                            href={zaloDirectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 px-4 bg-gray-50 hover:bg-blue-50 text-gray-800 hover:text-[#0068FF] font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 border border-gray-200"
                        >
                            <Phone size={15} />
                            <span>Hoặc gọi/chat Zalo trực tiếp: {BANK_INFO.HOTLINE_ZALO} (24/7)</span>
                        </a>

                        <p className="text-[11px] text-gray-400 text-center italic">
                            * Sau khi bấm nút, hệ thống sẽ tự động mở Zalo và điền sẵn thông tin đơn hàng giúp bạn gửi bill nhanh chóng.
                        </p>
                    </div>
                </div>
             </div>
           ) : (
             /* -------------------------------------------------------------
                GIAO DIỆN 2: ĐÃ XÁC NHẬN CHUYỂN KHOẢN - BƯỚC NHẬN TÀI KHOẢN QUA ZALO
             ------------------------------------------------------------- */
             <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-6 sm:p-10 space-y-7 text-center">
                {/* Animated Green Badge */}
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle size={44} strokeWidth={2.5} className="animate-bounce" />
                </div>
                
                <div>
                    <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-black uppercase tracking-wider mb-2">
                        Đã ghi nhận chuyển khoản đơn hàng
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                        Đơn Hàng #{orderId.slice(0, 8).toUpperCase()}
                    </h1>
                    <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
                        Cảm ơn bạn <strong>{formData.name}</strong> đã ủng hộ MuaToolAI! Hệ thống đã ghi nhận thông tin đơn hàng thành công.
                    </p>
                </div>

                {/* ZALO HANDOVER CALL-TO-ACTION CARD */}
                <div className="bg-gradient-to-b from-blue-50 to-indigo-50/70 border-2 border-blue-200 rounded-3xl p-6 sm:p-7 text-left space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></span>
                            <span className="text-xs font-black uppercase tracking-wider text-blue-900">Kỹ thuật viên đang trực 24/7</span>
                        </div>
                        <span className="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-full border border-blue-100 shadow-sm">
                            Bàn giao: 3 - 5 phút
                        </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-gray-900 leading-snug">
                        Nhắn tin Zalo để nhận tài khoản & link kích hoạt ngay:
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                        Bạn vui lòng gửi ảnh chụp màn hình chuyển khoản qua Zalo cho shop. Tin nhắn đã được chuẩn bị sẵn mã đơn hàng và gói bạn vừa mua, chỉ cần nhấn gửi!
                    </p>

                    {/* Nút lớn mở Zalo */}
                    <a 
                        href={zaloDirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 px-6 bg-[#0068FF] hover:bg-[#0052cc] text-white font-black text-base sm:text-lg rounded-2xl shadow-xl shadow-blue-500/30 flex items-center justify-center gap-3 active:scale-95 transition-all group text-center"
                    >
                        <MessageCircle size={26} className="group-hover:scale-110 transition-transform" />
                        <span>Mở Zalo Nhận Tài Khoản Ngay ({BANK_INFO.HOTLINE_ZALO})</span>
                    </a>

                    {/* Nút nhóm Zalo cộng đồng VIP */}
                    <a 
                        href={zaloGroupUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 bg-white border border-blue-200 text-[#0068FF] hover:bg-blue-50 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all text-center"
                    >
                        <span>Hoặc tham gia Nhóm Zalo Hỗ Trợ Khách Hàng VIP</span>
                        <ExternalLink size={16} />
                    </a>
                </div>

                {/* Tóm tắt chi tiết đơn hàng */}
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-left space-y-2.5 text-xs sm:text-sm">
                    <div className="font-extrabold text-gray-900 text-xs uppercase tracking-wider pb-2 border-b border-gray-200 flex justify-between items-center">
                        <span>Chi tiết đơn đặt hàng:</span>
                        <span className="text-blue-600 font-mono">#{orderId.slice(0, 8).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Sản phẩm:</span>
                        <span className="font-bold text-gray-900 text-right max-w-[65%] line-clamp-2">{itemsSummary}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Email nhận tài khoản:</span>
                        <span className="font-bold text-gray-900">{formData.email}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Số điện thoại:</span>
                        <span className="font-bold text-gray-900">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 pt-2 border-t border-gray-200">
                        <span className="font-bold">Tổng thanh toán:</span>
                        <span className="font-black text-red-600 text-base">{formattedTotal}</span>
                    </div>
                </div>

                {/* Cam kết dịch vụ */}
                <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <span className="block font-black text-blue-600 text-xs sm:text-sm">3 - 5 Phút</span>
                        <span className="text-[10px] text-gray-500 font-medium">Bàn giao siêu tốc</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <span className="block font-black text-emerald-600 text-xs sm:text-sm">Bảo Hành 1-1</span>
                        <span className="text-[10px] text-gray-500 font-medium">Trọn đời sử dụng</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <span className="block font-black text-purple-600 text-xs sm:text-sm">Ultraview 24/7</span>
                        <span className="text-[10px] text-gray-500 font-medium">Hỗ trợ cài từ xa</span>
                    </div>
                </div>
             </div>
           )}
           
           {/* Navigation Buttons */}
           <div className="pt-2 space-y-3 max-w-sm mx-auto">
              <Link to="/order-lookup" className="block w-full py-3.5 bg-gray-900 text-white font-bold text-sm rounded-xl shadow-lg hover:bg-black transition-all">
                 Tra cứu tình trạng đơn hàng
              </Link>
              <Link to="/" className="block w-full py-3 bg-white text-gray-700 font-bold text-sm rounded-xl border border-gray-200 hover:bg-gray-50 transition-all">
                 Về trang chủ
              </Link>
           </div>
        </div>
      </main>
    );
  }

  // =========================================================================
  // MÀN HÌNH NHẬP THÔNG TIN THANH TOÁN (FORM CHECKOUT)
  // =========================================================================
  return (
    <main className="min-h-screen bg-[#F5F5F7] pb-20 pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
           <button onClick={() => navigate(-1)} className="p-2.5 bg-white rounded-full text-gray-500 hover:text-black shadow-sm transition-all">
              <ArrowLeft size={20} />
           </button>
           <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Thanh toán an toàn</h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                 Nhập thông tin nhận tài khoản và chọn phương thức chuyển khoản
              </p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* CỘT TRÁI: FORM THÔNG TIN & PHƯƠNG THỨC THANH TOÁN */}
           <div className="lg:col-span-7 space-y-6">
              
              {/* Khối 1: Thông tin khách hàng */}
              <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100">
                 <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-extrabold flex items-center justify-center text-sm">1</span>
                    Thông tin nhận tài khoản / key
                 </h2>
                 <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700 ml-1">Họ và tên của bạn</label>
                          <input 
                            type="text" 
                            name="name" 
                            required 
                            value={formData.name}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            placeholder="Nguyễn Văn A" 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium outline-none" 
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700 ml-1">Số điện thoại / Zalo</label>
                          <input 
                            type="tel" 
                            name="phone" 
                            required 
                            value={formData.phone}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            placeholder="0912... (Dùng nhận tài khoản qua Zalo)" 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium outline-none" 
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Email nhận tài khoản / bản quyền</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                              type="email" 
                              name="email" 
                              required 
                              autoComplete="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              placeholder="name@example.com (Dùng nâng cấp chính chủ hoặc gửi key)" 
                              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium outline-none" 
                            />
                        </div>
                        <div className="flex items-start gap-2 bg-blue-50/80 p-3 rounded-xl border border-blue-100 mt-1">
                            <Info size={16} className="text-blue-600 mt-0.5 shrink-0" />
                            <p className="text-xs text-blue-800 font-medium leading-relaxed">
                                Lưu ý: Thông tin đăng nhập và link kích hoạt sẽ được bàn giao trực tiếp qua <strong>Zalo</strong> và gửi sao lưu về <strong>Email</strong> này.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Ghi chú thêm (Tùy chọn)</label>
                        <textarea 
                          name="note" 
                          rows={2}
                          value={formData.note}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="Ví dụ: Cần nâng cấp trên email chính chủ, cài đặt từ xa Ultraview..." 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium outline-none resize-none" 
                        ></textarea>
                    </div>
                 </form>
              </div>

              {/* Khối 2: Chọn phương thức thanh toán */}
              <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100">
                 <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-extrabold flex items-center justify-center text-sm">2</span>
                    Chọn phương thức thanh toán
                 </h2>
                 <div className="space-y-3">
                    
                    {/* QR Code Banking (Ưu tiên số 1) */}
                    <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'qr' ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-gray-100 hover:border-gray-200'}`}>
                       <input type="radio" name="payment" value="qr" checked={paymentMethod === 'qr'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-blue-600" />
                       <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-gray-200 shadow-sm text-blue-600 overflow-hidden shrink-0">
                          <img src={`https://img.vietqr.io/image/${BANK_INFO.BANK_ID}-${BANK_INFO.ACCOUNT_NO}-compact.png`} className="w-full h-full object-cover p-1" alt="VietQR" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="font-extrabold text-gray-900 text-sm sm:text-base flex items-center gap-2 flex-wrap">
                             <span>Chuyển khoản Ngân hàng (VietQR)</span>
                             <span className="text-[10px] bg-emerald-100 text-emerald-700 font-black px-2 py-0.5 rounded-full uppercase">Khuyên Dùng</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                             Quét mã QR tự điền số tiền & nội dung • Nhận tài khoản qua Zalo siêu tốc trong 3-5 phút
                          </div>
                       </div>
                    </label>

                    {/* Momo */}
                    <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'momo' ? 'border-[#A50064] bg-pink-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                       <input type="radio" name="payment" value="momo" checked={paymentMethod === 'momo'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-[#A50064]" />
                       <div className="w-12 h-12 rounded-xl bg-[#A50064] flex items-center justify-center shadow-sm text-white font-black text-xs shrink-0">
                          MoMo
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="font-extrabold text-gray-900 text-sm sm:text-base">Ví điện tử MoMo</div>
                          <div className="text-xs text-gray-500 mt-0.5">Quét mã chuyển tiền qua App MoMo tiện lợi</div>
                       </div>
                    </label>

                    {/* Visa/Master */}
                    <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-gray-900 bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}>
                       <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-black" />
                       <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center shadow-sm text-white shrink-0">
                          <CreditCard size={22} />
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="font-extrabold text-gray-900 text-sm sm:text-base">Thẻ quốc tế (Visa / Mastercard)</div>
                          <div className="text-xs text-gray-500 mt-0.5">Thanh toán an toàn, bảo mật tiêu chuẩn quốc tế</div>
                       </div>
                    </label>

                 </div>
              </div>

           </div>

           {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
           <div className="lg:col-span-5">
              <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 sticky top-28 space-y-6">
                 <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Package size={20} className="text-blue-600" /> 
                    <span>Tóm tắt đơn hàng ({cart.length})</span>
                 </h2>
                 
                 <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
                    {cart.map((item) => (
                       <div key={item.id} className="flex gap-3 items-center">
                          <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0 shadow-sm">
                             <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                             <div className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</div>
                             <div className="text-xs text-gray-500 mt-0.5">Số lượng: {item.quantity}</div>
                          </div>
                          <div className="font-black text-gray-900 text-sm shrink-0">
                             {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                          </div>
                       </div>
                    ))}
                 </div>

                 <div className="border-t border-gray-100 pt-4 space-y-2.5">
                    <div className="flex justify-between text-sm text-gray-500">
                       <span>Tạm tính</span>
                       <span className="font-medium">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                       <span>Phí kích hoạt & bảo hành</span>
                       <span className="text-emerald-600 font-bold">Miễn phí (0đ)</span>
                    </div>
                    <div className="flex justify-between text-lg font-black text-gray-900 pt-2 border-t border-dashed border-gray-200">
                       <span>Tổng thanh toán</span>
                       <span className="text-2xl font-black text-blue-600">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
                       </span>
                    </div>
                 </div>

                 {/* Nút Submit Tạo Đơn */}
                 <button 
                    form="checkout-form"
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-base rounded-2xl shadow-xl shadow-blue-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                 >
                    {isProcessing ? (
                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                       <>
                         <span>Tiến hành chuyển khoản & Nhận tài khoản</span>
                         <ArrowRight size={18} />
                       </>
                    )}
                 </button>

                 {/* Badges Cam kết */}
                 <div className="pt-2 border-t border-gray-100 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                       <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                       <span>Bảo hành 1-1 trọn đời toàn thời gian sử dụng</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                       <MessageCircle size={16} className="text-blue-500 shrink-0" />
                       <span>Kỹ thuật viên hỗ trợ bàn giao qua Zalo trong 3 - 5 phút</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium pt-1">
                       <Lock size={14} className="shrink-0" />
                       <span>Thanh toán an toàn, bảo mật thông tin tuyệt đối</span>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </main>
  );
};
