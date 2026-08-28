"use client";

import { useRef, useState, type ReactNode } from "react";

// A plain horizontally-scrollable row that also supports mouse drag (touch
// scrolling already works natively via overflow-x-auto) — for content that
// would otherwise need to shrink its font to fit a fixed number of columns.
export default function DragScrollRow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragState = useRef({ dragging: false, startX: 0, startScrollLeft: 0, moved: false });
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    dragState.current = { dragging: true, startX: e.clientX, startScrollLeft: el.scrollLeft, moved: false };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !dragState.current.dragging) return;
    const delta = e.clientX - dragState.current.startX;
    if (Math.abs(delta) > 3) dragState.current.moved = true;
    el.scrollLeft = dragState.current.startScrollLeft - delta;
  };

  const endDrag = () => {
    dragState.current.dragging = false;
    setDragging(false);
  };

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      // Dragged past the click threshold — swallow the click that would
      // otherwise fire on whatever the pointer lands on (e.g. a link).
      onClickCapture={(e) => {
        if (dragState.current.moved) e.preventDefault();
      }}
      className={`no-scrollbar flex overflow-x-auto ${dragging ? "cursor-grabbing" : "cursor-grab"} ${className}`}
    >
      {children}
    </div>
  );
}
