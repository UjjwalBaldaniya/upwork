import { useEffect, useRef } from "react";

export default function Background() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;
    const mouse = { x: 0.5, y: 0.5, active: false };

    const dots = Array.from({ length: 56 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00022,
      vy: (Math.random() - 0.5) * 0.00022,
      r: 1.1 + Math.random() * 1.8,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
      mouse.active = true;
    };

    const draw = () => {
      if (!running) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      dots.forEach((d) => {
        if (mouse.active) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.hypot(dx * w, dy * h) || 1;
          if (dist < 200) {
            const f = ((200 - dist) / 200) * 0.00045;
            d.vx += dx * f;
            d.vy += dy * f;
          }
        }
        d.vx *= 0.985;
        d.vy *= 0.985;
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > 1) d.vx *= -1;
        if (d.y < 0 || d.y > 1) d.vy *= -1;
        d.x = Math.min(1, Math.max(0, d.x));
        d.y = Math.min(1, Math.max(0, d.y));
      });

      for (let i = 0; i < dots.length; i += 1) {
        for (let j = i + 1; j < dots.length; j += 1) {
          const a = dots[i];
          const b = dots[j];
          const dist = Math.hypot((a.x - b.x) * w, (a.y - b.y) * h);
          if (dist < 140) {
            ctx.strokeStyle = `rgba(125, 154, 116, ${0.16 * (1 - dist / 140)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
      }

      if (mouse.active) {
        dots.forEach((d) => {
          const dist = Math.hypot((d.x - mouse.x) * w, (d.y - mouse.y) * h);
          if (dist < 170) {
            ctx.strokeStyle = `rgba(196, 92, 62, ${0.16 * (1 - dist / 170)})`;
            ctx.beginPath();
            ctx.moveTo(mouse.x * w, mouse.y * h);
            ctx.lineTo(d.x * w, d.y * h);
            ctx.stroke();
          }
        });
      }

      dots.forEach((d, i) => {
        ctx.beginPath();
        ctx.fillStyle = i % 7 === 0 ? "rgba(196, 92, 62, 0.55)" : "rgba(125, 154, 116, 0.32)";
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    const onVis = () => {
      running = document.visibilityState === "visible" && !reduce;
      if (running) draw();
      else cancelAnimationFrame(raf);
    };
    document.addEventListener("visibilitychange", onVis);

    if (!reduce) draw();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="bg-anim" aria-hidden="true">
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
      <canvas ref={ref} className="bg-canvas" />
    </div>
  );
}
