// === Load Header, Footer, Theme, Language, and Auth Controls ===
async function loadLayout() {
  // 🌙 Initialize theme (if not set)
  if (!localStorage.getItem("theme")) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = prefersDark ? "dark" : "light";
    localStorage.setItem("theme", prefersDark ? "dark" : "light");
  }

  // === Header ===
  const hTarget = document.querySelector("header");
  if (hTarget) {
    try {
      const res = await fetch("assets/header.html");
      hTarget.innerHTML = await res.text();
    } catch (e) {
      console.error("header load error", e);
    }
  }

  // === Footer ===
  const fTarget = document.querySelector("footer");
  if (fTarget) {
    try {
      const res = await fetch("assets/footer.html");
      fTarget.innerHTML = await res.text();
    } catch (e) {
      console.error("footer load error", e);
    }
  }

  // === Language System ===
  try {
    await import("./lang.js");
    window.initLang();

    // === Auth + Theme Controls ===
    const root = document.documentElement;
    const role = localStorage.getItem("role");
    const userEmail = localStorage.getItem("userEmail") || "";

    // --- Auth Controls (admin only) ---
    const authControls = document.getElementById("authControls");
    const logoutBtn = document.getElementById("logoutBtn");

    if (role === "admin" && authControls) {
      authControls.style.display = "block";
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("role");
        localStorage.removeItem("userEmail");
        alert("您已登出 / You have logged out");
        location.href = "library.html";
      });
    }

    // --- Theme Toggle ---
    const themeBtn = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    let theme = localStorage.getItem("theme") || "light";
    root.dataset.theme = theme;

    function setThemeIcon(mode) {
      if (!themeIcon) return;
      themeIcon.src =
        mode === "dark"
          ? "assets/icons/light-mode.svg" // sun when dark
          : "assets/icons/dark-mode.svg"; // moon when light
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

    // --- Redirect guest if not logged in and page requires auth ---
    const restrictedPages = ["admin.html", "borrow.html", "return.html"];
    const currentPage = location.pathname.split("/").pop();
    if (restrictedPages.includes(currentPage) && !userEmail) {
      alert("⚠️ 请先登录 / Please sign in first.");
      location.href = "login.html?redirect=" + encodeURIComponent(currentPage);
    }

    // --- Auto-set role if admin email ---
    const adminEmails = [
      "lowhuiye@gmail.com",
      "lowzhenyong2009@gmail.com",
      "lowhuiyeen@gmail.com",
      "lowhuicheen@gmail.com",
    ];
    if (adminEmails.includes(userEmail)) {
      localStorage.setItem("role", "admin");
    } else if (userEmail) {
      localStorage.setItem("role", "user");
    }

  } catch (e) {
    console.error("lang loader error", e);
  }
}

window.addEventListener("DOMContentLoaded", loadLayout);
