import { useEffect, useRef } from 'react';

const THROTTLE_MS = 60_000 * 3;

/**
 * Ping `/` on user activity (throttled) so a proxied dev session stays warm.
 * Implemented without react-idle-timer to keep the root layout hook stack small and SSR-safe.
 */
export function useDevServerHeartbeat() {
  const lastPing = useRef(0);

  useEffect(() => {
    const ping = () => {
      const now = Date.now();
      if (now - lastPing.current < THROTTLE_MS) return;
      lastPing.current = now;
      fetch('/', { method: 'GET' }).catch(() => {});
    };

    const events = ['mousemove', 'keydown', 'scroll', 'touchstart', 'click'] as const;
    const opts: AddEventListenerOptions = { passive: true, capture: true };
    events.forEach((e) => window.addEventListener(e, ping, opts));
    return () => events.forEach((e) => window.removeEventListener(e, ping, opts));
  }, []);
}
