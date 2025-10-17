let LANG = "zh";
let DICT = {};

async function initLang() {
  const saved = localStorage.getItem("lang");
  LANG = saved || "zh";
  const res = await fetch("assets/lang.json");
  DICT = await res.json();
  applyLang(LANG);
  setupLangButtons();
}

function setupLangButtons() {
  const buttons = document.querySelectorAll(".lang-btn");
  buttons.forEach(btn => {
    const code = btn.dataset.lang;
    if (code === LANG) btn.classList.add("active");
    btn.addEventListener("click", () => {
      LANG = code;
      localStorage.setItem("lang", LANG);
      applyLang(LANG);
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

function applyLang(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (DICT[key] && DICT[key][lang]) el.textContent = DICT[key][lang];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (DICT[key] && DICT[key][lang]) el.placeholder = DICT[key][lang];
  });
}

window.initLang = initLang;
window.applyLang = applyLang;
