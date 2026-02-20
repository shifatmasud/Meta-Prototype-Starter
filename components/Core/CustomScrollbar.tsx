/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface CustomScrollbarProps {
  children: React.ReactNode;
}

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({ children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const [thumbHeight, setThumbHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleResize = useCallback(() => {
    if (!contentRef.current || !scrollbarRef.current) return;
    const { scrollHeight, clientHeight } = contentRef.current;
    const scrollbarHeight = scrollbarRef.current.clientHeight;
    const newThumbHeight = Math.max((clientHeight / scrollHeight) * scrollbarHeight, 20); // min height 20px
    setThumbHeight(newThumbHeight);
  }, []);

  const handleScroll = useCallback(() => {
    if (!contentRef.current || !thumbRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const scrollbarHeight = scrollbarRef.current?.clientHeight || 0;
    const thumbPosition = (scrollTop / (scrollHeight - clientHeight)) * (scrollbarHeight - thumbHeight);
    thumbRef.current.style.transform = `translateY(${thumbPosition}px)`;
  }, [thumbHeight]);

  useEffect(() => {
    handleResize();
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
      return () => {
        contentElement.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [handleScroll, handleResize, children]);

  const handleThumbMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleThumbMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleThumbMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !contentRef.current || !scrollbarRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const { clientY } = e;
    const { top: scrollbarTop, height: scrollbarHeight } = scrollbarRef.current.getBoundingClientRect();
    const { scrollHeight, clientHeight } = contentRef.current;
    
    const percentage = Math.min(Math.max(0, (clientY - scrollbarTop) / scrollbarHeight), 1);
    const newScrollTop = percentage * (scrollHeight - clientHeight);
    
    contentRef.current.scrollTop = newScrollTop;
  }, [isDragging, thumbHeight]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleThumbMouseMove);
      document.addEventListener('mouseup', handleThumbMouseUp);
      document.body.style.userSelect = 'none';
      return () => {
        document.removeEventListener('mousemove', handleThumbMouseMove);
        document.removeEventListener('mouseup', handleThumbMouseUp);
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleThumbMouseMove, handleThumbMouseUp]);

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden' }}>
      <div ref={contentRef} style={{ height: '100%', width: '100%', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`
          div[ref='${contentRef}']::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {children}
      </div>
      <div ref={scrollbarRef} style={{ position: 'absolute', top: 0, right: 2, bottom: 0, width: '8px' }}>
        <div 
          ref={thumbRef}
          onMouseDown={handleThumbMouseDown}
          style={{
            width: '100%',
            height: `${thumbHeight}px`,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '4px',
            cursor: isDragging ? 'grabbing' : 'grab',
            position: 'relative',
          }}
        />
      </div>
    </div>
  );
};

export default CustomScrollbar;
