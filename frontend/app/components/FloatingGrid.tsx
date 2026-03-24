"use client";
import { useEffect, useState, JSX } from "react";
import styles from './FloatingGrid.module.css';

export default function FloatingGrid() {
  const [gridElements, setGridElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const elements = Array.from({ length: 50 }, (_, i) => {
      const size = Math.random() * 3 + 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 3 + 2;

      return (
        <div
          key={i}
          className={`absolute bg-white/80 rounded-full ${styles.animateFloat}`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${y}%`,
            left: `${x}%`,
            animationDuration: `${duration}s`,
          }}
        />
      );
    });

    setGridElements(elements);
  }, []);

  return <div className="absolute inset-0">{gridElements}</div>;
}
