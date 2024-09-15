import { useEffect, useRef } from "react";

const useUpdateEffect = (callback, dependencies = []) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    return callback();
  }, dependencies);
};

export default useUpdateEffect;
