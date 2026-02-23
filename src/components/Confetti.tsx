/**
 * Canvas-free confetti burst effect.
 *
 * When `trigger` transitions to a truthy value, 150 coloured particles
 * are spawned from the top-left area of the component and animated
 * outward with gravity and friction via `requestAnimationFrame`.
 * Particles fade out over the given `duration` (default 2 000 ms).
 *
 * Used on the Practice Quiz and Key Takeaways slides to celebrate
 * correct answers and completion.
 */
import { useEffect, useState, useRef } from "react";
/** Particle shape and physics state for one confetti piece. */
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

/** Palette of confetti colours — includes USF brand green and gold. */
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

/** Spawn `count` particles radiating outward from (`originX`, `originY`). */
function createParticles(count: number, originX: number, originY: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8;
    const speed = 1.5 + Math.random() * 4;
    const shapes: Particle["shape"][] = ["circle", "square", "star"];
    return {
      id: i,
      x: originX + (Math.random() - 0.5) * 30,
      y: originY + (Math.random() - 0.5) * 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 5 + Math.random() * 10,
      rotation: Math.random() * 360,
      velocityX: Math.cos(angle) * speed,
      velocityY: Math.sin(angle) * speed - 2.5,
      rotationSpeed: (Math.random() - 0.5) * 10,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      opacity: 1,
    };
  });
}

export function Confetti({
  trigger,
  duration = 2000,
}: {
  trigger: boolean | number;
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

    const p = createParticles(150, 50, 30);
    setParticles(p);
    startRef.current = performance.now();

    const gravity = 0.08;
    const friction = 0.99;

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
