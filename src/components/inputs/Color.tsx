import { cssStringToDecimal, decimalToCSSColor } from "../../utils/colors";

export interface ColorProps {
  name: string;
  value: number;
  dispatch: (name: string, value: number) => void;
}

export const Color = (props: ColorProps) => {

  return (
    <div className="color">
      <input className="input-color" type="color" value={ decimalToCSSColor(props.value) } onChange={(e) => {
        props.dispatch(props.name, cssStringToDecimal(e.target.value) );
      }}/>
    </div>
  )

}