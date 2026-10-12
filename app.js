/* Language switch (English / Persian). No network requests, no tracking.
   Both languages are in the HTML; this only flips lang/dir, the page title
   and the PDF link. English is the default and the no-JS fallback. */
(function () {
  var root = document.documentElement;
  var KEY = "resume-lang";
  var TITLES = {
    en: "Ali Badri — OCR & Document AI Engineer",
    fa: "علی بدری — مهندس OCR و هوش مصنوعی اسناد"
  };

  function clean(v) {
    v = (v || "").toLowerCase();
    return v === "en" || v === "fa" ? v : null;
  }
  function read() {
    try { return clean(localStorage.getItem(KEY)); } catch (e) { return null; }
  }
  function write(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* storage may be blocked */ }
  }

  function apply(lang) {
    lang = lang === "fa" ? "fa" : "en";
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");
    document.title = TITLES[lang];
    var pdf = document.getElementById("pdf");
    if (pdf) pdf.setAttribute("href", lang === "fa" ? "Ali-Badri-Resume-fa.pdf" : "Ali-Badri-Resume.pdf");
    var btn = document.getElementById("lang-toggle");
    if (btn) {
      // The button always shows the language you can switch TO, so tag it with that language.
      btn.setAttribute("lang", lang === "fa" ? "en" : "fa");
    }
    return lang;
  }

  var fromUrl = clean((location.search.match(/[?&]lang=([a-z]{2})\b/i) || [])[1]);
  var browserFa = (navigator.language || "").toLowerCase().indexOf("fa") === 0;
  var current = apply(fromUrl || read() || (browserFa ? "fa" : "en"));

  document.addEventListener("DOMContentLoaded", function () {
    apply(current);
    var btn = document.getElementById("lang-toggle");
    if (!btn) return;
    btn.hidden = false; // hidden in the HTML so it never shows as a dead control without JS
    btn.addEventListener("click", function () {
      current = apply(current === "fa" ? "en" : "fa");
      write(current);
      try {
        var u = new URL(location.href);
        u.searchParams.set("lang", current);
        history.replaceState(null, "", u);
      } catch (e) { /* history API unavailable */ }
    });
  });
})();
