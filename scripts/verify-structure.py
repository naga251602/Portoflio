from pathlib import Path
import re,sys
root=Path(__file__).resolve().parents[1]
issues=[]
legacy=(root/'public/legacy.html').read_text()
required=['portfolio-navigation-bridge-v2','external-link-isolation','/api/profile?url=']
for token in required:
 if token not in legacy:issues.append('legacy missing '+token)
for file in ['src/app/layout.tsx','src/app/sitemap.ts','src/app/robots.ts','src/app/api/profile/route.ts','src/components/LegacyPortfolio/index.tsx','context_router.md','design_norms/design_norms_sitemap.md']:
 if not (root/file).is_file():issues.append('missing '+file)
if "fetch(address" in legacy:issues.append('direct CORS fetch remains')
if 'frameWindow?.addEventListener' in (root/'src/components/LegacyPortfolio/index.tsx').read_text():issues.append('unsafe direct iframe access')
if (root/'source/legacy.html').exists(): issues.append('redundant uncompressed source')

# A previous compatibility patch accidentally inserted scripts inside an inline
# DOMPurify bundle by targeting the first text occurrence of </body>.
# Require our bridge to live immediately before the real document closing tag.
bridge_index=legacy.find('<script id="portfolio-navigation-bridge-v2">')
body_close=legacy.rfind('</body>')
if bridge_index < 0 or not (body_close-5000 < bridge_index < body_close):
 issues.append('navigation bridge is not at the actual document end')
if legacy.count('portfolio-navigation-bridge-v2') != 1:
 issues.append('navigation bridge must appear exactly once')

if issues:print('FAILED\n'+'\n'.join(issues));sys.exit(1)
print('PASS: structural bridge, API, SEO and documentation file checks. NOT a browser/build test.')
