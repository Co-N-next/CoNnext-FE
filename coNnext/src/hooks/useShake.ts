import { useEffect } from "react";

type DeviceMotionEventWithPermission = typeof DeviceMotionEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

export function useShake(onShake: () => void, threshold = 15) {
  useEffect(() => {
    const DME = DeviceMotionEvent as DeviceMotionEventWithPermission;

    // iOS permission 처리
    if (typeof DME !== "undefined" && typeof DME.requestPermission === "function") {
      DME.requestPermission().catch(() => {});
    }

    let lastX = 0, lastY = 0, lastZ = 0;
    let lastTime = Date.now();

    function handleMotion(e: DeviceMotionEvent) {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;

      const now = Date.now();
      if (now - lastTime < 100) return;

      const dx = Math.abs((acc.x ?? 0) - lastX);
      const dy = Math.abs((acc.y ?? 0) - lastY);
      const dz = Math.abs((acc.z ?? 0) - lastZ);

      if (dx + dy + dz > threshold) {
        onShake();
      }

      lastX = acc.x ?? 0;
      lastY = acc.y ?? 0;
      lastZ = acc.z ?? 0;
      lastTime = now;
    }

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [onShake, threshold]);
}
