#!/usr/bin/env python3
"""Compatibility invariants; NOT visual parity or a browser test."""
from pathlib import Path
import gzip, hashlib
root=Path(__file__).resolve().parents[1]
original=gzip.decompress((root/'source/legacy-original.html.gz').read_bytes())
served=(root/'public/legacy.html').read_bytes()
assert b'portfolio-navigation-bridge-v2' in served
assert b'/api/profile?url=' in served
assert b'external-link-isolation' in served
assert len(list((root/'src/app').rglob('page.tsx')))==11
assert all('LegacyPortfolio' in p.read_text() for p in (root/'src/app').rglob('page.tsx'))
assert original != served, 'Compatibility fixes unexpectedly absent'
print('PASS: original archived, active compatibility patches present, 11 routes wired. Visual parity NOT tested.')
print('Original SHA256:',hashlib.sha256(original).hexdigest())
