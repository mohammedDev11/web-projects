/* =========================================================
   Omnifood Animations (Vanilla JS) ✅
   - Sticky header + active link highlight
   - Smooth scrolling
   - Reveal on scroll (sections, cards, steps, features)
   - Hero entrance animation
   - Gallery hover parallax (subtle)
   - Counters (250,000+)
   - Simple mobile nav toggle (optional; needs a button if you add one)
   ========================================================= */

(() => {
  "use strict";

  // ---------- Helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // ---------- Inject minimal animation CSS (so you don't touch your CSS files) ----------
  const style = document.createElement("style");
  style.textContent = `
      /* Sticky header */
      .is-sticky .header{
        position: fixed;
        top: 0; left: 0; right: 0;
        z-index: 999;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        background: rgba(255,255,255,.86);
        box-shadow: 0 10px 30px rgba(0,0,0,.08);
        transition: transform .35s ease, background .35s ease, box-shadow .35s ease;
      }
      /* If you have dark mode later, this still looks okay */

      /* Offset body so content doesn't jump when header becomes fixed */
      body.has-sticky-pad { padding-top: var(--sticky-pad, 0px); }

      /* Reveal animation */
      [data-reveal]{
        opacity: 0;
        transform: translateY(18px);
        transition: opacity .6s ease, transform .6s ease;
        will-change: opacity, transform;
      }
      [data-reveal].is-visible{
        opacity: 1;
        transform: translateY(0);
      }

      /* Stagger children (optional) */
      [data-stagger] > *{
        opacity: 0;
        transform: translateY(14px);
        transition: opacity .55s ease, transform .55s ease;
      }
      [data-stagger].is-visible > *{
        opacity: 1;
        transform: translateY(0);
      }

      /* Active nav link */
      .main-nav-link.is-active{
        position: relative;
      }
      .main-nav-link.is-active::after{
        content:"";
        position:absolute;
        left:0; right:0;
        bottom:-6px;
        height:2px;
        border-radius: 999px;
        background: currentColor;
        opacity:.6;
        transform: scaleX(1);
        transform-origin: left;
      }

      /* Hero entrance */
      .hero-anim{
        opacity: 0;
        transform: translateY(18px);
      }
      .hero-anim.in{
        opacity: 1;
        transform: translateY(0);
        transition: opacity .7s ease, transform .7s ease;
      }
      .hero-img-anim{
        opacity: 0;
        transform: translateY(16px) scale(.98);
      }
      .hero-img-anim.in{
        opacity: 1;
        transform: translateY(0) scale(1);
        transition: opacity .85s ease, transform .85s ease;
      }

      /* Gallery subtle parallax */
      .gallary-item{ overflow:hidden; }
      .gallary-item img{
        transform: scale(1.02);
        transition: transform .25s ease;
        will-change: transform;
      }

      /* Button micro-interaction */
      .btn{
        transition: transform .18s ease, box-shadow .18s ease;
      }
      .btn:hover{
        transform: translateY(-2px);
        box-shadow: 0 14px 30px rgba(0,0,0,.12);
      }
      .btn:active{
        transform: translateY(0px);
        box-shadow: 0 8px 18px rgba(0,0,0,.10);
      }
    `;
  document.head.appendChild(style);

  // ---------- Smooth scrolling for internal links ----------
  const enableSmoothScroll = () => {
    const links = $$('a[href^="#"]:not([href="#"])');
    links.forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        const target = id ? document.querySelector(id) : null;
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    });
  };

  // ---------- Sticky header ----------
  const enableStickyHeader = () => {
    const header = $(".header");
    const heroSection = $(".section-hero");
    if (!header || !heroSection) return;

    // Set padding for body when sticky
    const setStickyPad = () => {
      const h = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--sticky-pad", `${h}px`);
    };
    setStickyPad();
    window.addEventListener("resize", setStickyPad);

    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;

        if (!entry.isIntersecting) {
          document.body.classList.add("is-sticky", "has-sticky-pad");
        } else {
          document.body.classList.remove("is-sticky", "has-sticky-pad");
        }
      },
      { root: null, threshold: 0, rootMargin: "-80px" }
    );

    io.observe(heroSection);
  };

  // ---------- Reveal on scroll (sections + cards + features + steps) ----------
  const setupRevealTargets = () => {
    // Add data-reveal to main blocks you already have (no HTML edit needed)
    const candidates = [
      ".section-featured .container",
      ".section-how .container",
      ".section-meals .container",
      ".section-testimonials .testimonials-container",
      ".section-testimonials .gallary",
      ".section-pricing .container",
      ".section-cta .container",
      ".footer .container",
      ".meal",
      ".feature",
      ".step-text-box",
      ".step-img-box",
      ".testimonial",
      ".cta",
      ".plan-details",
      ".pricing-plan",
    ];

    candidates.forEach((sel) => {
      $$(sel).forEach((el) => el.setAttribute("data-reveal", ""));
    });

    // Stagger some groups
    const staggerGroups = [
      ".logos",
      ".testimonials",
      ".container.grid.grid--3-cols",
      ".container.grid.grid--4-cols",
      ".gallary",
    ];
    staggerGroups.forEach((sel) => {
      const el = $(sel);
      if (el) el.setAttribute("data-stagger", "");
    });
  };

  const enableRevealOnScroll = () => {
    setupRevealTargets();

    const targets = $$("[data-reveal], [data-stagger]");
    if (!targets.length) return;

    if (prefersReducedMotion) {
      targets.forEach((el) => el.classList.add("is-visible"));
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          el.classList.add("is-visible");

          // If stagger group, animate children with delay
          if (el.hasAttribute("data-stagger")) {
            const kids = Array.from(el.children);
            kids.forEach((kid, i) => {
              kid.style.transitionDelay = `${Math.min(i * 70, 500)}ms`;
            });
          }

          io.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((el) => io.observe(el));
  };

  // ---------- Hero entrance ----------
  const enableHeroEntrance = () => {
    const heroText = $(".hero-text-box");
    const heroImg = $(".hero-img-box");
    if (!heroText && !heroImg) return;

    if (heroText) heroText.classList.add("hero-anim");
    if (heroImg) heroImg.classList.add("hero-img-anim");

    const run = () => {
      if (heroText) heroText.classList.add("in");
      if (heroImg) heroImg.classList.add("in");
    };

    if (prefersReducedMotion) return run();
    // small delay for nicer feel
    window.addEventListener("load", () => setTimeout(run, 120), { once: true });
  };

  // ---------- Active nav link highlight (based on sections in view) ----------
  const enableActiveNav = () => {
    const links = $$(".main-nav-link[href^='#']:not([href='#'])");
    if (!links.length) return;

    const map = links
      .map((a) => {
        const id = a.getAttribute("href");
        const sec = id ? document.querySelector(id) : null;
        return sec ? { a, sec } : null;
      })
      .filter(Boolean);

    if (!map.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // pick the most visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        links.forEach((l) => l.classList.remove("is-active"));
        const found = map.find((x) => x.sec === visible.target);
        if (found) found.a.classList.add("is-active");
      },
      { threshold: [0.2, 0.35, 0.5, 0.65] }
    );

    map.forEach(({ sec }) => io.observe(sec));
  };

  // ---------- Counter animation (250,000+) ----------
  const enableCounters = () => {
    const el = $(".delivered-text span");
    if (!el) return;

    const raw = el.textContent || "";
    const match = raw.replace(/,/g, "").match(/(\d+)/);
    if (!match) return;

    const target = parseInt(match[1], 10);
    if (!Number.isFinite(target)) return;

    const run = () => {
      if (prefersReducedMotion) return;

      const duration = 900; // ms
      const start = performance.now();
      const from = 0;

      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        const value = Math.floor(from + (target - from) * eased);
        el.textContent = value.toLocaleString() + "+";
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    // Run when hero in view
    const hero = $(".section-hero");
    if (!hero) return run();

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        run();
        io.disconnect();
      },
      { threshold: 0.6 }
    );
    io.observe(hero);
  };

  // ---------- Gallery hover parallax ----------
  const enableGalleryParallax = () => {
    const items = $$(".gallary-item");
    if (!items.length || prefersReducedMotion) return;

    items.forEach((item) => {
      const img = $("img", item);
      if (!img) return;

      item.addEventListener("mousemove", (e) => {
        const r = item.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
        const dy = (e.clientY - r.top) / r.height - 0.5;

        const x = dx * 8; // px
        const y = dy * 8; // px
        img.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
      });

      item.addEventListener("mouseleave", () => {
        img.style.transform = "scale(1.02) translate(0px, 0px)";
      });
    });
  };

  // ---------- Init ----------
  const init = () => {
    enableSmoothScroll();
    enableStickyHeader();
    enableHeroEntrance();
    enableRevealOnScroll();
    enableActiveNav();
    enableCounters();
    enableGalleryParallax();
  };

  // Run after DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
