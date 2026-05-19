/* =========================================================================
   FlowCart — motion system
   Inspired by ReadyMag's editorial scroll choreography.
   ========================================================================= */

export function runMotion() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const html = document.documentElement;
  html.classList.add("has-js");

  /* -------------------- Existing behaviour -------------------- */

  const toggle = document.getElementById("navToggle");
  const mobile = document.getElementById("navMobile");
  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const isOpen = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    mobile.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mobile.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  const nav = document.getElementById("nav");
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 8) {
        nav.style.boxShadow = "0 6px 24px -16px rgba(15,17,24,0.15)";
      } else {
        nav.style.boxShadow = "none";
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const faqs = document.querySelectorAll(".faq__item");
  faqs.forEach((item) =>
    item.addEventListener("toggle", () => {
      if (item.open) {
        faqs.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    })
  );

  const yearTargets = document.querySelectorAll("[data-year]");
  yearTargets.forEach((el) => (el.textContent = new Date().getFullYear()));

  /* Trigger hero entrance regardless of reduced motion */
  requestAnimationFrame(() => document.body.classList.add("is-loaded"));

  if (reduced) {
    document.querySelectorAll(".reveal, .word-reveal").forEach((el) =>
      el.classList.add("is-visible")
    );
    return;
  }

  /* -------------------- Helpers -------------------- */

  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function makeObserver(callback, options = {}) {
    return new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback(entry.target, entry, obs);
          }
        });
      },
      Object.assign({ rootMargin: "0px 0px -8% 0px", threshold: 0.1 }, options)
    );
  }

  /* -------------------- Word-split headlines -------------------- */

  function splitWords(el) {
    if (el.dataset.split === "1") return;
    let counter = 0;
    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const value = child.nodeValue;
          if (!value || !value.trim()) return;
          const frag = document.createDocumentFragment();
          value.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
            } else {
              const word = document.createElement("span");
              word.className = "word";
              const inner = document.createElement("span");
              inner.className = "word__inner";
              inner.textContent = part;
              inner.style.setProperty("--wi", counter);
              word.appendChild(inner);
              frag.appendChild(word);
              counter++;
            }
          });
          child.replaceWith(frag);
        } else if (
          child.nodeType === Node.ELEMENT_NODE &&
          !child.classList.contains("word") &&
          !child.matches("br")
        ) {
          walk(child);
        }
      });
    };
    walk(el);
    el.classList.add("word-reveal");
    el.dataset.split = "1";
  }

  $$(".display, .h2").forEach(splitWords);

  /* -------------------- Tag elements for reveal -------------------- */

  const revealSets = [
    { selector: ".eyebrow", stagger: 0 },
    { selector: ".section__intro", stagger: 0 },
    { selector: ".section__closing", stagger: 0 },
    { selector: ".section__cta", stagger: 0 },
    { selector: ".badge", stagger: 0 },
    { selector: ".problem-card", stagger: 80 },
    { selector: ".value-card", stagger: 80 },
    { selector: ".feature-card", stagger: 50 },
    { selector: ".usecase", stagger: 70 },
    { selector: ".industry", stagger: 50 },
    { selector: ".testimonial", stagger: 100 },
    { selector: ".step", stagger: 120 },
    { selector: ".plan", stagger: 120 },
    { selector: ".metric", stagger: 80 },
    { selector: ".kpi", stagger: 90 },
    { selector: ".compare__row", stagger: 35 },
    { selector: ".faq__item", stagger: 40 },
    { selector: ".check-list li", stagger: 50 },
    { selector: ".woo-row", stagger: 70 },
    { selector: ".signal", stagger: 90 },
    { selector: ".dashboard__list ul li", stagger: 60 },
    { selector: ".dashboard__unanswered ul li", stagger: 80 },
    { selector: ".dashboard__kpis", stagger: 0 },
    { selector: ".dashboard__chart", stagger: 0 },
    { selector: ".dashboard__list", stagger: 0 },
    { selector: ".woo-card", stagger: 0 },
    { selector: ".solution__card", stagger: 0 },
    { selector: ".solution__content", stagger: 0 },
    { selector: ".integration__copy", stagger: 0 },
    { selector: ".integration__visual", stagger: 0 },
    { selector: ".cta", stagger: 0 },
    { selector: ".newsletter", stagger: 0 },
  ];

  revealSets.forEach(({ selector, stagger }) => {
    const elements = $$(selector);
    elements.forEach((el, i) => {
      if (!el.classList.contains("reveal") && !el.classList.contains("word-reveal")) {
        el.classList.add("reveal");
      }
      if (stagger > 0) {
        el.style.setProperty("--i", (i % 8).toString());
      }
    });
  });

  /* Direction overrides */
  $$(".integration__copy").forEach((el) => el.classList.add("reveal--left"));
  $$(".integration__visual").forEach((el) => el.classList.add("reveal--right"));
  $$(".solution__content").forEach((el) => el.classList.add("reveal--right"));
  $$(".plan").forEach((el) => el.classList.add("reveal--scale"));

  /* The hero headline is above the fold; reveal immediately. */
  const heroHeadline = document.querySelector(".hero .display");
  if (heroHeadline) {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => heroHeadline.classList.add("is-visible"))
    );
  }

  /* -------------------- Reveal observer -------------------- */

  const revealObserver = makeObserver((target) => {
    target.classList.add("is-visible");
    revealObserver.unobserve(target);
  });

  $$(".reveal, .word-reveal").forEach((el) => {
    if (el === heroHeadline) return;
    revealObserver.observe(el);
  });

  /* -------------------- Counter animations -------------------- */

  function parseCounter(el) {
    for (const node of Array.from(el.childNodes)) {
      if (node.nodeType !== Node.TEXT_NODE) continue;
      const m = node.nodeValue.match(/^(\s*[+\-]?)([\d,]+(?:\.\d+)?)(.*)$/);
      if (!m) continue;
      const [, prefix, numStr, suffix] = m;
      if (/[\d/]/.test(suffix)) continue;
      return { node, prefix, numStr, suffix };
    }
    return null;
  }

  function formatNumber(value, hasComma, decimals) {
    let s = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
    if (hasComma) {
      const parts = s.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      s = parts.join(".");
    }
    return s;
  }

  const counterTargets = $$(
    ".kpi__value, .metric__value, .float-card__value, .woo-row strong"
  );

  const counterObserver = makeObserver((target) => {
    const data = parseCounter(target);
    if (!data) {
      counterObserver.unobserve(target);
      return;
    }
    const { node, prefix, numStr, suffix } = data;
    const hasComma = numStr.includes(",");
    const decMatch = numStr.match(/\.(\d+)$/);
    const decimals = decMatch ? decMatch[1].length : 0;
    const final = parseFloat(numStr.replace(/,/g, ""));
    if (Number.isNaN(final)) {
      counterObserver.unobserve(target);
      return;
    }
    const duration = 1500;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);

    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const v = final * ease(t);
      node.nodeValue = prefix + formatNumber(v, hasComma, decimals) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    target.closest(".kpi, .metric")?.classList.add("is-visible");
    requestAnimationFrame(tick);
    counterObserver.unobserve(target);
  });

  counterTargets.forEach((el) => {
    if (!parseCounter(el)) return;
    counterObserver.observe(el);
  });

  /* -------------------- Bar fills (signal & mini-bar) -------------------- */

  const barTargets = $$(".signal__bar > span, .solution__mini-bar > span");
  barTargets.forEach((bar) => {
    const original = bar.style.width || getComputedStyle(bar).width;
    bar.dataset.target = original;
    bar.style.width = "0%";
  });

  const barObserver = makeObserver((target) => {
    const original = target.dataset.target || "0%";
    requestAnimationFrame(() => {
      target.style.width = original;
    });
    barObserver.unobserve(target);
  });
  barTargets.forEach((b) => barObserver.observe(b));

  /* -------------------- Steps rail progressive fill + active step -------------------- */

  const stepsSection = document.querySelector(".steps");
  const stepsRail = document.querySelector(".steps__rail");
  const stepItems = $$(".step");
  if (stepsSection && stepsRail && stepItems.length) {
    const updateStepRail = () => {
      const rect = stepsSection.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.25;
      const visible = (start - rect.top) / (start - end + rect.height * 0.4);
      const progress = Math.max(0, Math.min(1, visible));
      stepsRail.style.setProperty("--progress", `${progress * 100}%`);

      const activeIndex = Math.min(
        stepItems.length - 1,
        Math.floor(progress * stepItems.length)
      );
      stepItems.forEach((step, i) =>
        step.classList.toggle("is-active", i <= activeIndex && progress > 0.05)
      );
    };
    updateStepRail();
    window.addEventListener("scroll", updateStepRail, { passive: true });
    window.addEventListener("resize", updateStepRail);
  }

  /* -------------------- Logo marquee -------------------- */

  const logos = document.querySelector(".trust__logos");
  if (logos) {
    const items = Array.from(logos.children);
    if (items.length) {
      logos.innerHTML = "";
      const track = document.createElement("div");
      track.className = "trust__track";
      const groupA = document.createElement("div");
      groupA.className = "trust__group";
      const groupB = document.createElement("div");
      groupB.className = "trust__group";
      groupB.setAttribute("aria-hidden", "true");
      items.forEach((item) => {
        groupA.appendChild(item);
        groupB.appendChild(item.cloneNode(true));
      });
      track.appendChild(groupA);
      track.appendChild(groupB);
      logos.appendChild(track);
      logos.classList.add("is-marquee");
    }
  }

  /* -------------------- Hero cursor spotlight -------------------- */

  const hero = document.querySelector(".hero");
  if (hero && window.matchMedia("(hover: hover)").matches) {
    hero.addEventListener("pointerenter", () => hero.classList.add("is-hover"));
    hero.addEventListener("pointerleave", () => hero.classList.remove("is-hover"));
    hero.addEventListener(
      "pointermove",
      (e) => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        hero.style.setProperty("--mx", `${x}%`);
        hero.style.setProperty("--my", `${y}%`);
      },
      { passive: true }
    );
  }

  /* -------------------- Magnetic buttons -------------------- */

  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    $$(".btn--primary, .btn--lime").forEach((btn) => {
      const strength = 8;
      btn.addEventListener("pointermove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        btn.style.setProperty("--mx", `${x * strength}px`);
        btn.style.setProperty("--my", `${y * strength}px`);
        btn.classList.add("is-magnetic");
      });
      btn.addEventListener("pointerleave", () => {
        btn.style.setProperty("--mx", "0px");
        btn.style.setProperty("--my", "0px");
        setTimeout(() => btn.classList.remove("is-magnetic"), 250);
      });
    });
  }

  /* -------------------- Feature card 3D tilt -------------------- */

  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    $$(".feature-card").forEach((card) => {
      const max = 6;
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const ry = (px - 0.5) * 2 * max;
        const rx = -(py - 0.5) * 2 * max;
        card.style.setProperty("--rx", `${rx}deg`);
        card.style.setProperty("--ry", `${ry}deg`);
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
        card.classList.add("is-tilting");
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
        setTimeout(() => card.classList.remove("is-tilting"), 350);
      });
    });
  }

  /* -------------------- Floating cards: start floatY after entrance -------------------- */

  document.querySelectorAll(".float-card").forEach((card, i) => {
    setTimeout(() => card.classList.add("is-floating"), 2200 + i * 200);
  });

  /* -------------------- Chat: typing indicator before each bot message -------------------- */

  const chatBody = document.querySelector(".chat__body");
  if (chatBody) {
    const messages = Array.from(chatBody.children);
    chatBody.innerHTML = "";

    let delay = 600;
    const baseStep = 700;

    const showTyping = (cb, time) => {
      const t = document.createElement("div");
      t.className = "chat__typing";
      t.innerHTML = "<span></span><span></span><span></span>";
      chatBody.appendChild(t);
      setTimeout(() => {
        t.remove();
        cb();
      }, time);
    };

    const reveal = (el) => {
      el.style.animation = "fadeUp 0.45s ease both";
      chatBody.appendChild(el);
    };

    let chatStarted = false;
    const startChat = () => {
      if (chatStarted) return;
      chatStarted = true;
      messages.forEach((msg) => {
        if (msg.classList && msg.classList.contains("chat__msg--bot")) {
          setTimeout(() => showTyping(() => reveal(msg), 700), delay);
          delay += baseStep + 600;
        } else {
          setTimeout(() => reveal(msg), delay);
          delay += baseStep;
        }
      });
    };

    /* Start when chat enters viewport (or instantly if already in view at load) */
    const chatEl = document.querySelector(".chat");
    if (chatEl) {
      const chatObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(startChat, 800);
              chatObserver.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      chatObserver.observe(chatEl);
    }
  }

  /* -------------------- Nav active section highlight -------------------- */

  const navLinks = $$(".nav__links a[href^='#']");
  if (navLinks.length) {
    const sections = navLinks
      .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
      .filter(Boolean);

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove("is-active"));
            const id = entry.target.id;
            const active = navLinks.find(
              (l) => l.getAttribute("href") === `#${id}`
            );
            if (active) active.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => navObserver.observe(s));
  }

  /* -------------------- Parallax: small drift on decorative blobs -------------------- */

  const parallaxTargets = [
    { el: document.querySelector(".hero__gradient"), speed: 0.15 },
    { el: document.querySelector(".solution__bg"), speed: 0.08 },
    { el: document.querySelector(".cta__gradient"), speed: -0.12 },
  ].filter((t) => t.el);

  if (parallaxTargets.length) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        parallaxTargets.forEach(({ el, speed }) => {
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2 - window.innerHeight / 2;
          el.style.setProperty("--py", `${center * speed}px`);
          el.style.translate = `0 ${center * speed}px`;
        });
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
}
