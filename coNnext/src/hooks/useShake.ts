export function useShake(onShake: () => void) {
  useEffect(() => {
    let lastX = 0;

    const handleMotion = (e: DeviceMotionEvent) => {
      const x = e.accelerationIncludingGravity?.x ?? 0;
      if (Math.abs(x - lastX) > 15) onShake();
      lastX = x;
    };

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [onShake]);
}
