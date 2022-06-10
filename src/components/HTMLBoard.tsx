import * as React from "react"
import { useAppContext } from "../context"
import { CirclesActionType } from "../context/reducer";
import { HTMLCircle } from "./HTMLCircle";

export interface HTMLBoardProps {
};

export const HTMLBoard = (props: HTMLBoardProps) => {
  const ctx = useAppContext();
  const elRef = React.useRef<HTMLDivElement>(null);

  const handleResize = (entry) => {
    ctx.dispatch({
      type: CirclesActionType.UPDATE_CENTER,
      payload: {
        x: entry.contentRect.left + entry.contentRect.width / 2,
        y: entry.contentRect.top + entry.contentRect.height / 2
      }
    });
  }

  const observer = new ResizeObserver(entries => {
    entries.forEach(handleResize);
  });


  React.useEffect( () => {
    observer.observe(elRef.current);
    return () => {
      observer.disconnect();
    }
  }, [elRef.current]);

  return (
    <div>
      <div className="drawer" ref={elRef}>
        {ctx.circles.map((circle, index) => (
          <HTMLCircle key={index} {...circle} />
        ))}
      </div>
    </div>
  )

}