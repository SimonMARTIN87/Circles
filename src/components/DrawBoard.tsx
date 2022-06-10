import * as React from "react"
import { useAppContext } from "../context"
import { CirclesActionType } from "../context/reducer";
import { Canvas } from "./Canvas";
import { HTMLCircle } from "./HTMLCircle";

export enum RenderStyle {
  CANVAS = "CANVAS",
  HTML = "HTML"
};

export interface DrawBoardProps {
};

export const DrawBoard = (props: DrawBoardProps) => {
  const ctx = useAppContext();
  const elRef = React.useRef<HTMLDivElement>(null);
  const [rect, setRect] = React.useState<DOMRectReadOnly>(null);
  const [renderStyle, setRenderStyle] = React.useState<RenderStyle>(RenderStyle.HTML);

  React.useEffect( () => {
    if (rect) {
      ctx.dispatch({
        type: CirclesActionType.UPDATE_CENTER,
        payload: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        }
      });
    }
  }, [rect]);

  const observer = new ResizeObserver(entries => {
    setRect(entries[0].contentRect);
  });

  React.useEffect( () => {
    observer.observe(elRef.current);
    return () => {
      observer.disconnect();
    }
  }, [elRef.current]);

  const render = () => {
    if (renderStyle === RenderStyle.CANVAS) {
      return <Canvas width={rect.width} height={rect.height} />;
    } else {
      return ctx.circles.map((circle, index) => (
        <HTMLCircle key={index} {...circle} />
      ));
    }
  };

  return (<div>
    <div className="drawer" ref={elRef}>
      {render()}
    </div>
    <div className="render-cfg">
      <span>Canvas</span>
      <input className="input-switch" type="range" min={0} max={1} step={1} name="render" value={renderStyle == RenderStyle.HTML ? 1 : 0} 
      onChange={() => {
        setRenderStyle(renderStyle == RenderStyle.HTML ? RenderStyle.CANVAS : RenderStyle.HTML);
      }}/>
      <span>HTML</span>
    </div>
  </div>);

}