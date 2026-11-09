#!/usr/bin/env python3
"""Syntax-check the legacy inline JavaScript, including bundled libraries."""
import re, subprocess, tempfile
from pathlib import Path
legacy = Path(__file__).resolve().parents[1] / 'public' / 'legacy.html'
html = legacy.read_text(encoding='utf-8')
scripts = re.findall(r'<script\b([^>]*)>(.*?)</script\s*>', html, re.I | re.S)
failures=[]
with tempfile.TemporaryDirectory() as directory:
    for number, (attrs, body) in enumerate(scripts):
        if re.search(r'\bsrc\s*=', attrs, re.I):
            continue
        if re.search(r'\btype\s*=\s*["\'](?:application/json|application/ld\+json)["\']', attrs, re.I):
            continue
        f=Path(directory)/f'inline-{number}.js'
        f.write_text(body,encoding='utf-8')
        result=subprocess.run(['node','--check',str(f)],capture_output=True,text=True)
        if result.returncode:
            failures.append(f'Inline script {number}: {result.stderr[-500:]}')
if failures:
    print('FAIL: Legacy JavaScript syntax\n'+'\n'.join(failures))
    raise SystemExit(1)
print(f'PASS: syntax of {len(scripts)} inline script tags checked; runtime behavior not asserted.')
