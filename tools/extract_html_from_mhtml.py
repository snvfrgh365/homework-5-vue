#!/usr/bin/env python3
import sys
import os
from email import message_from_file

def extract(mhtml_path, out_html_path, prefer_lang=None):
    with open(mhtml_path, 'rb') as f:
        from email import message_from_binary_file
        msg = message_from_binary_file(f)
    # Find best text/html part
    candidate = None
    for part in msg.walk():
        ctype = part.get_content_type()
        if ctype == 'text/html':
            loc = part.get('Content-Location','') or part.get('Content-ID','')
            if prefer_lang and prefer_lang in loc:
                candidate = part
                break
            if candidate is None:
                candidate = part
    if candidate is None:
        print('No text/html part found in', mhtml_path)
        return False
    payload = candidate.get_payload(decode=True)
    try:
        text = payload.decode('utf-8')
    except Exception:
        try:
            text = payload.decode('big5')
        except Exception:
            text = payload.decode('latin1', errors='replace')
    # Patch language links to local files
    if '<ul class="language">' in text:
        lang_block = '<ul class="language"><li><a href="bank_en.html">English</a></li><li><a href="bank_cn.html">简体中文</a></li></ul>'
        start = text.find('<ul class="language">')
        end = text.find('</ul>', start)
        if start != -1 and end != -1:
            text = text[:start] + lang_block + text[end+5:]
    # Ensure bank.js is included
    if '</body>' in text and 'bank.js' not in text:
        text = text.replace('</body>', '<script src="bank.js"></script>\n</body>')
    with open(out_html_path, 'w', encoding='utf-8') as out:
        out.write(text)
    print('Wrote', out_html_path)
    return True

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('Usage: extract_html_from_mhtml.py <mhtml-file> <out-html> [lang_hint]')
        sys.exit(2)
    mhtml = sys.argv[1]
    out = sys.argv[2]
    lang = sys.argv[3] if len(sys.argv) > 3 else None
    ok = extract(mhtml, out, prefer_lang=lang)
    sys.exit(0 if ok else 1)
