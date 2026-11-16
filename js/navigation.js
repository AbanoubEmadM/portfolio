(function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");

  if (!toggle || !nav) return;

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeNav();
  });

  const sections = document.querySelectorAll("main section[id]");
  const links = nav.querySelectorAll("a[href*='#']");
  if (!sections.length || !links.length) return;

  const byId = new Map();
  links.forEach(function (link) {
    const hash = link.getAttribute("href").split("#")[1];
    if (hash && document.getElementById(hash)) byId.set(hash, link);
  });

  if (!("IntersectionObserver" in window) || byId.size === 0) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        const link = byId.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (item) {
            item.removeAttribute("aria-current");
          });
          link.setAttribute("aria-current", "true");
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
  );

  sections.forEach(function (section) {
    if (byId.has(section.id)) observer.observe(section);
  });
})();
