import { ICircle } from "../interfaces/ICircle";
import { decimalToCSSColor } from "../utils/colors";
import { pointOnCircle } from "../utils/matrixes";

export interface HTMLCircleProps extends ICircle {
};

export const HTMLCircle = (props: HTMLCircleProps) => {
  const finalAngle = (props.startAngle + props.rotationAngle) % (Math.PI*2);
  const innerRadius = props.radius - props.width;

  const [sX, sY] = pointOnCircle(props.centerX, props.centerY, props.radius, props.startAngle);
  const [eX, eY] = pointOnCircle(props.centerX, props.centerY, props.radius, finalAngle);

  const [s2X, s2Y] = pointOnCircle(props.centerX, props.centerY, innerRadius, props.startAngle);
  const [e2X, e2Y] = pointOnCircle(props.centerX, props.centerY, innerRadius, finalAngle);

  const lFlag = props.rotationAngle < Math.PI ? 0 : 1;

  const path = `M ${sX} ${sY} \
      A ${props.radius} ${props.radius} 0 ${lFlag} 1 ${eX} ${eY} \
      L ${e2X} ${e2Y} \
      A ${innerRadius} ${innerRadius} 0 ${lFlag} 0 ${s2X} ${s2Y} \
      Z`;
      
  return (
    <div className="circle" style={{
      backgroundColor: decimalToCSSColor(props.color),
      clipPath: "path('" + path + "')",
    }} />
  )

}