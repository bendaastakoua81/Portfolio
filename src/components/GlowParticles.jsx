import { useEffect, useRef } from "react";

function GlowParticles() {
  const canvasRef = useRef(null);
  const ripples = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let time = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    window.addEventListener("click", (e) => {
      ripples.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        opacity: 0.8,
      });
    });

    function animate() {
      time += 0.004;

      ctx.fillStyle = "rgba(11, 14, 26, 0.95)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const baseGradient = ctx.createLinearGradient(
        canvas.width * 0.5 + Math.sin(time) * canvas.width * 0.3,
        canvas.height * 0.5 + Math.cos(time * 0.7) * canvas.height * 0.3,
        canvas.width * 0.5 + Math.cos(time * 1.2) * canvas.width * 0.4,
        canvas.height * 0.5 + Math.sin(time * 0.9) * canvas.height * 0.4
      );
      baseGradient.addColorStop(0, "rgba(60, 40, 120, 0.5)");
      baseGradient.addColorStop(0.5, "rgba(100, 108, 255, 0.4)");
      baseGradient.addColorStop(1, "rgba(50, 40, 100, 0.5)");

      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouseGradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        120
      );
      mouseGradient.addColorStop(0, "rgba(100, 108, 255, 0.3)");
      mouseGradient.addColorStop(0.6, "rgba(83, 91, 242, 0.1)");
      mouseGradient.addColorStop(1, "transparent");

      ctx.fillStyle = mouseGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ripples.current = ripples.current.filter((ripple) => {
        ripple.radius += 4;
        ripple.opacity -= 0.01;

        if (ripple.opacity <= 0) return false;

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(100, 108, 255, ${ripple.opacity})`;
        ctx.lineWidth = 3;
        ctx.stroke();

        return true;
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        background: "#0b0e1a",
      }}
    />
  );
}

export default GlowParticles;
