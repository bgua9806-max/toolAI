export function parseMarkdownToHtml(md: string): string {
  if (!md) return '';
  
  // Normalize linebreaks and strip leading duplicate Direct Answer if present
  let cleanMd = md
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/^##\s*Tóm\s*Tắt\s*Nhanh\s*\(Direct Answer\)[\s\S]*?(?:---\s*\n+|(?=##\s*[1-9]))/i, '')
    .trim();

  const lines = cleanMd.split('\n');
  let html = '';
  let inList = false;
  let listType = '';
  let inTable = false;
  let tableRows: string[] = [];

  function formatInline(text: string): string {
    return text
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-gray-950">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-800">$1</em>')
      // Inline Code
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 font-mono text-xs font-bold border border-blue-100">$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 font-bold hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
  }

  function flushTable(): string {
    if (!inTable || tableRows.length === 0) return '';
    inTable = false;
    const header = tableRows[0];
    // Filter out rows that are just separator lines like | :--- | :--- |
    const body = tableRows.slice(1).filter(r => !/^\s*\|?\s*[-:\s|]+\s*\|?\s*$/.test(r));
    
    // Clean leading and trailing pipes
    const cleanCells = (row: string) => 
      row.replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());

    const hCols = cleanCells(header);
    
    let res = '<div class="overflow-x-auto my-8 rounded-2xl border border-gray-200 shadow-sm bg-white"><table class="w-full text-left border-collapse"><thead class="bg-gray-50/80 border-b border-gray-200"><tr>';
    hCols.forEach(c => {
      res += `<th class="py-3.5 px-5 font-black text-xs uppercase tracking-wider text-gray-700">${formatInline(c)}</th>`;
    });
    res += '</tr></thead><tbody class="divide-y divide-gray-100">';
    body.forEach(row => {
      const rCols = cleanCells(row);
      res += '<tr class="hover:bg-blue-50/30 transition-colors">';
      rCols.forEach(c => {
        res += `<td class="py-3.5 px-5 text-sm text-gray-700 leading-normal">${formatInline(c)}</td>`;
      });
      res += '</tr>';
    });
    res += '</tbody></table></div>';
    tableRows = [];
    return res;
  }

  function flushList(): string {
    if (!inList) return '';
    inList = false;
    const tag = listType;
    listType = '';
    return `</${tag}>`;
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      if (inTable) html += flushTable();
      if (inList) html += flushList();
      continue;
    }

    // Check Table row: | col1 | col2 |
    if (line.startsWith('|') && line.endsWith('|')) {
      if (inList) html += flushList();
      inTable = true;
      tableRows.push(line);
      continue;
    } else if (inTable) {
      html += flushTable();
    }

    // Check Horizontal Divider: --- or *** or ___
    if (/^(\-{3,}|\*{3,}|_{3,})$/.test(line)) {
      if (inList) html += flushList();
      html += '<hr class="my-8 border-t border-gray-200" />';
      continue;
    }

    // Check CTA paragraph with 👉
    if (line.startsWith('👉')) {
      if (inList) html += flushList();
      const ctaContent = formatInline(line);
      html += `<div class="my-8 p-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-xl shadow-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4"><div class="text-sm sm:text-base font-bold leading-relaxed text-white [&_strong]:text-yellow-300 [&_a]:text-yellow-300 [&_a]:underline">${ctaContent}</div><a href="https://muatoolai.com" class="px-5 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-black text-xs uppercase tracking-wider shrink-0 shadow-md active:scale-95 transition-all">Khám phá ngay</a></div>`;
      continue;
    }

    // Check FAQ Question: ### Q1: ... or ### Q: ...
    if (/^###\s*Q\d*[:.]/i.test(line)) {
      if (inList) html += flushList();
      const qText = formatInline(line.replace(/^###\s*/, ''));
      html += `<div class="mt-7 mb-2 flex items-center gap-2 text-blue-900 font-extrabold text-base sm:text-lg"><span class="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-700 text-xs font-black shrink-0">HỎI</span><span>${qText}</span></div>`;
      continue;
    }

    // Check FAQ Answer: **Trả lời**: ... or **A**: ...
    if (/^\*\*(?:Trả lời|A)\*\*[:.]/i.test(line)) {
      if (inList) html += flushList();
      html += `<div class="mb-5 pl-4 border-l-2 border-emerald-500 bg-emerald-50/40 p-3 rounded-r-xl text-gray-700 text-sm sm:text-[15px] leading-relaxed">${formatInline(line)}</div>`;
      continue;
    }

    // Check Headings
    if (line.startsWith('#')) {
      if (inList) html += flushList();
      const match = line.match(/^(#{1,6})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const text = formatInline(match[2]);
        if (level === 1) {
          html += `<h1 class="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight mt-10 mb-4 leading-tight">${text}</h1>`;
        } else if (level === 2) {
          html += `<h2 class="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight mt-10 mb-4 flex items-center gap-2.5 pb-2 border-b border-gray-100 leading-snug">${text}</h2>`;
        } else if (level === 3) {
          html += `<h3 class="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-3 leading-snug">${text}</h3>`;
        } else {
          html += `<h4 class="text-lg font-bold text-gray-900 mt-5 mb-2 leading-snug">${text}</h4>`;
        }
        continue;
      }
    }

    // Check Blockquotes
    if (line.startsWith('>')) {
      if (inList) html += flushList();
      const quoteText = formatInline(line.replace(/^>\s*/, ''));
      html += `<blockquote class="my-6 rounded-2xl border-l-4 border-blue-600 bg-blue-50/70 p-5 text-gray-800 font-medium italic shadow-sm leading-relaxed">${quoteText}</blockquote>`;
      continue;
    }

    // Check Unordered List: - item or * item or • item
    const ulMatch = line.match(/^[-*•]\s+(.*)$/);
    if (ulMatch) {
      if (!inList || listType !== 'ul') {
        if (inList) html += flushList();
        inList = true;
        listType = 'ul';
        html += '<ul class="my-5 space-y-3 rounded-2xl bg-blue-50/40 border border-blue-100/70 p-5 sm:p-6 list-none">';
      }
      html += `<li class="flex items-start gap-3 text-gray-700 leading-relaxed"><span class="w-2 h-2 rounded-full bg-blue-600 mt-2.5 shrink-0"></span><span class="flex-1">${formatInline(ulMatch[1])}</span></li>`;
      continue;
    }

    // Check Ordered List: 1. item
    const olMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      if (!inList || listType !== 'ol') {
        if (inList) html += flushList();
        inList = true;
        listType = 'ol';
        html += '<ol class="my-5 space-y-3.5 list-none p-0">';
      }
      html += `<li class="flex items-start gap-3 text-gray-700 leading-relaxed"><span class="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">${olMatch[1]}</span><span class="flex-1">${formatInline(olMatch[2])}</span></li>`;
      continue;
    }

    // Normal paragraph
    if (inList) html += flushList();
    html += `<p class="mb-5 text-[1.05rem] sm:text-[1.125rem] leading-8 sm:leading-9 text-gray-700">${formatInline(line)}</p>`;
  }

  if (inTable) html += flushTable();
  if (inList) html += flushList();

  return html;
}
