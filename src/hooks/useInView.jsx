import { useState, useEffect, RefObject } from "react";

export const useInView = (
  ref, // Allow null as part of the type
  options
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return; // Ensure ref is not null

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      options
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return isVisible;
};
