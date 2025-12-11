import { useEffect, useState } from 'react';

interface FloatingElementsProps {
  count?: number;
  colors?: string[];
}

export function FloatingElements({ count = 8, colors = ['purple', 'blue', 'indigo'] }: FloatingElementsProps) {
  const [elements, setElements] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    delay: number;
  }>>([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 2, // 2-10px
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 5, // 0-5s delay
      }));
      setElements(newElements);
    };

    generateElements();
  }, [count, colors]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element) => (
        <div
          key={element.id}
          className={`absolute rounded-full opacity-30 animate-float floating-particle`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            backgroundColor: `var(--color-${element.color}-300)`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${6 + Math.random() * 4}s`, // 6-10s duration
          }}
        />
      ))}
    </div>
  );
}