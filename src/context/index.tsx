import * as React from "react";
import { GrowStyle, ICircle } from "../interfaces/ICircle";
import { CirclesAction, CirclesActionType, circlesReducer } from "./reducer";


const defaultCircle: ICircle = {
  radius: 50,
  color: 16711680, // red !
  centerX: 100,
  centerY: 100,
  startAngle: 0,
  rotationAngle: 1,
  width: 5,
  moveStep: 0,
  growStep: -0.03,
  growStyle: GrowStyle.reset,
};

interface IAppContext {
  circles: ICircle[];
  dispatch: React.Dispatch<CirclesAction>;
  startLoop: () => void;
  stopLoop: () => void;
}

const AppCtx = React.createContext<IAppContext>(null);

export const AppCtxProvider = ({children}) => {
  const [circles, dispatch] = React.useReducer(circlesReducer, [{...defaultCircle}]);
  const [looping, setLooping] = React.useState(false);
  const [loopInterval, setLoopInterval] = React.useState(null);

  React.useEffect( () => {
    if (looping) {
      dispatch({type: CirclesActionType.MOVE});
      requestAnimationFrame( setLoopInterval );
    }
  }, [looping, loopInterval]);

  const startLoop = () => {
    setLooping(true);
  }

  const stopLoop = () => {
    setLooping(false);
  }

  const defaultContext = {
    circles,
    dispatch,
    startLoop,
    stopLoop,
  };

  return (
    <AppCtx.Provider value={defaultContext}>
      {children}
    </AppCtx.Provider>
  )
}


export const useAppContext = () => React.useContext(AppCtx);