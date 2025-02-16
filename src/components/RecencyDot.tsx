import React, { memo, useMemo } from "react";

import { Circle } from "@chakra-ui/react";
import { FaClock } from "react-icons/fa6";

import { Tooltip } from "@/components/ui/tooltip";

const TooltipLabel = memo(() => (
  <>
    <p>Green: Updated less than 3 hrs ago.</p>
    <p>Yellow: Updated less than 6 hrs ago.</p>
    <p>Red: Updated more than 6 hrs ago.</p>
  </>
));

interface RecencyDotProps {
  dt: Date;
}

const RecencyDot: React.FC<RecencyDotProps> = React.memo(({ dt }) => {
  const color = useMemo(() => {
    const diffInSeconds = Math.abs(new Date().getTime() - dt.getTime());
    let color = "red";
    if (diffInSeconds < 60 * 60 * 3 * 1000) {
      color = "green";
    } else if (diffInSeconds < 60 * 60 * 6 * 1000) {
      color = "yellow";
    }
    return color;
  }, [dt]);
  return (
    <Tooltip showArrow content={<TooltipLabel />}>
      <Circle color={color}>
        <FaClock />
      </Circle>
    </Tooltip>
  );
});

export default RecencyDot;
