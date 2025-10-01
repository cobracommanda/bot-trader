"use client";
import { useEffect, useRef } from "react";

export default function useTradingViewWidget(
  scriptUrl: string,
  config: Record<string, unknown>,
  height = 600
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const configString = JSON.stringify(config);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // prevent double-init (was inverted in your code)
    if (el.dataset.loaded === "true") return;

    // ensure .js suffix
    const src = scriptUrl.endsWith(".js") ? scriptUrl : `${scriptUrl}.js`;

    // widget target
    el.innerHTML = `<div class="tradingview-widget-container__widget" style="width:100%;height:${height}px;"></div>`;

    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = configString;
    el.appendChild(script);
    el.dataset.loaded = "true";

    return () => {
      el.removeAttribute("data-loaded");
      el.innerHTML = ""; // removes widget + script
    };
  }, [scriptUrl, configString, height]);

  return containerRef;
}
