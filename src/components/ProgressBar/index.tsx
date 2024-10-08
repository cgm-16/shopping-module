import { memo, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

export type ProgressBarProps = {
  stockPercentage: number;
};

export const ProgressBar = memo(({ stockPercentage }: ProgressBarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
  });

  return (
    <div ref={elementRef} className={styles.progress_bar__container}>
      <div
        className={styles.progress_bar}
        style={{ left: isVisible ? `${stockPercentage - 100}%` : "-100%" }}
      />
      <div className={styles.progress_bar__text_box}>{stockPercentage}%</div>
    </div>
  );
});
