const ALLOWED_HOSTS = [
  'tiktok.com',
  'facebook.com',
  'fb.watch',
  'youtube.com',
  'youtu.be',
  'threads.net',
  'threads.com',
];

const ALLOWED_QUALITIES = new Set(['max', '2160', '1440', '1080', '720', '480']);
const ALLOWED_MODES = new Set(['auto', 'audio', 'mute']);

const isSupportedHost = (hostname: string) =>
  ALLOWED_HOSTS.some((host) => hostname === host || hostname.endsWith(`.${host}`));

const messages: Record<string, string> = {
  'error.api.fetch': 'Không thể kết nối tới nền tảng. Vui lòng thử lại sau.',
  'error.api.content': 'Video không công khai, đã bị xóa hoặc không cho phép tải xuống.',
  'error.api.link': 'Liên kết video không hợp lệ hoặc chưa được hỗ trợ.',
  'error.api.rate': 'Có quá nhiều yêu cầu. Vui lòng chờ một lát rồi thử lại.',
};

export default async function handler(request: any, response: any) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ status: 'error', error: 'Phương thức không được hỗ trợ.' });
  }

  const endpoint = process.env.COBALT_API_URL?.trim().replace(/\/+$/, '');
  if (!endpoint) {
    return response.status(503).json({
      status: 'error',
      error: 'Dịch vụ tải video đang được cấu hình. Vui lòng quay lại sau.',
    });
  }

  const { url, quality = 'max', mode = 'auto' } = request.body || {};
  if (typeof url !== 'string' || url.length > 2048 || !ALLOWED_QUALITIES.has(String(quality)) || !ALLOWED_MODES.has(String(mode))) {
    return response.status(400).json({ status: 'error', error: 'Yêu cầu tải xuống không hợp lệ.' });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
    if (parsed.protocol !== 'https:' || !isSupportedHost(parsed.hostname.toLowerCase())) throw new Error('unsupported');
  } catch {
    return response.status(400).json({ status: 'error', error: 'Chỉ hỗ trợ liên kết HTTPS từ TikTok, Facebook, YouTube và Threads.' });
  }

  try {
    const headers: Record<string, string> = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'MuaToolAI-VideoDownloader/1.0',
    };
    if (process.env.COBALT_API_KEY) headers.Authorization = `Api-Key ${process.env.COBALT_API_KEY}`;

    const upstream = await fetch(`${endpoint}/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        url: parsed.toString(),
        videoQuality: quality,
        downloadMode: mode,
        audioFormat: 'mp3',
        audioBitrate: '320',
        filenameStyle: 'pretty',
        youtubeVideoContainer: 'mp4',
        youtubeVideoCodec: 'h264',
        youtubeBetterAudio: true,
        allowH265: false,
        localProcessing: 'disabled',
      }),
      signal: AbortSignal.timeout(25000),
    });

    const data = await upstream.json() as any;
    if (!upstream.ok || data.status === 'error') {
      const code = data?.error?.code || data?.error || '';
      const key = Object.keys(messages).find((item) => String(code).startsWith(item));
      return response.status(upstream.status === 429 ? 429 : 422).json({
        status: 'error',
        error: upstream.status === 429 ? messages['error.api.rate'] : key ? messages[key] : 'Không thể lấy video này. Hãy kiểm tra quyền riêng tư và thử lại.',
      });
    }

    if (!['tunnel', 'redirect', 'picker'].includes(data.status)) {
      return response.status(422).json({ status: 'error', error: 'Video này cần kiểu xử lý chưa được máy chủ hỗ trợ.' });
    }
    return response.status(200).json(data);
  } catch (error) {
    const timedOut = error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError');
    return response.status(502).json({ status: 'error', error: timedOut ? 'Quá thời gian xử lý. Hãy thử lại với chất lượng thấp hơn.' : 'Máy chủ xử lý video hiện không phản hồi.' });
  }
}
