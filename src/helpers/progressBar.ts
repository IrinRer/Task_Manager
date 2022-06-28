type TSetProgress = (arg: number) => void;
type TOnProgress = ({ percent: number }) => void;

export const setConfig = (setProgress: TSetProgress, onProgress: TOnProgress) => {
  return {
    onUploadProgress: (event: ProgressEvent) => {
      const definePercent = (event.loaded / event.total) * 100;
      const percent = Math.floor(definePercent);
      setProgress(percent);
      if (percent === 100) {
        setTimeout(() => setProgress(0), 1000);
      }
      onProgress({ percent: definePercent });
    },
  };
};
