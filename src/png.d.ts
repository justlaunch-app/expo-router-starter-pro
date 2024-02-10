// This ensures that the TypeScript compiler knows how to handle .png files

declare module '*.png' {
  const content: string;
  export default content;
}
