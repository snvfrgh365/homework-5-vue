#!/usr/bin/env python3
"""
Parse the MHTML file in the workspace, extract the HTML and embedded
resources (images, CSS, fonts, scripts), save them into netbank.nchm/, and
rewrite the HTML to reference local files.

Run from the repository root:
  python tools/extract_mhtml.py "遨遊金融、理財舵手~華南銀行-個人網路銀行.mhtml"

"""
import sys
import os
import re
import email
from urllib.parse import urlparse, unquote


def safe_filename(url_or_cid):
    # For URLs, return the last path segment; for cid or content-id, use cleaned id
    if not url_or_cid:
        return None
    if url_or_cid.startswith('cid:'):
        v = url_or_cid[4:]
        v = v.strip('<>')
        return re.sub(r"[^0-9A-Za-z._-]", "_", v)
    try:
        p = urlparse(url_or_cid)
        name = os.path.basename(p.path)
        if not name:
            # fallback to hostname
            name = re.sub(r"[^0-9A-Za-z._-]", "_", p.netloc)
        name = unquote(name)
        return name
    except Exception:
        return re.sub(r"[^0-9A-Za-z._-]", "_", url_or_cid)


def main(mhtml_path):
    out_dir = os.path.join(os.path.dirname(mhtml_path), 'netbank.nchm')
    os.makedirs(out_dir, exist_ok=True)

    with open(mhtml_path, 'rb') as f:
        msg = email.message_from_binary_file(f)

    mapping = {}  # content-location/cid/url -> local filename
    html_part = None
    html_bytes = None

    for part in msg.walk():
        ctype = part.get_content_type()
        # skip the container itself
        if part.is_multipart():
            continue

        cl = part.get('Content-Location') or part.get('Content-Id') or part.get('X-Content-Location')
        payload = part.get_payload(decode=True)
        if payload is None:
            continue

        if ctype == 'text/html' and html_part is None:
            html_part = part
            html_bytes = payload
            # don't continue; still save resources

        if cl:
            local_name = safe_filename(cl)
            # strip query strings from local_name
            local_name = local_name.split('?', 1)[0]
            if not local_name:
                # generate fallback
                local_name = 'resource_%d' % (len(mapping) + 1)
            local_path = os.path.join(out_dir, local_name)
            # write binary payload
            try:
                with open(local_path, 'wb') as outf:
                    outf.write(payload)
                mapping[cl] = local_name
                # also map the absolute URL form to same filename
                if cl.startswith('http'):
                    parsed = urlparse(cl)
                    mapping[parsed.geturl()] = local_name
                # map content-id without brackets
                if cl.startswith('<') and cl.endswith('>'):
                    mapping[cl.strip('<>')] = local_name
            except Exception as e:
                print('Failed to write', local_path, e)

    if html_bytes is None:
        print('No text/html part found in', mhtml_path)
        return 1

    # decode HTML bytes to text
    charset = html_part.get_content_charset() or 'utf-8'
    try:
        html_text = html_bytes.decode(charset, errors='replace')
    except Exception:
        html_text = html_bytes.decode('utf-8', errors='replace')

    # Replace known content-location and remote src/href URLs with local filenames
    # Build replacement map: keys may be full URLs or Content-Location tokens
    replacements = {}
    for key, name in mapping.items():
        # several variants to replace
        replacements[key] = name
        if key.startswith('http'):
            # also map by path basename
            bn = os.path.basename(urlparse(key).path)
            if bn:
                replacements[bn] = name
        if key.startswith('cid:'):
            replacements[key.replace('cid:', '')] = name

    # Replace occurrences in HTML: URLs inside quotes
    def repl_func(match):
        url = match.group(1)
        # exact match first
        if url in replacements:
            return '"' + replacements[url] + '"'
        # try basename
        bn = os.path.basename(urlparse(url).path)
        if bn in replacements:
            return '"' + replacements[bn] + '"'
        # strip query
        if '?' in url:
            url_noq = url.split('?',1)[0]
            bn2 = os.path.basename(urlparse(url_noq).path)
            if bn2 in replacements:
                return '"' + replacements[bn2] + '"'
        return '"' + url + '"'

    # replace src/href occurrences
    html_text = re.sub(r'href=["\']([^"\']+)["\']', lambda m: 'href=' + repl_func(m), html_text)
    html_text = re.sub(r'src=["\']([^"\']+)["\']', lambda m: 'src=' + repl_func(m), html_text)
    # also replace cid: links
    html_text = html_text.replace('cid:', '')

    # write the updated HTML into netbank.nchm/bank.html
    out_html_path = os.path.join(out_dir, 'bank.html')
    with open(out_html_path, 'w', encoding='utf-8') as outf:
        outf.write(html_text)

    print('Wrote HTML to', out_html_path)
    print('Extracted resources:')
    for k, v in mapping.items():
        print(' ', k, '->', v)

    return 0


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: extract_mhtml.py <mhtml-file>')
        sys.exit(2)
    sys.exit(main(sys.argv[1]))
