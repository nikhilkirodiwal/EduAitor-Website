import { useEffect, useRef, useState } from "react";
import "./CursorCircle.css";

const CursorCircle = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;
    let innerX = 0, innerY = 0;
    let rafId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    const onEnterLink = () => setHovering(true);
    const onLeaveLink = () => setHovering(false);

    const attachLinkListeners = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
    };

    // Re-attach on DOM changes (SPA navigation)
    const obs = new MutationObserver(attachLinkListeners);
    obs.observe(document.body, { childList: true, subtree: true });
    attachLinkListeners();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const animate = () => {
      // Inner dot — very fast, nearly instant
      innerX += (mouseX - innerX) * 0.55;
      innerY += (mouseY - innerY) * 0.55;

      // Outer ring — slow, laggy trail
      outerX += (mouseX - outerX) * 0.1;
      outerY += (mouseY - outerY) * 0.1;

      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${innerX}px, ${innerY}px) translate(-50%, -50%)`;
      }
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerX}px, ${outerY}px) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafId);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      {/* Outer glass ring — laggy */}
      <div
        ref={outerRef}
        className={`cur-outer ${clicking ? "cur-outer--click" : ""} ${hovering ? "cur-outer--hover" : ""}`}
      />

      {/* Inner dot — snappy */}
      <div
        ref={innerRef}
        className={`cur-inner ${clicking ? "cur-inner--click" : ""} ${hovering ? "cur-inner--hover" : ""}`}
      />
    </>
  );
};

export default CursorCircle;