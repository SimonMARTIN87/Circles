import { useAppContext } from "../context";
import { CirclesActionType } from "../context/reducer";
import { GrowStyle, ICircle } from "../interfaces/ICircle";
import { Color } from "./inputs/Color";
import { Potar } from "./inputs/Potar";
import { Switch } from "./inputs/Switch";

export interface CircleConfigProps extends ICircle {
  index: number;
};

export const CircleConfig = (props: CircleConfigProps) => {
  const ctx = useAppContext();

  const handleChange = (name, value) => {
    ctx.dispatch({
      type: CirclesActionType.UPDATE_CIRCLE,
      payload: {
        index: props.index,
        [name]: value
      }
    });
  }

  const plugedInput = (name: keyof ICircle, min: number, max: number, step: number) => (
    <Potar min={min} max={max} name={name} step={step} value={ props[name] as number} dispatch={handleChange}/>
  );
  
  return (
    //<div className="circle-config">
    <tr>
      <td>{plugedInput("radius",0,100,1)}</td>
      <td>{plugedInput("startAngle",0,Math.PI*2,0.05)}</td>
      <td>{plugedInput("rotationAngle",0,Math.PI*2-0.001, 0.05)}</td>
      <td>{plugedInput("width",1,25,1)}</td>
      <td>{plugedInput("moveStep",-.5,.5,0.01)}</td>
      <td>{plugedInput("growStep",-.5,.5,0.01)}</td>
      <td><Switch name="growStyle" value={props.growStyle} dispatch={handleChange}/></td>
      <td><Color name="color" value={props.color} dispatch={handleChange} /></td>
    </tr>
    //</div>
  )

};
