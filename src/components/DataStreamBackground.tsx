import { useEffect, useRef } from "react";

const snippets = [
  "SELECT * FROM insights;",
  "accuracy: 96.7%",
  "import pandas as pd",
  "model.fit(X_train)",
  "R² = 0.967",
  "GROUP BY region",
  "df.describe()",
  "plt.show()",
  "precision: 0.94",
  "JOIN ON id",
  "WHERE score > 90",
  "ORDER BY date DESC",
  "COUNT(*) AS total",
  "np.mean(data)",
  "loss: 0.0231",
  "epochs: 100",
];

interface StreamItem {
  text: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  fontSize: number;
}

const DataStreamBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const items: StreamItem[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create stream items
    for (let i = 0; i < 35; i++) {
      items.push({
        text: snippets[Math.floor(Math.random() * snippets.length)],
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 0.6 + 0.3,
        opacity: Math.random() * 0.15 + 0.08,
        fontSize: Math.random() * 5 + 10,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      items.forEach((item) => {
        item.y -= item.speed;
        if (item.y < -20) {
          item.y = canvas.height + 20;
          item.x = Math.random() * canvas.width;
          item.text = snippets[Math.floor(Math.random() * snippets.length)];
        }

        ctx.font = `${item.fontSize}px "JetBrains Mono", monospace`;
        ctx.fillStyle = `rgba(70, 100, 220, ${item.opacity})`;
        ctx.fillText(item.text, item.x, item.y);
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default DataStreamBackground;
