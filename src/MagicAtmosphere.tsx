import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Atmospheric embellishment only. Decorative nodes cannot intercept a tap,
 * click, selection or scroll. The native interface always works without it.
 */
export function MagicAtmosphere() {
  const location = useLocation();
  const [kingsleyVisible, setKingsleyVisible] = useState(false);
  const cameosShown = useRef(0);

  useEffect(() => {
    setKingsleyVisible(false);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!["/home", "/quizzes"].includes(location.pathname)) return;
    if (cameosShown.current >= 2) return;

    const timer = window.setTimeout(() => {
      cameosShown.current += 1;
      setKingsleyVisible(true);
    }, cameosShown.current === 0 ? 11000 : 16000);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (!kingsleyVisible) return;
    const timer = window.setTimeout(() => setKingsleyVisible(false), 6500);
    return () => window.clearTimeout(timer);
  }, [kingsleyVisible]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || typeof Element.prototype.animate !== "function") return;

    const layer = document.createElement("div");
    layer.className = "shadow-magic-layer";
    layer.setAttribute("aria-hidden", "true");
    const nodes = Array.from({ length: 24 }, (_, i) => {
      const node = document.createElement("i");
      node.className = i % 4 === 0 ? "shadow-star" : i % 3 === 0 ? "shadow-fleck" : "shadow-wisp";
      layer.appendChild(node);
      return node;
    });
    document.body.appendChild(layer);

    const animations = new Map<HTMLElement, Animation>();
    let index = 0;
    let lastMouse = 0;
    let lastTouch = 0;
    let mouseX = -200;
    let mouseY = -200;
    let pressed: { id: number; x: number; y: number; moved: boolean } | null = null;
    const activeTimers = new Map<HTMLElement, number>();

    function puff(x: number, y: number, burst = false, particle = 0) {
      const node = nodes[index++ % nodes.length];
      animations.get(node)?.cancel();
      const theta = index * 2.3999632 + particle * 0.66;
      const dx = burst ? Math.cos(theta) * (20 + particle * 3) : Math.cos(theta) * 26;
      const dy = burst ? Math.sin(theta) * (18 + particle * 3) : -20 - (index % 3) * 7;
      node.style.left = x + "px";
      node.style.top = y + "px";
      const animation = node.animate(
        [
          { opacity: 0, transform: "translate(-50%,-50%) scale(.4) rotate(0deg)" },
          { opacity: burst ? 0.88 : 0.65, offset: 0.18, transform: "translate(-50%,-50%) scale(1) rotate(16deg)" },
          { opacity: 0.25, offset: 0.7, transform: `translate(calc(-50% + ${dx * 0.7}px),calc(-50% + ${dy * 0.7}px)) scale(1.5) rotate(35deg)` },
          { opacity: 0, transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(2) rotate(50deg)` }
        ],
        { duration: burst ? 760 : 1050, easing: "ease-out" },
      );
      animations.set(node, animation);
      animation.onfinish = () => { if (animations.get(node) === animation) animations.delete(node); };
    }

    function burst(x: number, y: number, target?: HTMLElement) {
      for (let i = 0; i < 8; i++) puff(x, y, true, i);
      if (!target) return;
      window.clearTimeout(activeTimers.get(target));
      target.classList.remove("magic-activated");
      // Restart the illumination even if the user clicks the same element twice.
      void target.offsetWidth;
      target.classList.add("magic-activated");
      activeTimers.set(target, window.setTimeout(() => {
        target.classList.remove("magic-activated");
        activeTimers.delete(target);
      }, 700));
    }

    function onDown(event: PointerEvent) {
      if (!event.isPrimary) { pressed = null; return; }
      pressed = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
    }
    function onMove(event: PointerEvent) {
      const now = performance.now();
      if (pressed && event.pointerId === pressed.id && Math.hypot(event.clientX - pressed.x, event.clientY - pressed.y) > 12) {
        pressed.moved = true;
      }
      if (event.pointerType === "mouse" && !event.buttons && matchMedia("(hover:hover) and (pointer:fine)").matches) {
        if (now - lastMouse > 62 && Math.hypot(event.clientX - mouseX, event.clientY - mouseY) > 8) {
          lastMouse = now;
          mouseX = event.clientX;
          mouseY = event.clientY;
          puff(event.clientX, event.clientY);
        }
      } else if (event.pointerType === "touch" && pressed?.moved && now - lastTouch > 220) {
        // Mobile has no fake cursor. A few wisps appear where the finger scrolls.
        lastTouch = now;
        puff(event.clientX, event.clientY - 26);
      }
    }
    function onUp(event: PointerEvent) {
      if (!pressed || pressed.id !== event.pointerId) return;
      const tap = pressed;
      pressed = null;
      if (tap.moved || Math.hypot(event.clientX - tap.x, event.clientY - tap.y) > 12) return;
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("a, button, .answer label, label.answer") : null;
      if (!target || target.closest("input, textarea, [contenteditable=true]")) return;
      if (window.getSelection()?.toString()) return;
      burst(event.clientX, event.clientY, target);
    }
    function onKeyboardClick(event: MouseEvent) {
      if (event.detail !== 0) return;
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("a, button, label.answer") : null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      burst(rect.left + rect.width / 2, rect.top + rect.height / 2, target);
    }
    function onCancel() { pressed = null; }
    function onVisibility() { if (document.hidden) animations.forEach((a) => a.cancel()); }
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointercancel", onCancel, { passive: true });
    document.addEventListener("click", onKeyboardClick);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onCancel);
      document.removeEventListener("click", onKeyboardClick);
      document.removeEventListener("visibilitychange", onVisibility);
      animations.forEach((animation) => animation.cancel());
      activeTimers.forEach((timer, node) => { clearTimeout(timer); node.classList.remove("magic-activated"); });
      layer.remove();
    };
  }, []);

  return kingsleyVisible ? (
    <aside className="kingsley-cameo" aria-label="A note from Kingsley">
      <img src={`${import.meta.env.BASE_URL}assets/kingsley-2.png`} alt="Kingsley the crowned frog" />
      <div className="kingsley-placard">
        <p>I was not consulted about the questions. – K</p>
        <button type="button" onClick={() => setKingsleyVisible(false)} aria-label="Dismiss Kingsley's note">×</button>
      </div>
    </aside>
  ) : null;
}
