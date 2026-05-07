import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { PromotionBanner } from '../../types';

const initialFormState: PromotionBanner = {
  id: '',
  title: '',
  subtitle: '',
  badge: 'Khuyến mãi',
  image: '',
  coverImage: '',
  ctaText: 'Khám phá ngay',
  ctaLink: '/products',
  order: 1,
  isActive: true,
  textColor: 'white',
  background: 'from-red-600 to-orange-600'
};

const BACKGROUND_OPTIONS = [
  { label: 'Đỏ cam', value: 'from-red-600 to-orange-600' },
  { label: 'Xanh dương', value: 'from-blue-600 to-cyan-500' },
  { label: 'Tím hồng', value: 'from-violet-600 to-fuchsia-500' },
  { label: 'Đen premium', value: 'from-gray-950 to-gray-700' },
  { label: 'Xanh lá', value: 'from-emerald-600 to-lime-500' }
];

export const AdminPromoBanners: React.FC = () => {
  const [banners, setBanners] = useState<PromotionBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PromotionBanner>(initialFormState);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const fetchBanners = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('promotion_banners')
      .select('*')
      .order('order', { ascending: true });

    if (!error && data) setBanners(data as PromotionBanner[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleAddNew = () => {
    setIsEditing(false);
    setFormData({ ...initialFormState, id: crypto.randomUUID(), order: banners.length + 1 });
    setIsModalOpen(true);
  };

  const handleEdit = (banner: PromotionBanner) => {
    setIsEditing(true);
    setFormData(banner);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa banner khuyến mãi này không?')) return;
    setBanners((prev) => prev.filter((item) => item.id !== id));
    const { error } = await supabase.from('promotion_banners').delete().eq('id', id);
    if (error) {
      console.error(error);
      fetchBanners();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: formData.title || '',
      subtitle: formData.subtitle || '',
      badge: formData.badge || 'Khuyến mãi',
      image: formData.image,
      coverImage: formData.coverImage || '',
      ctaText: formData.ctaText || '',
      ctaLink: formData.ctaLink || '/products',
      order: Number(formData.order) || 1,
      isActive: formData.isActive,
      textColor: formData.textColor || 'white',
      background: formData.background || 'from-red-600 to-orange-600'
    };

    setIsModalOpen(false);

    if (isEditing) {
      setBanners((prev) => prev.map((item) => item.id === formData.id ? { ...formData, ...payload } : item));
      const { error } = await supabase.from('promotion_banners').update(payload).eq('id', formData.id);
      if (error) console.error(error);
    } else {
      const tempBanner = { ...formData, ...payload };
      setBanners((prev) => [...prev, tempBanner]);
      const { error } = await supabase.from('promotion_banners').insert([payload]);
      if (error) console.error(error);
      fetchBanners();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const value = target instanceof HTMLInputElement && target.type === 'checkbox'
      ? target.checked
      : target.type === 'number'
        ? Number(target.value)
        : target.value;

    setFormData((prev) => ({ ...prev, [target.name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'coverImage') => {
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      
      const setUploading = field === 'image' ? setUploadingImage : setUploadingCover;
      setUploading(true);
      try {
          const fileExt = file.name.split('.').pop();
          const fileName = `promo_${field}_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
          const filePath = `banners/${fileName}`;

          const { error: uploadError } = await supabase.storage
              .from('media')
              .upload(filePath, file);

          if (uploadError) {
              throw uploadError;
          }

          const { data } = supabase.storage.from('media').getPublicUrl(filePath);
          
          setFormData(prev => ({ ...prev, [field]: data.publicUrl }));
      } catch (error: any) {
          alert('Lỗi upload ảnh: ' + (error.message || 'Kiểm tra lại quyền Storage Supabase'));
      } finally {
          setUploading(false);
      }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Banner khuyến mãi</h1>
          <p className="text-sm text-gray-500">Quản lý bộ ảnh cuộn tại khu khuyến mãi trên trang chủ.</p>
        </div>
        <button onClick={handleAddNew} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-red-500/20 hover:bg-primary-hover transition-all hover:scale-105">
          <Plus size={20} /> Thêm banner
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          [1, 2].map((i) => <div key={i} className="h-72 bg-gray-100 rounded-[2rem] animate-pulse" />)
        ) : banners.length === 0 ? (
          <div className="lg:col-span-2 bg-white rounded-[2rem] p-10 text-center border border-dashed border-gray-200">
            <ImageIcon className="mx-auto text-gray-300 mb-3" size={42} />
            <p className="font-bold text-gray-700">Chưa có banner khuyến mãi nào.</p>
            <p className="text-sm text-gray-400 mt-1">Bấm “Thêm banner” để tạo ảnh cuộn đầu tiên.</p>
          </div>
        ) : banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 group">
            <div className="relative aspect-[3/1] bg-gray-900 text-white overflow-hidden">
              <img src={banner.image} alt={banner.title || 'Banner'} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              <div className="relative z-10 h-full p-6 flex flex-col justify-center">
                 <div className="max-w-[70%]">
                    <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase mb-3">{banner.badge || 'Khuyến mãi'}</span>
                    <h3 className="text-2xl font-black leading-tight line-clamp-2 drop-shadow-lg">{banner.title || 'Không có tiêu đề'}</h3>
                    <p className="text-sm text-white/90 mt-2 line-clamp-1 drop-shadow-md">{banner.subtitle}</p>
                 </div>
              </div>
            </div>
            <div className="p-5 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">Link: {banner.ctaLink}</p>
                <p className="text-xs text-gray-400 mt-1">Thứ tự: {banner.order}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${banner.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {banner.isActive ? 'Đang hiện' : 'Đang ẩn'}
              </div>
              <button onClick={() => handleEdit(banner)} className="p-2 text-gray-400 hover:text-primary hover:bg-red-50 rounded-xl transition-all"><Edit size={18} /></button>
              <button onClick={() => handleDelete(banner.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white rounded-[2rem] w-full max-w-3xl max-h-[92vh] overflow-y-auto relative z-10 shadow-2xl animate-fade-in-up">
            <div className="px-6 sm:px-8 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-xl font-extrabold text-gray-900">{isEditing ? 'Sửa banner khuyến mãi' : 'Thêm banner khuyến mãi'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={24} className="text-gray-400 hover:text-gray-900" /></button>
            </div>

            <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tiêu đề</label>
                  <input name="title" value={formData.title || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold" placeholder="Adobe Creative Cloud" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nhãn nhỏ</label>
                  <input name="badge" value={formData.badge || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold" placeholder="Tháng vàng ưu đãi" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Mô tả</label>
                <textarea name="subtitle" value={formData.subtitle || ''} onChange={handleChange} rows={2} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium" placeholder="Giảm tới 70% trọn bộ bản quyền." />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Ảnh Banner (Khuyên dùng tỷ lệ 3:1) *</label>
                <div className="relative mb-2">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input name="image" required value={formData.image} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Dán URL ảnh hoặc tải lên..." />
                </div>
                <div className="relative">
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'image')} disabled={uploadingImage} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10" />
                  <div className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 font-medium ${uploadingImage ? 'opacity-50' : 'hover:border-primary hover:text-primary hover:bg-blue-50 transition-colors'}`}>
                    <ImageIcon size={20} />
                    {uploadingImage ? 'Đang tải lên...' : 'Bấm vào đây để tải ảnh banner từ máy tính lên'}
                  </div>
                </div>
                {formData.image && (
                  <div className="mt-2 w-24 h-24 rounded-xl border border-gray-200 bg-gray-100 overflow-hidden">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nút CTA</label>
                  <input name="ctaText" value={formData.ctaText || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold" placeholder="Khám phá ngay" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Link chuyển hướng *</label>
                  <input name="ctaLink" required value={formData.ctaLink} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium" placeholder="/products" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Thứ tự</label>
                  <input type="number" name="order" min="1" value={formData.order} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <label className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mt-7 cursor-pointer">
                  <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-5 h-5 rounded text-primary focus:ring-primary" />
                  {formData.isActive ? <Eye size={18} className="text-green-600" /> : <EyeOff size={18} className="text-gray-400" />}
                  <span className="font-bold text-gray-700">Hiển thị banner</span>
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200">Hủy</button>
                <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-red-500/20 hover:bg-primary-hover flex items-center justify-center gap-2">
                  <Save size={18} /> Lưu banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
