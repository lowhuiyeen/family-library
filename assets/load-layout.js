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
   // === Auth + Theme Controls ===
    const root = document.documentElement;
    const role = localStorage.getItem("role");

    // logout button (admin only)
    const authControls = document.getElementById("authControls");
    const logoutBtn = document.getElementById("logoutBtn");
    if (role === "admin" && authControls) authControls.style.display = "block";
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("role");
        alert("您已登出 / You have logged out");
        location.href = "library.html";
      });
    }

    // theme toggle using SVG icons
    const themeBtn  = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    // default to system preference if no saved choice
    if (!localStorage.getItem("theme")) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      localStorage.setItem("theme", prefersDark ? "dark" : "light");
    }
    let theme = localStorage.getItem("theme") || "light";
    root.dataset.theme = theme;

    // set correct icon
    function setThemeIcon(mode) {
      if (!themeIcon) return;
      themeIcon.src = mode === "dark"
        ? "assets/icons/light-mode.svg"  // sun when currently dark
        : "assets/icons/dark-mode.svg";  // moon when currently light
    }
    setThemeIcon(theme);

    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        theme = root.dataset.theme === "dark" ? "light" : "dark";
        root.dataset.theme = theme;
        localStorage.setItem("theme", theme);
        setThemeIcon(theme);
      });
    }


  } catch (e) {
    console.error("lang loader error", e);
  }
}

window.addEventListener("DOMContentLoaded", loadLayout);