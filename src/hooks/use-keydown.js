import React, { useEffect } from "react";

function useKeyDown(callback, code) {
  function handleKeydown(ev) {
    if (ev.code === code) {
      callback();
    }
  }
  // global event listener
  useEffect(() => {
    // modified to keyup event so that my cookie won't go crazy if I hold the space key
    window.addEventListener("keyup", handleKeydown);
    return () => window.removeEventListener("keyup", handleKeydown);
  }, [callback]); // kind of infinity loop here
}
export default useKeyDown;
