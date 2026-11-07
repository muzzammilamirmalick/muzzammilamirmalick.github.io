// Calls a function when someone types the Konami code: up up down down left right left right b a.
import { useEffect } from "react";

const CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export function useKonami(onCode) {
  useEffect(() => {
    let position = 0;

    function handleKeyDown(event) {
      // Arrow keys already do things in the terminal and the photo slider.
      if (event.target.closest?.("input, textarea")) return;

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === CODE[position]) {
        position += 1;
        if (position === CODE.length) {
          position = 0;
          onCode();
        }
      } else {
        // A wrong key starts over, but it might also be the first key of a new attempt.
        position = key === CODE[0] ? 1 : 0;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCode]);
}
