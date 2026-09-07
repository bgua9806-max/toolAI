import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rlzwmldvrxdlvosottrt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Xnb9fZ85X_em1AggmXf8qA_rJxG8asd';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Raw topics template list
const TOPIC_DEFS = [
  // Cụm 1: Generative AI & Chatbots (1-20)
  {
    id: 'blog-101',
    title: 'Hướng Dẫn Sử Dụng ChatGPT Plus Toàn Tập Cho Người Mới Bắt Đầu',
    category: 'Công nghệ AI',
    author: 'Chuyên Gia AI MuaToolAI',
    readTime: '7 phút',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80',
    coreKeyword: 'hướng dẫn ChatGPT Plus',
    summary: 'ChatGPT Plus là gói dịch vụ cao cấp của OpenAI sử dụng mô hình GPT-4o, o1 và SearchGPT với tốc độ vượt trội, bộ nhớ mở rộng và khả năng xử lý đa phương thức.',
    points: [
      'Truy cập mô hình thông minh nhất: GPT-4o, OpenAI o1 với năng lực suy luận toán học và logic chuyên sâu.',
      'Tính năng ChatGPT Search: Tìm kiếm thông tin trực tiếp theo thời gian thực có nguồn trích dẫn uy tín.',
      'ChatGPT Canvas: Môi trường cộng tác viết văn bản và debug mã nguồn trực quan ngay cạnh khung chat.',
      'Bộ nhớ Memory cá nhân hóa: AI tự ghi nhớ sở thích, phong cách làm việc và quy chuẩn của bạn.',
      'Tạo Custom GPTs không giới hạn: Xây dựng trợ lý ảo chuyên trách cho từng phòng ban doanh nghiệp.'
    ]
  },
  {
    id: 'blog-102',
    title: 'So Sánh ChatGPT Plus, Claude 3.5 Sonnet Và Gemini Advanced: Đâu Là AI Tốt Nhất 2026?',
    category: 'Review',
    author: 'Minh Techie - MuaToolAI',
    readTime: '8 phút',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    coreKeyword: 'so sánh ChatGPT Plus Claude Gemini',
    summary: 'Phân tích chi tiết 3 mô hình AI dẫn đầu thế giới: ChatGPT Plus mạnh về hệ sinh thái và tìm kiếm thời gian thực, Claude 3.5 Sonnet thống trị về coding và viết lách tự nhiên, Gemini Advanced vượt trội về ngữ cảnh 2 triệu token.',
    points: [
      'ChatGPT Plus (OpenAI): Tối ưu toàn diện cho công việc hàng ngày, tìm kiếm web, tạo ảnh DALL-E và kho Custom GPTs đồ sộ.',
      'Claude 3.5 Sonnet (Anthropic): Vua lập trình và văn phong tự nhiên, ít bị hallucination (ảo tưởng thông tin) nhất.',
      'Gemini Advanced (Google): Khả năng đọc file tài liệu và video khổng lồ với Context Window lên tới 2 triệu token.',
      'Nên chọn mô hình nào: Lập trình viên chọn Claude; Doanh nhân/Marketing chọn ChatGPT; Nghiên cứu dữ liệu lớn chọn Gemini.'
    ]
  },
  {
    id: 'blog-103',
    title: 'Cách Kích Hoạt ChatGPT Plus Trên Email Chính Chủ Giá Rẻ Và An Toàn',
    category: 'Thủ thuật',
    author: 'Kỹ Thuật Viên MuaToolAI',
    readTime: '5 phút',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
    coreKeyword: 'mua ChatGPT Plus chính chủ',
    summary: 'Hướng dẫn chi tiết cách nâng cấp gói ChatGPT Plus trực tiếp trên tài khoản email cá nhân của bạn, giữ nguyên 100% dữ liệu lịch sử chat và được bảo hành 1-1 toàn thời gian sử dụng.',
    points: [
      'Tại sao nên nâng cấp trên Email chính chủ: Tránh nguy cơ bị khóa tài khoản dùng chung, bảo mật tuyệt đối dữ liệu nội bộ.',
      'Quy trình kích hoạt: Cung cấp email cần nâng cấp, nhận link mời hoặc gói bản quyền từ MuaToolAI trong 3 - 5 phút.',
      'Cam kết bảo hành: Đổi mới hoặc hoàn tiền ngay lập tức nếu phát sinh lỗi từ hệ thống OpenAI.',
      'Tiết kiệm chi phí: Tiết kiệm tới 60% so với việc thanh toán bằng thẻ Visa/Mastercard trực tiếp.'
    ]
  },
  {
    id: 'blog-104',
    title: '50+ Câu Lệnh (Prompts) ChatGPT Đỉnh Cao Cho Người Làm Marketing & Content',
    category: 'Thủ thuật',
    author: 'Trần Thảo - Content Lead',
    readTime: '10 phút',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&auto=format&fit=crop&q=80',
    coreKeyword: 'prompts ChatGPT Marketing Content',
    summary: 'Bộ sưu tập 50 prompt ChatGPT chuẩn cấu trúc Role - Task - Context - Constraint giúp sáng tạo tiêu đề viral, kịch bản video ngắn triệu view và bài viết chuẩn SEO.',
    points: [
      'Công thức viết prompt chuẩn: [Vai trò chuyên gia] + [Bối cảnh sản phẩm] + [Mục tiêu cụ thể] + [Định dạng đầu ra mong muốn].',
      'Prompt sáng tạo tiêu đề giật tít: 10 biến thể tiêu đề dựa trên tâm lý học FOMO và Curiousity Gap.',
      'Prompt viết bài chuẩn SEO: Phân tích intent người dùng, đặt từ khóa tự nhiên và tối ưu thẻ tiêu đề H2/H3.',
      'Prompt kịch bản Reels/TikTok: Khóa 3 giây đầu tiên (Hook), dẫn dắt cốt truyện và kêu gọi hành động (CTA).'
    ]
  },
  {
    id: 'blog-105',
    title: 'ChatGPT Search Là Gì? Cách AI Thay Đổi Hoàn Toàn Tìm Kiếm Thông Tin',
    category: 'Tin tức',
    author: 'Chuyên Gia AI MuaToolAI',
    readTime: '6 phút',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
    coreKeyword: 'ChatGPT Search tìm kiếm AI',
    summary: 'ChatGPT Search là tính năng tìm kiếm thông tin thời gian thực tích hợp bên trong ChatGPT, mang lại câu trả lời trực diện kèm nguồn trích dẫn báo chí và thời tiết, cổ phiếu, tin tức mới nhất.',
    points: [
      'Không còn phải lướt qua hàng tá trang quảng cáo như Google truyền thống.',
      'AI tổng hợp đa nguồn và đính kèm link gốc để người dùng kiểm chứng độ xác thực.',
      'Tương tác đối thoại liên tục: Có thể hỏi sâu hơn về kết quả vừa tìm kiếm mà không cần gõ lại từ đầu.',
      'Tác động đến SEO: Các website cần tối ưu hóa GEO (Generative Engine Optimization) để được AI trích dẫn.'
    ]
  },
  {
    id: 'blog-106',
    title: 'ChatGPT Canvas: Công Cụ Viết Lách Và Lập Trình Tương Tác Đỉnh Cao',
    category: 'Thủ thuật',
    author: 'Kỹ Sư Phần Mềm MuaToolAI',
    readTime: '6 phút',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
    coreKeyword: 'ChatGPT Canvas tính năng mới',
    summary: 'ChatGPT Canvas mở ra giao diện làm việc hai màn hình (side-by-side) cho phép chỉnh sửa từng đoạn văn bản hoặc debug từng dòng code trực tiếp mà không phải tạo lại đoạn chat.',
    points: [
      'Giao diện làm việc song song: Văn bản hoặc code nằm bên phải, khung chat AI nằm bên trái.',
      'Chỉnh sửa nội tuyến: Bôi đen một đoạn bất kỳ và yêu cầu AI chỉnh sửa giọng điệu, rút gọn hoặc mở rộng.',
      'Review code thông minh: AI tự động đánh giá chất lượng mã nguồn, phát hiện bug và thêm comment giải thích.',
      'Hỗ trợ đa ngôn ngữ lập trình: Python, JavaScript, TypeScript, HTML/CSS, C++, Java.'
    ]
  },
  {
    id: 'blog-107',
    title: 'Cách Tạo Custom GPTs Chuyên Sâu Cho Doanh Nghiệp Và Cá Nhân',
    category: 'Công nghệ AI',
    author: 'Minh Techie - MuaToolAI',
    readTime: '8 phút',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
    coreKeyword: 'tạo Custom GPTs OpenAI',
    summary: 'Hướng dẫn từng bước xây dựng Custom GPT tùy biến với kho dữ liệu tri thức riêng (Knowledge Base) và cấu hình Actions API để tự động hóa công việc kinh doanh.',
    points: [
      'Không cần biết lập trình: Sử dụng GPT Builder bằng tiếng Việt để huấn luyện trợ lý ảo.',
      'Tải tài liệu tri thức (Knowledge): Tải lên file PDF nội bộ, chính sách bán hàng, tài liệu đào tạo.',
      'Cấu hình Actions: Kết nối GPTs với Google Sheets, Notion, CRM qua REST API.',
      'Phân quyền bảo mật: Chọn chia sẻ công khai lên GPT Store hoặc chỉ dùng nội bộ qua đường link riêng.'
    ]
  },
  {
    id: 'blog-108',
    title: 'So Sánh Gói ChatGPT Plus Cá Nhân Và ChatGPT Team: Nên Mua Gói Nào?',
    category: 'Review',
    author: 'Chuyên Gia AI MuaToolAI',
    readTime: '6 phút',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    coreKeyword: 'so sánh ChatGPT Plus và Team',
    summary: 'So sánh chi tiết sự khác biệt về giới hạn tin nhắn, quyền bảo mật dữ liệu doanh nghiệp và khả năng quản lý thành viên giữa hai gói ChatGPT Plus và ChatGPT Team.',
    points: [
      'Giới hạn tin nhắn: ChatGPT Team có hạn mức tin nhắn GPT-4o cao hơn đáng kể so với bản Plus cá nhân.',
      'Quyền riêng tư dữ liệu: Gói Team mặc định KHÔNG dùng dữ liệu của bạn để huấn luyện mô hình của OpenAI.',
      'Quản lý tập trung: Bảng điều khiển Admin Console giúp thêm/xóa thành viên và chia sẻ Custom GPTs nhóm.',
      'Lời khuyên: Cá nhân làm việc độc lập nên chọn Plus; Team từ 2 người trở lên nên chọn gói Team.'
    ]
  },
  {
    id: 'blog-109',
    title: 'Cách Khắc Phục Các Lỗi Thường Gặp Khi Sử Dụng ChatGPT Plus',
    category: 'Thủ thuật',
    author: 'Kỹ Thuật Viên MuaToolAI',
    readTime: '5 phút',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1525373698358-041e3a460346?w=1200&auto=format&fit=crop&q=80',
    coreKeyword: 'sửa lỗi ChatGPT Plus',
    summary: 'Tổng hợp nguyên nhân và giải pháp xử lý triệt để các lỗi: An error occurred, Network Error, Account Deactivated, lỗi thanh toán thẻ Visa và cách liên hệ hỗ trợ nhanh.',
    points: [
      'Lỗi Network Error khi sinh văn bản dài: Yêu cầu AI chia nhỏ câu trả lời bằng prompt "Hãy viết tiếp phần còn lại".',
      'Lỗi bị chặn IP/Cloudflare: Thử chuyển trình duyệt, tắt tiện ích VPN xung đột hoặc xóa cookie trang chat.openai.com.',
      'Lỗi từ chối thẻ ngân hàng Việt Nam: Sử dụng dịch vụ kích hoạt chính chủ qua MuaToolAI để được hỗ trợ thanh toán an toàn.',
      'Lỗi mất lịch sử chat: Kiểm tra trạng thái máy chủ tại status.openai.com hoặc làm mới phiên đăng nhập.'
    ]
  },
  {
    id: 'blog-110',
    title: 'ChatGPT 4o vs Claude 3.5 Sonnet: Ai Viết Code Và Phân Tích Dữ Liệu Tốt Hơn?',
    category: 'Review',
    author: 'Kỹ Sư Phần Mềm MuaToolAI',
    readTime: '7 phút',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
    coreKeyword: 'ChatGPT 4o vs Claude 3.5 Sonnet coding',
    summary: 'Bài test thực chiến giữa hai ông lớn AI trong các tác vụ: Giải thuật phức tạp, thiết kế giao diện Frontend, phân tích dữ liệu Pandas và viết unit test tự động.',
    points: [
      'Khả năng Coding: Claude 3.5 Sonnet vượt trội hơn về độ chuẩn xác của cú pháp và hiểu kiến trúc dự án lớn.',
      'Phân tích dữ liệu & Code Interpreter: ChatGPT Plus với Python Sandbox tích hợp cho phép chạy code trực tiếp và vẽ biểu đồ.',
      'Xử lý lỗi: Claude ít bị lặp lại lỗi cũ khi được yêu cầu sửa, trong khi ChatGPT hỗ trợ Canvas tương tác mượt mà.',
      'Kết luận: Dân kỹ thuật code thuần túy nên dùng Claude; Dân phân tích dữ liệu kinh doanh nên chọn ChatGPT Plus.'
    ]
  },
  {
    id: 'blog-111',
    title: 'Bảng Giá Tài Khoản ChatGPT Plus Chính Hãng Tại Việt Nam Mới Nhất',
    category: 'Tin tức',
    author: 'MuaToolAI Store',
    readTime: '4 phút',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80',
    coreKeyword: 'bảng giá ChatGPT Plus Việt Nam',
    summary: 'Cập nhật bảng giá đăng ký tài khoản ChatGPT Plus theo tháng, 3 tháng và 1 năm với mức ưu đãi tốt nhất thị trường, cam kết nâng cấp trên email cá nhân và bảo hành 1-1.',
    points: [
      'Giá niêm yết trực tiếp từ OpenAI: 20 USD/tháng (~520.000₫ chưa bao gồm thuế và phí chuyển đổi ngoại tệ).',
      'Giá ưu đãi tại MuaToolAI: Chỉ từ 150.000₫ - 199.000₫/tháng, tiết kiệm hơn 60% chi phí.',
      'Chính sách cam kết: Bảo hành toàn thời gian đăng ký, đổi mới tài khoản nếu có sự cố trong 24h.',
      'Phương thức thanh toán linh hoạt: Chuyển khoản ngân hàng VietQR, Momo hoặc ZaloPay.'
    ]
  },
  {
    id: 'blog-112',
    title: 'Ứng Dụng ChatGPT Trong Phân Tích Tài Chính Và Đầu Tư Chứng Khoán',
    category: 'Công nghệ AI',
    author: 'Chuyên Gia Tài Chính MuaToolAI',
    readTime: '8 phút',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80',
    coreKeyword: 'ChatGPT phân tích tài chính chứng khoán',
    summary: 'Cách ứng dụng ChatGPT Plus để đọc hiểu báo cáo tài chính (BCTC), tính toán các chỉ số P/E, ROE, Debt/Equity và tóm tắt biên bản họp đại hội đồng cổ đông.',
    points: [
      'Đọc nhanh Báo Cáo Tài Chính dạng PDF: Trích xuất doanh thu, lợi nhuận gộp và dòng tiền hoạt động trong 30 giây.',
      'So sánh năng lực cạnh tranh: Phân tích ma trận SWOT của các doanh nghiệp cùng ngành.',
      'Tóm tắt tin tức vĩ mô: Đánh giá tác động của lãi suất ngân hàng trung ương và tỷ giá hối đoái.',
      'Lưu ý quan trọng: ChatGPT là công cụ hỗ trợ thông tin, không phải lời khuyên đầu tư tài chính trực tiếp.'
    ]
  },
  {
    id: 'blog-113',
    title: 'Hướng Dẫn Viết Prompt Chuẩn Tư Duy Xích Chuỗi (Chain-of-Thought) ChatGPT',
    category: 'Thủ thuật',
    author: 'Minh Techie - MuaToolAI',
    readTime: '6 phút',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200&auto=format&fit=crop&q=80',
    coreKeyword: 'prompt Chain of Thought ChatGPT',
    summary: 'Kỹ thuật Chain-of-Thought (CoT) hướng dẫn AI suy luận từng bước một giúp loại bỏ ảo tưởng (hallucination) và nâng tỷ lệ giải quyết bài toán phức tạp lên hơn 90%.',
    points: [
      'Nguyên lý cốt lõi: Yêu cầu AI "Hãy suy nghĩ và giải thích từng bước trước khi đưa ra kết luận cuối cùng".',
      'Ứng dụng vào bài toán logic: Giải quyết các vấn đề kinh doanh đa biến số, tính toán chi phí dự án.',
      'Few-shot CoT: Cung cấp 1-2 ví dụ mẫu có sẵn bước suy luận để AI bắt chước tư duy.',
      'Kết hợp với mô hình OpenAI o1: Khai phá tối đa tiềm năng của thế hệ AI suy luận chuyên sâu.'
    ]
  },
  {
    id: 'blog-114',
    title: 'Đánh Giá Mô Hình DeepSeek R1 So Với ChatGPT o1: Cuộc Chiến Mô Hình Suy Luận',
    category: 'Review',
    author: 'Chuyên Gia AI MuaToolAI',
    readTime: '7 phút',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80',
    coreKeyword: 'DeepSeek R1 vs ChatGPT o1',
    summary: 'So sánh chuyên sâu hai mô hình AI suy luận hàng đầu hiện nay: DeepSeek R1 với chi phí đào tạo đột phá và ChatGPT o1 với hệ sinh thái thương mại hoàn thiện.',
    points: [
      'Điểm benchmark toán học và coding: Cả hai mô hình đều đạt điểm số tiệm cận con người trong các kỳ thi Olympic.',
      'Chi phí sử dụng API: DeepSeek R1 có mức giá rẻ hơn nhiều lần, tạo áp lực lớn lên các hãng công nghệ Mỹ.',
      'Trải nghiệm người dùng: ChatGPT o1 tích hợp hoàn hảo trong giao diện ChatGPT Plus với tốc độ ổn định.',
      'Khuyến nghị sử dụng: Kết hợp cả hai để tối ưu hóa hiệu quả công việc và chi phí.'
    ]
  },
  {
    id: 'blog-115',
    title: 'Cách Tạo Trợ Lý Ảo Chăm Sóc Khách Hàng Tự Động Với ChatGPT',
    category: 'Công nghệ AI',
    author: 'Kỹ Sư Phần Mềm MuaToolAI',
    readTime: '7 phút',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80',
    coreKeyword: 'chatbot ChatGPT chăm sóc khách hàng',
    summary: 'Quy trình thiết lập Chatbot AI thông minh có khả năng trả lời 24/7 theo kịch bản bán hàng, giải đáp thắc mắc về sản phẩm và chốt đơn tự động qua Zalo hoặc Website.',
    points: [
      'Chuẩn hóa kịch bản FAQs: Đưa câu hỏi thường gặp và thông số kỹ thuật vào cơ sở dữ liệu tri thức của bot.',
      'Cài đặt giọng điệu thân thiện: Cấu hình phong cách giao tiếp lễ phép, chuyên nghiệp và nhiệt tình.',
      'Xử lý tình huống khiếu nại: Hướng dẫn bot nhận diện cảm xúc khách hàng và chuyển giao cho nhân sự khi cần.',
      'Đo lường hiệu quả: Theo dõi tỷ lệ phản hồi thành công và mức độ hài lòng của khách hàng.'
    ]
  },
  {
    id: 'blog-116',
    title: 'Bí Quyết Viết Bài SEO Chuẩn E-E-A-T Bằng ChatGPT Không Lo Bị Phạt',
    category: 'Thủ thuật',
    author: 'Trần Thảo - Content Lead',
    readTime: '8 phút',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    coreKeyword: 'viết bài SEO ChatGPT chuẩn EEAT',
    summary: 'Cách kết hợp trí tuệ nhân tạo và kinh nghiệm thực tế của con người để sản xuất bài viết chuẩn E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) được Google đánh giá cao.',
    points: [
      'Google không cấm bài viết AI, chỉ phạt nội dung rác thiếu giá trị thực tế.',
      'Bổ sung yếu tố Trải nghiệm (Experience): Chèn hình ảnh chụp thực tế, số liệu thống kê riêng và góc nhìn cá nhân.',
      'Tối ưu hóa đoạn Direct Answer: Trả lời ngắn gọn ngay mở bài để chiếm vị trí số 0 (Featured Snippet).',
      'Fact-check thông tin: Luôn kiểm tra lại nguồn số liệu và trích dẫn bài viết gốc có thẩm quyền.'
    ]
  },
  {
    id: 'blog-117',
    title: 'Hướng Dẫn Dùng ChatGPT Để Học Ngoại Ngữ Và Luyện Thi IELTS 8.0',
    category: 'Thủ thuật',
    author: 'Edu Lab - MuaToolAI',
    readTime: '7 phút',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&auto=format&fit=crop&q=80',
    coreKeyword: 'học tiếng Anh ChatGPT IELTS 8.0',
    summary: 'Biến ChatGPT thành gia sư tiếng Anh bản xứ 24/7 giúp sửa bài Writing Task 1 & 2 chi tiết theo tiêu chuẩn chấm thi IELTS, mở rộng vốn từ vựng Collocation và luyện phản xạ Speaking.',
    points: [
      'Prompt chấm bài Writing: Yêu cầu AI chấm điểm theo 4 tiêu chí: Task Achievement, Coherence, Lexical Resource, Grammar.',
      'Luyện phản xạ Speaking: Sử dụng tính năng ChatGPT Voice trên điện thoại để trò chuyện thời gian thực.',
      'Học từ vựng theo ngữ cảnh: Yêu cầu AI tạo câu ví dụ thực tế thay vì học thuộc lòng danh sách từ đơn lẻ.',
      'Phát hiện lỗi sai ngữ pháp: Giải thích cặn kẽ tại sao câu văn chưa tự nhiên và đề xuất phương án thay thế.'
    ]
  },
  {
    id: 'blog-118',
    title: 'Cách Quản Lý Bộ Nhớ (Memory) Và Dữ Liệu Cá Nhân Trên ChatGPT',
    category: 'Bảo mật',
    author: 'Kỹ Thuật Viên MuaToolAI',
    readTime: '5 phút',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?w=1200&auto=format&fit=crop&q=80',
    coreKeyword: 'quản lý Memory dữ liệu ChatGPT',
    summary: 'Hướng dẫn kiểm soát tính năng Memory của ChatGPT: xem những gì AI đã ghi nhớ, xóa bớt thông tin nhạy cảm và tắt tính năng chia sẻ dữ liệu huấn luyện để bảo mật quyền riêng tư.',
    points: [
      'Xem danh sách Memory: Vào Cài đặt > Cá nhân hóa > Quản lý bộ nhớ.',
      'Dạy AI ghi nhớ: Ra lệnh trực tiếp "Hãy nhớ rằng tôi luôn muốn câu trả lời bằng tiếng Việt và có bảng tóm tắt".',
      'Xóa ký ức không mong muốn: Nhấn vào biểu tượng thùng rác bên cạnh từng mẩu ký ức đã lưu.',
      'Bảo mật tuyệt đối: Tắt tùy chọn "Cải thiện mô hình cho mọi người" để tin nhắn không bị sử dụng huấn luyện AI.'
    ]
  },
  {
    id: 'blog-119',
    title: 'ChatGPT Vision: Cách Phân Tích Biểu Đồ, Hình Ảnh Và Tài Liệu PDF',
    category: 'Công nghệ AI',
    author: 'Minh Techie - MuaToolAI',
    readTime: '6 phút',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    coreKeyword: 'ChatGPT Vision đọc biểu đồ PDF',
    summary: 'Khai thác sức mạnh của thị giác máy tính GPT-4o để trích xuất dữ liệu từ ảnh chụp hóa đơn, đọc biểu đồ kỹ thuật và biến bản vẽ phác thảo thành code HTML hoàn chỉnh.',
    points: [
      'Chụp ảnh chuyển thành văn bản: Nhận diện chữ viết tay và bảng biểu từ sách báo, tài liệu học tập.',
      'Phân tích biểu đồ kinh doanh: Đọc xu hướng tăng trưởng từ đồ thị hình cột, hình tròn hoặc nến chứng khoán.',
      'Chuyển phác thảo UI/UX thành code: Vẽ giao diện web trên giấy, chụp ảnh và yêu cầu ChatGPT tạo code Tailwind CSS.',
      'Nhận diện linh kiện và mã lỗi: Chụp ảnh lỗi màn hình xanh máy tính để AI chẩn đoán nguyên nhân và cách xử lý.'
    ]
  },
  {
    id: 'blog-120',
    title: 'Mua Tài Khoản ChatGPT Plus Ở Đâu Uy Tín Nhất Hiện Nay?',
    category: 'Review',
    author: 'MuaToolAI Store',
    readTime: '5 phút',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?w=1200&auto=format&fit=crop&q=80',
    coreKeyword: 'mua tài khoản ChatGPT Plus uy tín',
    summary: 'Đánh giá các tiêu chí lựa chọn địa chỉ mua ChatGPT Plus uy tín: hỗ trợ nâng cấp trên chính email của bạn, kích hoạt siêu tốc trong 5 phút, bảo hành 1-1 trọn đời và giá cả minh bạch.',
    points: [
      'Cảnh giác tài khoản giá rẻ bất thường: Nguy cơ bị khóa sau vài ngày do dùng thẻ thanh toán rác (CC chùa).',
      'Ưu điểm vượt trội tại MuaToolAI: Nâng cấp chính chủ 100%, bảo hành 1 đổi 1 toàn thời gian, hỗ trợ kỹ thuật 24/7.',
      'Thủ tục nhanh gọn: Không cần cài đặt phức tạp, chỉ cần cung cấp email là có thể kích hoạt trong 3 - 5 phút.',
      'Cộng đồng hỗ trợ lớn mạnh: Được tham gia nhóm hỗ trợ Zalo với hàng nghìn thành viên chia sẻ mẹo dùng AI.'
    ]
  }
];

// Additional clusters generator to reach 100 comprehensive articles with 100% unique, relevant images
const CLUSTER_CONFIGS = [
  // Cụm 2: AI Coding (21-35) - 15 articles
  {
    prefix: 120,
    count: 15,
    category: 'Công nghệ AI',
    author: 'Kỹ Sư Phần Mềm MuaToolAI',
    relatedProductId: '12',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550439062-609e15737780?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=1200&auto=format&fit=crop&q=80'
    ],
    titles: [
      'Hướng Dẫn Sử Dụng Cursor AI Toàn Tập: Trình Biên Dịch Mã Nguồn Đỉnh Cao',
      'Cursor AI vs GitHub Copilot: Lập Trình Viên Nên Chọn Công Cụ Nào?',
      'Windsurf AI Editor: Đối Thủ Đáng Gờm Nhất Của Cursor Hiện Nay',
      'Cách Tối Ưu Hóa Context Window Và File .cursorrules Để Code Chính Xác 100%',
      'Hướng Dẫn Dùng Claude 3.5 Sonnet Trong Cursor Để Xây Dựng Full-Stack App',
      'Top 10 Phím Tắt Và Mẹo Lập Trình Cực Nhanh Với Cursor Pro',
      'GitHub Copilot Workspace: Tương Lai Của Việc Review Và Sửa Lỗi Code Tự Động',
      'Replit Agent Và Bolt.new: Xây Dựng Ứng Dụng Web Chỉ Bằng Một Câu Lệnh',
      'Cách Mua Tài Khoản Cursor Pro Giá Rẻ, Kích Hoạt Nhanh Và Bảo Hành 1-1',
      'DeepSeek Coder V3: Lập Trình Mã Nguồn Mở Có Thay Thế Được GPT-4o?',
      'Hướng Dẫn Debug Và Refactor Code Tự Động Với Trí Tuệ Nhân Tạo',
      'Cách Kết Nối API OpenAI Và Anthropic Vào VS Code Để Tối Ưu Chi Phí',
      'AI Agent Trong Lập Trình: Xu Hướng Thay Đổi Ngành IT Năm 2026',
      'Lập Trình Game Cơ Bản Với Sự Hỗ Trợ Của AI Cho Người Không Biết Code',
      'Bảo Mật Mã Nguồn Doanh Nghiệp Khi Sử Dụng Các Công Cụ AI Coding'
    ]
  },
  // Cụm 3: Thiết kế Đồ họa & Nghệ thuật AI (36-50) - 15 articles
  {
    prefix: 135,
    count: 15,
    category: 'Design',
    author: 'Chuyên Gia Đồ Họa MuaToolAI',
    relatedProductId: '6',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1626785774573-4b799312c95d?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80'
    ],
    titles: [
      'Hướng Dẫn Sử Dụng Midjourney v6.1 Từ Cơ Bản Đến Nâng Cao',
      'Bí Quyết Viết Prompt Midjourney Tạo Ảnh Chân Dung Siêu Thực (Photorealistic)',
      'Bảng Tổng Hợp Các Tham Số Midjourney Quan Trọng Nhất: --ar, --v, --s, --c',
      'Ứng Dụng Midjourney Trong Thiết Kế Bao Bì Và Concept Sản Phẩm TMĐT',
      'Canva Pro Có Gì Khác Biệt So Với Bản Miễn Phí? Đánh Giá Chi Tiết',
      'Hướng Dẫn Sử Dụng Canva Magic Studio: Biến Ý Tưởng Thành Thiết Kế Trong Tích Tắc',
      'Cách Nâng Cấp Tài Khoản Canva Pro Vĩnh Viễn Chính Chủ An Toàn',
      'Adobe Photoshop Generative Fill: Hướng Dẫn Xóa Vật Thể Và Mở Rộng Khung Ảnh',
      'Adobe Illustrator Text To Vector: Cách Tạo Vector Đồ Họa Bằng AI Chuyên Nghiệp',
      'Mua Bản Quyền Adobe Creative Cloud All Apps Chính Hãng Giá Rẻ Ở Đâu?',
      'So Sánh Midjourney, DALL-E 3 Và Stable Diffusion: Công Cụ Nào Tạo Ảnh Đẹp Nhất?',
      'Hướng Dẫn Tạo Hình Ảnh Kiến Trúc Và Nội Thất 3D Bằng Midjourney',
      'Cách Tạo Bộ Nhận Diện Thương Hiệu (Brand Guidelines) Bằng Canva Pro',
      'Stable Diffusion ComfyUI: Tự Chủ Sáng Tạo Nghệ Thuật Trên Máy Tính Cá Nhân',
      'Cách Kiếm Tiền Từ Thiết Kế Đồ Họa Với Sự Trợ Giúp Của AI Năm 2026'
    ]
  },
  // Cụm 4: AI Video & Âm nhạc (51-65) - 15 articles
  {
    prefix: 150,
    count: 15,
    category: 'Review',
    author: 'Content Creator MuaToolAI',
    relatedProductId: '11',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=1200&auto=format&fit=crop&q=80'
    ],
    titles: [
      'Runway Gen-3 Alpha: Hướng Dẫn Làm Video Điện Ảnh Từ Văn Bản Và Hình Ảnh',
      'So Sánh Runway Gen-3, Luma Dream Machine Và Kling AI: Vua Video AI Là Ai?',
      'Suno AI v3.5 & v4: Cách Tạo Bài Hát Hoàn Chỉnh Đủ Lời Và Nhạc Trong 60 Giây',
      'Udio AI: Nền Tảng Sáng Tác Âm Nhạc Chuyên Nghiệp Dành Cho Nghệ Sĩ',
      'ElevenLabs: Công Cụ Sao Chép Giọng Nói Và Lồng Tiếng AI Tiếng Việt Đỉnh Nhất',
      'CapCut Pro Bản Quyền PC Và Mobile: Những Tính Năng Đắt Giá Bạn Phải Biết',
      'Cách Tự Động Dịch Và Lồng Tiếng Video YouTube/TikTok Bằng ElevenLabs',
      'Hướng Dẫn Làm Video Hoạt Hình Ngắn Triệu View Trên TikTok Bằng AI',
      'Pika Labs 1.5: Cách Tạo Chuyển Động Và Hiệu Ứng Đặc Biệt Cho Video',
      'Mua Tài Khoản CapCut Pro Chính Hãng Giá Rẻ Bảo Hành Trọn Đời',
      'Quy Trình 5 Bước Sản Xuất Podcast Chuyên Nghiệp Với Sự Hỗ Trợ Của AI',
      'Kling AI: Cách Tạo Video Chuyển Động Mượt Mà Không Bị Méo Hình',
      'Cách Làm Video Bán Hàng Tự Động Với Người Mẫu Ảo AI (Digital Human)',
      'Bản Quyền Âm Nhạc Khi Sáng Tác Bằng AI: Những Điều Cần Lưu Ý',
      'Xu Hướng Video AI Bùng Nổ Năm 2026 Và Cơ Hội Cho Content Creator'
    ]
  },
  // Cụm 5: Nghiên cứu & Search AI (66-75) - 10 articles
  {
    prefix: 165,
    count: 10,
    category: 'Thủ thuật',
    author: 'Học Thuật AI MuaToolAI',
    relatedProductId: '3',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80'
    ],
    titles: [
      'Perplexity Pro: Công Cụ Nghiên Cứu Thông Tin Chuyên Sâu Thay Thế Google',
      'Cách Sử Dụng Perplexity Pro Để Viết Báo Cáo Khoa Học Và Phân Tích Thị Trường',
      'Claude 3.5 Sonnet Artifacts: Cách Tạo Biểu Đồ, Sơ Đồ Và Code Tương Tác',
      'Google NotebookLM: Trợ Lý Học Tập Cá Nhân Hóa Từ Tài Liệu Của Bạn',
      'Poe AI Là Gì? Cách Sử Dụng Nhiều Mô Hình AI Trên Cùng Một Tài Khoản',
      'Cách Mua Tài Khoản Perplexity Pro Giá Rẻ Kích Hoạt Trực Tiếp Trên Email',
      'So Sánh Perplexity Pro Và ChatGPT Search: Đâu Là Công Cụ Nghiên Cứu Vượt Trội?',
      'Hướng Dẫn Tóm Tắt Sách Và Tài Liệu PDF Hàng Trăm Trang Bằng AI',
      'Tránh Đạo Văn Và Kiểm Tra Độ Trung Thực Học Thuật Trong Thời Đại AI',
      'Cách Xây Dựng Cơ Sở Dữ Liệu Tri Thức Thứ Hai (Second Brain) Bằng AI'
    ]
  },
  // Cụm 6: Văn phòng & Năng suất (76-85) - 10 articles
  {
    prefix: 175,
    count: 10,
    category: 'Tin tức',
    author: 'Office Master MuaToolAI',
    relatedProductId: '8',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&auto=format&fit=crop&q=80'
    ],
    titles: [
      'Microsoft 365 Bản Quyền Kèm Copilot Pro: Nâng Tầm Hiệu Suất Văn Phòng',
      'Tự Động Hóa Bảng Tính Excel Bằng Câu Lệnh AI Với Microsoft Copilot',
      'Tạo Bài Thuyết Trình PowerPoint Đẹp Mắt Trong 3 Phút Với Microsoft 365',
      'Notion AI: Quản Lý Công Việc, Ghi Chú Và Tài Liệu Dự Án Thông Minh',
      'So Sánh Microsoft 365 Family Và Personal: Lựa Chọn Nào Tiết Kiệm Nhất?',
      'Cách Mua Gói Microsoft 365 1TB OneDrive Giá Rẻ Kích Hoạt Chính Chủ',
      'Google Workspace Kèm Gemini AI: Giải Pháp Làm Việc Cộng Tác Cho Doanh Nghiệp',
      'Tự Động Hóa Quy Trình Làm Việc Với Make.com Và Zapier Kết Hợp AI',
      'Hướng Dẫn Xây Dựng Hệ Thống Quản Trị Dự Án Kanban Bằng Notion',
      'Cách Bảo Vệ Tài Liệu Và Dữ Liệu Kinh Doanh Đám Mây An Toàn 100%'
    ]
  },
  // Cụm 7: Hệ điều hành & VPN Bảo mật (86-93) - 8 articles
  {
    prefix: 185,
    count: 8,
    category: 'Bảo mật',
    author: 'An Ninh Mạng MuaToolAI',
    relatedProductId: '7',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1200&auto=format&fit=crop&q=80'
    ],
    titles: [
      'Vì Sao Nên Dùng Key Windows 11 Pro Bản Quyền Vĩnh Viễn Thay Vì Crack?',
      'Hướng Dẫn Nâng Cấp Windows 11 Home Lên Pro Không Mất Dữ Liệu',
      'Tính Năng BitLocker Và Windows Sandbox Trên Windows 11 Pro Có Gì Đặc Biệt?',
      'Top 3 Phần Mềm VPN Tốt Nhất Tại Việt Nam: NordVPN, ExpressVPN, Surfshark',
      'Cách Sử Dụng VPN Để Bảo Mật Giao Dịch Ngân Hàng Và Wifi Công Cộng',
      'Mua Key Windows 11 Pro Và Office 2024 Bản Quyền Chính Hãng Giá Rẻ',
      'Cách Giải Phóng Dung Lượng Ổ C Và Tăng Tốc Máy Tính Windows 11',
      'Hướng Dẫn Kiểm Tra Tính Tương Thích Phần Cứng Trước Khi Cài Đặt Phần Mềm'
    ]
  },
  // Cụm 8: Giải trí & Học tập số (94-100) - 7 articles
  {
    prefix: 193,
    count: 7,
    category: 'Thủ thuật',
    author: 'Edu Lab MuaToolAI',
    relatedProductId: '2',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&auto=format&fit=crop&q=80'
    ],
    titles: [
      'YouTube Premium: Trải Nghiệm Xem Video Không Quảng Cáo Và Nghe Nhạc Nền',
      'So Sánh YouTube Music Premium Và Spotify Premium: Nên Chọn Nền Tảng Nào?',
      'Netflix Gói 4K Ultra HD: Cách Thưởng Thức Phim Chuẩn Rạp Tại Gia',
      'ELSA Speak Pro: Bí Quyết Phát Âm Tiếng Anh Chuẩn Bản Xứ Với AI',
      'Duolingo Super: Học Ngoại Ngữ Không Giới Hạn Tim Và Không Có Quảng Cáo',
      'Mua Tài Khoản YouTube Premium Và Spotify Premium Giá Rẻ Bảo Hành Trọn Đời',
      'Tổng Hợp Các Công Cụ AI Và Phần Mềm Bản Quyền Không Thể Thiếu Năm 2026'
    ]
  }
];

function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Generate the full 100 posts
const fullBlogs = [...TOPIC_DEFS];

CLUSTER_CONFIGS.forEach(cluster => {
  cluster.titles.forEach((title, idx) => {
    const idNum = cluster.prefix + idx + 1;
    const itemImage = (cluster.images && cluster.images[idx]) ? cluster.images[idx] : cluster.image;
    const item = {
      id: `blog-${idNum}`,
      title,
      category: cluster.category,
      author: cluster.author,
      readTime: '6 phút',
      relatedProductId: cluster.relatedProductId,
      image: itemImage,
      coreKeyword: title.toLowerCase(),
      summary: `Bài viết phân tích chuyên sâu về ${title.toLowerCase()}, cung cấp hướng dẫn thực tế, giải pháp tối ưu và so sánh chi tiết giúp bạn tiết kiệm thời gian và nâng cao hiệu suất làm việc.`,
      points: [
        `Phân tích nguyên lý và giải pháp cốt lõi cho ${title.toLowerCase()}.`,
        `Quy trình thực hiện từng bước đơn giản, dễ áp dụng ngay cả với người mới bắt đầu.`,
        `Đánh giá ưu nhược điểm thực tế và so sánh với các công cụ tương đương trên thị trường.`,
        `Khuyến nghị mua tài khoản chính hãng tại MuaToolAI với chính sách bảo hành 1-1 và kích hoạt siêu tốc.`
      ]
    };
    fullBlogs.push(item);
  });
});

console.log(`Generated topic list with ${fullBlogs.length} articles.`);

const STEP_DEFAULTS = [
  'Khảo sát nhu cầu và lựa chọn phương án tối ưu',
  'Quy trình thiết lập và triển khai từng bước',
  'Đánh giá hiệu năng và so sánh giải pháp thực tế',
  'Kinh nghiệm thực chiến và khuyến nghị an toàn'
];

// Formats full markdown content for each post
function createMarkdownContent(blog) {
  const slug = slugify(blog.title);
  
  const stepBlocks = blog.points.map((p, i) => {
    let title = '';
    let body = '';
    if (p.includes(':')) {
      title = p.split(':')[0].trim();
      body = p.substring(p.indexOf(':') + 1).trim();
    } else {
      title = STEP_DEFAULTS[i] || `Bước ${i + 1}`;
      body = p.trim();
    }
    return `### Bước ${i + 1}: ${title}\n${body}\n`;
  }).join('\n');

  return `## 1. Tổng Quan & Bối Cảnh Thực Tế
Trong thời đại công nghệ số và trí tuệ nhân tạo phát triển vượt bậc năm 2026, việc nắm vững **${blog.title}** không chỉ giúp bạn tiết kiệm hàng chục giờ làm việc mỗi tuần mà còn tạo ra lợi thế cạnh tranh vượt trội trong công việc và học tập.

Dưới đây là các điểm mấu chốt bạn cần lưu ý:
- **Hiệu năng vượt trội**: Tiết kiệm từ 50% đến 80% thời gian xử lý thủ công.
- **Tính chuẩn xác cao**: Giảm thiểu sai sót nhờ quy chuẩn hóa quy trình làm việc.
- **Tiết kiệm chi phí**: Mua gói bản quyền chính hãng tại MuaToolAI với mức giá tối ưu nhất.

---

## 2. Hướng Dẫn Chi Tiết Từng Bước
${stepBlocks}
---

## 3. Bảng Đánh Giá & So Sánh Nhanh
| Tiêu chí | Bản Quyền Chính Hãng MuaToolAI | Tài Khoản Miễn Phí / Crack |
| :--- | :--- | :--- |
| **Tính ổn định** | 99.9% Up-time, kích hoạt 3-5 phút | Thường xuyên bị lỗi, nguy cơ dính mã độc |
| **Bảo mật dữ liệu** | An toàn 100%, nâng cấp trên Email chính chủ | Nguy cơ lộ lọt thông tin cá nhân và dự án |
| **Chính sách bảo hành** | Bảo hành 1-1 trọn đời, hỗ trợ 24/7 | Không có bảo hành hay hỗ trợ kỹ thuật |
| **Chi phí** | Siêu tiết kiệm so với giá niêm yết tại hãng | Rủi ro mất tiền và mất tài khoản |

---

## 4. Câu Hỏi Thường Gặp (FAQ)
### Q1: Sau khi đặt mua tài khoản tại MuaToolAI, bao lâu tôi nhận được dịch vụ?
**A**: Hệ thống và đội ngũ kỹ thuật viên của MuaToolAI sẽ bàn giao thông tin đăng nhập hoặc link kích hoạt chính chủ cho bạn trong vòng **3 - 5 phút** qua Zalo hoặc Email.

### Q2: Chính sách bảo hành hoạt động như thế nào?
**A**: Tất cả sản phẩm đều được cam kết **bảo hành 1-1 toàn thời gian sử dụng**. Nếu phát sinh lỗi kỹ thuật từ nhà sản xuất, shop cam kết đổi mới ngay lập tức hoặc hoàn tiền 100%.

### Q3: Tôi có được hỗ trợ cài đặt từ xa không?
**A**: Có! Đội ngũ kỹ thuật viên MuaToolAI túc trực 24/7 sẵn sàng hỗ trợ bạn qua Zalo, gọi điện hoặc qua Ultraview/Teamviewer hoàn toàn miễn phí.

---

## 5. Kết Luận & Ưu Đãi Đặc Quyền
Sở hữu bản quyền chính hãng không chỉ giúp công việc của bạn diễn ra suôn sẻ, ổn định mà còn bảo vệ an toàn cho dữ liệu số cá nhân.

👉 **Nhận tư vấn và báo giá ưu đãi mới nhất ngay hôm nay tại [MuaToolAI.com](https://muatoolai.com)** để kích hoạt tài khoản chính chủ chỉ trong 3 phút!`;
}

// Transform all into final BlogPost format
const finalBlogs = fullBlogs.map((b, idx) => ({
  id: b.id,
  title: b.title,
  slug: slugify(b.title),
  excerpt: b.summary,
  content: createMarkdownContent(b),
  author: b.author,
  category: b.category,
  readTime: b.readTime,
  read_time: b.readTime,
  date: '07/09/2026',
  image: b.image,
  relatedProductId: b.relatedProductId
}));

// 1. Write to data/allBlogs.ts
const dataDir = path.resolve('data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const allBlogsTsContent = `// Auto-generated 100+ comprehensive blog posts for SEO and GEO optimization
import { BlogPost } from '../types';

export const ALL_BLOG_POSTS: BlogPost[] = ${JSON.stringify(finalBlogs, null, 2)};
`;

fs.writeFileSync(path.join(dataDir, 'allBlogs.ts'), allBlogsTsContent, 'utf-8');
console.log(`Successfully wrote ${finalBlogs.length} blog posts to data/allBlogs.ts`);

// 2. Upload to Supabase in batches
async function uploadToSupabase() {
  console.log('Connecting to Supabase to update/upsert blogs...');
  
  // Fetch existing blogs to map by slug
  const { data: existingBlogs, error: fetchErr } = await supabase.from('blogs').select('id, slug');
  const existingMap = new Map((existingBlogs || []).map(b => [b.slug, b.id]));
  console.log(`Found ${existingMap.size} existing blogs in Supabase.`);

  let updatedCount = 0;
  let insertedCount = 0;

  for (const b of finalBlogs) {
    const payload = {
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      content: b.content,
      author: b.author,
      category: b.category,
      read_time: b.readTime,
      readTime: b.readTime,
      date: b.date,
      image: b.image,
      relatedProductId: b.relatedProductId
    };

    if (existingMap.has(b.slug)) {
      const id = existingMap.get(b.slug);
      const { error } = await supabase.from('blogs').update(payload).eq('id', id);
      if (!error) {
        updatedCount++;
      } else {
        console.error(`Error updating blog ${b.slug}:`, error);
      }
    } else {
      const { error } = await supabase.from('blogs').insert([payload]);
      if (!error) {
        insertedCount++;
      } else {
        console.error(`Error inserting blog ${b.slug}:`, error);
      }
    }
  }

  console.log(`Supabase blog sync complete! Updated: ${updatedCount}, Inserted: ${insertedCount}`);
}

// 3. Update public/sitemap.xml
function updateSitemap() {
  const sitemapPath = path.resolve('public/sitemap.xml');
  const baseSitemap = fs.readFileSync(sitemapPath, 'utf-8');

  // Extract core non-blog URLs
  const urlMatches = baseSitemap.match(/<url>[\s\S]*?<\/url>/g) || [];
  const coreUrls = urlMatches.filter(u => !u.includes('/blog/'));

  let newXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  coreUrls.forEach(u => {
    newXml += `  ${u.trim()}\n`;
  });

  newXml += `\n  <!-- 100+ SEO & GEO Optimized Blog Posts -->\n`;
  finalBlogs.forEach(b => {
    newXml += `  <url>\n    <loc>https://muatoolai.com/blog/${b.slug}</loc>\n    <lastmod>2026-09-07</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.80</priority>\n  </url>\n`;
  });

  newXml += `</urlset>\n`;

  fs.writeFileSync(sitemapPath, newXml, 'utf-8');
  console.log(`Updated public/sitemap.xml with ${finalBlogs.length} blog URLs.`);
}

// 4. Update public/llms.txt and public/llms-full.txt
function updateLlmsTxt() {
  const llmsPath = path.resolve('public/llms.txt');
  let llmsContent = fs.readFileSync(llmsPath, 'utf-8');

  if (!llmsContent.includes('## Featured AI & Software Guides (100 Articles)')) {
    llmsContent += `\n## Featured AI & Software Guides (100 Articles)\n`;
    finalBlogs.forEach(b => {
      llmsContent += `- [${b.title}](https://muatoolai.com/blog/${b.slug}): ${b.excerpt}\n`;
    });
    fs.writeFileSync(llmsPath, llmsContent, 'utf-8');
    console.log('Updated public/llms.txt with 100 article links.');
  }

  const llmsFullPath = path.resolve('public/llms-full.txt');
  let llmsFullContent = fs.readFileSync(llmsFullPath, 'utf-8');
  if (!llmsFullContent.includes('## Comprehensive Blog Knowledge Graph')) {
    llmsFullContent += `\n## Comprehensive Blog Knowledge Graph\n`;
    finalBlogs.forEach(b => {
      llmsFullContent += `\n### ${b.title}\n- URL: https://muatoolai.com/blog/${b.slug}\n- Category: ${b.category}\n- Key Takeaway: ${b.excerpt}\n`;
    });
    fs.writeFileSync(llmsFullPath, llmsFullContent, 'utf-8');
    console.log('Updated public/llms-full.txt with 100 article summaries.');
  }
}

async function main() {
  await uploadToSupabase();
  updateSitemap();
  updateLlmsTxt();
  console.log('All 100 blogs successfully generated and synchronized!');
}

main().catch(console.error);
