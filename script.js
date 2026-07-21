/* =========================================================
   मराठी बायोडाटा मेकर
   - form -> live preview -> PNG / PDF download
   ========================================================= */

/* ---------------- default data (from the sample template) ---------------- */
const mantras = [
  "|| श्री गणेश प्रसन्न ||",
  "|| श्री ज्योतिबा प्रसन्न ||",
  "|| श्री अंबाबाई प्रसन्न ||",
];

const sections = [
  {
    id: "personal",
    title: "वैयक्तिक माहिती",
    fields: [
      { label: "नाव", value: "रोहित सुरेश देशमुख" },
      { label: "जन्म तारीख", value: "25/11/1996" },
      { label: "जन्म वेळ", value: "07:40 AM" },
      { label: "जन्म स्थळ", value: "कराड" },
      { label: "धर्म", value: "हिंदू" },
      { label: "जात", value: "मराठा (96 कुळी )" },
      { label: "कुलदैवत", value: "श्री ज्योतिबा (वाडी रत्नागिरी, कोल्हापूर)" },
      { label: "नावरस नाव", value: "विठ्ठल" },
      { label: "राशी", value: "वृषभ" },
      { label: "नक्षत्र", value: "रोहिणी" },
      { label: "देवक", value: "कळंब" },
      { label: "ऊंची", value: "5 फूट 9 इंच" },
      { label: "वर्ण", value: "गहूवर्ण" },
      { label: "रक्तगट", value: "बी+" },
      { label: "शिक्षण", value: "M.C.A." },
      { label: "नोकरी/व्यवसाय", value: "IT Engineer (Infosys) - पुणे" },
    ],
  },
  {
    id: "family",
    title: "कौटुंबिक माहिती",
    fields: [
      { label: "वडिलांचे नाव", value: "सुरेश पांडुरंग देशमुख" },
      { label: "वडिलांचा व्यवसाय", value: "शिक्षक (जि.प. शाळा)" },
      { label: "आईचे नाव", value: "सुनीता सुरेश देशमुख" },
      { label: "बहीण", value: "स्नेहल संदीप पाटील (विवाहीत) (इस्लामपूर, ता-वाळवा)", multiline: true },
      { label: "भाऊ", value: "रोहन सुरेश देशमुख (अविवाहीत)" },
      {
        label: "नातेसंबंध",
        value:
          "पाटील (इस्लामपूर), जाधव (कराड), शिंदे (मसूर), मोहिते (उंब्रज), साळुंखे (विटा), थोरात (सातारा), माने (वडूज), भोसले (कोरेगाव), घाडगे (फलटण), निकम (खटाव), गायकवाड (रहिमतपूर), चव्हाण (पाटण), पवार (मलकापूर), काळे (शिराळा), सूर्यवंशी (तासगाव)",
        multiline: true,
      },
    ],
  },
  {
    id: "contact",
    title: "संपर्क माहिती",
    fields: [
      { label: "पत्ता", value: "देशमुख गल्ली, गोळेश्वर, ता-कराड, जि- सातारा", multiline: true },
      { label: "मोबाईल नंबर", value: "9823456712" },
    ],
  },
];

/* ---------------- ornamental border (hand-drawn vine + flower) ---------------- */
function borderTileSVG(width, height, vertical) {
  // one repeating tile: 8-petal flower + feathered vine strokes
  const s = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 140 26">
    <g stroke="#6b7178" stroke-width="1.1" fill="none" stroke-linecap="round">
      <!-- flower -->
      <g transform="translate(14,13)">
        ${[0, 45, 90, 135, 180, 225, 270, 315]
          .map((a) => `<ellipse cx="0" cy="-5.2" rx="1.7" ry="4" transform="rotate(${a})"/>`)
          .join("")}
        <circle cx="0" cy="0" r="1.6" fill="#6b7178" stroke="none"/>
      </g>
      <!-- vine with leaf strokes -->
      <line x1="28" y1="13" x2="134" y2="13" stroke-width="0.9"/>
      ${[36, 48, 60, 72, 84, 96, 108, 120]
        .map(
          (x, i) => `
        <path d="M ${x} 13 q -4 -6 -8 -7" />
        <path d="M ${x} 13 q -4 6 -8 7" />
        <path d="M ${x + 4} 13 q -3 -4.5 -6 -5.4" stroke-width="0.8"/>
        <path d="M ${x + 4} 13 q -3 4.5 -6 5.4" stroke-width="0.8"/>`
        )
        .join("")}
    </g>
  </svg>`;
  const uri = `url("data:image/svg+xml,${encodeURIComponent(s)}")`;
  return uri;
}

function cornerSVG() {
  const s = `
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
    <g transform="translate(13,13)" stroke="#6b7178" stroke-width="1.1" fill="none">
      ${[0, 45, 90, 135, 180, 225, 270, 315]
        .map((a) => `<ellipse cx="0" cy="-5.2" rx="1.7" ry="4" transform="rotate(${a})"/>`)
        .join("")}
      <circle cx="0" cy="0" r="1.6" fill="#6b7178" stroke="none"/>
    </g>
  </svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(s)}")`;
}

function applyBorders() {
  const h = borderTileSVG(140, 26, false);
  document.querySelector(".b-top").style.backgroundImage = h;
  document.querySelector(".b-bottom").style.backgroundImage = h;

  // vertical: same tile drawn rotated inside an SVG wrapper
  const inner = decodeURIComponent(
    borderTileSVG(140, 26, true).slice(26, -2) // strip url("data:image/svg+xml, and ")
  );
  const v = `
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="140" viewBox="0 0 26 140">
    <g transform="rotate(90 13 13)">${inner.replace(/<\/?svg[^>]*>/g, "")}</g>
  </svg>`;
  const vUri = `url("data:image/svg+xml,${encodeURIComponent(v)}")`;
  document.querySelector(".b-left").style.backgroundImage = vUri;
  document.querySelector(".b-right").style.backgroundImage = vUri;

  document.querySelectorAll(".b-corner").forEach((el) => (el.style.backgroundImage = cornerSVG()));
}

/* ---------------- English -> Marathi transliteration box (Google Input API) ---------------- */
const translitInput = document.getElementById("translitBoxInput");
const translitSuggestEl = document.getElementById("translitSuggest");
const translitCache = new Map();

async function fetchSuggestions(word) {
  const key = word.toLowerCase();
  if (translitCache.has(key)) return translitCache.get(key);
  const url =
    "https://inputtools.google.com/request?text=" +
    encodeURIComponent(word) +
    "&itc=mr-t-i0-und&num=5&cp=0&cs=1&ie=utf-8&oe=utf-8";
  const res = await fetch(url);
  const data = await res.json();
  const out = data[0] === "SUCCESS" && data[1][0][1].length ? data[1][0][1] : [word];
  translitCache.set(key, out);
  return out;
}

/* dropdown state for the word currently being typed */
let suggestions = [];
let activeIndex = 0;
let suggestTimer = null;

function currentWord() {
  const before = translitInput.value.slice(0, translitInput.selectionStart);
  const match = before.match(/[a-zA-Z]+$/);
  return match ? match[0] : null;
}

function hideSuggestions() {
  translitSuggestEl.hidden = true;
  suggestions = [];
  activeIndex = 0;
}

function renderSuggestions() {
  translitSuggestEl.innerHTML = "";
  suggestions.forEach((s, i) => {
    const item = document.createElement("div");
    item.className = "translit-suggest-item" + (i === activeIndex ? " active" : "");
    item.textContent = s;
    // mousedown fires before the input loses focus, unlike click
    item.addEventListener("mousedown", (e) => {
      e.preventDefault();
      commitSuggestion(s, " ");
    });
    item.addEventListener("mouseenter", () => {
      if (activeIndex !== i) {
        activeIndex = i;
        renderSuggestions();
      }
    });
    translitSuggestEl.appendChild(item);
  });
  translitSuggestEl.hidden = suggestions.length === 0;
}

/* replaces the latin word before the caret with the chosen suggestion */
function commitSuggestion(text, insertAfter) {
  const pos = translitInput.selectionStart;
  const before = translitInput.value.slice(0, pos);
  const match = before.match(/[a-zA-Z]+$/);
  if (!match) return hideSuggestions();
  const newBefore = before.slice(0, pos - match[0].length) + text + insertAfter;
  translitInput.value = newBefore + translitInput.value.slice(pos);
  translitInput.setSelectionRange(newBefore.length, newBefore.length);
  translitInput.focus();
  hideSuggestions();
}

translitInput.addEventListener("input", () => {
  const word = currentWord();
  clearTimeout(suggestTimer);
  if (!word) return hideSuggestions();
  suggestTimer = setTimeout(async () => {
    let list;
    try {
      list = await fetchSuggestions(word);
    } catch {
      return hideSuggestions(); // offline or API error
    }
    if (currentWord() !== word) return; // stale response, user kept typing
    suggestions = [...list];
    if (!suggestions.includes(word)) suggestions.push(word); // keep English as an option
    activeIndex = 0;
    renderSuggestions();
  }, 150);
});

translitInput.addEventListener("keydown", (e) => {
  if (translitSuggestEl.hidden) return;
  if (e.key === "ArrowDown") {
    e.preventDefault();
    activeIndex = (activeIndex + 1) % suggestions.length;
    renderSuggestions();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    activeIndex = (activeIndex - 1 + suggestions.length) % suggestions.length;
    renderSuggestions();
  } else if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    commitSuggestion(suggestions[activeIndex], e.key === " " ? " " : "");
  } else if (e.key === "Escape") {
    hideSuggestions();
  }
});

translitInput.addEventListener("blur", hideSuggestions);

document.getElementById("translitCopyBtn").addEventListener("click", async (e) => {
  const btn = e.currentTarget;
  if (!translitInput.value) return;
  try {
    await navigator.clipboard.writeText(translitInput.value);
  } catch {
    translitInput.select();
    document.execCommand("copy"); // fallback for non-secure contexts (http)
  }
  const old = btn.innerHTML;
  btn.textContent = "कॉपी झाले ✓";
  setTimeout(() => (btn.innerHTML = old), 1200);
});

document.getElementById("translitClearBtn").addEventListener("click", () => {
  translitInput.value = "";
  translitInput.focus();
});

/* ---------------- mantra form rendering ---------------- */
const mantraListEl = document.getElementById("mantraList");

function buildMantraForm() {
  mantraListEl.innerHTML = "";
  mantras.forEach((mantra, mi) => {
    const row = document.createElement("div");
    row.className = "field-row mantra-row-form";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "मंत्र";
    input.value = mantra;
    input.addEventListener("input", () => {
      mantras[mi] = input.value;
      renderPreview();
    });

    const upBtn = document.createElement("button");
    upBtn.type = "button";
    upBtn.className = "move-btn";
    upBtn.title = "वर हलवा";
    upBtn.textContent = "▲";
    upBtn.disabled = mi === 0;
    upBtn.addEventListener("click", () => {
      [mantras[mi - 1], mantras[mi]] = [mantras[mi], mantras[mi - 1]];
      buildMantraForm();
      renderPreview();
    });

    const downBtn = document.createElement("button");
    downBtn.type = "button";
    downBtn.className = "move-btn";
    downBtn.title = "खाली हलवा";
    downBtn.textContent = "▼";
    downBtn.disabled = mi === mantras.length - 1;
    downBtn.addEventListener("click", () => {
      [mantras[mi], mantras[mi + 1]] = [mantras[mi + 1], mantras[mi]];
      buildMantraForm();
      renderPreview();
    });

    const moveCol = document.createElement("div");
    moveCol.className = "move-col";
    moveCol.appendChild(upBtn);
    moveCol.appendChild(downBtn);

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "remove-btn";
    removeBtn.title = "मंत्र काढा";
    removeBtn.textContent = "✕";
    removeBtn.addEventListener("click", () => {
      mantras.splice(mi, 1);
      buildMantraForm();
      renderPreview();
    });

    row.appendChild(input);
    row.appendChild(moveCol);
    row.appendChild(removeBtn);
    mantraListEl.appendChild(row);
  });
}

document.getElementById("addMantraBtn").addEventListener("click", () => {
  mantras.push("");
  buildMantraForm();
  renderPreview();
  const inputs = mantraListEl.querySelectorAll("input");
  inputs[inputs.length - 1].focus();
});

/* ---------------- form rendering ---------------- */
const formSectionsEl = document.getElementById("formSections");

function buildForm() {
  formSectionsEl.innerHTML = "";
  sections.forEach((section, si) => {
    const card = document.createElement("div");
    card.className = "form-card";

    const title = document.createElement("h2");
    title.className = "form-section-title";
    title.textContent = section.title;
    card.appendChild(title);

    section.fields.forEach((field, fi) => {
      card.appendChild(buildFieldRow(si, fi, field));
    });

    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "add-field-btn";
    addBtn.textContent = "+ नवीन फील्ड जोडा";
    addBtn.addEventListener("click", () => {
      section.fields.push({ label: "", value: "" });
      buildForm();
      renderPreview();
    });
    card.appendChild(addBtn);

    formSectionsEl.appendChild(card);
  });
}

function buildFieldRow(si, fi, field) {
  const row = document.createElement("div");
  row.className = "field-row";

  const labelInput = document.createElement("input");
  labelInput.type = "text";
  labelInput.className = "label-input";
  labelInput.placeholder = "लेबल";
  labelInput.value = field.label;
  labelInput.addEventListener("input", () => {
    field.label = labelInput.value;
    renderPreview();
  });

  let valueInput;
  if (field.multiline) {
    valueInput = document.createElement("textarea");
    valueInput.rows = 2;
  } else {
    valueInput = document.createElement("input");
    valueInput.type = "text";
  }
  valueInput.placeholder = "माहिती";
  valueInput.value = field.value;
  valueInput.addEventListener("input", () => {
    field.value = valueInput.value;
    renderPreview();
  });

  const fields = sections[si].fields;

  const upBtn = document.createElement("button");
  upBtn.type = "button";
  upBtn.className = "move-btn";
  upBtn.title = "वर हलवा";
  upBtn.textContent = "▲";
  upBtn.disabled = fi === 0;
  upBtn.addEventListener("click", () => {
    [fields[fi - 1], fields[fi]] = [fields[fi], fields[fi - 1]];
    buildForm();
    renderPreview();
  });

  const downBtn = document.createElement("button");
  downBtn.type = "button";
  downBtn.className = "move-btn";
  downBtn.title = "खाली हलवा";
  downBtn.textContent = "▼";
  downBtn.disabled = fi === fields.length - 1;
  downBtn.addEventListener("click", () => {
    [fields[fi], fields[fi + 1]] = [fields[fi + 1], fields[fi]];
    buildForm();
    renderPreview();
  });

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "remove-btn";
  removeBtn.title = "फील्ड काढा";
  removeBtn.textContent = "✕";
  removeBtn.addEventListener("click", () => {
    fields.splice(fi, 1);
    buildForm();
    renderPreview();
  });

  const moveCol = document.createElement("div");
  moveCol.className = "move-col";
  moveCol.appendChild(upBtn);
  moveCol.appendChild(downBtn);

  row.appendChild(labelInput);
  row.appendChild(valueInput);
  row.appendChild(moveCol);
  row.appendChild(removeBtn);
  return row;
}

/* ---------------- preview rendering ---------------- */
const pvSectionsEl = document.getElementById("pvSections");

function renderPreview() {
  const pvMantrasEl = document.getElementById("pvMantras");
  pvMantrasEl.innerHTML = "";
  const visibleMantras = mantras.filter((m) => m.trim());
  if (visibleMantras.length) {
    const top = document.createElement("div");
    top.className = "mantra mantra-top";
    top.textContent = visibleMantras[0];
    pvMantrasEl.appendChild(top);

    if (visibleMantras.length > 1) {
      const row = document.createElement("div");
      row.className = "mantra-row";
      visibleMantras.slice(1).forEach((m) => {
        const span = document.createElement("span");
        span.textContent = m;
        row.appendChild(span);
      });
      pvMantrasEl.appendChild(row);
    }
  }

  pvSectionsEl.innerHTML = "";
  sections.forEach((section) => {
    const visible = section.fields.filter((f) => f.label.trim() && f.value.trim());
    if (!visible.length) return;

    const titleEl = document.createElement("div");
    titleEl.className = "pv-section-title";
    titleEl.textContent = section.title;
    pvSectionsEl.appendChild(titleEl);

    visible.forEach((f) => {
      const row = document.createElement("div");
      row.className = "pv-row";
      row.innerHTML =
        `<span class="pv-label"></span><span class="pv-colon">:</span><span class="pv-value"></span>`;
      row.querySelector(".pv-label").textContent = f.label;
      row.querySelector(".pv-value").textContent = f.value;
      pvSectionsEl.appendChild(row);
    });
  });
}

/* ---------------- preview scaling ---------------- */
function fitPreview() {
  const panel = document.querySelector(".page-scroll");
  const wrap = document.getElementById("pageWrap");
  const page = document.getElementById("biodataPage");
  const scale = Math.min(1, panel.clientWidth / 794);
  wrap.style.transform = `scale(${scale})`;
  wrap.style.width = "794px";
  panel.style.height = page.offsetHeight * scale + 8 + "px";
}
window.addEventListener("resize", fitPreview);

/* ---------------- export: PNG / PDF ---------------- */
async function captureCanvas() {
  await document.fonts.ready;
  const page = document.getElementById("biodataPage");
  const wrap = document.getElementById("pageWrap");
  const prev = wrap.style.transform;
  wrap.style.transform = "none"; // capture at full size
  const canvas = await html2canvas(page, {
    scale: 2.5,
    useCORS: true,
    backgroundColor: "#ffffff",
  });
  wrap.style.transform = prev;
  return canvas;
}

async function withBusy(btn, fn) {
  btn.disabled = true;
  const old = btn.textContent;
  btn.textContent = "तयार होत आहे...";
  try {
    await fn();
  } catch (e) {
    alert("डाउनलोड अयशस्वी: " + e.message);
  } finally {
    btn.disabled = false;
    btn.textContent = old;
  }
}

document.getElementById("btnPng").addEventListener("click", (e) =>
  withBusy(e.currentTarget, async () => {
    const canvas = await captureCanvas();
    const a = document.createElement("a");
    a.download = "biodata.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  })
);

document.getElementById("btnPdf").addEventListener("click", (e) =>
  withBusy(e.currentTarget, async () => {
    const canvas = await captureCanvas();
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

    const pageW = 210;
    const pageH = 297;
    const imgH = (canvas.height * pageW) / canvas.width;

    if (imgH <= pageH + 1) {
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, pageW, imgH);
    } else {
      // slice tall content into multiple A4 pages
      const sliceH = Math.floor((pageH / pageW) * canvas.width);
      let y = 0;
      let first = true;
      while (y < canvas.height) {
        const h = Math.min(sliceH, canvas.height - y);
        const slice = document.createElement("canvas");
        slice.width = canvas.width;
        slice.height = h;
        slice.getContext("2d").drawImage(canvas, 0, y, canvas.width, h, 0, 0, canvas.width, h);
        if (!first) pdf.addPage();
        pdf.addImage(slice.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, pageW, (h * pageW) / canvas.width);
        first = false;
        y += h;
      }
    }
    pdf.save("biodata.pdf");
  })
);

/* ---------------- init ---------------- */
applyBorders();
buildMantraForm();
buildForm();
renderPreview();
fitPreview();
setTimeout(fitPreview, 300);
