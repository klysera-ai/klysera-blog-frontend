"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Section {
  id: string;
  label: string;
}

interface SectionPosition {
  id: string;
  label: string;
  ratio: number;
  scrollTop: number;
}

interface PageRulerProps {
  sections?: Section[];
  tickEvery?: number;
  contentSelector?: string; // CSS selector for the content container
  containerSelector?: string; // CSS selector for the container to measure
}

/**
 * PageRuler — a vertical scroll ruler with section anchors.
 *
 * Usage:
 *   1. Drop <PageRuler /> anywhere in your layout (outside main content).
 *   2. Pass contentSelector prop to auto-detect headings from a container.
 *   3. Pass containerSelector to specify which container to measure
 *   4. Or pass sections array manually with { id: string, label: string }
 *
 * Props:
 *   sections           — array of { id: string, label: string } (optional)
 *   contentSelector    — CSS selector to auto-detect headings (e.g., '.post-content')
 *   containerSelector  — CSS selector for container to measure (e.g., '#post-content-container')
 *   tickEvery          — px between tick marks (default: 10)
 */
export default function PageRuler({ sections = [], tickEvery = 10, contentSelector, containerSelector }: PageRulerProps) {
  const rulerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerTop, setContainerTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  const [scrollY, setScrollY] = useState(0);
  const [sectionPositions, setSectionPositions] = useState<SectionPosition[]>([]);
  const [rulerHeight, setRulerHeight] = useState(0);
  const [hoveredTick, setHoveredTick] = useState<number | null>(null);

  // Measure page + ruler dimensions
  const measure = useCallback(() => {
    const container = containerSelector ? document.querySelector(containerSelector) : null;
    
    if (container) {
      const rect = container.getBoundingClientRect();
      const ch = container.scrollHeight;
      const ct = rect.top + window.scrollY;
      
      // Ruler height matches container height
      const rh = ch;

      setContainerHeight(prev => prev !== ch ? ch : prev);
      setContainerTop(prev => prev !== ct ? ct : prev);
      setRulerHeight(prev => prev !== rh ? rh : prev);
    } else {
      // Fallback to viewport height if no container
      const vh = window.innerHeight;
      setViewportHeight(prev => prev !== vh ? vh : prev);
      setRulerHeight(prev => prev !== vh ? vh : prev);
    }

    let detectedSections: Section[] = sections;

    // Auto-detect headings from DOM if contentSelector is provided
    if (contentSelector) {
      const contentContainer = document.querySelector(contentSelector);
      if (contentContainer) {
        const headingElements = contentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');
        detectedSections = Array.from(headingElements).map((heading, index) => {
          // Auto-assign ID if it doesn't exist
          if (!heading.id) {
            heading.id = `auto-heading-${index}`;
          }
          return {
            id: heading.id,
            label: heading.textContent?.trim() || `Section ${index + 1}`
          };
        });
      }
    }

    // Map each section id to its proportional position on the ruler
    const positions = detectedSections
      .map(({ id, label }) => {
        const el = document.getElementById(id);
        if (!el) return null;
        
        if (container) {
          const containerRect = container.getBoundingClientRect();
          const containerTopPos = containerRect.top + window.scrollY;
          const elTop = el.getBoundingClientRect().top + window.scrollY;
          const relativeTop = elTop - containerTopPos;
          const ratio = relativeTop / container.scrollHeight;
          return { id, label, ratio, scrollTop: elTop };
        } else {
          const top = el.getBoundingClientRect().top + window.scrollY;
          const ratio = top / document.documentElement.scrollHeight;
          return { id, label, ratio, scrollTop: top };
        }
      })
      .filter((pos): pos is SectionPosition => pos !== null);

    // Only update if positions changed
    setSectionPositions(prev => {
      if (prev.length !== positions.length) return positions;
      const changed = prev.some((p, i) =>
        p.id !== positions[i]?.id ||
        p.label !== positions[i]?.label ||
        Math.abs(p.scrollTop - positions[i].scrollTop) > 1
      );
      return changed ? positions : prev;
    });
  }, [sections, contentSelector, containerSelector]);

  useEffect(() => {
    // Initial measure
    measure();

    // Delayed remeasure for dynamic content
    const timer = setTimeout(measure, 200);
    const timer2 = setTimeout(measure, 500);
    const timer3 = setTimeout(measure, 1000);

    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll ratio of the current viewport position relative to container
  const container = containerSelector && typeof document !== 'undefined' ? document.querySelector(containerSelector) : null;
  let scrollRatio = 0;
  
  if (container) {
    const containerRect = container.getBoundingClientRect();
    const containerTopPos = containerRect.top + window.scrollY;
    const scrollInContainer = scrollY - containerTopPos;
    const maxScroll = containerHeight - viewportHeight;
    scrollRatio = maxScroll > 0 ? Math.max(0, Math.min(1, scrollInContainer / maxScroll)) : 0;
  } else {
    const pageHeight = typeof document !== 'undefined' ? document.documentElement.scrollHeight : 0;
    scrollRatio = pageHeight > viewportHeight ? scrollY / (pageHeight - viewportHeight) : 0;
  }

  // Active indicator position on the ruler (in px)
  const indicatorY = scrollRatio * rulerHeight;

  // Number of ticks to render based on ruler height
  const tickCount = rulerHeight > 0 ? Math.floor(rulerHeight / tickEvery) : 0;

  const scrollToSection = (scrollTop: number) => {
    window.scrollTo({ top: scrollTop, behavior: "smooth" });
  };

  const scrollToTickPosition = (tickY: number) => {
    // Calculate the scroll position based on tick position on ruler
    const ratio = tickY / rulerHeight;
    
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const containerTopPos = containerRect.top + window.scrollY;
      const targetScroll = containerTopPos + (ratio * containerHeight);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    } else {
      const pageHeight = typeof document !== 'undefined' ? document.documentElement.scrollHeight : 0;
      const maxScroll = pageHeight - viewportHeight;
      const targetScroll = ratio * maxScroll;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-[140px]" style={{ height: `${rulerHeight}px` }}>
      <div
        ref={rulerRef}
        className="group absolute top-0 right-0 w-16 z-50 pointer-events-none select-none"
        style={{ height: `${rulerHeight}px` }}
        aria-hidden="true"
      >
        {/* Tick marks */}
        {Array.from({ length: tickCount + 1 }, (_, i) => {
          const y = i * tickEvery;
          const isMajor = i % 5 === 0;

          // Light mode colors
          const lightMinor = "rgba(0, 122, 255, 0.2)";
          const lightMajor = "rgba(0, 122, 255, 0.4)";
          const lightHover = "#007AFF";

          // Dark mode colors
          const darkMinor = "#A9A9A94D";
          const darkMajor = "#B1B9C8";

          return (
            <div
              key={i}
              className="absolute right-4 flex items-center pointer-events-auto cursor-pointer"
              style={{ top: y, height: tickEvery }}
              onMouseEnter={() => setHoveredTick(i)}
              onMouseLeave={() => setHoveredTick(null)}
              onClick={() => scrollToTickPosition(y)}
            >
              <div
                className="transition-all duration-100 dark:hidden"
                style={{
                  height: 1,
                  width: isMajor ? 10 : 6,
                  backgroundColor:
                    hoveredTick === i
                      ? lightHover
                      : isMajor
                        ? lightMajor
                        : lightMinor,
                }}
              />
              <div
                className="transition-all duration-100 hidden dark:block"
                style={{
                  height: 1,
                  width: isMajor ? 10 : 6,
                  backgroundColor:
                    hoveredTick === i
                      ? darkMajor
                      : isMajor
                        ? darkMajor
                        : darkMinor,
                }}
              />
            </div>
          );
        })}

        {/* Section anchor labels */}
        {sectionPositions.map(({ id, label, ratio, scrollTop }) => {
          const y = ratio * rulerHeight;
          return (
            <div
              key={id}
              className="absolute right-4 flex items-center pointer-events-auto cursor-pointer group/section"
              style={{ top: y }}
              onClick={() => scrollToSection(scrollTop)}
            >
              {/* Connector line extending left */}
              <div
                className="
                absolute right-4 h-px
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200
              "
                style={{
                  width: "200px",
                  backgroundColor: "rgba(0, 122, 255, 0.3)"
                }}
              />
              {/* Bold tick for section - Light mode */}
              <div
                className="transition-all duration-100 dark:hidden"
                style={{
                  height: 2,
                  width: 20,
                  backgroundColor: "#007AFF",
                }}
              />
              {/* Bold tick for section - Dark mode */}
              <div
                className="transition-all duration-100 hidden dark:block"
                style={{
                  height: 2,
                  width: 20,
                  backgroundColor: "#B1B9C8",
                }}
              />
              {/* Label — visible only on group hover */}
              {/* Light mode label */}
              <span
                className="
                absolute right-6 pr-1
                text-[11px] font-medium
                whitespace-nowrap text-right
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200
                bg-white/90 px-2 py-1 rounded
                shadow-sm
                dark:hidden
              "
                style={{
                  fontFamily: 'General Sans, sans-serif',
                  color: '#000000',
                }}
              >
                {label}
              </span>
              {/* Dark mode label */}
              <span
                className="
                absolute right-6 pr-1
                text-[11px] font-medium
                whitespace-nowrap text-right
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200
                bg-black/90 px-2 py-1 rounded
                shadow-sm
                hidden dark:block
              "
                style={{
                  fontFamily: 'General Sans, sans-serif',
                  color: '#B1B9C8',
                }}
              >
                {label}
              </span>
            </div>
          );
        })}

        {/* Scroll position indicator */}
        <div
          className="absolute right-4 transition-all duration-75 pointer-events-none"
          style={{ top: indicatorY }}
        >
          {/* Indicator line - Light mode */}
          <div className="h-px w-4 dark:hidden" style={{ backgroundColor: "#007AFF" }} />
          {/* Indicator line - Dark mode */}
          <div className="h-px w-4 hidden dark:block" style={{ backgroundColor: "#B1B9C8" }} />

          {/* Number display - Light mode */}
          <span
            className="
            absolute top-0 -translate-y-1/2
            right-5 font-mono text-[10px]
            opacity-100 group-hover:opacity-0
            transition-opacity duration-200
            whitespace-nowrap
            dark:hidden
          "
            style={{ color: "#007AFF" }}
          >
            {scrollRatio.toFixed(2)}
          </span>

          {/* Number display - Dark mode */}
          <span
            className="
            absolute top-0 -translate-y-1/2
            right-5 font-mono text-[10px]
            opacity-100 group-hover:opacity-0
            transition-opacity duration-200
            whitespace-nowrap
            hidden dark:block
          "
            style={{ color: "#B1B9C8" }}
          >
            {scrollRatio.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
