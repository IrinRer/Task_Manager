import { useEffect, useState } from 'react';

interface Size {
  width: number | undefined;
  height: number | undefined;
}

export const useWindowSize = (): Size => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      if (
        (windowSize.width !== undefined &&
          Math.abs(windowSize.width - window.innerWidth) > 10) ||
        (windowSize.height !== undefined &&
          Math.abs(windowSize.height - window.innerHeight) > 10) ||
        windowSize.width === undefined ||
        windowSize.height === undefined
      ) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.height, windowSize.width]);
  return windowSize;
};
