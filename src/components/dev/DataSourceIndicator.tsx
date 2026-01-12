"use client";

import { useState } from "react";

interface DataSourceIndicatorProps {
  sources: Record<string, string>;
}

/**
 * Development-only floating panel showing data sources
 * Only renders in development mode
 */
export function DataSourceIndicator({ sources }: DataSourceIndicatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const apiCount = Object.values(sources).filter((v) =>
    v.includes("API")
  ).length;
  const staticCount = Object.values(sources).filter((v) =>
    v.includes("Static")
  ).length;

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 z-9999 bg-black/80 text-white px-3 py-2 rounded-full text-xs font-mono shadow-lg hover:bg-black/90 transition-all"
        title="Show data sources"
      >
        📦 {apiCount}✅ {staticCount}⚪
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-9999 bg-black/90 text-white rounded-lg shadow-2xl font-mono text-xs max-w-xs backdrop-blur-sm border border-white/10">
      {/* Header */}
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer flex items-center justify-between px-3 py-2 border-b border-white/10 bg-white/5">
        <span className="font-bold">📦 Data Sources</span>
        <div className="flex gap-1">
          <button
            // onClick={() => setIsOpen(!isOpen)}
            className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors"
          >
            {isOpen ? "▼" : "▲"}
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors"
          >
            ―
          </button>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="flex gap-4 px-3 py-2 text-[10px] bg-white/5">
        <span className="text-green-400">✅ API: {apiCount}</span>
        <span className="text-gray-400">⚪ Static: {staticCount}</span>
      </div>

      {/* Detailed List */}
      {isOpen && (
        <div className="max-h-64 overflow-y-auto">
          {Object.entries(sources).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between px-3 py-1.5 border-t border-white/5 hover:bg-white/5"
            >
              <span className="text-gray-300 truncate mr-2">{key}</span>
              <span
                className={
                  value.includes("API") ? "text-green-400" : "text-gray-500"
                }
              >
                {value.includes("API") ? "✅" : "⚪"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
