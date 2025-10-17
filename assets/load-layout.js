async function loadLayout() {
  if (!localStorage.getItem("theme")) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = prefersDark ? "dark" : "light";
    localStorage.setItem("theme", prefersDark ? "dark" : "light");
  }

  // Header
  const hTarget = document.querySelector("header");
  if (hTarget) {
    try {
      const res = await fetch("assets/header.html");
      hTarget.innerHTML = await res.text();
    } catch (e) {
      console.error("header load error", e);
    }
  }

  // Footer
  const fTarget = document.querySelector("footer");
  if (fTarget) {
    try {
      const res = await fetch("assets/footer.html");
      fTarget.innerHTML = await res.text();
    } catch (e) {
      console.error("footer load error", e);
    }
  }

  // Language system
  try {
    await import("./lang.js");
    window.initLang();

    // === Theme toggle using SVG ===
    const root = document.documentElement;
    const icon = document.getElementById("themeIcon");
    let theme = localStorage.getItem("theme") || "light";
    root.dataset.theme = theme;
    if (icon) icon.src = theme === "dark" ? "assets/icons/light-mode.svg" : "assets/icons/dark-mode.svg";

    if (icon) {
      icon.addEventListener("click", () => {
        theme = root.dataset.theme === "dark" ? "light" : "dark";
        root.dataset.theme = theme;
        localStorage.setItem("theme", theme);
        icon.src = theme === "dark" ? "assets/icons/light-mode.svg" : "assets/icons/dark-mode.svg";
      });
    }

  } catch (e) {
    console.error("lang loader error", e);
  }
}

window.addEventListener("DOMContentLoaded", loadLayout);

