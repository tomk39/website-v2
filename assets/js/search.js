(function () {
  const root = document.documentElement;
  const themeButton = document.querySelector("[data-theme-toggle]");
  const menuButton = document.querySelector("[data-menu-toggle]");
  const siteNav = document.querySelector(".site-nav");
  const savedTheme = localStorage.getItem("site-theme");

  function setTheme(theme) {
    root.dataset.theme = theme;
    if (!themeButton) return;
    const isDark = theme === "dark";
    themeButton.setAttribute("aria-pressed", String(isDark));
    themeButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }

  setTheme(savedTheme || "dark");

  if (themeButton) {
    themeButton.addEventListener("click", function () {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("site-theme", nextTheme);
      setTheme(nextTheme);
    });
  }

  if (menuButton && siteNav) {
    menuButton.addEventListener("click", function () {
      const isOpen = root.classList.toggle("nav-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        root.classList.remove("nav-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
      });
    });
  }

  const searchModal = document.querySelector("[data-search-modal]");
  const searchOpen = document.querySelector("[data-search-open]");
  const searchCloseButtons = document.querySelectorAll("[data-search-close]");
  const input = document.querySelector("#site-search");

  function openSearch() {
    if (!searchModal) return;
    searchModal.hidden = false;
    document.body.style.overflow = "hidden";
    window.setTimeout(function () {
      if (input) input.focus();
    }, 30);
  }

  function closeSearch() {
    if (!searchModal) return;
    searchModal.hidden = true;
    document.body.style.overflow = "";
    if (searchOpen) searchOpen.focus();
  }

  if (searchOpen) {
    searchOpen.addEventListener("click", openSearch);
  }

  searchCloseButtons.forEach(function (button) {
    button.addEventListener("click", closeSearch);
  });

  window.addEventListener("keydown", function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openSearch();
    }
    if (event.key === "Escape" && searchModal && !searchModal.hidden) {
      closeSearch();
    }
  });

  document.querySelectorAll("[data-google-site-search]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      const searchInput = form.querySelector("input[name='q']");
      if (!searchInput) return;
      const term = searchInput.value.trim();
      if (!term) {
        event.preventDefault();
        searchInput.focus();
        return;
      }
      searchInput.value = "site:tomislavk.blog " + term;
    });
  });

  const progress = document.querySelector("[data-reading-progress]");
  if (progress) {
    function updateProgress() {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const amount = height > 0 ? (window.scrollY / height) * 100 : 0;
      progress.style.width = amount + "%";
    }
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  const searchParams = new URLSearchParams(window.location.search);
  const queryTerm = searchParams.get("q") || "";

  if (queryTerm) {
    const pageInput = document.querySelector("[data-search-page-input]");
    if (pageInput) {
      pageInput.value = queryTerm.replace(/^site:tomislavk\.blog\s+/i, "");
    }
  }

  document.querySelectorAll("pre").forEach(function (block) {
    const codeElement = block.querySelector("code");
    const button = document.createElement("button");
    button.className = "copy-code";
    button.type = "button";
    button.textContent = "Copy";
    button.addEventListener("click", async function (event) {
      event.preventDefault();
      const code = codeElement ? codeElement.innerText : block.innerText.replace(button.innerText, "").trim();
      let copied = false;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(code);
          copied = true;
        }
      } catch (error) {
        copied = false;
      }

      if (!copied) {
        const fallback = document.createElement("textarea");
        fallback.value = code;
        fallback.setAttribute("readonly", "");
        fallback.style.position = "fixed";
        fallback.style.top = "0";
        fallback.style.left = "-9999px";
        document.body.appendChild(fallback);
        fallback.focus();
        fallback.select();
        copied = document.execCommand("copy");
        document.body.removeChild(fallback);
      }

      button.textContent = copied ? "Copied" : "Failed";
      window.setTimeout(function () {
        button.textContent = "Copy";
      }, 1600);
    });
    block.appendChild(button);
  });
})();
