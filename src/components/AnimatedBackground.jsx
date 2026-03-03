import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const createParticle = () => {
      const p = {};
      p.reset = () => {
        p.x = Math.random() * canvas.width;
        p.y = Math.random() * canvas.height;
        p.size = Math.random() * 2 + 0.5;
        p.speedX = Math.random() * 0.2 - 0.1;
        p.speedY = Math.random() * 0.2 - 0.1;
        p.alpha = Math.random() * 0.3 + 0.1;
        p.color = Math.random() > 0.5 ? '255, 0, 110' : '0, 245, 255';
      };
      p.update = () => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      };
      p.draw = () => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${p.color}, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      };
      p.reset();
      return p;
    };

    const particles = Array.from({ length: 50 }, () => createParticle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

const AuroraHero = () => (
  <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vh] bg-gradient-to-br from-indigo-600/20 via-pink-600/10 to-transparent blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />
);

export default AnimatedBackground;
export { AuroraHero };
