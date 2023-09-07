import { useEffect, useState } from "react";

export const useAnimation = (name: string) => {
  const [className, setClassName] = useState(`${name}-default`);
  useEffect(() => {
    setClassName(`${name}-animate`);
    return () => {
      setClassName(`${name}-default`);
    };
  }, [name]);
  return className;
};
