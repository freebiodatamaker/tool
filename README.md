# मराठी बायोडाटा मेकर (Marathi Biodata Maker)

A single-page Marathi biodata (marriage biodata) generator inspired by marathibiodatamaker.com — no watermark, no preview banner.

## Features

- Live A4 preview that matches the classic floral-border template (Mukta / Noto Sans Devanagari fonts, hand-drawn vine border).
- Editable sections: वैयक्तिक माहिती, कौटुंबिक माहिती, संपर्क माहिती.
- Every field's label and value are editable; add or remove fields freely. Empty fields are hidden in output.
- Editable top mantras (श्री गजानन प्रसन्न etc.).
- Download the final biodata as **PNG** or **A4 PDF** (rendered client-side via html2canvas + jsPDF).

## Run

No build step. Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Internet access is needed once for Google Fonts and the html2canvas / jsPDF CDN scripts.

## Files

- `index.html` – page structure (form + preview)
- `style.css` – UI styles and the A4 biodata template styles
- `script.js` – form/preview logic, SVG border generation, PNG/PDF export
