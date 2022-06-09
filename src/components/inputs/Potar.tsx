import * as React from "react";

const MAXROT = Math.PI * 1.5;
const LEFTROT = (Math.PI*2) - MAXROT;

export interface PotarProps {
  name: string;
  min: number;
  max: number;
  value: number;
  step: number;
  dispatch: (name: string, value: number) => void;
};

const getPointFromEvent = (e: React.MouseEvent<HTMLDivElement>) => {
  const halfWidth = Math.floor(e.currentTarget.offsetWidth / 2);
  // TODO: clic relatif au centre du potar
  return [e.clientX - e.currentTarget.clientLeft - halfWidth, e.clientY - e.currentTarget.offsetTop - halfWidth];
}

export const Potar = (props: PotarProps) => {

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaY > 0 ? -props.step : props.step;
    const targetValue = Math.min(props.max, Math.max(props.min, props.value + delta));
    props.dispatch(props.name, targetValue);
  }

  const getValueFromCirclePoint = (x, y) => {
    let angle = (Math.atan2(y, x) + Math.PI);

    if (angle > MAXROT) {
      const diff = angle - MAXROT;
      if (diff < LEFTROT/2) {
        angle = MAXROT;
      } else {
        angle = 0;
      }
    }
    return Math.min(props.max, Math.max(props.min, props.min + (props.max - props.min) * angle / MAXROT));
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const [x, y] = getPointFromEvent(e);
    const targetValue = getValueFromCirclePoint(x, y);
    console.log({ x, y, targetValue });
    props.dispatch(props.name, targetValue);
  }

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons > 0) {
      handleClick(e);
    }
  }

  const ratio = (props.value - props.min) / (props.max - props.min);

  const stepMarks = () => {
    const marks = [];
    const nbMarks = 12;
    for (let i = 0; i < nbMarks; i ++) {
      marks.push(<span key={i}
        style={{
          transform: `rotate(${i * (MAXROT / (nbMarks-1))}rad)`,	
        }}
      ></span>)
    }
    return (
      <div className="stepmarks">
        {marks}
      </div>
    );
  }

  return (
    <div className="potar">
      <input type="hidden" value={props.value} />
      {stepMarks()}      
      <div className="potar-inner" 
        style={{
          transform: `rotate(${ratio * MAXROT}rad)`,
        }}
        onWheel={handleWheel}
        onClick={handleClick}
        onMouseMove={handleMove}
      />
      {/* <span className="potar-label">{ Number.isInteger(props.value) ? props.value : props.value.toPrecision(2) }</span> */}
    </div>
  )
}
