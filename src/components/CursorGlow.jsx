import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.body.classList.add("has-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let gx = x;
    let gy = y;
    let raf = 0;
    let running = true;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
    };

    const tick = () => {
      if (!running) return;
      gx += (x - gx) * 0.1;
      gy += (y - gy) * 0.1;
      glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    tick();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div ref={glowRef} className="cursor-glow" />
    </div>
  );
}
