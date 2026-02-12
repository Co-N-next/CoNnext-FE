import { useEffect } from "react";

export function useShake(onShake: () => void) {
  useEffect(() => {
    let lastX = 0;
    let isListening = false;

    const handleMotion = (e: DeviceMotionEvent) => {
      const x = e.accelerationIncludingGravity?.x ?? 0;
      if (Math.abs(x - lastX) > 15) onShake();
      lastX = x;
    };

    const startMotionListener = () => {
      if (isListening) return;
      window.addEventListener("devicemotion", handleMotion);
      isListening = true;
    };

    const stopMotionListener = () => {
      if (!isListening) return;
      window.removeEventListener("devicemotion", handleMotion);
      isListening = false;
    };

    const requestPermission = (DeviceMotionEvent as unknown as {
      requestPermission?: () => Promise<"granted" | "denied">;
    }).requestPermission;

    const requestAndStart = async () => {
      if (typeof requestPermission !== "function") {
        startMotionListener();
        return;
      }

      try {
        const state = await requestPermission();
        if (state === "granted") startMotionListener();
      } catch (error) {
        console.error("Motion permission request failed:", error);
      }
    };

    if (typeof requestPermission === "function") {
      const onUserGesture = () => {
        void requestAndStart();
      };

      window.addEventListener("click", onUserGesture, { once: true });
      window.addEventListener("touchend", onUserGesture, { once: true });

      return () => {
        window.removeEventListener("click", onUserGesture);
        window.removeEventListener("touchend", onUserGesture);
        stopMotionListener();
      };
    }

    startMotionListener();
    return () => stopMotionListener();
  }, [onShake]);
}
