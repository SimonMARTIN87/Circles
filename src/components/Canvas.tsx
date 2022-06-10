import { useEffect, useRef } from "react"
import { useAppContext } from "../context";
import { svgPath } from "../utils/trigo";

export interface CanvasProps {
  width: number;
  height: number;
}

export const Canvas = (props: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useAppContext();

  const draw = () => {
    const cvsCtx = canvasRef.current.getContext("2d");
    if (!cvsCtx) return;
    cvsCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.circles.forEach(circle => {
      const path = new Path2D(svgPath(circle));
      cvsCtx.beginPath();
      cvsCtx.lineWidth = 1;
      cvsCtx.fillStyle = `#${circle.color.toString(16)}`;
      cvsCtx.fill(path);
    });
  };

  useEffect( () => {
    draw();
  }, [ctx.circles])

  return (
    <canvas ref={canvasRef} width={props.width} height={props.height}>
    </canvas>
  )
}