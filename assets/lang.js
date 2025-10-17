// assets/lang.js
let LANG = localStorage.getItem("lang") || "zh";
let DICT = {};

async function initLang() {
  try {
    const res = await fetch("assets/lang.json");
    DICT = await res.json();
  } catch (e) {
    console.error("lang.json load error", e);
    DICT = {};
  }
  applyLang(LANG);
  setupLangButtons();
}

function setupLangButtons() {
  const buttons = document.querySelectorAll(".lang-btn");
  if (!buttons.length) return;

  buttons.forEach(btn => {
    const code = btn.dataset.lang;
    if (code === LANG) btn.classList.add("active");

    // handle click on language button
    btn.addEventListener("click", e => {
      e.preventDefault();
      LANG = code;
      localStorage.setItem("lang", LANG);
      applyLang(LANG);
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // 🔔 notify all pages to re-render text using the new language
      window.dispatchEvent(new Event("languagechange"));
    });
  });
}


function applyLang(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (DICT[key] && DICT[key][lang]) el.textContent = DICT[key][lang];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (DICT[key] && DICT[key][lang]) el.placeholder = DICT[key][lang];
  });

  // Update page <title> dynamically if applicable
  const titleTag = document.querySelector("title[data-i18n]");
  if (titleTag) {
    const tKey = titleTag.dataset.i18n;
    if (DICT[tKey] && DICT[tKey][lang]) titleTag.textContent = DICT[tKey][lang];
  }
}

window.initLang = initLang;
window.applyLang = applyLang;
