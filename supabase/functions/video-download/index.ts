declare const Deno: {
  env: { get(name: string): string | undefined };
  serve(handler: (request: Request) => Response | Promise<Response>): void;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

const allowedHosts = ['tiktok.com', 'facebook.com', 'fb.watch', 'youtube.com', 'youtu.be', 'threads.net', 'threads.com'];
const allowedQualities = new Set(['max', '2160', '1440', '1080', '720', '480']);
const allowedModes = new Set(['auto', 'audio', 'mute']);
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: corsHeaders });
const isSupportedHost = (hostname: string) => allowedHosts.some((host) => hostname === host || hostname.endsWith(`.${host}`));

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return json({ status: 'error', error: 'Phương thức không được hỗ trợ.' }, 405);

  const endpoint = Deno.env.get('COBALT_API_URL')?.trim().replace(/\/+$/, '');
  if (!endpoint) return json({ status: 'error', error: 'Dịch vụ tải video chưa được cấu hình trên Supabase.' }, 503);

  let body: { url?: unknown; quality?: unknown; mode?: unknown };
  try { body = await request.json(); }
  catch { return json({ status: 'error', error: 'Dữ liệu gửi lên không hợp lệ.' }, 400); }

  const url = body.url;
  const quality = String(body.quality || 'max');
  const mode = String(body.mode || 'auto');
  if (typeof url !== 'string' || url.length > 2048 || !allowedQualities.has(quality) || !allowedModes.has(mode)) {
    return json({ status: 'error', error: 'Yêu cầu tải xuống không hợp lệ.' }, 400);
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
    if (parsed.protocol !== 'https:' || !isSupportedHost(parsed.hostname.toLowerCase())) throw new Error('unsupported');
  } catch {
    return json({ status: 'error', error: 'Chỉ hỗ trợ liên kết HTTPS từ TikTok, Facebook, YouTube và Threads.' }, 400);
  }

  try {
    const headers: Record<string, string> = { Accept: 'application/json', 'Content-Type': 'application/json', 'User-Agent': 'MuaToolAI-VideoDownloader/1.0' };
    const apiKey = Deno.env.get('COBALT_API_KEY');
    if (apiKey) headers.Authorization = `Api-Key ${apiKey}`;

    const upstream = await fetch(`${endpoint}/`, {
      method: 'POST', headers,
      body: JSON.stringify({
        url: parsed.toString(), videoQuality: quality, downloadMode: mode,
        audioFormat: 'mp3', audioBitrate: '320', filenameStyle: 'pretty',
        youtubeVideoContainer: 'mp4', youtubeVideoCodec: 'h264', youtubeBetterAudio: true,
        allowH265: false, localProcessing: 'disabled',
      }),
      signal: AbortSignal.timeout(25000),
    });
    const data = await upstream.json();
    if (!upstream.ok || data?.status === 'error') {
      return json({ status: 'error', error: upstream.status === 429 ? 'Có quá nhiều yêu cầu. Vui lòng chờ một lát rồi thử lại.' : 'Không thể lấy video này. Hãy kiểm tra quyền riêng tư và thử lại.' }, upstream.status === 429 ? 429 : 422);
    }
    if (!['tunnel', 'redirect', 'picker'].includes(data?.status)) return json({ status: 'error', error: 'Video này cần kiểu xử lý chưa được hỗ trợ.' }, 422);
    return json(data);
  } catch (error) {
    const timedOut = error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError');
    return json({ status: 'error', error: timedOut ? 'Quá thời gian xử lý. Hãy thử lại với chất lượng thấp hơn.' : 'Máy chủ xử lý video hiện không phản hồi.' }, 502);
  }
});
