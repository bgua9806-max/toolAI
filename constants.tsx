
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
    id: '1',
    name: 'Tài khoản Netflix Premium',
    description: 'Xem phim 4K HDR, không quảng cáo, hỗ trợ mọi thiết bị.',
    price: 69000,
    originalPrice: 260000,
    discount: 73,
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=500&fit=crop',
    category: 'entertainment',
    rating: 4.9,
    sold: 15420,
    isHot: true,
    warrantyPolicy: 'Bảo hành trọn đời gói. Lỗi 1 đổi 1 trong 5 phút.',
    variants: [
      { id: 'v1', name: '1 Tháng', price: 69000, originalPrice: 260000 },
      { id: 'v2', name: '3 Tháng', price: 199000, originalPrice: 780000 },
      { id: 'v3', name: '1 Năm', price: 750000, originalPrice: 3120000 },
    ],
    reviews: [
      { id: 'r1', user: 'Nguyễn Văn A', rating: 5, comment: 'Shop uy tín, tài khoản dùng mượt, 4K nét căng.', date: '12/03/2024', purchasedType: '1 Năm' },
      { id: 'r2', user: 'Trần Thị B', rating: 5, comment: 'Hỗ trợ nhiệt tình, 1h sáng nhắn tin vẫn rep.', date: '10/03/2024', purchasedType: '1 Tháng' }
    ]
  },
  {
    id: '6',
    name: 'Canva Pro Vĩnh Viễn',
    description: 'Thiết kế đồ họa dễ dàng, hàng triệu mẫu có sẵn.',
    price: 49000,
    originalPrice: 199000,
    discount: 75,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799312c95d?w=500&h=500&fit=crop',
    category: 'design',
    rating: 4.8,
    sold: 7800,
    isHot: true,
    warrantyPolicy: 'Bảo hành vĩnh viễn (Lifetime). Nếu mất Pro sẽ được nâng cấp lại miễn phí.',
    variants: [
       { id: 'c1', name: 'Gia hạn Chính Chủ', price: 49000, originalPrice: 199000 },
       { id: 'c2', name: 'Cấp Tài khoản Mới', price: 29000, originalPrice: 99000 },
    ]
  },
  {
    id: '2',
    name: 'Nâng cấp YouTube Premium',
    description: 'Không quảng cáo, nghe nhạc tắt màn hình, YouTube Music.',
    price: 29000,
    originalPrice: 79000,
    discount: 63,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=500&fit=crop',
    category: 'entertainment',
    rating: 4.8,
    sold: 8900,
    isHot: true
  },
  {
    id: '3',
    name: 'Tài khoản ChatGPT Plus',
    description: 'Sử dụng GPT-4, DALL-E 3, phân tích dữ liệu nâng cao.',
    price: 499000,
    originalPrice: 590000,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1694509748680-77a876779b63?w=500&h=500&fit=crop',
    category: 'ai',
    rating: 5.0,
    sold: 3200,
    isNew: true
  },
  {
    id: '4',
    name: 'Nâng cấp Spotify Premium',
    description: 'Nghe nhạc chất lượng cao, tải nhạc offline.',
    price: 19000,
    originalPrice: 59000,
    discount: 68,
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=500&h=500&fit=crop',
    category: 'music',
    rating: 4.7,
    sold: 5600
  },
  {
    id: '5',
    name: 'Tài khoản Adobe All Apps',
    description: 'Photoshop, Illustrator, Premiere Pro, After Effects...',
    price: 150000,
    originalPrice: 900000,
    discount: 83,
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=500&h=500&fit=crop',
    category: 'design',
    rating: 4.9,
    sold: 1200
  },
  {
    id: '7',
    name: 'Key Windows 11 Pro',
    description: 'Bản quyền vĩnh viễn, update thoải mái từ Microsoft.',
    price: 199000,
    originalPrice: 4500000,
    discount: 95,
    image: 'https://images.unsplash.com/photo-1633419461186-7d40a2e50594?w=500&h=500&fit=crop',
    category: 'work',
    rating: 4.9,
    sold: 2300
  },
  {
    id: '8',
    name: 'Microsoft Office 365',
    description: 'Word, Excel, PowerPoint, OneDrive 1TB. Chính chủ.',
    price: 129000,
    originalPrice: 1200000,
    discount: 89,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop',
    category: 'work',
    rating: 4.9,
    sold: 4500
  },
  {
    id: '9',
    name: 'Tài khoản ELSA Speak Pro',
    description: 'Học phát âm tiếng Anh chuẩn bản xứ với AI.',
    price: 89000,
    originalPrice: 289000,
    discount: 69,
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&h=500&fit=crop',
    category: 'education',
    rating: 4.6,
    sold: 1100
  },
  {
    id: '10',
    name: 'ExpressVPN 1 Năm',
    description: 'Bảo mật thông tin, truy cập web bị chặn, tốc độ cao.',
    price: 399000,
    originalPrice: 2300000,
    discount: 82,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&h=500&fit=crop',
    category: 'security',
    rating: 5.0,
    sold: 800
  },
  {
    id: '11',
    name: 'Duolingo Super',
    description: 'Học ngoại ngữ không giới hạn, không quảng cáo.',
    price: 159000,
    originalPrice: 599000,
    discount: 73,
    image: 'https://images.unsplash.com/photo-1552068751-345134f9a3e6?w=500&h=500&fit=crop',
    category: 'education',
    rating: 4.9,
    sold: 2100
  },
  {
    id: '12',
    name: 'Midjourney',
    description: 'Tạo ảnh AI nghệ thuật chất lượng cao nhất hiện nay.',
    price: 250000,
    originalPrice: 750000,
    discount: 66,
    image: 'https://images.unsplash.com/photo-1684469046643-415c8e76311d?w=500&h=500&fit=crop',
    category: 'ai',
    rating: 4.9,
    sold: 1500,
    isNew: true
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
  }
];
