import { getRandomCircle, GrowStyle, ICircle } from "../interfaces/ICircle";

export enum CirclesActionType {
  ADD_CIRCLE = 'ADD_CIRCLE',
  REMOVE_CIRCLE = 'REMOVE_CIRCLE',
  UPDATE_CIRCLE = 'UPDATE_CIRCLE',
  UPDATE_CENTER = 'UPDATE_CENTER',
  MOVE = 'MOVE',
}

export interface CirclesAction {
  type: CirclesActionType;
  payload?: any;
}

export const circlesReducer = (state: ICircle[] = [], action: CirclesAction): ICircle[] => {
  switch (action.type) {
    case CirclesActionType.ADD_CIRCLE:
      const newCircle = getRandomCircle();
      newCircle.centerX = state[0].centerX;
      newCircle.centerY = state[0].centerY;
      return [...state, newCircle];
    case CirclesActionType.REMOVE_CIRCLE:
      console.log('NOT IMPLEMENTED');
      return state;
    case CirclesActionType.UPDATE_CIRCLE:
      return state.map((circle: ICircle, index: number) => { 
        if (index === action.payload.index) {
          return { ...circle, ...action.payload };
        }
        return circle;
      });
    case CirclesActionType.UPDATE_CENTER:
      return state.map((circle: ICircle) => {
        return { ...circle, centerX: action.payload.x, centerY: action.payload.y };
      });
    case CirclesActionType.MOVE:
      return state.map((circle: ICircle) => {
        circle.startAngle += circle.moveStep;
        circle.startAngle = circle.startAngle % (Math.PI*2);

        circle.rotationAngle += circle.growStep;
        
        
        if (circle.growStyle == GrowStyle.reset) {
          // reset
          circle.rotationAngle = circle.rotationAngle % (Math.PI*2);
          if (circle.rotationAngle < 0) {
            circle.rotationAngle += Math.PI*2;
          }
        } else {
          // decrease
          if (circle.rotationAngle > Math.PI*2 || circle.rotationAngle < 0) {
            circle.rotationAngle = Math.min(Math.PI*2-0.00001, Math.max(0, circle.rotationAngle));
            circle.moveStep += circle.growStep;
            circle.growStep *= -1;
          }
        }
        return circle;
      });
    default:
      return state;
    }
}