async function loadLayout() {
  if (document.querySelector("header")) {
    const h = await fetch("assets/header.html");
    document.querySelector("header").innerHTML = await h.text();
  }
  if (document.querySelector("footer")) {
    const f = await fetch("assets/footer.html");
    document.querySelector("footer").innerHTML = await f.text();
  }
  await import("./lang.js");
  window.initLang();
}
window.addEventListener("DOMContentLoaded", loadLayout);
