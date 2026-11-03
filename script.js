(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};
  var links = cfg.links || {};
  var ca = (cfg.contractAddress || "").trim();
  var ticker = cfg.ticker || "$KID";

  // Ticker everywhere
  document.querySelectorAll("[data-ticker]").forEach(function (el) {
    el.textContent = ticker;
  });

  // Links: real URL if set, otherwise disabled-looking
  document.querySelectorAll("[data-link]").forEach(function (el) {
    var key = el.getAttribute("data-link");
    var url = links[key];
    if (url) {
      el.setAttribute("href", url);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
      el.removeAttribute("aria-disabled");
    } else {
      el.setAttribute("href", "#");
      el.removeAttribute("target");
      el.setAttribute("aria-disabled", "true");
      el.classList.add("is-soon");
      el.addEventListener("click", function (e) {
        e.preventDefault();
        toast("Coming soon");
      });
    }
  });

  // Public dev wallet
  var dev = (cfg.creatorWallet || "").trim();
  var devEl = document.getElementById("dev-wallet");
  if (devEl) {
    if (dev) {
      devEl.textContent = dev;
      devEl.href = "https://robinhoodchain.blockscout.com/address/" + dev;
      devEl.target = "_blank";
      devEl.rel = "noopener";
    } else {
      devEl.classList.add("is-soon");
      devEl.removeAttribute("href");
    }
  }

  // Contract address
  var caValue = document.getElementById("ca-value");
  var caCopy = document.getElementById("ca-copy");
  if (ca) {
    caValue.textContent = ca;
    caValue.title = ca;
  } else {
    caValue.classList.add("is-soon");
  }

  caCopy.addEventListener("click", function () {
    if (!ca) { toast("CA drops at launch — follow us on X"); return; }
    var done = function () {
      caCopy.classList.add("is-copied");
      caCopy.querySelector(".ca__copy-text").textContent = "Copied";
      toast("Contract address copied");
      setTimeout(function () {
        caCopy.classList.remove("is-copied");
        caCopy.querySelector(".ca__copy-text").textContent = "Copy";
      }, 1800);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(ca).then(done, fallback);
    } else {
      fallback();
    }
    function fallback() {
      var t = document.createElement("textarea");
      t.value = ca;
      t.setAttribute("readonly", "");
      t.style.position = "absolute";
      t.style.left = "-9999px";
      document.body.appendChild(t);
      t.select();
      try { document.execCommand("copy"); done(); } catch (e) { toast("Copy failed — select it manually"); }
      document.body.removeChild(t);
    }
  });

  // Toast
  var toastEl = document.getElementById("toast");
  var toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("is-on"); }, 2000);
  }

  // Sticky nav shadow
  var nav = document.querySelector(".nav");
  var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 10); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-in"); });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
