"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Adapted from Aceternity UI's Background Ripple Effect
 * (https://ui.aceternity.com/components/background-ripple-effect) for
 * Tailwind v3 and this site's dark-only ink/violet/cyan palette. Rows/cols
 * auto-fill the parent container via ResizeObserver instead of the fixed
 * 8x27 grid the original ships with.
 */
export const BackgroundRippleEffect = ({
  cellSize = 64,
  className,
}: {
  cellSize?: number;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ rows: 0, cols: 0 });
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateDims = () => {
      const { width, height } = el.getBoundingClientRect();
      setDims({
        cols: Math.max(1, Math.ceil(width / cellSize) + 1),
        rows: Math.max(1, Math.ceil(height / cellSize) + 1),
      });
    };

    updateDims();
    const observer = new ResizeObserver(updateDims);
    observer.observe(el);
    return () => observer.disconnect();
  }, [cellSize]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 h-full w-full overflow-hidden", className)}
    >
      {dims.rows > 0 && dims.cols > 0 && (
        <div className="ripple-mask absolute inset-0 flex items-center justify-center">
          <DivGrid
            key={`ripple-${rippleKey}`}
            rows={dims.rows}
            cols={dims.cols}
            cellSize={cellSize}
            borderColor="rgba(139, 143, 163, 0.22)"
            fillColor="rgba(27, 30, 42, 0.65)"
            clickedCell={clickedCell}
            onCellClick={(row, col) => {
              setClickedCell({ row, col });
              setRippleKey((k) => k + 1);
            }}
            interactive
          />
        </div>
      )}
    </div>
  );
};

type DivGridProps = {
  className?: string;
  rows: number;
  cols: number;
  cellSize: number;
  borderColor: string;
  fillColor: string;
  clickedCell: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
  interactive?: boolean;
};

type CellStyle = React.CSSProperties & {
  ["--delay"]?: string;
  ["--duration"]?: string;
};

const DivGrid = ({
  className,
  rows,
  cols,
  cellSize,
  borderColor,
  fillColor,
  clickedCell,
  onCellClick = () => {},
  interactive = true,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols],
  );

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
  };

  return (
    <div className={cn("relative", className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const delay = clickedCell ? Math.max(0, distance * 55) : 0;
        const duration = 200 + distance * 80;

        const style: CellStyle = clickedCell
          ? {
              "--delay": `${delay}ms`,
              "--duration": `${duration}ms`,
            }
          : {};

        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.5px] opacity-70 transition-opacity duration-150 hover:opacity-100 hover:shadow-[0px_0px_30px_1px_rgba(124,92,252,0.35)_inset]",
              clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
              !interactive && "pointer-events-none",
            )}
            style={{
              backgroundColor: fillColor,
              borderColor,
              ...style,
            }}
            onClick={interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined}
          />
        );
      })}
    </div>
  );
};
