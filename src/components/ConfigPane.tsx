import { useState } from "react";
import { useAppContext } from "../context"
import { CircleConfig } from "./CircleConfig";

export interface ConfigPaneProps {
}

export const ConfigPane = (props: ConfigPaneProps) => {
  const ctx = useAppContext();

  const addCircle = () => {
    ctx.addCircle();
  }

  const startLoop = () => {
    ctx.startLoop();
  }

  const stopLoop = () => {
    ctx.stopLoop();
  }

  return (
    <div className="config-pane">
      <table>
        <thead>
          <tr>
            <th>Radius</th>
            <th>Start Angle</th>
            <th>Rotation Angle</th>
            <th>Width</th>
            <th>Move Step</th>
            <th>Grow Step</th>
            <th>Grow Style</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {ctx.circles.map((circle, index) => (
            <CircleConfig index={index} {...circle} />
          ))}
        </tbody>
      </table>
      <div className="config-buttons">
        <button onClick={addCircle}>+</button>
        <button onClick={startLoop}>Start</button>
        <button onClick={stopLoop}>Stop</button>
      </div>
    </div>
  )

}
