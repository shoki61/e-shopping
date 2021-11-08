export const { innerWidth: width, innerHeight: height } = window;

export const w = (v: number) => (v * width) / 100;
export const h = (v: number) => (v * height) / 100;
