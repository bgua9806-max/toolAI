import React, { useState, useRef, useCallback, useEffect } from 'react';

interface ImageComparisonSliderProps {
  originalSrc: string;
  processedSrc: string;
  originalLabel?: string;
  processedLabel?: string;
  className?: string;
}

export const ImageComparisonSlider: React.FC<ImageComparisonSliderProps> = ({
  originalSrc,
  processedSrc,
  originalLabel = 'GỐC (Trước)',
  processedLabel = 'ĐÃ XỬ LÝ (Sau)',
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-2xl bg-gray-900 shadow-xl cursor-ew-resize touch-none ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* 1. Processed Image (Background / Full Width) */}
      <img
        src={processedSrc}
        alt={processedLabel}
        className="w-full h-auto object-contain max-h-[560px] mx-auto block pointer-events-none"
        draggable={false}
      />

      {/* Label Processed (Right) */}
      <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-md pointer-events-none">
        {processedLabel}
      </div>

      {/* 2. Original Image (Clipped Overlay / Foreground) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={originalSrc}
          alt={originalLabel}
          className="w-full h-auto object-contain max-h-[560px] mx-auto block pointer-events-none"
          style={{
            width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
            maxWidth: 'none',
          }}
          draggable={false}
        />

        {/* Label Original (Left) */}
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/80 border border-white/20 text-gray-200 text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-md pointer-events-none">
          {originalLabel}
        </div>
      </div>

      {/* 3. Slider Divider Line & Handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-gray-900 border-2 border-emerald-500 shadow-lg flex items-center justify-center pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="-ml-1">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
};
