import { GrowStyle, ICircle } from "../../interfaces/ICircle";

export interface SwitchProps {
  name: keyof ICircle;
  value: GrowStyle;
  dispatch: (name: string, value: GrowStyle) => void;
}

export const Switch = (props: SwitchProps) => {

  return (
    <div className="switch">
      <input className="input-switch" type="range" min={0} max={1} step={1} name="growStyle" value={props.value == GrowStyle.decrease ? 1 : 0} onChange={() => {
        props.dispatch("growStyle", props.value == GrowStyle.decrease ? GrowStyle.reset : GrowStyle.decrease);
      }}/>
    </div>
  )
}