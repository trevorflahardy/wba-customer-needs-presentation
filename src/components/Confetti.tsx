import { useEffect, useState, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
  shape: "circle" | "square" | "star";
  opacity: number;
}

const COLORS = [
  "#22c55e",
  "#fbbf24",
  "#ef4444",
  "#3b82f6",
  "#a855f7",
  "#f97316",
  "#ec4899",
  "#06b6d4",
  "#006747",
  "#C5960C",
];

function createParticles(count: number, originX: number, originY: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8;
    const speed = 3 + Math.random() * 8;
    const shapes: Particle["shape"][] = ["circle", "square", "star"];
    return {
      id: i,
      x: originX,
      y: originY,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 4 + Math.random() * 8,
      rotation: Math.random() * 360,
      velocityX: Math.cos(angle) * speed,
      velocityY: Math.sin(angle) * speed - 4,
      rotationSpeed: (Math.random() - 0.5) * 15,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      opacity: 1,
    };
  });
}

export function Confetti({
  trigger,
  duration = 2000,
}: {
  trigger: boolean;
  duration?: number;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) {
      setParticles([]);
      return;
    }

    const p = createParticles(60, 50, 40);
    setParticles(p);
    startRef.current = performance.now();

    const gravity = 0.15;
    const friction = 0.98;

    function animate() {
      const elapsed = performance.now() - startRef.current;
      if (elapsed > duration) {
        setParticles([]);
        return;
      }

      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: p.x + p.velocityX,
          y: p.y + p.velocityY,
          velocityX: p.velocityX * friction,
          velocityY: p.velocityY * friction + gravity,
          rotation: p.rotation + p.rotationSpeed,
          opacity: Math.max(0, 1 - elapsed / duration),
        }))
      );

      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [trigger, duration]);

  if (particles.length === 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 100,
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.shape === "circle" ? p.size : p.size * 0.6,
            background: p.color,
            borderRadius: p.shape === "circle" ? "50%" : p.shape === "star" ? "2px" : "1px",
            transform: `rotate(${p.rotation}deg)`,
            opacity: p.opacity,
            willChange: "transform, left, top, opacity",
          }}
        />
      ))}
    </div>
  );
}
