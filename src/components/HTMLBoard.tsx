import * as React from "react"
import { useAppContext } from "../context"
import { HTMLCircle } from "./HTMLCircle";

export interface HTMLBoardProps {
};

export const HTMLBoard = (props: HTMLBoardProps) => {
  const ctx = useAppContext();


  return (
    <div>
      <div className="drawer">
        {ctx.circles.map((circle, index) => (
          <HTMLCircle key={index} {...circle} />
        ))}
      </div>
    </div>
  )

}