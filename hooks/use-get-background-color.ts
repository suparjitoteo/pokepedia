import { prominent } from "color.js";
import { useEffect, useRef, useState } from "react";

export const useGetBackgroundColor = ({
  imgSrc,
  defaultValue = "#FFF",
}: {
  imgSrc?: string;
  defaultValue?: string;
}) => {
  const [backgroundColor, setBackgroundColor] = useState(defaultValue);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    if (!imgSrc) {
      return;
    }

    prominent(imgSrc, {
      format: "hex",
    }).then((color) => {
      if (mounted.current) {
        setBackgroundColor(color[1] as string);
      }
    });

    return () => {
      mounted.current = false;
    };
  }, [imgSrc]);

  return backgroundColor;
};
