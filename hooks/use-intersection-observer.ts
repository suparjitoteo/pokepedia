// THIS CODE IS FROM REACT-QUERY EXAMPLE

import React from "react";
import { FetchNextPageOptions, InfiniteQueryObserverResult } from "react-query";

const useIntersectionObserver = ({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = "0px",
  enabled = true,
}: {
  root?: any;
  target: any;
  onIntersect: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<any, any>>;
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}) => {
  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [enabled, root, rootMargin, threshold, target, onIntersect]);
};

export default useIntersectionObserver;
