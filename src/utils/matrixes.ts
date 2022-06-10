
export const multMatrix = (mat: number[], alpha: number) => mat.map(x => x * alpha);
export const addMatrix = (mat1: number[], mat2: number[]) => mat1.map((x, i) => x + mat2[i]);
export const getRotMatrix = (angle: number) => [Math.cos(angle), Math.sin(angle)];