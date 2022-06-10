import { ICircle } from "../interfaces/ICircle";
import { decimalToCSSColor } from "../utils/colors";
import { pointOnCircle, svgPath } from "../utils/trigo";

export interface HTMLCircleProps extends ICircle {
};

export const HTMLCircle = (props: HTMLCircleProps) => {
  const path = svgPath(props);
      
  return (
    <div className="circle" style={{
      backgroundColor: decimalToCSSColor(props.color),
      clipPath: "path('" + path + "')",
    }} />
  )

}