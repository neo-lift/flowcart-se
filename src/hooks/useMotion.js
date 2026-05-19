import { useEffect } from "react";

export function useMotion() {
  useEffect(() => {
    let cancelled = false;

    import("./motionCore.js").then((mod) => {
      if (!cancelled && mod.runMotion) mod.runMotion();
    });

    return () => {
      cancelled = true;
    };
  }, []);
}
