import { useState, useEffect, RefObject } from 'react';

type Options = IntersectionObserverInit;

export const useInView = (
  ref: RefObject<Element | null>, // Allow null as part of the type
  options: Options = {}
): boolean => {
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
