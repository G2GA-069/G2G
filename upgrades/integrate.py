#!/usr/bin/env python3
"""
G2G UPGRADE INTEGRATION SCRIPT

Injects the upgrade CSS and JS modules into all live chapter files.
Run from the G2G_App directory.

What it does:
  1. Adds <link> tags for upgrade CSS in <head> (before </head>)
  2. Adds <script> tags for upgrade JS at end of <body> (before </body>)

Safe to run multiple times — checks for existing injections.

Usage:
  python3 upgrades/integrate.py           # Inject into all chapters
  python3 upgrades/integrate.py --dry-run # Preview changes without writing
  python3 upgrades/integrate.py --remove  # Remove injected code
"""

import os, sys, re, glob

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHAPTERS_DIR = os.path.join(BASE_DIR, 'chapters')

# Marker comments for safe injection/removal
CSS_START = '<!-- G2G-UPGRADES-CSS-START -->'
CSS_END = '<!-- G2G-UPGRADES-CSS-END -->'
JS_START = '<!-- G2G-UPGRADES-JS-START -->'
JS_END = '<!-- G2G-UPGRADES-JS-END -->'

CSS_BLOCK = f"""{CSS_START}
<link rel="stylesheet" href="../upgrades/css/entrance-animations.css">
<link rel="stylesheet" href="../upgrades/css/glossary.css">
<link rel="stylesheet" href="../upgrades/css/mastery.css">
<link rel="stylesheet" href="../upgrades/css/progress-bar.css">
{CSS_END}"""

JS_BLOCK = f"""{JS_START}
<script src="../upgrades/js/entrance-animations.js"></script>
<script src="../upgrades/js/glossary-data.js"></script>
<script src="../upgrades/js/glossary.js"></script>
<script src="../upgrades/js/mastery-tracker.js"></script>
<script src="../upgrades/js/progress-bar.js"></script>
{JS_END}"""


def inject(html):
    """Inject CSS and JS blocks into HTML."""
    modified = False

    # CSS: inject before </head> (if not already present)
    if CSS_START not in html:
        html = html.replace('</head>', CSS_BLOCK + '\n</head>', 1)
        modified = True

    # JS: inject before </body> (if not already present)
    if JS_START not in html:
        # Find the LAST </body> tag
        last_body = html.rfind('</body>')
        if last_body != -1:
            html = html[:last_body] + JS_BLOCK + '\n' + html[last_body:]
            modified = True

    return html, modified


def remove(html):
    """Remove injected CSS and JS blocks."""
    modified = False

    # Remove CSS block
    pattern = re.compile(re.escape(CSS_START) + r'.*?' + re.escape(CSS_END) + r'\n?', re.DOTALL)
    if pattern.search(html):
        html = pattern.sub('', html)
        modified = True

    # Remove JS block
    pattern = re.compile(re.escape(JS_START) + r'.*?' + re.escape(JS_END) + r'\n?', re.DOTALL)
    if pattern.search(html):
        html = pattern.sub('', html)
        modified = True

    return html, modified


def main():
    dry_run = '--dry-run' in sys.argv
    do_remove = '--remove' in sys.argv

    files = sorted(glob.glob(os.path.join(CHAPTERS_DIR, 'ch*.html')))
    if not files:
        print(f"No chapter files found in {CHAPTERS_DIR}")
        sys.exit(1)

    action = 'Removing' if do_remove else 'Injecting'
    mode = ' (DRY RUN)' if dry_run else ''
    print(f"{action} upgrades in {len(files)} chapter files{mode}")
    print('=' * 50)

    changed = 0
    for fpath in files:
        fname = os.path.basename(fpath)
        with open(fpath, 'r', encoding='utf-8') as f:
            html = f.read()

        if do_remove:
            new_html, modified = remove(html)
        else:
            new_html, modified = inject(html)

        if modified:
            changed += 1
            print(f"  {'Would modify' if dry_run else 'Modified'}: {fname}")
            if not dry_run:
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(new_html)
        else:
            print(f"  Skipped (already {'clean' if do_remove else 'injected'}): {fname}")

    print('=' * 50)
    print(f"{'Would modify' if dry_run else 'Modified'}: {changed} files")
    if dry_run:
        print("Run without --dry-run to apply changes.")


if __name__ == '__main__':
    main()
