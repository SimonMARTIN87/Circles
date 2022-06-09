export enum GrowStyle {
  "reset" = "reset",
  "decrease" = "decrease",
};

export interface ICircle {
  radius: number;
  color: number;
  centerX: number;
  centerY: number;
  startAngle: number;
  rotationAngle: number;
  width: number;
  moveStep: number;
  growStep: number;
  growStyle: GrowStyle;
}

const getRandomFloat = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
}

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(getRandomFloat(min, max));
}

export const getRandomCircle = (): ICircle => {
  return {
    radius: getRandomInt(0, 100),
    color: getRandomInt(0, 16777215),
    centerX: 100,
    centerY: 100,
    startAngle: getRandomInt(0, Math.PI * 2),
    rotationAngle: getRandomInt(0, Math.PI * 1.3),
    width: getRandomInt(1, 10),
    moveStep: getRandomFloat(-.25, .25),
    growStep: getRandomFloat(-.25, .25),
    growStyle: Math.random() > .5 ? GrowStyle.reset : GrowStyle.decrease,
  }
}
