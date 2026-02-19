import { NextRequest } from "next/server";

/**
 * Serves a minimal HTML page that displays a single video full-bleed.
 * Used in an iframe so the video renders in its own document and respects
 * the parent's z-index (fixes video stacking over other cards).
 */
export function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get("src") ?? "";
  const id = request.nextUrl.searchParams.get("id") ?? "";
  const loopParam = request.nextUrl.searchParams.get("loop");
  const loop = loopParam !== "false" && loopParam !== "0";
  const sanitized = src.startsWith("/") && !src.includes("..") ? src : "";
  const safeId = id.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64);
  const loopAttr = loop ? " loop" : "";

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; }
    video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  </style>
</head>
<body>
  <video id="v" src="${sanitized}" muted${loopAttr} playsinline preload="auto" autoplay></video>
  <script>
    (function(){
      var v = document.getElementById('v');
      var frameId = ${JSON.stringify(safeId)};
      var doLoop = ${JSON.stringify(loop)};
      function play() { if (v) v.play().catch(function(){}); }
      function pause() { if (v) v.pause(); }
      function notifyReady() {
        if (frameId && window.parent) window.parent.postMessage({ type: 'videoReady', id: frameId }, '*');
      }
      function notifyEnded() {
        if (frameId && window.parent) window.parent.postMessage({ type: 'videoEnded', id: frameId }, '*');
      }
      if (v) {
        v.addEventListener('canplay', function() { notifyReady(); play(); }, { once: true });
        if (v.readyState >= 3) { notifyReady(); play(); }
        if (!doLoop) v.addEventListener('ended', notifyEnded);
      }
      window.addEventListener('message', function(e) {
        if (e.data && (e.data.type === 'play' || e.data.type === 'pause')) {
          e.data.type === 'play' ? play() : pause();
        }
      });
    })();
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
