import { useEffect, useRef } from "react";

export function useIntersectionObserver(setActiveId: (id: string) => void) {
  const headingElementsRef = useRef<Record<string, IntersectionObserverEntry>>({});
  useEffect(() => {
    const callback = (headings: IntersectionObserverEntry[]) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      const visibleHeadings: IntersectionObserverEntry[] = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) {
          visibleHeadings.push(headingElement);
        }
      });

      // eslint-disable-next-line ts/no-use-before-define
      const getIndexFromId = (id: string) => headingElements.findIndex(heading => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = [...visibleHeadings].sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id),
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "0px 0px -40% 0px",
    });

    const headingElements = Array.from(document.querySelectorAll("h2, h3"));

    headingElements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
}
