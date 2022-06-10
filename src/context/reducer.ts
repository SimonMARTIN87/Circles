import { getRandomCircle, ICircle } from "../interfaces/ICircle";

export enum CirclesActionType {
  ADD_CIRCLE = 'ADD_CIRCLE',
  REMOVE_CIRCLE = 'REMOVE_CIRCLE',
  UPDATE_CIRCLE = 'UPDATE_CIRCLE',
  UPDATE_CENTER = 'UPDATE_CENTER',
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
    default:
      return state;
    }
}