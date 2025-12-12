import React, { useRef, useState, useEffect } from "react";
import { useSprings, animated } from "@react-spring/web";

const SplitText = React.memo(({ text, className = "", delay = 50 }) => {
  const letters = text.split("");
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  const [springs] = useSprings(letters.length, (i) => ({
    from: { opacity: 0, transform: "translateY(1em)" },
    to: isVisible
      ? { opacity: 1, transform: "translateY(0)", delay: i * delay }
      : { opacity: 0, transform: "translateY(1em)" },
    reset: true,
    config: { tension: 300, friction: 20 },
  }), [isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {springs.map((style, i) => (
        <animated.span
          key={i}
          style={style}
          className="inline-block will-change-transform"
        >
          {letters[i] === " " ? "\u00A0" : letters[i]}
        </animated.span>
      ))}
    </div>
  );
});

export default SplitText;
