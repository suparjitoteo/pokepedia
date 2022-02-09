import { prominent } from "color.js";
import { useEffect, useRef, useState } from "react";

export const useGetBackgroundColor = ({
  imageUrl,
  defaultValue = "#FFF",
}: {
  imageUrl?: string;
  defaultValue?: string;
}) => {
  const [backgroundColor, setBackgroundColor] = useState(defaultValue);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    if (!imageUrl) {
      return;
    }

    prominent(imageUrl, {
      format: "hex",
    }).then((color) => {
      if (mounted.current) {
        setBackgroundColor(color[1] as string);
      }
    });

    return () => {
      mounted.current = false;
    };
  }, [imageUrl]);

  return backgroundColor;
};
