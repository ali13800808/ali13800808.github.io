# ali13800808.github.io

Personal resume site for Ali Badri, published with GitHub Pages at <https://ali13800808.github.io/>.

- Plain HTML, CSS and a tiny script. No build step, no frameworks, no third-party requests.
- English and Persian (RTL) are both in `index.html`; the toggle only flips `lang` and `dir`. Open `/?lang=fa` for Persian.
- `Ali-Badri-Resume.pdf` and `Ali-Badri-Resume-fa.pdf` are printed from the same page (its print stylesheet makes them one page each).

To regenerate the PDFs after editing `index.html`, print the page from a Chromium browser with headers and footers off, or:

```bash
msedge --headless=new --no-pdf-header-footer --print-to-pdf=Ali-Badri-Resume.pdf "file:///path/to/index.html?lang=en"
msedge --headless=new --no-pdf-header-footer --print-to-pdf=Ali-Badri-Resume-fa.pdf "file:///path/to/index.html?lang=fa"
```

GitHub Pages caches files for about ten minutes, so `index.html` references `styles.css?v=N` and `app.js?v=N`. Bump `N` whenever you change either file.
