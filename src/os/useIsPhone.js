// True on small or very short screens, where MuzzOS becomes a phone home screen.
import { useSyncExternalStore } from "react";

const PHONE_QUERY = "(max-width: 759px), (max-height: 499px)";

function subscribe(onChange) {
  const query = window.matchMedia(PHONE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function useIsPhone() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(PHONE_QUERY).matches);
}
