#!/usr/bin/env python3
"""Normalize absolute /netbank/... paths in extracted files to local filenames."""
import sys, os, re

root = os.path.join(os.path.dirname(__file__), '..')
root = os.path.abspath(root)
target_dir = os.path.join(root, 'netbank.nchm')
if not os.path.isdir(target_dir):
    print('netbank.nchm not found')
    sys.exit(1)

patterns = [
    '/netbank/pages/jsp/Login/html/images/',
    '/netbank/pages/images/',
    '/netbank/pages/jsp/Login/html/',
    '/netbank/pages/jsp/html/',
]

for fname in os.listdir(target_dir):
    if not fname.lower().endswith(('.css', '.html')):
        continue
    path = os.path.join(target_dir, fname)
    with open(path, 'r', encoding='utf-8') as f:
        s = f.read()
    orig = s
    for p in patterns:
        s = s.replace(p, '')
    if s != orig:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(s)
        print('Normalized', fname)

print('Done')
