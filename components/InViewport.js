import React, { useEffect, useRef, useState } from "react";

const InViewport = ({ root, rootMargin = "0px", threshold = 1, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const options = {
    root,
    rootMargin,
    threshold,
  };

  const cbFunction = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.intersectionRatio);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(cbFunction, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return (
    <div ref={ref} style={{ opacity: isVisible }}>
      {children}
    </div>
  );
};

export default InViewport;
