"use client";

import { css } from "builder-css";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
  description?: string;
};

export default function Modal({
  isOpen,
  onClose,
  children,
  description,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const beforeTrapRef = useRef<HTMLDivElement>(null);
  const afterTrapRef = useRef<HTMLDivElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const modalOverlayStyles = css({
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "1000",
    padding: "16px",
    overflowY: "auto",
    overflowX: "hidden",
    boxSizing: "border-box",
  });

  const focusTrapStyles = css({
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: "0",
  });

  // Get all focusable elements within the modal
  const getFocusableElements = () => {
    if (!modalRef.current) return [];

    const focusableSelectors = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      'input:not([disabled]):not([type="hidden"])',
      "select:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(", ");

    return Array.from(
      modalRef.current.querySelectorAll(focusableSelectors)
    ) as HTMLElement[];
  };

  // Handle focus trap
  const handleFocusTrap = (event: FocusEvent, isStart: boolean) => {
    const focusableElements = getFocusableElements();

    if (focusableElements.length === 0) return;

    if (isStart) {
      // If focusing the start trap, move to last focusable element
      focusableElements[focusableElements.length - 1].focus();
    } else {
      // If focusing the end trap, move to first focusable element
      focusableElements[0].focus();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    // Store the last focused element before opening modal
    lastFocusedElementRef.current = document.activeElement as HTMLElement;

    // Disable body scroll and set aria attributes
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Set aria-hidden on all siblings of the portal container
    const portalContainer = document.getElementById("modal-portal");
    if (portalContainer) {
      const siblings = Array.from(document.body.children).filter(
        (child) => child !== portalContainer
      );
      siblings.forEach((sibling) => {
        sibling.setAttribute("aria-hidden", "true");
        sibling.setAttribute("inert", "");
      });
    }

    // Focus the modal after a brief delay to ensure it's rendered
    const focusTimer = setTimeout(() => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      } else if (modalRef.current) {
        modalRef.current.focus();
      }
    }, 100);

    // Handle escape key
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    // Handle tab key for focus management
    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("keydown", handleTabKey);

    // Cleanup function
    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("keydown", handleTabKey);

      // Remove aria-hidden from siblings
      const portalContainer = document.getElementById("modal-portal");
      if (portalContainer) {
        const siblings = Array.from(document.body.children).filter(
          (child) => child !== portalContainer
        );
        siblings.forEach((sibling) => {
          sibling.removeAttribute("aria-hidden");
          sibling.removeAttribute("inert");
        });
      }

      // Restore focus to the last focused element
      if (lastFocusedElementRef.current) {
        lastFocusedElementRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  // Create portal container if it doesn't exist
  useEffect(() => {
    if (typeof window !== "undefined") {
      let portalContainer = document.getElementById("modal-portal");
      if (!portalContainer) {
        portalContainer = document.createElement("div");
        portalContainer.id = "modal-portal";
        document.body.appendChild(portalContainer);
      }
    }
  }, []);

  if (!isOpen) return null;

  const modalContent = (
    <>
      {/* Focus trap start */}
      <div
        ref={beforeTrapRef}
        className={focusTrapStyles}
        tabIndex={0}
        onFocus={(e) => handleFocusTrap(e.nativeEvent, true)}
        aria-hidden="true"
      />

      <div
        className={modalOverlayStyles}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? "modal-description" : undefined}
      >
        <div ref={modalRef} tabIndex={-1} style={{ outline: "none" }}>
          {/* Hidden description for screen readers */}
          {description && (
            <div id="modal-description" className={focusTrapStyles}>
              {description}
            </div>
          )}
          {children}
        </div>
      </div>

      {/* Focus trap end */}
      <div
        ref={afterTrapRef}
        className={focusTrapStyles}
        tabIndex={0}
        onFocus={(e) => handleFocusTrap(e.nativeEvent, false)}
        aria-hidden="true"
      />
    </>
  );

  // Only render portal on client side
  if (typeof window === "undefined") return null;

  const portalContainer = document.getElementById("modal-portal");
  if (!portalContainer) return null;

  return createPortal(modalContent, portalContainer);
}
