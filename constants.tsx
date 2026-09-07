
import { 
  Monitor, 
  Gamepad2, 
  Briefcase, 
  ShieldCheck, 
  Cloud, 
  GraduationCap, 
  Film, 
  Music,
  Bot
} from 'lucide-react';
import { Category, Product, BlogPost, HeroSlide } from './types';
import { ALL_BLOG_POSTS } from './data/allBlogs';

export const CATEGORIES: Category[] = [
  { id: 'ai', name: 'AI Tools', icon: Bot },
  { id: 'entertainment', name: 'Giải trí', icon: Film },
  { id: 'work', name: 'Làm việc', icon: Briefcase },
  { id: 'design', name: 'Thiết kế', icon: Monitor },
  { id: 'security', name: 'Bảo mật', icon: ShieldCheck },
  { id: 'education', name: 'Học tập', icon: GraduationCap },
  { id: 'game', name: 'Game', icon: Gamepad2 },
  { id: 'music', name: 'Nghe nhạc', icon: Music },
  { id: 'cloud', name: 'Lưu trữ', icon: Cloud },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: '1',
    title: 'Unlock the Power of GPT-4o',
    subtitle: 'Experience the next generation of AI. Smarter, faster, and more creative than ever before.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&auto=format&fit=crop&q=80',
    ctaText: 'Get Started',
    ctaLink: '/product/3',
    order: 1,
    isActive: true,
    textColor: 'white'
  },
  {
    id: '2',
    title: 'Adobe Creative Cloud All Apps',
    subtitle: 'Everything you need to create anything you can imagine. Now 70% off.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799312c95d?w=1600&auto=format&fit=crop&q=80',
    ctaText: 'Buy Now',
    ctaLink: '/product/5',
    order: 2,
    isActive: true,
    textColor: 'white'
  },
  {
    id: '3',
    title: 'Netflix Premium 4K HDR',
    subtitle: 'Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1600&auto=format&fit=crop&q=80',
    ctaText: 'Upgrade Now',
    ctaLink: '/product/1',
    order: 3,
    isActive: true,
    textColor: 'white'
  }
];

export const PRODUCTS: Product[] = [
  {
    "id": "a7095550-4e51-4075-8159-1d5a5c726115",
    "name": "Tài Khoản Amazon Buyer Fresh (Nuôi Nick / Mua Hàng)",
    "description": "Gói tài khoản Amazon tạo mới (Fresh Accounts) sẵn sàng nuôi nick, làm Affiliate, Dropshipping hoặc mua hàng quốc tế.",
    "price": 55000,
    "originalPrice": 150000,
    "discount": 63,
    "image": "https://images.unsplash.com/photo-1523474255658-4af61b168344?w=800&auto=format&fit=crop&q=80",
    "category": "work",
    "rating": 4.7,
    "sold": 450,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-09-07T10:07:20.292371+00:00",
    "platforms": [
      "web"
    ],
    "features": [
      "Tài khoản tạo mới kèm email đăng ký",
      "IP sạch, không dính checkpoint ban đầu",
      "Thích hợp cho anh em làm MMO, Dropship, Review",
      "Bảo hành 1 đổi 1 trong 24h nếu sai mật khẩu"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành 1 đổi 1 trong 24h đầu.",
    "variants": [
      {
        "id": "x10",
        "name": "Combo 10 Tài khoản",
        "price": 55000,
        "originalPrice": 150000
      },
      {
        "id": "x50",
        "name": "Combo 50 Tài khoản",
        "price": 245000,
        "originalPrice": 600000
      }
    ],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ Combo"
  },
  {
    "id": "e2b30f10-0416-432a-88c3-02a1e698f51b",
    "name": "Nâng Cấp Hinge+ / Hinge X",
    "description": "Tài khoản Hinge+ và Hinge X chuyên sâu giúp tăng tương tác chất lượng cao và đề xuất hồ sơ phù hợp nhất.",
    "price": 1990000,
    "originalPrice": 4200000,
    "discount": 53,
    "image": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80",
    "category": "entertainment",
    "rating": 4.8,
    "sold": 98,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-09-07T10:07:20.195466+00:00",
    "platforms": [
      "ios",
      "android"
    ],
    "features": [
      "Lượt thích không giới hạn mỗi ngày",
      "Xem toàn bộ người thích bạn trong một danh sách",
      "Thuật toán đề xuất tương thích cao",
      "Ưu tiên hiển thị hồ sơ nổi bật"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành tài khoản trọn gói.",
    "variants": [
      {
        "id": "plus-3m",
        "name": "Hinge+ (3 Tháng)",
        "price": 1990000,
        "originalPrice": 4200000
      },
      {
        "id": "plus-6m",
        "name": "Hinge+ (6 Tháng)",
        "price": 2490000,
        "originalPrice": 5500000
      },
      {
        "id": "x-6m",
        "name": "Hinge X (6 Tháng)",
        "price": 3590000,
        "originalPrice": 7900000
      }
    ],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ Gói"
  },
  {
    "id": "0c52068e-a862-4925-a939-0c729644813e",
    "name": "Tài Khoản Bumble Premium / Platinum",
    "description": "Gói nâng cấp Bumble Premium và Platinum mở rộng kết nối, xem ai thích bạn và quay lại lượt quẹt không giới hạn.",
    "price": 1790000,
    "originalPrice": 3500000,
    "discount": 49,
    "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    "category": "entertainment",
    "rating": 4.8,
    "sold": 175,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-09-07T10:07:20.104488+00:00",
    "platforms": [
      "ios",
      "android",
      "web"
    ],
    "features": [
      "Xem Beeline toàn bộ người đã thích bạn",
      "Kéo dài thời gian chat thêm 24 giờ",
      "Chế độ tàng hình ẩn hồ sơ khi cần",
      "Bộ lọc nâng cao theo sở thích và thói quen"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành đầy đủ tính năng Premium.",
    "variants": [
      {
        "id": "plat-6m",
        "name": "Bumble Platinum (6 Tháng)",
        "price": 1790000,
        "originalPrice": 3500000
      },
      {
        "id": "prem-life",
        "name": "Bumble Premium (Vĩnh Viễn)",
        "price": 3590000,
        "originalPrice": 7500000
      }
    ],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ Gói"
  },
  {
    "id": "7e8a9dd7-cc15-4c89-aecd-6d1f3cd333f0",
    "name": "Gói Đăng Ký Tinder Gold / Platinum",
    "description": "Nâng cấp Tinder Gold & Platinum xem ai đã thích bạn, lượt Super Like không giới hạn và tính năng Passport quẹt toàn cầu.",
    "price": 890000,
    "originalPrice": 1800000,
    "discount": 51,
    "image": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
    "category": "entertainment",
    "rating": 4.8,
    "sold": 310,
    "isHot": true,
    "isNew": true,
    "created_at": "2026-09-07T10:07:20.011739+00:00",
    "platforms": [
      "ios",
      "android",
      "web"
    ],
    "features": [
      "Biết ai đã thích hồ sơ của bạn",
      "Gửi tin nhắn trước khi match (Platinum)",
      "Huy hiệu ưu tiên lượt thích được xem trước",
      "Passport đổi vị trí hẹn hò toàn cầu"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành tài khoản trọn thời hạn gói.",
    "variants": [
      {
        "id": "gold-3m",
        "name": "Tinder Gold (3 Tháng)",
        "price": 890000,
        "originalPrice": 1800000
      },
      {
        "id": "gold-6m",
        "name": "Tinder Gold (6 Tháng)",
        "price": 1150000,
        "originalPrice": 2400000
      },
      {
        "id": "gold-12m",
        "name": "Tinder Gold (12 Tháng)",
        "price": 1550000,
        "originalPrice": 3200000
      },
      {
        "id": "plat-6m",
        "name": "Tinder Platinum (6 Tháng)",
        "price": 1550000,
        "originalPrice": 3000000
      },
      {
        "id": "plat-12m",
        "name": "Tinder Platinum (12 Tháng)",
        "price": 2590000,
        "originalPrice": 4800000
      }
    ],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ Gói"
  },
  {
    "id": "53e7d6b0-00b6-4dca-8a44-233fc6069d66",
    "name": "Nạp Valorant Points (VP) Bản Quyền",
    "description": "Nạp Valorant Points (VP) chính hãng giá rẻ từ 1000 VP đến 11000 VP mở khóa Battlepass và Skin súng hot.",
    "price": 260000,
    "originalPrice": 350000,
    "discount": 26,
    "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
    "category": "game",
    "rating": 4.9,
    "sold": 520,
    "isHot": true,
    "isNew": true,
    "created_at": "2026-09-07T10:07:19.919259+00:00",
    "platforms": [
      "windows"
    ],
    "features": [
      "Nạp trực tiếp vào tài khoản Riot Games",
      "Mở khóa ngay Skin súng, Vandal, Phantom, Dao",
      "Nguồn gốc sạch 100% không lo khóa acc",
      "Hỗ trợ mọi cụm máy chủ"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành vĩnh viễn không thu hồi VP.",
    "variants": [
      {
        "id": "1000vp",
        "name": "1000 VP",
        "price": 260000,
        "originalPrice": 350000
      },
      {
        "id": "2050vp",
        "name": "2050 VP",
        "price": 520000,
        "originalPrice": 680000
      },
      {
        "id": "3650vp",
        "name": "3650 VP",
        "price": 890000,
        "originalPrice": 1150000
      },
      {
        "id": "5350vp",
        "name": "5350 VP",
        "price": 1290000,
        "originalPrice": 1650000
      },
      {
        "id": "6350vp",
        "name": "6350 VP",
        "price": 1550000,
        "originalPrice": 1950000
      },
      {
        "id": "7400vp",
        "name": "7400 VP",
        "price": 1790000,
        "originalPrice": 2250000
      },
      {
        "id": "9000vp",
        "name": "9000 VP",
        "price": 2190000,
        "originalPrice": 2750000
      },
      {
        "id": "11000vp",
        "name": "11000 VP",
        "price": 2590000,
        "originalPrice": 3200000
      }
    ],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ Gói VP"
  },
  {
    "id": "f88ca265-0211-480c-80ce-634a579bcc20",
    "name": "ChatGPT Team / Business (Gói Nhóm 3 Thành Viên)",
    "description": "Tài khoản ChatGPT Team / Business cấp quyền quản trị 3 người dùng, hạn mức GPT-4o cao gấp đôi và dữ liệu không dùng để huấn luyện AI.",
    "price": 580000,
    "originalPrice": 1800000,
    "discount": 68,
    "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
    "category": "ai",
    "rating": 5,
    "sold": 86,
    "isHot": true,
    "isNew": true,
    "created_at": "2026-09-07T10:07:19.825979+00:00",
    "platforms": [
      "web",
      "ios",
      "android"
    ],
    "features": [
      "Hạn mức gửi tin nhắn GPT-4o cao gấp 2 lần bản Plus",
      "Workspace làm việc chung cho 3 tài khoản",
      "Bảo mật dữ liệu tuyệt đối (không bị OpenAI dùng train model)",
      "Quản trị viên tự phân quyền thành viên"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành 1 đổi 1 tài khoản quản trị.",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ Tháng"
  },
  {
    "id": "0df6e48e-28d5-4091-b588-dfe109d613b4",
    "name": "Notion Business Bản Quyền (1 Tháng - 1 Năm)",
    "description": "Gói Notion Business dành cho công ty và đội nhóm: Không giới hạn block, quyền SAML SSO, biểu mẫu form nâng cao và xuất PDF hàng loạt.",
    "price": 180000,
    "originalPrice": 650000,
    "discount": 72,
    "image": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=80",
    "category": "work",
    "rating": 4.9,
    "sold": 132,
    "isHot": true,
    "isNew": true,
    "created_at": "2026-09-07T10:07:19.744571+00:00",
    "platforms": [
      "web",
      "mac",
      "windows",
      "ios",
      "android"
    ],
    "features": [
      "Không giới hạn dung lượng tải tệp",
      "Lịch sử trang lưu 90 ngày",
      "Phân quyền quản lý nâng cao cho đội nhóm",
      "Hỗ trợ tính năng Private Teamspaces"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành 1 đổi 1 trọn thời gian đăng ký.",
    "variants": [
      {
        "id": "1m",
        "name": "Gói 1 Tháng",
        "price": 180000,
        "originalPrice": 650000
      },
      {
        "id": "1y",
        "name": "Gói 1 Năm",
        "price": 780000,
        "originalPrice": 2800000
      }
    ],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ Gói"
  },
  {
    "id": "d58522b3-1bcf-4c77-93b7-4a3479e9310d",
    "name": "Discord Server Boost (Gói Nâng Cấp)",
    "description": "Nâng cấp Server Discord lên Level 3 giúp tăng chất lượng âm thanh 384Kbps, mở rộng emoji tùy chỉnh và link máy chủ tùy biến.",
    "price": 220000,
    "originalPrice": 600000,
    "discount": 63,
    "image": "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=800&auto=format&fit=crop&q=80",
    "category": "entertainment",
    "rating": 4.9,
    "sold": 168,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-09-07T10:07:19.653615+00:00",
    "platforms": [
      "windows",
      "mac",
      "ios",
      "android",
      "web"
    ],
    "features": [
      "Tăng chất lượng âm thanh voice chat lên 384Kbps",
      "Tăng giới hạn tải file lên 100MB cho toàn server",
      "Tùy biến URL mời tham gia máy chủ",
      "Mở rộng hơn 250 slot emoji & sticker"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành giữ nguyên cấp độ boost.",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ Gói"
  },
  {
    "id": "961205ad-ccc6-4522-a209-df99dc96cba3",
    "name": "Microsoft 365 Admin Account (12 Tháng)",
    "description": "Tài khoản quản trị viên Microsoft 365 Admin Center 12 tháng, cấp phát và quản lý bản quyền Office, OneDrive 1TB-5TB cho doanh nghiệp.",
    "price": 520000,
    "originalPrice": 2500000,
    "discount": 79,
    "image": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80",
    "category": "work",
    "rating": 4.9,
    "sold": 94,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-09-07T10:07:19.55928+00:00",
    "platforms": [
      "windows",
      "mac",
      "web",
      "ios",
      "android"
    ],
    "features": [
      "Quyền quản trị trung tâm Microsoft 365 Admin Center",
      "Tự tạo và quản lý user theo tên miền riêng",
      "Cài đặt đầy đủ Word, Excel, PowerPoint, Outlook",
      "Bảo hành 12 tháng uy tín"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành tài khoản Admin trọn 12 tháng.",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ Năm"
  },
  {
    "id": "a686cf53-18de-417c-b223-0716ad549591",
    "name": "Apple Music (6 Tháng)",
    "description": "Gói đăng ký Apple Music 6 tháng thưởng thức hơn 100 triệu bài hát chất lượng Lossless và âm thanh vòm Spatial Audio.",
    "price": 220000,
    "originalPrice": 390000,
    "discount": 44,
    "image": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    "category": "music",
    "rating": 4.9,
    "sold": 215,
    "isHot": true,
    "isNew": true,
    "created_at": "2026-09-07T10:07:19.46636+00:00",
    "platforms": [
      "ios",
      "android",
      "mac",
      "windows"
    ],
    "features": [
      "Âm thanh chất lượng cao Lossless & Hi-Res Lossless",
      "Công nghệ âm thanh không gian Spatial Audio Dolby Atmos",
      "Hơn 100 triệu bài hát không chèn quảng cáo",
      "Tải nhạc nghe offline không tốn 4G"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành nghe trọn vẹn 6 tháng.",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ 6 Tháng"
  },
  {
    "id": "f5e5d80e-f8e8-4039-a022-7962e51d0a64",
    "name": "Amazon Prime Video (1 Tháng)",
    "description": "Tài khoản Prime Video bản quyền xem phim điện ảnh bom tấn 4K HDR và các series đình đám như The Boys, Rings of Power.",
    "price": 25000,
    "originalPrice": 99000,
    "discount": 75,
    "image": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    "category": "entertainment",
    "rating": 4.8,
    "sold": 380,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-09-07T10:07:19.377952+00:00",
    "platforms": [
      "web",
      "ios",
      "android",
      "smart-tv"
    ],
    "features": [
      "Chất lượng hình ảnh 4K Ultra HD & HDR",
      "Phụ đề tiếng Việt đầy đủ",
      "Xem đồng thời trên nhiều thiết bị",
      "Kho phim độc quyền Amazon Originals"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành trọn tháng 1 đổi 1.",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ Tháng"
  },
  {
    "id": "320f4bc5-aeec-4094-a763-6b2265382b77",
    "name": "Crunchyroll Fan (1 Tháng)",
    "description": "Tài khoản Crunchyroll Fan bản quyền, xem trọn bộ Anime mới nhất không quảng cáo chuẩn Full HD cùng ngày phát sóng tại Nhật Bản.",
    "price": 25000,
    "originalPrice": 120000,
    "discount": 79,
    "image": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
    "category": "entertainment",
    "rating": 4.8,
    "sold": 420,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-09-07T10:07:19.298955+00:00",
    "platforms": [
      "web",
      "ios",
      "android",
      "smart-tv"
    ],
    "features": [
      "Xem Anime không quảng cáo",
      "Kho phim Anime bản quyền lớn nhất thế giới",
      "Phát sóng đồng thời 1 giờ sau khi chiếu tại Nhật",
      "Xem mượt mà trên Smart TV, điện thoại, máy tính"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành xem mượt trọn 30 ngày.",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ Tháng"
  },
  {
    "id": "818fad39-03db-4b3d-aa21-733c81187474",
    "name": "AWS Account Credit $200 (6 Tháng)",
    "description": "Tài khoản Amazon Web Services có sẵn $200 credit thời hạn 6 tháng, dùng cho EC2, S3, RDS, Lambda.",
    "price": 520000,
    "originalPrice": 5200000,
    "discount": 90,
    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    "category": "cloud",
    "rating": 4.9,
    "sold": 78,
    "isHot": true,
    "isNew": true,
    "created_at": "2026-09-07T10:07:19.19659+00:00",
    "platforms": [
      "web"
    ],
    "features": [
      "Có sẵn $200 tín dụng sử dụng dịch vụ AWS",
      "Hỗ trợ khởi tạo VPS EC2, database RDS, kho S3",
      "Thời hạn sử dụng lên đến 6 tháng",
      "Bàn giao tài khoản gốc đầy đủ thông tin"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành credit hoạt động đúng thời gian.",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ 6 Tháng"
  },
  {
    "id": "b7313c90-3f1b-4e85-a5f2-258c86e5b817",
    "name": "Jasper AI (Pro Plan)",
    "description": "Nền tảng AI Copywriting chuyên nghiệp hàng đầu cho doanh nghiệp, viết bài SEO, quảng cáo Facebook/Google chuẩn chuyển đổi.",
    "price": 149000,
    "originalPrice": 690000,
    "discount": 78,
    "image": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80",
    "category": "ai",
    "rating": 4.9,
    "sold": 189,
    "isHot": true,
    "isNew": true,
    "created_at": "2026-09-07T10:07:19.100294+00:00",
    "platforms": [
      "web"
    ],
    "features": [
      "Hơn 50 template viết quảng cáo chuyên nghiệp",
      "Tối ưu hóa bài viết chuẩn SEO Surfer",
      "Giữ đúng phong cách thương hiệu (Brand Voice)",
      "Tạo nội dung marketing đa kênh"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành 1 đổi 1 trọn gói.",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ Tháng"
  },
  {
    "id": "6af3d23f-b5f2-4866-9d80-a1f5d98be051",
    "name": "PicsArt Pro (12 Tháng)",
    "description": "Nâng cấp PicsArt Gold / Pro 1 năm mở khóa toàn bộ công cụ chỉnh ảnh AI, xóa nền, hiệu ứng và mẫu thiết kế cao cấp.",
    "price": 990000,
    "originalPrice": 1800000,
    "discount": 45,
    "image": "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop&q=80",
    "category": "design",
    "rating": 4.9,
    "sold": 145,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-09-07T10:07:18.996844+00:00",
    "platforms": [
      "ios",
      "android",
      "web",
      "windows"
    ],
    "features": [
      "Mở khóa 100% bộ lọc & font chữ Pro",
      "Công cụ xóa vật thể & xóa nền AI",
      "Chỉnh sửa ảnh và video không giới hạn",
      "Xuất file chuẩn độ phân giải cao"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành 12 tháng chính hãng.",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ Năm"
  },
  {
    "id": "f67b5410-4a04-434a-b0df-29111b5c68ea",
    "name": "Factory Pro (1 Năm)",
    "description": "Môi trường lập trình AI thế hệ mới (AI Droids) tự động hóa quy trình viết code, kiểm thử và rà soát bug.",
    "price": 780000,
    "originalPrice": 2100000,
    "discount": 63,
    "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    "category": "ai",
    "rating": 4.9,
    "sold": 53,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-09-07T10:07:18.885964+00:00",
    "platforms": [
      "web",
      "mac",
      "windows"
    ],
    "features": [
      "Tự động hóa nhiệm vụ kỹ thuật lặp đi lặp lại",
      "AI Droids phân tích codebase sâu",
      "Hỗ trợ tái cấu trúc mã nguồn thông minh",
      "Tích hợp sẵn với VS Code & JetBrains"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành tài khoản 1 đổi 1.",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ Năm"
  },
  {
    "id": "88116a99-53f5-4107-b22f-a879b48c6941",
    "name": "Warp Build (12 Tháng)",
    "description": "Cloud Runners siêu tốc cho CI/CD và lập trình viên, tăng tốc độ build phần mềm nhanh hơn 30-50%.",
    "price": 320000,
    "originalPrice": 900000,
    "discount": 64,
    "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    "category": "work",
    "rating": 4.8,
    "sold": 42,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-09-07T10:07:18.768491+00:00",
    "platforms": [
      "web",
      "linux",
      "mac",
      "windows"
    ],
    "features": [
      "Tăng tốc độ build GitHub Actions gấp đôi",
      "Cấu hình phần cứng tối ưu cho dev",
      "Bảo mật cấp doanh nghiệp",
      "Dễ dàng tích hợp vào repository hiện có"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành dịch vụ 12 tháng.",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ Năm"
  },
  {
    "id": "24128b60-0232-42f3-b3e4-4cddf3725b93",
    "name": "Wispr Flow Pro (12 Tháng)",
    "description": "Ứng dụng nhập liệu giọng nói AI nhanh hơn gõ phím gấp 3 lần, tự động sửa chính tả và văn phong tự nhiên trên máy tính.",
    "price": 890000,
    "originalPrice": 2400000,
    "discount": 63,
    "image": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80",
    "category": "ai",
    "rating": 5,
    "sold": 64,
    "isHot": true,
    "isNew": true,
    "created_at": "2026-09-07T10:07:18.594053+00:00",
    "platforms": [
      "mac",
      "windows"
    ],
    "features": [
      "Chuyển giọng nói thành văn bản chuẩn xác 99%",
      "Nhận diện cả tiếng Việt và hơn 100 ngôn ngữ",
      "Tự động định dạng dấu câu và ngữ cảnh",
      "Hoạt động mượt mà trên mọi ứng dụng"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành 1 đổi 1 trọn thời gian sử dụng.",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ Năm"
  },
  {
    "id": "0d1c5ddf-1e08-4635-89a1-a068808d47e3",
    "name": "Windscribe VPN (1 Năm - 2 Thiết bị)",
    "description": "Tài khoản Windscribe Pro 1 năm mở khóa toàn bộ máy chủ cao cấp và bộ lọc chặn quảng cáo R.O.B.E.R.T.",
    "price": 450000,
    "originalPrice": 1400000,
    "discount": 68,
    "image": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80",
    "category": "security",
    "rating": 4.8,
    "sold": 85,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-09-07T10:07:18.433224+00:00",
    "platforms": [
      "windows",
      "mac",
      "ios",
      "android"
    ],
    "features": [
      "Băng thông không giới hạn",
      "Truy cập máy chủ 69 quốc gia",
      "Hỗ trợ 2 thiết bị đồng thời",
      "Tường lửa bảo vệ kết nối"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành 1 đổi 1 trong 12 tháng.",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ Năm"
  },
  {
    "id": "5d50d938-8184-4f02-9928-7ddd68601254",
    "name": "NordVPN (3 Tháng - Private Access)",
    "description": "Dịch vụ VPN bảo mật số 1 thế giới, mã hóa đường truyền quân đội, tốc độ siêu tốc vượt tường lửa tại 111 quốc gia.",
    "price": 129000,
    "originalPrice": 390000,
    "discount": 67,
    "image": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=80",
    "category": "security",
    "rating": 4.9,
    "sold": 156,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-09-07T10:07:18.280259+00:00",
    "platforms": [
      "windows",
      "mac",
      "ios",
      "android"
    ],
    "features": [
      "Hơn 6,000 máy chủ tại 111 quốc gia",
      "Giao thức NordLynx độc quyền siêu tốc",
      "Chặn quảng cáo và mã độc Threat Protection",
      "Bảo vệ IP và quyền riêng tư tuyệt đối"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành đổi tài khoản ngay nếu gián đoạn.",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ 3 Tháng"
  },
  {
    "id": "b774c067-fb67-4c86-94e1-1da18e62e0e3",
    "name": "Coursera Plus (1 Năm)",
    "description": "Học và nhận chứng chỉ không giới hạn hơn 7,000 khóa học từ Google, Meta, IBM, Stanford trên Coursera.",
    "price": 89000,
    "originalPrice": 2500000,
    "discount": 96,
    "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    "category": "education",
    "rating": 4.9,
    "sold": 340,
    "isHot": true,
    "isNew": true,
    "created_at": "2026-09-07T10:07:18.131166+00:00",
    "platforms": [
      "web",
      "ios",
      "android"
    ],
    "features": [
      "Hơn 7,000 khóa học & chứng chỉ chuyên nghiệp",
      "Cấp chứng chỉ chính thức có tên người học",
      "Học từ các trường đại học và tập đoàn hàng đầu",
      "Tải bài giảng học offline linh hoạt"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành học tập trọn thời hạn 12 tháng.",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ Năm"
  },
  {
    "id": "c8f18c43-0b23-47a3-b645-1128d904a261",
    "name": "Figma Pro 2 Năm (Private Access)",
    "description": "Tài khoản Figma Professional bản quyền 2 năm không giới hạn dự án, lịch sử phiên bản và cộng tác nhóm.",
    "price": 150000,
    "originalPrice": 750000,
    "discount": 80,
    "image": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    "category": "design",
    "rating": 5,
    "sold": 230,
    "isHot": true,
    "isNew": true,
    "created_at": "2026-09-07T10:07:17.975204+00:00",
    "platforms": [
      "web",
      "mac",
      "windows"
    ],
    "features": [
      "Không giới hạn file & dự án",
      "Lưu lịch sử chỉnh sửa không giới hạn",
      "Quyền riêng tư tuyệt đối (Private Access)",
      "Truy cập đầy đủ thư viện Team Library"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành 1 đổi 1 trong suốt 2 năm.",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ 2 Năm"
  },
  {
    "id": "a7342557-7c67-4986-ae51-ec48a2927678",
    "name": "Mobbin Team 1 Năm (10 Seats)",
    "description": "Thư viện thiết kế UI/UX ứng dụng di động và web lớn nhất thế giới, dành cho Designer và Product Manager.",
    "price": 320000,
    "originalPrice": 1200000,
    "discount": 73,
    "image": "https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=800&auto=format&fit=crop&q=80",
    "category": "design",
    "rating": 4.9,
    "sold": 112,
    "isHot": true,
    "isNew": true,
    "created_at": "2026-09-07T10:07:17.782022+00:00",
    "platforms": [
      "web"
    ],
    "features": [
      "Kho hơn 300,000 màn hình UI thực tế từ các app hàng đầu",
      "Tra cứu luồng User Flow chi tiết",
      "Gói Team 10 thành viên cùng sử dụng",
      "Cập nhật các mẫu thiết kế mới nhất hàng tuần"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành tài khoản trọn gói 12 tháng.",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ Năm"
  },
  {
    "id": "963c9035-4e7f-479e-8e05-847cb764d7e6",
    "name": "Lovable Pro (1 Năm)",
    "description": "Nền tảng Fullstack AI App Builder hàng đầu thế giới, biến ý tưởng và prompt thành ứng dụng web hoàn chỉnh trong vài giây.",
    "price": 1490000,
    "originalPrice": 3900000,
    "discount": 62,
    "image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    "category": "ai",
    "rating": 5,
    "sold": 48,
    "isHot": true,
    "isNew": true,
    "created_at": "2026-09-07T10:07:17.578154+00:00",
    "platforms": [
      "web"
    ],
    "features": [
      "Tạo ứng dụng full-stack bằng prompt AI",
      "Xuất mã nguồn React/NodeJS sạch",
      "Tích hợp sẵn Supabase & GitHub",
      "Hạn mức Pro không giới hạn tin nhắn"
    ],
    "activationGuide": null,
    "gallery": null,
    "version": null,
    "developer": null,
    "warrantyPolicy": "Bảo hành 1 đổi 1 trọn thời gian sử dụng 1 năm.",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": "/ Năm"
  },
  {
    "id": "cd0b95a3-3494-4945-9cc0-6242b8bc4f68",
    "name": "Elsa Premium",
    "description": "ELSA Premium là ứng dụng luyện nói tiếng Anh thông minh, sử dụng AI để chấm điểm phát âm, sửa lỗi giao tiếp, xây dựng lộ trình học cá nhân hóa và giúp người dùng nói tiếng Anh tự tin hơn mỗi ngày.",
    "price": 800000,
    "originalPrice": 1300000,
    "discount": 38,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/lchei6t1gn_1778470868733.png",
    "category": "education",
    "rating": 5,
    "sold": 0,
    "isHot": false,
    "isNew": false,
    "created_at": "2026-05-11T03:41:14.289398+00:00",
    "platforms": [],
    "features": [
      "AI chấm điểm phát âm tiếng Anh chính xác",
      "Sửa lỗi phát âm, trọng âm và ngữ điệu",
      "Luyện hội thoại tiếng Anh theo tình huống thực tế",
      "Bài học cá nhân hóa theo trình độ người dùng",
      "Theo dõi tiến độ học tập mỗi ngày",
      "Hỗ trợ cải thiện kỹ năng nghe và nói",
      "Phù hợp cho học IELTS, giao tiếp và công việc",
      "Kho bài luyện đa dạng, dễ học, dễ thực hành",
      "Giúp nói tiếng Anh tự nhiên và tự tin hơn",
      "Sử dụng được trên iOS, Android và Web"
    ],
    "activationGuide": "",
    "gallery": null,
    "version": "",
    "developer": "Elsa",
    "warrantyPolicy": "Bảo hành trong suốt thời gian sử dụng gói",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": ""
  },
  {
    "id": "17113b82-ad06-470c-85a6-133f3a731d38",
    "name": "Heygen Creator",
    "description": "HeyGen Creator là công cụ AI tạo video avatar chuyên nghiệp, hỗ trợ chuyển văn bản thành video, tạo người dẫn ảo, lồng tiếng đa ngôn ngữ và sản xuất nội dung marketing nhanh chóng.",
    "price": 600000,
    "originalPrice": 800000,
    "discount": 25,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/l883h50pmh_1778470399348.png",
    "category": "ai",
    "rating": 5,
    "sold": 0,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-05-11T03:35:41.107326+00:00",
    "platforms": [
      "Web",
      "iOS",
      "Android"
    ],
    "features": [
      "Tạo video AI từ văn bản nhanh chóng",
      "Hỗ trợ avatar AI làm người dẫn ảo chuyên nghiệp",
      "Chuyển văn bản thành giọng nói tự nhiên",
      "Hỗ trợ nhiều ngôn ngữ và giọng đọc khác nhau",
      "Tạo video thuyết trình, quảng cáo, đào tạo và giới thiệu sản phẩm",
      "Dễ dàng tùy chỉnh nội dung, giọng đọc và phong cách trình bày",
      "Tiết kiệm thời gian sản xuất video so với quay dựng truyền thống",
      "Phù hợp cho content creator, marketer, giáo viên và doanh nghiệp",
      "Hỗ trợ làm video ngắn cho TikTok, Reels, Shorts và YouTube",
      "Giao diện dễ dùng, phù hợp cả người không chuyên"
    ],
    "activationGuide": "",
    "gallery": null,
    "version": "",
    "developer": "Heygen",
    "warrantyPolicy": "Bảo hành trong suốt thời gian sử dụng gói",
    "variants": [
      {
        "id": "0.20138406047022106",
        "sku": "",
        "name": "1 Tháng",
        "price": 600000,
        "stock": 10,
        "originalPrice": 0
      }
    ],
    "reviews": [],
    "isActive": true,
    "pricingUnit": ""
  },
  {
    "id": "e8591cc3-dd80-4f2f-ab21-474e73893831",
    "name": "Cursor Pro",
    "description": "Cursor Pro là công cụ lập trình AI cao cấp, hỗ trợ viết code nhanh hơn, tự động gợi ý thông minh, hiểu toàn bộ codebase, sửa lỗi, refactor và tối ưu workflow cho developer.",
    "price": 420000,
    "originalPrice": 530000,
    "discount": 21,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/byv3994cmq_1778469553763.png",
    "category": "ai",
    "rating": 5,
    "sold": 0,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-05-11T03:26:53.738781+00:00",
    "platforms": [],
    "features": [
      "AI autocomplete gợi ý code nhanh và chính xác",
      "Chat với codebase để hỏi, hiểu và chỉnh sửa dự án",
      "Hỗ trợ viết code, sửa lỗi và tối ưu logic",
      "Refactor code thông minh, sạch và dễ bảo trì hơn",
      "Tự động giải thích đoạn code phức tạp",
      "Hỗ trợ nhiều ngôn ngữ lập trình phổ biến",
      "Tăng tốc xây dựng website, app, script và API",
      "Phù hợp cho developer, freelancer, startup và team kỹ thuật",
      "Giúp tiết kiệm thời gian khi phát triển sản phẩm",
      "Sử dụng tốt cho học lập trình và làm dự án thực tế"
    ],
    "activationGuide": "",
    "gallery": null,
    "version": "",
    "developer": "Cursor",
    "warrantyPolicy": "Bảo hành trong suốt thời gian sử dụng gói",
    "variants": [
      {
        "id": "0.3799775276319236",
        "sku": "",
        "name": "1 Tháng",
        "price": 420000,
        "stock": 10,
        "originalPrice": 0
      }
    ],
    "reviews": [],
    "isActive": true,
    "pricingUnit": ""
  },
  {
    "id": "7ba38e50-babd-4608-a5ce-4847fdaec5aa",
    "name": "NotebookLM PRO",
    "description": "",
    "price": 600000,
    "originalPrice": 6000000,
    "discount": 90,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/zr26rih93_1778235901127.png",
    "category": "work",
    "rating": 5,
    "sold": 0,
    "isHot": false,
    "isNew": false,
    "created_at": "2026-05-08T10:25:10.584245+00:00",
    "platforms": [],
    "features": [],
    "activationGuide": "",
    "gallery": null,
    "version": "",
    "developer": "Google",
    "warrantyPolicy": "",
    "variants": [
      {
        "id": "0.6736895978614929",
        "sku": "",
        "name": "12 Tháng ",
        "price": 600000,
        "stock": 10,
        "originalPrice": 0
      }
    ],
    "reviews": [],
    "isActive": true,
    "pricingUnit": ""
  },
  {
    "id": "c46c9784-5dfa-4807-8f6b-0923eaa84490",
    "name": "Google One 5TB",
    "description": "Google One là gói lưu trữ đám mây cao cấp của Google, giúp mở rộng dung lượng cho Google Drive, Gmail và Google Photos. Hỗ trợ sao lưu dữ liệu, đồng bộ nhiều thiết bị và truy cập tài liệu mọi lúc, mọi nơi.",
    "price": 500000,
    "originalPrice": 1500000,
    "discount": 67,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/829exodowuo_1778219373448.png",
    "category": "cloud",
    "rating": 5,
    "sold": 0,
    "isHot": false,
    "isNew": false,
    "created_at": "2026-05-08T05:49:39.661974+00:00",
    "platforms": [
      "iOS",
      "Android",
      "Web"
    ],
    "features": [
      "Mở rộng dung lượng lưu trữ Google Drive",
      "Lưu trữ email và tệp đính kèm trên Gmail",
      "Sao lưu ảnh và video trên Google Photos",
      "Đồng bộ dữ liệu trên nhiều thiết bị",
      "Truy cập tài liệu mọi lúc, mọi nơi",
      "Chia sẻ dung lượng cho thành viên gia đình",
      "Bảo mật dữ liệu với hệ thống của Google",
      "Phù hợp cho học tập, làm việc và lưu trữ cá nhân",
      "Hỗ trợ quản lý dung lượng dễ dàng",
      "Sử dụng được trên Web, iOS và Android"
    ],
    "activationGuide": "",
    "gallery": null,
    "version": "",
    "developer": "Google",
    "warrantyPolicy": "Bảo hành trong suốt thời gian sử dụng gói",
    "variants": [
      {
        "id": "0.06399879007005405",
        "sku": "",
        "name": "12 Tháng",
        "price": 500000,
        "stock": 10,
        "originalPrice": 0
      },
      {
        "id": "0.5283942731328033",
        "sku": "",
        "name": "24 Tháng",
        "price": 700000,
        "stock": 10,
        "originalPrice": 0
      }
    ],
    "reviews": [],
    "isActive": true,
    "pricingUnit": ""
  },
  {
    "id": "6cd0b2a3-1d20-4e35-b8f6-a05b22587b75",
    "name": "Canva Pro",
    "description": "Canva Pro là công cụ thiết kế đồ họa chuyên nghiệp, hỗ trợ tạo banner, poster, bài đăng mạng xã hội, slide, video và tài liệu nhanh chóng với kho template cao cấp, công cụ AI và tính năng xóa nền tiện lợi.",
    "price": 349000,
    "originalPrice": 1000000,
    "discount": 65,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/6wj3kj3lp8i_1778218937632.png",
    "category": "design",
    "rating": 5,
    "sold": 0,
    "isHot": false,
    "isNew": false,
    "created_at": "2026-05-08T05:43:39.215481+00:00",
    "platforms": [],
    "features": [
      "Kho template Pro cao cấp, đa dạng ngành nghề",
      "Thiết kế banner, poster, logo, slide và bài đăng mạng xã hội",
      "Xóa nền ảnh nhanh chóng chỉ với một thao tác",
      "Magic Design hỗ trợ tạo thiết kế bằng AI",
      "Magic Write hỗ trợ viết nội dung, tiêu đề và mô tả",
      "Brand Kit giúp lưu logo, màu sắc và font thương hiệu",
      "Kho ảnh, video, icon, sticker và thành phần Pro cao cấp",
      "Hỗ trợ chỉnh sửa ảnh, video và nội dung marketing",
      "Tạo nội dung nhanh cho Facebook, TikTok, Instagram, YouTube",
      "Chia sẻ và làm việc nhóm dễ dàng",
      "Xuất file chất lượng cao, phù hợp cho in ấn và đăng tải online",
      "Sử dụng được trên Web, iOS và Android"
    ],
    "activationGuide": "",
    "gallery": null,
    "version": "",
    "developer": "Canva",
    "warrantyPolicy": "Bảo hành trong suốt thời gian sử dụng gói",
    "variants": [
      {
        "id": "0.9857960279846937",
        "sku": "",
        "name": "12 Tháng",
        "price": 349000,
        "stock": 10,
        "originalPrice": 0
      }
    ],
    "reviews": [],
    "isActive": true,
    "pricingUnit": ""
  },
  {
    "id": "ffdb00db-ccde-49a8-850c-d74673b19f2a",
    "name": "Zoom Pro 100 người",
    "description": "",
    "price": 400000,
    "originalPrice": 800000,
    "discount": 50,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/8rfxwrnke7a_1778218747034.png",
    "category": "work",
    "rating": 5,
    "sold": 0,
    "isHot": false,
    "isNew": false,
    "created_at": "2026-05-08T05:41:41.314056+00:00",
    "platforms": [
      "iOS",
      "Web",
      "Android"
    ],
    "features": [],
    "activationGuide": "",
    "gallery": null,
    "version": "",
    "developer": "Zoom",
    "warrantyPolicy": "",
    "variants": [
      {
        "id": "0.025352971644291067",
        "sku": "",
        "name": "3 Tháng",
        "price": 450000,
        "stock": 10,
        "originalPrice": 0
      },
      {
        "id": "0.9972833073107983",
        "sku": "",
        "name": "6 Tháng",
        "price": 620000,
        "stock": 10,
        "originalPrice": 0
      },
      {
        "id": "0.6349795263421708",
        "sku": "",
        "name": "12 Tháng ",
        "price": 900000,
        "stock": 10,
        "originalPrice": 0
      }
    ],
    "reviews": [],
    "isActive": true,
    "pricingUnit": ""
  },
  {
    "id": "ab045618-d15f-4b35-be18-09b5ee28e208",
    "name": "Duolingo MAX",
    "description": "Duolingo Max là gói học ngoại ngữ cao cấp nhất, tích hợp AI hỗ trợ giải thích đáp án, luyện hội thoại nhập vai và học tập thông minh hơn. Phù hợp cho người muốn nâng cao kỹ năng nghe, nói, đọc, viết mỗi ngày.",
    "price": 850000,
    "originalPrice": 15000000,
    "discount": 94,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/1ogpwagvc8j_1778218072027.png",
    "category": "education",
    "rating": 5,
    "sold": 0,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-05-08T05:28:20.058556+00:00",
    "platforms": [
      "iOS",
      "Android",
      "Web"
    ],
    "features": [
      "Học ngoại ngữ không quảng cáo",
      "Luyện tập không giới hạn, không lo hết tim",
      "Tích hợp AI hỗ trợ học tập thông minh",
      "Giải thích đáp án chi tiết để hiểu bài sâu hơn",
      "Roleplay với AI giúp luyện hội thoại thực tế",
      "Ôn lại lỗi sai để cải thiện nhanh hơn",
      "Theo dõi tiến độ và duy trì thói quen học mỗi ngày",
      "Hỗ trợ nhiều ngôn ngữ phổ biến",
      "Bài học ngắn gọn, trực quan, dễ tiếp thu",
      "Phù hợp cho học sinh, sinh viên, người đi làm và người tự học",
      "Sử dụng được trên iOS, Android và Web"
    ],
    "activationGuide": "",
    "gallery": null,
    "version": "",
    "developer": "Duolingo",
    "warrantyPolicy": "Bảo hành trong suốt thời gian sử dụng gói",
    "variants": [
      {
        "id": "0.954608222476914",
        "sku": "",
        "name": "12 Tháng",
        "price": 850000,
        "stock": 10,
        "originalPrice": 0
      }
    ],
    "reviews": [],
    "isActive": true,
    "pricingUnit": ""
  },
  {
    "id": "59ed2f21-5604-47fc-8afd-5c383d69ba18",
    "name": "Duolingo Super (12 Tháng)",
    "description": "Duolingo Super giúp học ngoại ngữ hiệu quả hơn với trải nghiệm không quảng cáo, luyện tập không giới hạn, sửa lỗi thông minh và theo dõi tiến độ học tập mỗi ngày.",
    "price": 680000,
    "originalPrice": 1200000,
    "discount": 43,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/7e9ekduf6l8_1778217796543.png",
    "category": "education",
    "rating": 5,
    "sold": 0,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-05-08T05:23:21.808969+00:00",
    "platforms": [
      "iOS",
      "Android",
      "Web"
    ],
    "features": [
      "Học ngoại ngữ không quảng cáo",
      "Luyện tập không giới hạn, không lo hết tim",
      "Ôn lại lỗi sai để cải thiện nhanh hơn",
      "Theo dõi tiến độ học tập hằng ngày",
      "Hỗ trợ nhiều ngôn ngữ phổ biến",
      "Bài học ngắn gọn, dễ hiểu, phù hợp mọi trình độ",
      "Luyện nghe, nói, đọc, viết một cách trực quan",
      "Phù hợp cho học sinh, sinh viên và người đi làm",
      "Giao diện vui nhộn, tạo động lực học mỗi ngày",
      "Sử dụng được trên iOS, Android và Web"
    ],
    "activationGuide": "",
    "gallery": null,
    "version": "",
    "developer": "Duolingo",
    "warrantyPolicy": "Bảo hành trong suốt thời gian sử dụng gói",
    "variants": [
      {
        "id": "0.48824496797663675",
        "sku": "",
        "name": "12 Tháng",
        "price": 680000,
        "stock": 10,
        "originalPrice": 0
      }
    ],
    "reviews": [],
    "isActive": true,
    "pricingUnit": ""
  },
  {
    "id": "dc2e12cc-5158-4f51-ab20-d0f734654e70",
    "name": "Veo 3.1 Ultra 45k credit ",
    "description": "Google AI Ultra hỗ trợ Veo 3.1 với 45K credit, dùng được Antigravity, phù hợp cho chạy dự án AI video, sáng tạo nội dung và xử lý công việc số lượng lớn trong thời gian ngắn.",
    "price": 500000,
    "originalPrice": 80000000,
    "discount": 99,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/scom9liuurk_1778216854907.png",
    "category": "ai",
    "rating": 5,
    "sold": 0,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-05-08T05:11:00.595355+00:00",
    "platforms": [
      "iOS",
      "Android",
      "Web"
    ],
    "features": [
      "Google AI Ultra dành cho nhu cầu sử dụng AI nâng cao",
      "Veo 3.1 với 45K credit tạo video AI",
      "Hỗ trợ tạo video từ prompt nhanh chóng",
      "Dùng được Antigravity cho lập trình và tự động hóa bằng AI",
      "Phù hợp chạy dự án số lượng lớn, ngắn hạn",
      "Hỗ trợ sáng tạo nội dung, marketing và sản xuất video",
      "Tạo ý tưởng, kịch bản và nội dung bằng AI",
      "Trải nghiệm các công cụ AI cao cấp từ Google",
      "Kích hoạt nhanh, sử dụng ổn định",
      "Phù hợp cho cá nhân, team content và agency"
    ],
    "activationGuide": "",
    "gallery": null,
    "version": "",
    "developer": "Google",
    "warrantyPolicy": "Bảo hành 10 ngày",
    "variants": [
      {
        "id": "0.7313670500149169",
        "sku": "",
        "name": "1 Tháng ",
        "price": 500000,
        "stock": 10,
        "originalPrice": 0
      }
    ],
    "reviews": [],
    "isActive": true,
    "pricingUnit": ""
  },
  {
    "id": "e0f87858-fc94-4a49-8348-cbcf2c9c910a",
    "name": "Google AI Ultra 30TB (1 Tháng)",
    "description": "Gói Gemini AI Ultra cao cấp nhất từ Google, tích hợp Gemini Ultra, Antigravity Ultra, NotebookLM Ultra, Nano Banana Pro, Veo 3 Ultra, Google AI Studio Ultra, Google Meet và 30TB lưu trữ. Phù hợp cho làm việc chuyên sâu, sáng tạo nội dung, lập trình, nghiên cứu và sản xuất video bằng AI.",
    "price": 600000,
    "originalPrice": 6000000,
    "discount": 90,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/i9sxsyyb57_1778140139137.png",
    "category": "ai",
    "rating": 5,
    "sold": 0,
    "isHot": true,
    "isNew": false,
    "created_at": "2026-05-07T07:49:05.292962+00:00",
    "platforms": [
      "Android",
      "Web",
      "MacOS",
      "Windows",
      "iOS"
    ],
    "features": [
      "Gemini AI Ultra cao cấp nhất từ Google",
      "Antigravity Ultra hỗ trợ lập trình và phát triển ứng dụng bằng AI",
      "NotebookLM Ultra hỗ trợ nghiên cứu, tóm tắt và phân tích tài liệu chuyên sâu",
      "Nano Banana Pro hỗ trợ tạo và chỉnh sửa hình ảnh bằng AI",
      "Veo 3 Ultra hỗ trợ tạo video AI chất lượng cao",
      "Google AI Studio Ultra hỗ trợ thử nghiệm prompt và xây dựng ứng dụng AI",
      "Dung lượng lưu trữ Google One 30TB",
      "Tích hợp Google Docs, Gmail, Sheets, Slides và Drive",
      "Hỗ trợ Google Meet với các tính năng AI nâng cao",
      "Phù hợp cho sáng tạo nội dung, học tập, làm việc, lập trình và sản xuất video"
    ],
    "activationGuide": "1. Nâng cấp trực tiếp trên Email chính chủ của bạn.\\n2. Shop sẽ gửi lời mời tham gia Family Google One (gói Premium AI).\\n3. Chấp nhận lời mời để kích hoạt.",
    "gallery": null,
    "version": "",
    "developer": "Google",
    "warrantyPolicy": "Bảo hành trong suốt thời gian sử dụng gói Hỗ trợ xử lý lỗi đăng nhập và lỗi kích hoạt Cam kết đúng gói, đúng dung lượng, đúng quyền lợi",
    "variants": [
      {
        "id": "0.07507382844114507",
        "sku": "",
        "name": "1 Năm",
        "price": 3900000,
        "stock": 10,
        "originalPrice": 0
      },
      {
        "id": "0.32699799562888965",
        "sku": "",
        "name": "3 Tháng",
        "price": 1700000,
        "stock": 10,
        "originalPrice": 0
      },
      {
        "id": "0.04705496865947156",
        "sku": "",
        "name": "6 Tháng",
        "price": 3000000,
        "stock": 10,
        "originalPrice": 0
      }
    ],
    "reviews": [],
    "isActive": true,
    "pricingUnit": ""
  },
  {
    "id": "11562dc2-8a2e-4780-860a-0cfa51fcf408",
    "name": "Microsoft 365 Family 12 Tháng",
    "description": "Microsoft 365 12 tháng là gói đăng ký toàn diện cho cá nhân hoặc gia đình, cung cấp bộ ứng dụng Office (Word, Excel, PowerPoint, Outlook) cùng 1TB OneDrive, hỗ trợ trên nhiều thiết bị (PC, Mac, di động), luôn cập nhật tính năng mới nhất, bảo mật nâng cao và tích hợp AI Copilot, giúp làm việc, sáng tạo và cộng tác hiệu quả mọi lúc, mọi nơi trong suốt một năm. \n",
    "price": 299000,
    "originalPrice": 299000,
    "discount": 0,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/pinm9hpqj2_1778172026925.png",
    "category": "work",
    "rating": 5,
    "sold": 0,
    "isHot": false,
    "isNew": false,
    "created_at": "2026-01-13T06:30:33.36964+00:00",
    "platforms": [
      "Web",
      "Android",
      "iOS",
      "MacOS",
      "Windows"
    ],
    "features": [
      "Ứng dụng Office: Word, Excel, PowerPoint, Outlook, OneNote và Teams (cho cuộc họp).",
      "Lưu trữ: 1TB dung lượng OneDrive (1000GB) bảo mật/người dùng.",
      "Thiết bị: Cài đặt đồng thời trên 5 thiết bị (PC, Mac, máy tính bảng, điện thoại).",
      "AI & Sáng tạo: Tích hợp Copilot AI và các công cụ như Designer, Clipchamp.",
      "Bảo mật: Tính năng bảo vệ chống mã độc tống tiền và bảo mật nâng cao cho dữ liệu.",
      "Cập nhật: Luôn nhận các tính năng, bản vá lỗi và cập nhật bảo mật mới nhất. "
    ],
    "activationGuide": "",
    "gallery": null,
    "version": "",
    "developer": "",
    "warrantyPolicy": "",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": null
  },
  {
    "id": "ddeea2f1-6565-483f-9e6b-bf888941f351",
    "name": "Youtube Premium 12 Tháng",
    "description": "YouTube Premium là dịch vụ trả phí nâng cao trải nghiệm YouTube, cho phép người dùng xem video không quảng cáo, phát video/nhạc trong nền (khi tắt màn hình/dùng ứng dụng khác) và tải video về xem offline, bao gồm cả truy cập miễn phí YouTube Music Premium để nghe nhạc không gián đoạn. ",
    "price": 850000,
    "originalPrice": 2300000,
    "discount": 63,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/a3hee6itw4_1778170571682.png",
    "category": "entertainment",
    "rating": 5,
    "sold": 0,
    "isHot": false,
    "isNew": false,
    "created_at": "2026-01-13T06:26:19.540612+00:00",
    "platforms": [
      "iOS",
      "Android",
      "Web"
    ],
    "features": [
      "Xem YouTube không quảng cáo",
      "Tải video về xem offline mọi lúc, mọi nơi",
      "Phát video trong nền khi tắt màn hình",
      "Sử dụng YouTube Music Premium",
      "Nghe nhạc không quảng cáo, chất lượng cao",
      "Hỗ trợ trên điện thoại, máy tính bảng, laptop và TV",
      "Trải nghiệm xem video mượt mà, không bị gián đoạn",
      "Phù hợp cho giải trí, học tập và nghe nhạc hằng ngày",
      "Tài khoản chính chủ, sử dụng ổn định",
      "Hỗ trợ nhanh khi cần trong quá trình sử dụng"
    ],
    "activationGuide": "",
    "gallery": null,
    "version": "",
    "developer": "Google",
    "warrantyPolicy": "Bảo hành trong suốt thời gian sử dụng gói",
    "variants": [
      {
        "id": "0.13494056240899233",
        "sku": "",
        "name": "12 Tháng",
        "price": 800000,
        "stock": 10,
        "originalPrice": 0
      }
    ],
    "reviews": [],
    "isActive": true,
    "pricingUnit": null
  },
  {
    "id": "a5c82644-64d5-4c86-af98-ea2f74014e1c",
    "name": "KREA AI Basic",
    "description": "Krea AI chính là “studio sáng tạo AI thời gian thực” đột phá nhất hiện nay, cho phép bất kỳ ai – từ designer chuyên nghiệp đến người mới bắt đầu – cũng có thể tạo, chỉnh sửa và nâng cấp hình ảnh, video chỉ bằng vài cú click mà không cần phần mềm phức tạp. Ra mắt từ năm 2023 và bùng nổ suốt 2024-2025 với hơn 50 cập nhật lớn, Krea AI biến ý tưởng mơ hồ như “một thành phố cyberpunk lúc hoàng hôn, phong cách phim Blade Runner, chi tiết cao” thành hình ảnh/video chất lượng chuyên nghiệp ngay lập tức trên canvas realtime, kèm công cụ enhancer mạnh mẽ lên đến 22K và video generation từ các model hàng đầu như Flux, Kling, Runway.",
    "price": 260000,
    "originalPrice": 530000,
    "discount": 51,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/ae9qsubx42r_1778219638803.png",
    "category": "ai",
    "rating": 5,
    "sold": 0,
    "isHot": false,
    "isNew": false,
    "created_at": "2026-01-13T06:21:10.286221+00:00",
    "platforms": [
      "Windows",
      "MacOS",
      "iOS",
      "Android",
      "Web"
    ],
    "features": [],
    "activationGuide": "",
    "gallery": null,
    "version": "",
    "developer": "",
    "warrantyPolicy": "",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": null
  },
  {
    "id": "980fb649-f88c-4f97-8a82-81b0d2db135f",
    "name": "Gamma Plus",
    "description": "Gamma là đối tác thiết kế AI giúp bạn tạo ra các bài thuyết trình, trang web, bài đăng trên mạng xã hội dễ dàng, v.v. để bạn có thể tập trung vào những gì mình làm tốt nhất.",
    "price": 290000,
    "originalPrice": 530000,
    "discount": 45,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/6rj03kmoj7f_1778171894870.png",
    "category": "ai",
    "rating": 5,
    "sold": 0,
    "isHot": false,
    "isNew": false,
    "created_at": "2026-01-13T06:12:50.174429+00:00",
    "platforms": [
      "Windows",
      "MacOS",
      "iOS",
      "Android",
      "Web"
    ],
    "features": [],
    "activationGuide": "",
    "gallery": null,
    "version": "",
    "developer": "",
    "warrantyPolicy": "",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": null
  },
  {
    "id": "d547f984-08a5-417c-8b24-4db9d333503f",
    "name": "Netflix Premium",
    "description": "Netflix là dịch vụ xem phim và chương trình truyền hình trực tuyến theo yêu cầu (streaming) trả phí, cung cấp thư viện khổng lồ gồm phim, series, tài liệu... trên nhiều thiết bị có internet (TV, điện thoại, máy tính bảng) với nội dung đa dạng, từ phim Hollywood đến phim gốc độc quyền (Netflix Originals) và được cá nhân hóa theo sở thích người dùng thông qua hệ thống đề xuất thông minh, tạo trải nghiệm giải trí linh hoạt, không quảng cáo. \n",
    "price": 99000,
    "originalPrice": 300000,
    "discount": 67,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/qz9ucxuqed_1778171201378.png",
    "category": "entertainment",
    "rating": 5,
    "sold": 0,
    "isHot": false,
    "isNew": false,
    "created_at": "2026-01-13T06:02:40.472884+00:00",
    "platforms": [
      "iOS",
      "Android",
      "Web",
      "MacOS"
    ],
    "features": [],
    "activationGuide": "",
    "gallery": null,
    "version": "",
    "developer": "",
    "warrantyPolicy": "",
    "variants": [
      {
        "id": "0.7586788427107627",
        "sku": "",
        "name": "1 Tháng ",
        "price": 990000,
        "stock": 10,
        "originalPrice": 0
      }
    ],
    "reviews": [],
    "isActive": true,
    "pricingUnit": null
  },
  {
    "id": "9d8312bc-253d-4210-8a64-658a0182385d",
    "name": "Super Grok ",
    "description": "Grok 3, Grok 4 sản phẩm mới nhất từ xAI, đang định hình lại cách chúng ta tương tác với công nghệ AI. Với khả năng xử lý ngôn ngữ tự nhiên vượt trội và tính năng cập nhật thời gian thực, Grok 3 mang đến trải nghiệm độc đáo cho người dùng.",
    "price": 399000,
    "originalPrice": 1580000,
    "discount": 75,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/u94zwqgoj7h_1778170241243.png",
    "category": "ai",
    "rating": 5,
    "sold": 0,
    "isHot": false,
    "isNew": false,
    "created_at": "2026-01-13T05:46:03.52675+00:00",
    "platforms": [
      "MacOS",
      "iOS",
      "Android",
      "Web",
      "Windows"
    ],
    "features": [],
    "activationGuide": "",
    "gallery": null,
    "version": "",
    "developer": "x AI",
    "warrantyPolicy": "",
    "variants": [
      {
        "id": "0.7240214336857692",
        "name": "1 tháng",
        "price": 0,
        "originalPrice": 0
      }
    ],
    "reviews": [],
    "isActive": true,
    "pricingUnit": null
  },
  {
    "id": "52814868-e9fe-439f-b8a0-a71f920490d8",
    "name": "Spotify Premium Member 3 tháng",
    "description": "Lưu ý: \n- Đây là Tài khoản Premium Spotify đã tạo sẵn region US hoặc Bangladesh có thời hạn 1 tháng.\n\n- Quý khách vui lòng không thay đổi thông tin email, nếu thay đổi Divineshop sẽ từ chối bảo hành. \n\n- Tài khoản sẽ được Divine Shop thu hồi sau khi hết hạn 1 tháng.",
    "price": 109000,
    "originalPrice": 195000,
    "discount": 44,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/ht54z1ba3im_1778172536459.png",
    "category": "entertainment",
    "rating": 5,
    "sold": 0,
    "isHot": true,
    "isNew": false,
    "created_at": "2026-01-08T08:25:38.227122+00:00",
    "platforms": [
      "Windows",
      "iOS",
      "MacOS",
      "Android"
    ],
    "features": [],
    "activationGuide": "",
    "gallery": null,
    "version": "",
    "developer": "Spotify ",
    "warrantyPolicy": "",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": null
  },
  {
    "id": "67f39428-496d-428f-8e19-8749c1226097",
    "name": "Tài Khoản Adobe Bản Quyền",
    "description": "Tài khoản Adobe bản quyền Full App có những đặc điểm:\n\nLoại tài khoản: Tài khoản Adobe bản quyền Full App + các Opt trực tiếp từ nhà phát hành Adobe.\nThời gian giao tài khoản: Trong vòng 10 phút.\nChính sách bảo hành: Bảo hành 100% trong thời gian sử dụng nếu có bất kỳ lỗi nào.\nDung lượng Cloud: Dung lượng tặng kèm từ 100GB + 1000 Credit Generative Fill.",
    "price": 999000,
    "originalPrice": 3000000,
    "discount": 67,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/7925tsfwcg9_1778310242383.png",
    "category": "design",
    "rating": 5,
    "sold": 0,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-01-08T08:22:21.131148+00:00",
    "platforms": [],
    "features": [],
    "activationGuide": "",
    "gallery": null,
    "version": "",
    "developer": "",
    "warrantyPolicy": "",
    "variants": [],
    "reviews": [],
    "isActive": true,
    "pricingUnit": null
  },
  {
    "id": "eae317ae-7d02-442b-a7f3-2a5719d77a90",
    "name": "GitHub Copilot (1 Năm)",
    "description": "Trợ lý lập trình AI đắc lực. Tự động gợi ý code, fix bug và viết unit test.",
    "price": 990000,
    "originalPrice": 2400000,
    "discount": 59,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/trhfeu4pyyb_1778172748568.png",
    "category": "ai",
    "rating": 5,
    "sold": 3100,
    "isHot": false,
    "isNew": false,
    "created_at": "2026-01-07T06:10:02.625277+00:00",
    "platforms": [
      "VS Code",
      "Visual Studio",
      "JetBrains",
      "Neovim"
    ],
    "features": [
      "Gợi ý code theo thời gian thực",
      "Chat trực tiếp với Codebase",
      "Hỗ trợ đa ngôn ngữ: Python, JS, Go...",
      "Tự động viết Unit Test"
    ],
    "activationGuide": "1. Cung cấp Username GitHub của bạn cho shop.\\n2. Shop sẽ kích hoạt gói Copilot vào tài khoản chính chủ của bạn.\\n3. Cài đặt Extension GitHub Copilot vào VS Code và đăng nhập để sử dụng.",
    "gallery": null,
    "version": "Individual",
    "developer": "GitHub (Microsoft)",
    "warrantyPolicy": null,
    "variants": [],
    "reviews": [
      {
        "id": "r5n9t2143",
        "date": "7/1/2026",
        "user": "vbcfb",
        "rating": 5,
        "comment": "fbxcb",
        "purchasedType": "Gói mặc định"
      },
      {
        "id": "rv_ai_1",
        "date": "16/03/2024",
        "user": "Dev Coder",
        "rating": 5,
        "comment": "ChatGPT Plus phản hồi cực nhanh, GPT-4 thông minh hơn hẳn bản thường. Shop hỗ trợ bảo hành nhanh gọn.",
        "purchasedType": "1 Tháng"
      },
      {
        "id": "rv_ai_2",
        "date": "13/03/2024",
        "user": "Mai Marketing",
        "rating": 5,
        "comment": "Mua account dùng chung mà tốc độ vẫn rất tốt, ít khi bị queue. Rất đáng tiền để trải nghiệm công nghệ mới.",
        "purchasedType": "1 Tháng"
      }
    ],
    "isActive": true,
    "pricingUnit": null
  },
  {
    "id": "666a6ba9-07f6-4abe-a41f-446a82769af4",
    "name": "Google AI Pro (5TB)",
    "description": "Gói Google AI Pro cao cấp gồm Gemini AI Pro, Antigravity Pro, NotebookLM Pro, Nano Banana Pro, 5TB Drive, Google Meet và Google AI Studio Pro. Tối ưu cho học tập, làm việc, sáng tạo nội dung và xử lý AI chuyên sâu.",
    "price": 600000,
    "originalPrice": 6000000,
    "discount": 90,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/5tovslhnw29_1778139474724.png",
    "category": "ai",
    "rating": 4.7,
    "sold": 1200,
    "isHot": true,
    "isNew": false,
    "created_at": "2026-01-07T06:10:02.625277+00:00",
    "platforms": [
      "Web",
      "Android",
      "iOS"
    ],
    "features": [
      "Gemini AI Pro hỗ trợ xử lý văn bản, hình ảnh, code và dữ liệu",
      "Tích hợp sâu với Google Docs, Gmail, Sheets, Slides và Drive",
      "NotebookLM Pro hỗ trợ tóm tắt tài liệu, ghi chú và nghiên cứu thông minh",
      "Antigravity Pro hỗ trợ lập trình, xây dựng ứng dụng và tự động hóa bằng AI",
      "Nano Banana Pro hỗ trợ tạo và chỉnh sửa hình ảnh bằng AI",
      "Google AI Studio Pro dành cho thử nghiệm, tạo prompt và phát triển ứng dụng AI",
      "Dung lượng lưu trữ Google One 5TB",
      "Hỗ trợ Google Meet với các tính năng AI nâng cao",
      "Phù hợp cho học tập, làm việc, sáng tạo nội dung và lập trình",
      "Sử dụng được trên Web, iOS và Android"
    ],
    "activationGuide": "1. Nâng cấp trực tiếp trên Email chính chủ của bạn.\\n2. Shop sẽ gửi lời mời tham gia Family Google One (gói Premium AI).\\n3. Chấp nhận lời mời để kích hoạt.",
    "gallery": null,
    "version": "Advanced",
    "developer": "Google",
    "warrantyPolicy": "Bảo Hành Full time",
    "variants": [
      {
        "id": "0.8059568625572735",
        "sku": "",
        "name": "6 Tháng",
        "price": 350000,
        "stock": 10,
        "originalPrice": 0
      },
      {
        "id": "0.14713708982282547",
        "sku": "",
        "name": "12 Tháng",
        "price": 600000,
        "stock": 10,
        "originalPrice": 0
      },
      {
        "id": "0.09807636650572582",
        "sku": "",
        "name": "24 Tháng",
        "price": 900000,
        "stock": 10,
        "originalPrice": 0
      }
    ],
    "reviews": [
      {
        "id": "rv_ai_1",
        "date": "16/03/2024",
        "user": "Dev Coder",
        "rating": 5,
        "comment": "ChatGPT Plus phản hồi cực nhanh, GPT-4 thông minh hơn hẳn bản thường. Shop hỗ trợ bảo hành nhanh gọn.",
        "purchasedType": "1 Tháng"
      },
      {
        "id": "rv_ai_2",
        "date": "13/03/2024",
        "user": "Mai Marketing",
        "rating": 5,
        "comment": "Mua account dùng chung mà tốc độ vẫn rất tốt, ít khi bị queue. Rất đáng tiền để trải nghiệm công nghệ mới.",
        "purchasedType": "1 Tháng"
      }
    ],
    "isActive": true,
    "pricingUnit": ""
  },
  {
    "id": "f4852365-183a-4dd9-bc5b-0da4dec3d36c",
    "name": "Perplexity Pro (4 Tháng)",
    "description": "Perplexity Pro là công cụ tìm kiếm AI cao cấp, giúp tra cứu thông tin nhanh, trả lời có trích dẫn nguồn rõ ràng, hỗ trợ nghiên cứu chuyên sâu, phân tích tài liệu và lựa chọn nhiều mô hình AI mạnh mẽ cho học tập, công việc và sáng tạo nội dung.",
    "price": 850000,
    "originalPrice": 2000000,
    "discount": 57,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/fggh7tp31wi_1778170989942.png",
    "category": "ai",
    "rating": 4.8,
    "sold": 980,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-01-07T06:10:02.625277+00:00",
    "platforms": [
      "Web",
      "iOS",
      "Android"
    ],
    "features": [
      "Sử dụng GPT-4o hoặc Claude 3 tùy chọn",
      "Tìm kiếm thời gian thực không quảng cáo",
      "Pro Search chuyên sâu",
      "Upload file PDF để phân tích"
    ],
    "activationGuide": "1. Nhận tài khoản đăng nhập (Email/Pass).\\n2. Truy cập perplexity.ai để sử dụng.\\n3. Vào cài đặt để chuyển đổi giữa các Model AI (GPT-4, Claude 3...).",
    "gallery": null,
    "version": "Pro",
    "developer": "Perplexity",
    "warrantyPolicy": "Bảo hành trong suốt thời gian sử dụng gói",
    "variants": [
      {
        "id": "0.049669396369564245",
        "sku": "",
        "name": "4 Tháng",
        "price": 850000,
        "stock": 10,
        "originalPrice": 0
      }
    ],
    "reviews": [
      {
        "id": "rv_ai_1",
        "date": "16/03/2024",
        "user": "Dev Coder",
        "rating": 5,
        "comment": "ChatGPT Plus phản hồi cực nhanh, GPT-4 thông minh hơn hẳn bản thường. Shop hỗ trợ bảo hành nhanh gọn.",
        "purchasedType": "1 Tháng"
      },
      {
        "id": "rv_ai_2",
        "date": "13/03/2024",
        "user": "Mai Marketing",
        "rating": 5,
        "comment": "Mua account dùng chung mà tốc độ vẫn rất tốt, ít khi bị queue. Rất đáng tiền để trải nghiệm công nghệ mới.",
        "purchasedType": "1 Tháng"
      }
    ],
    "isActive": true,
    "pricingUnit": null
  },
  {
    "id": "1a3e6b88-03ee-4989-8842-f8e4abee7e7d",
    "name": "Tài khoản Midjourney Pro",
    "description": "Tạo ảnh nghệ thuật AI chất lượng cao nhất hiện nay. Bản quyền thương mại.",
    "price": 890000,
    "originalPrice": 1200000,
    "discount": 26,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/nv9m5l002vm_1778171661186.png",
    "category": "ai",
    "rating": 4.9,
    "sold": 8500,
    "isHot": true,
    "isNew": false,
    "created_at": "2026-01-07T06:10:02.625277+00:00",
    "platforms": [
      "Web",
      "Discord"
    ],
    "features": [
      "Tạo ảnh không giới hạn (Relax mode)",
      "Quyền thương mại (Commercial Usage)",
      "Truy cập thư viện thành viên",
      "Tốc độ tạo ảnh Fast Hours: 15h/tháng"
    ],
    "activationGuide": "1. Bạn sẽ nhận được link mời vào Server Discord riêng hoặc Tài khoản Discord.\\n2. Tham gia server và sử dụng lệnh /imagine để tạo ảnh.\\n3. Có thể quản lý ảnh tại midjourney.com/app",
    "gallery": null,
    "version": "Standard Plan",
    "developer": "Midjourney Inc.",
    "warrantyPolicy": null,
    "variants": [],
    "reviews": [
      {
        "id": "rv_ai_1",
        "date": "16/03/2024",
        "user": "Dev Coder",
        "rating": 4,
        "comment": "ChatGPT Plus phản hồi cực nhanh, GPT-4 thông minh hơn hẳn bản thường. Shop hỗ trợ bảo hành nhanh gọn.",
        "purchasedType": "1 Tháng"
      },
      {
        "id": "rv_ai_2",
        "date": "13/03/2024",
        "user": "Mai Marketing",
        "rating": 5,
        "comment": "Mua account dùng chung mà tốc độ vẫn rất tốt, ít khi bị queue. Rất đáng tiền để trải nghiệm công nghệ mới.",
        "purchasedType": "1 Tháng"
      }
    ],
    "isActive": true,
    "pricingUnit": null
  },
  {
    "id": "9c811322-e3df-406b-bfea-b5df6bb45499",
    "name": "Claude PRO Team",
    "description": "Claude Pro là trợ lý AI cao cấp từ Anthropic, nổi bật với khả năng viết tự nhiên, phân tích tài liệu, hỗ trợ lập trình, tóm tắt nội dung và xử lý công việc chuyên sâu với độ chính xác cao.",
    "price": 460000,
    "originalPrice": 700000,
    "discount": 34,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/yd4n7a5gb5_1778170092237.png",
    "category": "ai",
    "rating": 4.9,
    "sold": 4200,
    "isHot": true,
    "isNew": true,
    "created_at": "2026-01-07T06:10:02.625277+00:00",
    "platforms": [
      "Web",
      "iOS"
    ],
    "features": [
      "Model Opus thông minh nhất",
      "Cửa sổ ngữ cảnh 200k tokens",
      "Khả năng lập trình siêu việt",
      "Viết content văn phong tự nhiên"
    ],
    "activationGuide": "1. Nhận thông tin tài khoản qua Email.\\n2. Truy cập: claude.ai\\n3. Đăng nhập và bắt đầu sử dụng.\\n\\nBảo hành: 1 đổi 1 trong suốt thời gian sử dụng.",
    "gallery": null,
    "version": "Pro",
    "developer": "Anthropic",
    "warrantyPolicy": "Bảo hành trong suốt thời gian sử dụng gói",
    "variants": [
      {
        "id": "0.38853894098672126",
        "sku": "",
        "name": "1 Tháng",
        "price": 460000,
        "stock": 10,
        "originalPrice": 0
      }
    ],
    "reviews": [
      {
        "id": "rv_ai_1",
        "date": "16/03/2024",
        "user": "Dev Coder",
        "rating": 5,
        "comment": "ChatGPT Plus phản hồi cực nhanh, GPT-4 thông minh hơn hẳn bản thường. Shop hỗ trợ bảo hành nhanh gọn.",
        "purchasedType": "1 Tháng"
      },
      {
        "id": "rv_ai_2",
        "date": "13/03/2024",
        "user": "Mai Marketing",
        "rating": 5,
        "comment": "Mua account dùng chung mà tốc độ vẫn rất tốt, ít khi bị queue. Rất đáng tiền để trải nghiệm công nghệ mới.",
        "purchasedType": "1 Tháng"
      }
    ],
    "isActive": true,
    "pricingUnit": null
  },
  {
    "id": "4c00d9d1-fa70-4c4d-89d2-910a2e38e6de",
    "name": "ChatGPT Plus (1 Tháng)",
    "description": "🤖 NÂNG CẤP CHATGPT PLUS CHÍNH CHỦ\nBạn muốn sử dụng ChatGPT bản Plus nhưng không muốn trả phí gốc tới gần 500.000đ/tháng?\nGiải pháp tiết kiệm và an toàn chính là nâng cấp ChatGPT Plus\n\n🚀 Quyền lợi khi dùng ChatGPT Plus:\n⚡ Truy cập GPT-4 Turbo – tốc độ nhanh, khả năng hiểu vượt trội\n\n✍️ Viết content, email, kịch bản, luận văn, mã lập trình cực kỳ mượt mà\n\n🌐 Hoạt động mượt mọi khung giờ, kể cả giờ cao điểm\n\n🔁 Truy cập trên mọi thiết bị: điện thoại, máy tính, app…\n\n🔐 Chính chủ Team Slot là gì?\nBạn cung cấp email cá nhân (Gmail, Outlook, Edu…)\n\nĐược thêm vào team OpenAI chính chủ\n\nKhông phải tài khoản dùng chung → bạn toàn quyền sử dụng\n\nTrải nghiệm y như tự đăng ký từ OpenAI\n\n🛠 Quy trình nâng cấp:\nGửi email bạn muốn nâng cấp\n\nĐược thêm vào Team chính chủ OpenAI\n\nKiểm tra và sử dụng ngay ChatGPT Plus (GPT-4 Turbo)\n\n⏱ Thời gian xử lý: 5–10 phút",
    "price": 460000,
    "originalPrice": 530000,
    "discount": 13,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/o5extbctakt_1778142741163.png",
    "category": "ai",
    "rating": 5,
    "sold": 12540,
    "isHot": true,
    "isNew": false,
    "created_at": "2026-01-07T06:10:02.625277+00:00",
    "platforms": [
      "Web",
      "iOS",
      "Android",
      "MacOS"
    ],
    "features": [
      "Truy cập GPT-4o mới nhất",
      "Tạo ảnh với DALL-E 3",
      "Phân tích dữ liệu nâng cao",
      "Duyệt web thời gian thực",
      "Quyền ưu tiên khi server quá tải"
    ],
    "activationGuide": "1. Sau khi thanh toán, bạn sẽ nhận được Email và Mật khẩu đăng nhập.\\n2. Truy cập: chat.openai.com\\n3. Đăng nhập bằng tài khoản được cấp.\\n4. Chọn model \"GPT-4\" ở góc trên cùng để bắt đầu sử dụng.\\n\\nLưu ý: Không thay đổi thông tin tài khoản để được bảo hành.",
    "gallery": null,
    "version": "Plus",
    "developer": "OpenAI",
    "warrantyPolicy": null,
    "variants": [
      {
        "id": "0.876248169150968",
        "sku": "",
        "name": "ChatGPT Business",
        "price": 500000,
        "stock": 10,
        "originalPrice": 0
      },
      {
        "id": "0.32561134580355755",
        "sku": "",
        "name": "ChatGPT Go (1 năm)",
        "price": 670000,
        "stock": 10,
        "originalPrice": 0
      }
    ],
    "reviews": [
      {
        "id": "e8yk0hpsw",
        "date": "7/1/2026",
        "user": "hgfh",
        "rating": 5,
        "comment": "gfhf",
        "purchasedType": "Gói mặc định"
      },
      {
        "id": "fr7dvfc9y",
        "date": "7/1/2026",
        "user": "tturt",
        "rating": 5,
        "comment": "ủturtu",
        "purchasedType": "Gói mặc định"
      },
      {
        "id": "rv_ai_1",
        "date": "16/03/2024",
        "user": "Dev Coder",
        "rating": 5,
        "comment": "ChatGPT Plus phản hồi cực nhanh, GPT-4 thông minh hơn hẳn bản thường. Shop hỗ trợ bảo hành nhanh gọn.",
        "purchasedType": "1 Tháng"
      },
      {
        "id": "rv_ai_2",
        "date": "13/03/2024",
        "user": "Mai Marketing",
        "rating": 5,
        "comment": "Mua account dùng chung mà tốc độ vẫn rất tốt, ít khi bị queue. Rất đáng tiền để trải nghiệm công nghệ mới.",
        "purchasedType": "1 Tháng"
      }
    ],
    "isActive": true,
    "pricingUnit": null
  },
  {
    "id": "53aa3126-fea2-47ca-960d-d21e52910ad9",
    "name": "Grammarly Premium (1 Năm)",
    "description": "Sửa lỗi ngữ pháp, đạo văn và gợi ý từ vựng tiếng Anh chuyên nghiệp.",
    "price": 450000,
    "originalPrice": 2800000,
    "discount": 84,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/48qrt5icl17_1778171459115.png",
    "category": "ai",
    "rating": 5,
    "sold": 15600,
    "isHot": true,
    "isNew": false,
    "created_at": "2026-01-07T06:10:02.625277+00:00",
    "platforms": [
      "Web",
      "Windows",
      "MacOS",
      "Word",
      "Chrome"
    ],
    "features": [
      "Check đạo văn (Plagiarism)",
      "Sửa lỗi ngữ pháp nâng cao",
      "Gợi ý văn phong (Tone detector)",
      "Viết lại câu (Rewrite sentences)"
    ],
    "activationGuide": "1. Nhận tài khoản Premium (dạng share hoặc chính chủ tùy gói).\\n2. Đăng nhập tại grammarly.com.\\n3. Cài đặt Extension hoặc App để sử dụng trên mọi nền tảng.",
    "gallery": null,
    "version": "Premium",
    "developer": "Grammarly Inc.",
    "warrantyPolicy": null,
    "variants": [],
    "reviews": [
      {
        "id": "rhdb21wb4",
        "date": "8/1/2026",
        "user": "u9b9by",
        "rating": 5,
        "comment": "bb",
        "purchasedType": "Gói mặc định"
      },
      {
        "id": "rv_ai_1",
        "date": "16/03/2024",
        "user": "Dev Coder",
        "rating": 5,
        "comment": "ChatGPT Plus phản hồi cực nhanh, GPT-4 thông minh hơn hẳn bản thường. Shop hỗ trợ bảo hành nhanh gọn.",
        "purchasedType": "1 Tháng"
      },
      {
        "id": "rv_ai_2",
        "date": "13/03/2024",
        "user": "Mai Marketing",
        "rating": 5,
        "comment": "Mua account dùng chung mà tốc độ vẫn rất tốt, ít khi bị queue. Rất đáng tiền để trải nghiệm công nghệ mới.",
        "purchasedType": "1 Tháng"
      }
    ],
    "isActive": true,
    "pricingUnit": null
  },
  {
    "id": "8dcf6a9d-c0e5-44ca-a72e-596d335bc785",
    "name": "ElevenLabs (Tạo giọng nói AI)",
    "description": "Chuyển văn bản thành giọng nói (TTS) cảm xúc nhất. Clone giọng nói của chính bạn.",
    "price": 120000,
    "originalPrice": 250000,
    "discount": 52,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/ksi7rlkbqp_1778218570170.png",
    "category": "ai",
    "rating": 4.7,
    "sold": 1500,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-01-07T06:10:02.625277+00:00",
    "platforms": [
      "Web"
    ],
    "features": [
      "30,000 ký tự mỗi tháng",
      "Tạo giọng nói tùy chỉnh (Voice Cloning)",
      "Giọng đọc cảm xúc tự nhiên",
      "Quyền thương mại"
    ],
    "activationGuide": "1. Nhận tài khoản ElevenLabs gói Starter.\\n2. Đăng nhập và vào mục Speech Synthesis để tạo giọng đọc.\\n3. Tải file MP3 về máy.",
    "gallery": null,
    "version": "Starter",
    "developer": "ElevenLabs",
    "warrantyPolicy": null,
    "variants": [],
    "reviews": [
      {
        "id": "rv_ai_1",
        "date": "16/03/2024",
        "user": "Dev Coder",
        "rating": 5,
        "comment": "ChatGPT Plus phản hồi cực nhanh, GPT-4 thông minh hơn hẳn bản thường. Shop hỗ trợ bảo hành nhanh gọn.",
        "purchasedType": "1 Tháng"
      },
      {
        "id": "rv_ai_2",
        "date": "13/03/2024",
        "user": "Mai Marketing",
        "rating": 5,
        "comment": "Mua account dùng chung mà tốc độ vẫn rất tốt, ít khi bị queue. Rất đáng tiền để trải nghiệm công nghệ mới.",
        "purchasedType": "1 Tháng"
      }
    ],
    "isActive": true,
    "pricingUnit": null
  },
  {
    "id": "c1da52c7-a6de-4435-a1f7-9efab969589d",
    "name": "RunwayML Standard (Video AI)",
    "description": "Công cụ biến ảnh tĩnh thành video động (Gen-2) đình đám nhất hiện nay.",
    "price": 350000,
    "originalPrice": 700000,
    "discount": 50,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/d2kklkz247_1778218363328.png",
    "category": "ai",
    "rating": 4.6,
    "sold": 540,
    "isHot": false,
    "isNew": true,
    "created_at": "2026-01-07T06:10:02.625277+00:00",
    "platforms": [
      "Web"
    ],
    "features": [
      "625 credits/tháng",
      "Xóa Watermark",
      "Video độ phân giải 4K",
      "Gen-1 & Gen-2 Models"
    ],
    "activationGuide": "1. Nhận tài khoản RunwayML Standard.\\n2. Truy cập runwayml.com để tạo video AI.",
    "gallery": null,
    "version": "Standard",
    "developer": "Runway",
    "warrantyPolicy": null,
    "variants": [],
    "reviews": [
      {
        "id": "rv_ai_1",
        "date": "16/03/2024",
        "user": "Dev Coder",
        "rating": 5,
        "comment": "ChatGPT Plus phản hồi cực nhanh, GPT-4 thông minh hơn hẳn bản thường. Shop hỗ trợ bảo hành nhanh gọn.",
        "purchasedType": "1 Tháng"
      },
      {
        "id": "rv_ai_2",
        "date": "13/03/2024",
        "user": "Mai Marketing",
        "rating": 5,
        "comment": "Mua account dùng chung mà tốc độ vẫn rất tốt, ít khi bị queue. Rất đáng tiền để trải nghiệm công nghệ mới.",
        "purchasedType": "1 Tháng"
      }
    ],
    "isActive": true,
    "pricingUnit": null
  },
  {
    "id": "b6e378c6-8421-48d8-8e67-8d830333a686",
    "name": "Tài khoản Leonardo.ai (Apprentice)",
    "description": "Nền tảng tạo Game Assets và Art AI tuyệt đẹp. Thay thế xứng đáng cho Midjourney.",
    "price": 220000,
    "originalPrice": 400000,
    "discount": 45,
    "image": "https://thpt-hoangmai.edu.vn/wp-content/uploads/2025/02/cong-cu-AI-sang-tao-noi-dung.png",
    "category": "ai",
    "rating": 4.6,
    "sold": 2100,
    "isHot": false,
    "isNew": false,
    "created_at": "2026-01-07T06:10:02.625277+00:00",
    "platforms": [
      "Web"
    ],
    "features": [
      "8,500 token mỗi tháng",
      "Tạo ảnh riêng tư (Private generation)",
      "Alchemy Upscaler",
      "Quyền thương mại"
    ],
    "activationGuide": "1. Cung cấp Email để shop nâng cấp hoặc nhận tài khoản có sẵn.\\n2. Truy cập leonardo.ai để sáng tạo.",
    "gallery": null,
    "version": "Apprentice",
    "developer": "Leonardo.ai",
    "warrantyPolicy": null,
    "variants": [],
    "reviews": [
      {
        "id": "rv_ai_1",
        "date": "16/03/2024",
        "user": "Dev Coder",
        "rating": 5,
        "comment": "ChatGPT Plus phản hồi cực nhanh, GPT-4 thông minh hơn hẳn bản thường. Shop hỗ trợ bảo hành nhanh gọn.",
        "purchasedType": "1 Tháng"
      },
      {
        "id": "rv_ai_2",
        "date": "13/03/2024",
        "user": "Mai Marketing",
        "rating": 5,
        "comment": "Mua account dùng chung mà tốc độ vẫn rất tốt, ít khi bị queue. Rất đáng tiền để trải nghiệm công nghệ mới.",
        "purchasedType": "1 Tháng"
      }
    ],
    "isActive": true,
    "pricingUnit": null
  },
  {
    "id": "e67dea97-4442-4ad8-b283-9a99c28c6f26",
    "name": "Nâng cấp Notion AI",
    "description": "Viết, tóm tắt và brainstorm ý tưởng ngay trong không gian làm việc Notion của bạn.",
    "price": 300000,
    "originalPrice": 520000,
    "discount": 42,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/shb3sczt5ds_1778170805491.png",
    "category": "ai",
    "rating": 4.8,
    "sold": 2300,
    "isHot": false,
    "isNew": false,
    "created_at": "2026-01-07T06:10:02.625277+00:00",
    "platforms": [
      "Web",
      "Windows",
      "MacOS",
      "iOS",
      "Android"
    ],
    "features": [
      "Tự động tóm tắt ghi chú",
      "Cải thiện văn phong viết",
      "Dịch thuật đa ngôn ngữ",
      "Tạo bảng và to-do list tự động"
    ],
    "activationGuide": "1. Gửi Email tài khoản Notion cần nâng cấp.\\n2. Shop sẽ tiến hành add gói AI vào Workspace của bạn.\\n3. Kiểm tra mục Settings & Members để xác nhận.",
    "gallery": null,
    "version": "Add-on",
    "developer": "Notion Labs",
    "warrantyPolicy": null,
    "variants": [
      {
        "id": "0.533642665264249",
        "sku": "",
        "name": "1 Tháng",
        "price": 300000,
        "stock": 10,
        "originalPrice": 0
      }
    ],
    "reviews": [
      {
        "id": "rv_ai_1",
        "date": "16/03/2024",
        "user": "Dev Coder",
        "rating": 5,
        "comment": "ChatGPT Plus phản hồi cực nhanh, GPT-4 thông minh hơn hẳn bản thường. Shop hỗ trợ bảo hành nhanh gọn.",
        "purchasedType": "1 Tháng"
      },
      {
        "id": "rv_ai_2",
        "date": "13/03/2024",
        "user": "Mai Marketing",
        "rating": 5,
        "comment": "Mua account dùng chung mà tốc độ vẫn rất tốt, ít khi bị queue. Rất đáng tiền để trải nghiệm công nghệ mới.",
        "purchasedType": "1 Tháng"
      }
    ],
    "isActive": true,
    "pricingUnit": null
  },
  {
    "id": "0956d34f-4b15-4c42-8329-32c7ec1f1051",
    "name": "Quillbot Premium (1 Năm)",
    "description": "Công cụ Paraphrase (viết lại câu) tốt nhất thế giới. Hỗ trợ né AI detector.",
    "price": 290000,
    "originalPrice": 900000,
    "discount": 68,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/kqq35x9xgie_1778217395521.png",
    "category": "ai",
    "rating": 4.8,
    "sold": 6700,
    "isHot": false,
    "isNew": false,
    "created_at": "2026-01-07T06:10:02.625277+00:00",
    "platforms": [
      "Web",
      "Word",
      "Chrome"
    ],
    "features": [
      "Paraphrase không giới hạn từ",
      "7 chế độ viết lại (Formal, Simple...)",
      "So sánh các bản dịch",
      "Trình kiểm tra ngữ pháp"
    ],
    "activationGuide": "1. Nhận thông tin đăng nhập tài khoản Premium.\\n2. Truy cập quillbot.com.\\n3. Cài đặt Add-on cho Chrome hoặc Word nếu cần.",
    "gallery": null,
    "version": "Premium",
    "developer": "Quillbot",
    "warrantyPolicy": null,
    "variants": [],
    "reviews": [
      {
        "id": "rv_ai_1",
        "date": "16/03/2024",
        "user": "Dev Coder",
        "rating": 5,
        "comment": "ChatGPT Plus phản hồi cực nhanh, GPT-4 thông minh hơn hẳn bản thường. Shop hỗ trợ bảo hành nhanh gọn.",
        "purchasedType": "1 Tháng"
      },
      {
        "id": "rv_ai_2",
        "date": "13/03/2024",
        "user": "Mai Marketing",
        "rating": 5,
        "comment": "Mua account dùng chung mà tốc độ vẫn rất tốt, ít khi bị queue. Rất đáng tiền để trải nghiệm công nghệ mới.",
        "purchasedType": "1 Tháng"
      }
    ],
    "isActive": true,
    "pricingUnit": null
  },
  {
    "id": "51bf8a7b-50a6-4ab6-84e3-b861311f59dc",
    "name": "Nâng cấp CapCut Pro (1 Năm)",
    "description": "Nâng cấp CapCut Pro 1 năm, mở khóa hiệu ứng PRO, filter cao cấp, template chuyên nghiệp, chuyển cảnh mượt và công cụ AI hỗ trợ chỉnh sửa video nhanh chóng.",
    "price": 800000,
    "originalPrice": 3200000,
    "discount": 75,
    "image": "https://rlzwmldvrxdlvosottrt.supabase.co/storage/v1/object/public/media/products/zs2ifpg7ev_1778141922902.png",
    "category": "ai",
    "rating": 4.9,
    "sold": 18900,
    "isHot": true,
    "isNew": false,
    "created_at": "2026-01-07T06:10:02.625277+00:00",
    "platforms": [
      "iOS",
      "Android",
      "Windows",
      "MacOS",
      "Web"
    ],
    "features": [
      "Mở khóa hiệu ứng PRO và filter cao cấp",
      "Xóa phông video bằng AI nhanh chóng",
      "Sử dụng template chuyên nghiệp",
      "Xuất video không watermark",
      "Chuyển cảnh mượt, đẹp và bắt mắt",
      "Hỗ trợ chỉnh sửa video ngắn cho TikTok, Reels, Shorts",
      "Kho nhạc, sticker, text và hiệu ứng phong phú",
      "Tối ưu cho sáng tạo nội dung, bán hàng và marketing",
      "Thời hạn sử dụng 1 năm",
      "Hỗ trợ trên iOS, Android và Web"
    ],
    "activationGuide": "1. Gửi Email tài khoản CapCut của bạn.\\n2. Shop sẽ mời bạn vào Pro Space.\\n3. Chấp nhận lời mời để kích hoạt tính năng Pro.",
    "gallery": null,
    "version": "Pro",
    "developer": "ByteDance",
    "warrantyPolicy": "Bảo hành trong suốt thời gian sử dụng gói",
    "variants": [
      {
        "id": "0.9494150391233543",
        "sku": "",
        "name": "1 Tháng",
        "price": 119000,
        "stock": 10,
        "originalPrice": 0
      },
      {
        "id": "0.511359529103666",
        "sku": "",
        "name": "6 Tháng",
        "price": 500000,
        "stock": 10,
        "originalPrice": 0
      },
      {
        "id": "0.26028370795327627",
        "sku": "",
        "name": "12 Tháng",
        "price": 800000,
        "stock": 10,
        "originalPrice": 0
      }
    ],
    "reviews": [
      {
        "id": "rv_ai_1",
        "date": "16/03/2024",
        "user": "Dev Coder",
        "rating": 5,
        "comment": "ChatGPT Plus phản hồi cực nhanh, GPT-4 thông minh hơn hẳn bản thường. Shop hỗ trợ bảo hành nhanh gọn.",
        "purchasedType": "1 Tháng"
      },
      {
        "id": "rv_ai_2",
        "date": "13/03/2024",
        "user": "Mai Marketing",
        "rating": 5,
        "comment": "Mua account dùng chung mà tốc độ vẫn rất tốt, ít khi bị queue. Rất đáng tiền để trải nghiệm công nghệ mới.",
        "purchasedType": "1 Tháng"
      }
    ],
    "isActive": true,
    "pricingUnit": null
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'GPT-4o vs Claude 3.5 Sonnet: Ai mới là ông vua AI hiện tại?',
    excerpt: 'So sánh chi tiết về khả năng coding, viết content và xử lý hình ảnh của hai mô hình ngôn ngữ lớn nhất hiện nay.',
    content: `Cuộc chiến AI tạo sinh chưa bao giờ nóng đến thế. Nếu như OpenAI vừa tung ra GPT-4o với khả năng đa phương thức thời gian thực (Omni), thì Anthropic cũng không kém cạnh khi giới thiệu Claude 3.5 Sonnet - mô hình được đánh giá là "thông minh nhất" ở thời điểm hiện tại.\n\nTrong bài viết này, chúng ta sẽ đi sâu vào so sánh hai "gã khổng lồ" này trên các tiêu chí quan trọng nhất: Khả năng lập trình, Sáng tạo nội dung và Tốc độ xử lý.\n\nGPT-4o: Tốc độ và Đa phương thức\nĐiểm mạnh lớn nhất của GPT-4o chính là tốc độ. Nó phản hồi gần như tức thì, mang lại cảm giác như đang trò chuyện với người thật. Khả năng xử lý hình ảnh và giọng nói của GPT-4o cũng vượt trội, giúp nó trở thành trợ lý ảo toàn năng nhất.\n\nClaude 3.5 Sonnet: Tư duy và Lập trình\nNgược lại, Claude 3.5 Sonnet lại tỏa sáng ở khả năng tư duy logic và viết code. Các bài test cho thấy code do Claude tạo ra ít lỗi hơn, sạch hơn và tuân thủ các best-practice tốt hơn so với GPT-4o. Ngoài ra, văn phong của Claude cũng tự nhiên và "giống người" hơn trong các tác vụ viết lách sáng tạo.\n\nKết luận: Nên chọn ai?\nNếu bạn cần một trợ lý đa năng, xử lý nhanh gọn mọi thứ từ hình ảnh đến giọng nói, GPT-4o là lựa chọn số 1 (có trong gói ChatGPT Plus).\nTuy nhiên, nếu công việc của bạn tập trung vào lập trình (Coding) hoặc viết lách chuyên sâu, Claude 3.5 Sonnet sẽ là người bạn đồng hành đáng tin cậy hơn.`,
    author: 'Minh Techie',
    date: '15/03/2024',
    image: '/blog/ai-comparison.svg',
    category: 'Công nghệ AI',
    readTime: '5 phút',
    relatedProductId: '3'
  },
  {
    id: '2',
    title: '5 mẹo sử dụng Canva Pro để thiết kế Slide đẹp như Designer',
    excerpt: 'Tổng hợp các phím tắt và tính năng ẩn trên Canva giúp bạn tiết kiệm 50% thời gian thiết kế.',
    content: `Bạn không cần phải là một Designer chuyên nghiệp để tạo ra những bản thuyết trình (Slide) ấn tượng. Với Canva Pro, mọi thứ trở nên dễ dàng hơn bao giờ hết. Dưới đây là 5 mẹo "nhỏ mà có võ" giúp bạn nâng tầm bản thiết kế của mình.\n\n1. Sử dụng tính năng "Brand Kit"\nĐừng lãng phí thời gian chỉnh sửa màu sắc thủ công cho từng slide. Hãy thiết lập Brand Kit (Bộ thương hiệu) bao gồm Logo, Bảng màu và Font chữ. Chỉ với 1 cú click, toàn bộ slide sẽ được đổi sang màu sắc thương hiệu của bạn.\n\n2. Phím tắt "thần thánh"\n- Nhấn "T" để thêm văn bản.\n- Nhấn "R" để thêm hình chữ nhật.\n- Nhấn "C" để thêm hình tròn.\n- Nhấn "L" để thêm đường kẻ.\n\n3. Tính năng Magic Resize\nBạn thiết kế một banner cho Facebook nhưng muốn đăng lên cả Instagram Story? Đừng làm lại từ đầu. Tính năng Magic Resize của bản Pro sẽ tự động điều chỉnh kích thước và bố cục cho phù hợp với mọi nền tảng chỉ trong vài giây.\n\n4. Xóa phông nền (Background Remover)\nĐây là tính năng đáng tiền nhất của Canva Pro. Chỉ cần 1 click, bạn có thể tách chủ thể ra khỏi nền ảnh cực kỳ sắc nét, giúp slide trông chuyên nghiệp và thoáng mắt hơn hẳn.`,
    author: 'Lan Design',
    date: '12/03/2024',
    image: '/blog/canva-pro.svg',
    category: 'Thủ thuật',
    readTime: '3 phút',
    relatedProductId: '6'
  },
  {
    id: '3',
    title: 'Tại sao nên mua YouTube Premium thay vì dùng các tool chặn quảng cáo?',
    excerpt: 'Phân tích rủi ro bảo mật khi dùng phần mềm bên thứ 3 và lợi ích của gói Premium chính chủ.',
    content: `Việc quảng cáo xuất hiện dày đặc trên YouTube khiến nhiều người khó chịu. Giải pháp thường thấy là cài đặt các tiện ích chặn quảng cáo (Adblock). Tuy nhiên, Google đang ngày càng mạnh tay với các công cụ này, và quan trọng hơn, chúng tiềm ẩn nhiều rủi ro bảo mật.\n\nRủi ro từ phần mềm chặn quảng cáo lậu\nNhiều tiện ích mở rộng yêu cầu quyền truy cập vào dữ liệu duyệt web của bạn. Điều này có nghĩa là họ có thể theo dõi lịch sử truy cập, thậm chí đánh cắp thông tin đăng nhập nếu tiện ích đó chứa mã độc.\n\nLợi ích của YouTube Premium chính chủ\nVới chi phí chỉ bằng một ly cà phê mỗi tháng (khi mua tại MuaToolAI.com), bạn nhận được:\n- Trải nghiệm sạch bóng quảng cáo 100% trên mọi thiết bị (TV, điện thoại, PC).\n- YouTube Music Premium: Nghe nhạc chất lượng cao, tắt màn hình vẫn nghe được nhạc.\n- Tải video xuống để xem offline khi không có mạng.\n- Hỗ trợ các nhà sáng tạo nội dung mà bạn yêu thích.\n\nĐầu tư cho Premium không chỉ là mua sự thoải mái, mà còn là mua sự an toàn cho tài khoản Google của bạn.`,
    author: 'Admin MuaToolAI.com',
    date: '10/03/2024',
    image: '/blog/youtube-premium.svg',
    category: 'Đánh giá',
    readTime: '4 phút',
    relatedProductId: '2'
  },
  {
    id: '4',
    title: 'Top 3 phần mềm VPN tốt nhất để bảo mật thông tin năm 2024',
    excerpt: 'Đánh giá chi tiết NordVPN, ExpressVPN và Surfshark dựa trên tốc độ và độ ổn định tại Việt Nam.',
    content: `Trong kỷ nguyên số, dữ liệu cá nhân là tài sản vô giá. Sử dụng VPN (Mạng riêng ảo) không chỉ giúp bạn truy cập các nội dung bị giới hạn địa lý mà còn mã hóa toàn bộ dữ liệu truyền tải, bảo vệ bạn khỏi sự dòm ngó của hacker khi sử dụng Wifi công cộng.\n\n1. ExpressVPN - Ông vua tốc độ\nNếu bạn cần tốc độ nhanh nhất để xem phim 4K, chơi game không lag, ExpressVPN là lựa chọn số 1. Giao thức Lightway độc quyền giúp kết nối cực nhanh và ổn định. Tuy nhiên, giá thành khá cao so với mặt bằng chung.\n\n2. NordVPN - Cân bằng hoàn hảo\nNordVPN nổi tiếng với tính năng bảo mật kép (Double VPN) và chặn quảng cáo tích hợp. Tốc độ rất tốt và mạng lưới máy chủ rộng khắp. Đây là sự lựa chọn cân bằng giữa hiệu năng và giá cả.\n\n3. Surfshark - Giá rẻ cho mọi nhà\nĐiểm mạnh nhất của Surfshark là cho phép kết nối KHÔNG GIỚI HẠN thiết bị. Bạn có thể mua 1 tài khoản và chia sẻ cho cả gia đình lớn sử dụng. Tốc độ ổn định, đủ dùng cho nhu cầu cơ bản.`,
    author: 'Tuan Security',
    date: '08/03/2024',
    image: '/blog/vpn-security.svg',
    category: 'Bảo mật',
    readTime: '6 phút',
    relatedProductId: '10'
  },
  {
    id: '6',
    title: 'Cách chọn gói ChatGPT Plus phù hợp cho học tập, content và coding',
    excerpt: 'Hướng dẫn thực tế giúp bạn tận dụng ChatGPT Plus đúng nhu cầu, tránh mua xong chỉ dùng để hỏi vài câu đơn giản.',
    content: `ChatGPT Plus không chỉ là một chatbot trả lời câu hỏi. Nếu biết dùng đúng cách, đây có thể là trợ lý học tập, trợ lý viết nội dung và trợ lý lập trình cực kỳ mạnh.

1. Dùng cho học tập
Bạn có thể yêu cầu ChatGPT giải thích một khái niệm khó theo nhiều cấp độ: cho học sinh lớp 9, cho sinh viên đại học hoặc cho người đi làm. Cách này giúp bạn hiểu bản chất thay vì chỉ học thuộc.

2. Dùng cho content marketing
Với người làm nội dung, ChatGPT Plus hỗ trợ dựng outline bài viết, viết tiêu đề, phân tích chân dung khách hàng và biến một ý tưởng thô thành nhiều định dạng như bài blog, caption, email hoặc kịch bản video ngắn.

3. Dùng cho coding
Lập trình viên có thể dùng ChatGPT để đọc lỗi, refactor code, viết test case và giải thích luồng xử lý. Tuy nhiên, hãy luôn kiểm tra lại trước khi đưa vào production.

4. Mẹo để dùng hiệu quả hơn
Thay vì hỏi chung chung, hãy đưa bối cảnh rõ ràng: mục tiêu, đối tượng, giọng văn, định dạng đầu ra và ví dụ mẫu. Prompt càng cụ thể, kết quả càng sát nhu cầu.

Kết luận: ChatGPT Plus đáng tiền nếu bạn xem nó như một công cụ làm việc hằng ngày, không phải chỉ là nơi hỏi đáp ngẫu nhiên.`,
    author: 'Admin MuaToolAI.com',
    date: '18/03/2024',
    image: '/blog/ai-comparison.svg',
    category: 'Công nghệ AI',
    readTime: '6 phút',
    relatedProductId: '3'
  },
  {
    id: '7',
    title: 'Canva Pro có gì hơn Canva miễn phí? 9 tính năng đáng tiền nhất',
    excerpt: 'Nếu bạn làm bài thuyết trình, banner bán hàng hoặc nội dung mạng xã hội, đây là các tính năng Canva Pro nên biết.',
    content: `Canva miễn phí đã đủ tốt cho nhu cầu cơ bản, nhưng Canva Pro mới là phiên bản giúp bạn làm việc nhanh và chuyên nghiệp hơn rõ rệt.

1. Background Remover
Xóa nền ảnh chỉ với một cú nhấp, rất hữu ích khi làm thumbnail, poster bán hàng hoặc ảnh sản phẩm.

2. Magic Resize
Một thiết kế có thể đổi sang nhiều kích thước: Facebook Post, Story, TikTok Cover, YouTube Thumbnail mà không cần làm lại từ đầu.

3. Brand Kit
Lưu logo, màu thương hiệu và font chữ để toàn bộ thiết kế luôn đồng bộ. Đây là tính năng cực quan trọng cho shop online và doanh nghiệp nhỏ.

4. Kho template, ảnh và icon Pro
Bạn được truy cập nhiều tài nguyên đẹp hơn, ít đụng hàng hơn và tiết kiệm thời gian tìm kiếm.

5. Lên lịch đăng bài
Canva Pro hỗ trợ lập lịch đăng nội dung lên một số nền tảng mạng xã hội, phù hợp cho người quản lý nhiều kênh.

Kết luận: Nếu bạn thiết kế thường xuyên, Canva Pro giúp tiết kiệm rất nhiều thời gian và làm hình ảnh thương hiệu trông chuyên nghiệp hơn.`,
    author: 'Lan Design',
    date: '19/03/2024',
    image: '/blog/canva-pro.svg',
    category: 'Design',
    readTime: '5 phút',
    relatedProductId: '6'
  },
  {
    id: '8',
    title: 'Checklist bảo mật tài khoản số: 12 việc nên làm ngay hôm nay',
    excerpt: 'Một hướng dẫn ngắn gọn để bảo vệ email, tài khoản mạng xã hội, ví điện tử và dữ liệu cá nhân.',
    content: `Rất nhiều người chỉ bắt đầu quan tâm đến bảo mật sau khi tài khoản đã bị mất. Thực tế, chỉ cần làm đúng một vài bước cơ bản, bạn đã giảm được phần lớn rủi ro.

1. Bật xác thực hai lớp
Hãy bật 2FA cho email, Facebook, Google, tài khoản ngân hàng và các nền tảng làm việc quan trọng.

2. Không dùng chung một mật khẩu
Nếu một website bị lộ dữ liệu, hacker có thể thử chính mật khẩu đó trên email hoặc mạng xã hội của bạn.

3. Dùng trình quản lý mật khẩu
Password manager giúp tạo mật khẩu mạnh và lưu an toàn hơn so với ghi chú trong điện thoại.

4. Kiểm tra thiết bị đăng nhập
Định kỳ xem lại danh sách thiết bị đang đăng nhập tài khoản Google, Facebook, Apple ID để đăng xuất thiết bị lạ.

5. Cẩn thận với Wi-Fi công cộng
Nếu thường làm việc ở quán cà phê hoặc sân bay, hãy dùng VPN uy tín để mã hóa kết nối.

Kết luận: Bảo mật không cần phức tạp. Điều quan trọng là duy trì thói quen đúng và kiểm tra định kỳ.`,
    author: 'Tuan Security',
    date: '20/03/2024',
    image: '/blog/vpn-security.svg',
    category: 'Bảo mật',
    readTime: '7 phút',
    relatedProductId: '10'
  },
  {
    id: '9',
    title: 'Microsoft Office 365: Vì sao dân văn phòng nên dùng bản quyền?',
    excerpt: 'So sánh lợi ích của Microsoft 365 bản quyền với các bản crack thường gặp trên mạng.',
    content: `Office là bộ công cụ quen thuộc với hầu hết dân văn phòng. Tuy nhiên, nhiều người vẫn dùng bản crack vì nghĩ chỉ cần Word, Excel, PowerPoint là đủ.

1. An toàn dữ liệu hơn
Các bản crack thường đi kèm file kích hoạt không rõ nguồn gốc. Đây là rủi ro lớn nếu máy tính có tài liệu công việc, hợp đồng hoặc dữ liệu khách hàng.

2. Có OneDrive lưu trữ
Microsoft 365 đi kèm dung lượng lưu trữ đám mây, giúp đồng bộ tài liệu giữa máy tính, điện thoại và trình duyệt.

3. Cộng tác thời gian thực
Bạn có thể cùng đồng nghiệp chỉnh sửa một file Word hoặc Excel mà không cần gửi qua gửi lại nhiều phiên bản.

4. Luôn được cập nhật
Bản quyền giúp bạn nhận cập nhật bảo mật và tính năng mới, tránh lỗi tương thích khi mở file từ khách hàng hoặc đối tác.

Kết luận: Với chi phí hợp lý, Microsoft 365 bản quyền là khoản đầu tư đáng giá cho sự ổn định và an toàn khi làm việc.`,
    author: 'Office Master',
    date: '21/03/2024',
    image: '/blog/microsoft-copilot.svg',
    category: 'Tin tức',
    readTime: '5 phút',
    relatedProductId: '8'
  },
  {
    id: '10',
    title: 'YouTube Premium có đáng mua không nếu bạn xem YouTube mỗi ngày?',
    excerpt: 'Phân tích lợi ích thực tế: không quảng cáo, nghe nhạc tắt màn hình, tải video offline và YouTube Music.',
    content: `Nếu bạn xem YouTube mỗi ngày, YouTube Premium có thể là một trong những gói dịch vụ đáng tiền nhất.

1. Không quảng cáo trên mọi thiết bị
Điểm khác biệt lớn nhất là trải nghiệm liền mạch trên điện thoại, máy tính bảng, TV thông minh và trình duyệt.

2. Nghe nhạc tắt màn hình
Với người hay nghe podcast, nhạc hoặc bài giảng, tính năng phát nền cực kỳ tiện lợi.

3. Tải video offline
Bạn có thể tải video để xem khi đi đường, lúc mạng yếu hoặc khi không muốn tốn dữ liệu di động.

4. YouTube Music Premium
Ngoài YouTube không quảng cáo, bạn còn có thêm nền tảng nghe nhạc riêng với kho bài hát lớn.

Kết luận: Nếu YouTube là ứng dụng bạn mở hằng ngày, Premium không chỉ tiết kiệm thời gian mà còn nâng cấp trải nghiệm rõ rệt.`,
    author: 'Admin MuaToolAI.com',
    date: '22/03/2024',
    image: '/blog/youtube-premium.svg',
    category: 'Review',
    readTime: '4 phút',
    relatedProductId: '2'
  },
  {
    id: '11',
    title: 'Midjourney dùng để làm gì? Ứng dụng thực tế cho bán hàng và sáng tạo nội dung',
    excerpt: 'Không chỉ tạo ảnh đẹp, Midjourney có thể hỗ trợ làm moodboard, concept sản phẩm, banner và hình minh họa.',
    content: `Midjourney là một trong những công cụ tạo ảnh AI nổi bật nhất hiện nay. Điểm mạnh của nó nằm ở khả năng tạo hình ảnh có tính nghệ thuật cao, ánh sáng đẹp và bố cục ấn tượng.

1. Làm concept sản phẩm
Bạn có thể mô tả phong cách, chất liệu, màu sắc và bối cảnh để tạo ý tưởng hình ảnh trước khi chụp thật.

2. Làm banner quảng cáo
Midjourney giúp tạo background, hình minh họa và mood visual cho landing page, bài quảng cáo hoặc poster.

3. Làm nội dung mạng xã hội
Những hình ảnh độc đáo giúp bài đăng nổi bật hơn so với việc dùng ảnh stock quá phổ biến.

4. Hỗ trợ designer brainstorm
Designer có thể dùng Midjourney để tạo moodboard, khám phá nhiều hướng thị giác trước khi chốt concept cuối cùng.

Kết luận: Midjourney phù hợp với người làm marketing, thiết kế, thương mại điện tử và sáng tạo nội dung cần hình ảnh đẹp nhanh chóng.`,
    author: 'Minh Techie',
    date: '23/03/2024',
    image: '/blog/ai-comparison.svg',
    category: 'Công nghệ AI',
    readTime: '6 phút',
    relatedProductId: '12'
  },
  {
    id: '12',
    title: 'Học tiếng Anh bằng ELSA Speak và Duolingo: Nên chọn app nào?',
    excerpt: 'ELSA mạnh về phát âm, Duolingo mạnh về thói quen học mỗi ngày. Bài viết giúp bạn chọn đúng theo mục tiêu.',
    content: `Ứng dụng học ngoại ngữ ngày càng thông minh hơn, nhưng mỗi app lại phù hợp với một mục tiêu khác nhau.

ELSA Speak phù hợp với ai?
ELSA tập trung vào phát âm. App dùng AI để phân tích giọng nói, chỉ ra âm sai và gợi ý cách sửa. Nếu bạn muốn nói tiếng Anh rõ hơn, tự tin phỏng vấn hoặc thuyết trình, ELSA là lựa chọn rất tốt.

Duolingo phù hợp với ai?
Duolingo giống một trò chơi học ngoại ngữ. Bài học ngắn, có streak hằng ngày, phù hợp với người mới bắt đầu hoặc muốn duy trì thói quen học đều.

Nên dùng app nào?
Nếu mục tiêu chính là phát âm và giao tiếp: chọn ELSA Speak. Nếu mục tiêu là học từ vựng, ngữ pháp cơ bản và tạo thói quen: chọn Duolingo. Tốt nhất là kết hợp cả hai nếu bạn có thời gian.

Kết luận: Không có app tốt nhất cho tất cả mọi người. Hãy chọn công cụ phù hợp với mục tiêu học của bạn.`,
    author: 'Edu Lab',
    date: '24/03/2024',
    image: '/blog/canva-pro.svg',
    category: 'Thủ thuật',
    readTime: '5 phút',
    relatedProductId: '9'
  },
  ...ALL_BLOG_POSTS
];
