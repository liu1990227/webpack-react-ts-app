declare module '*.scss' {
  const content: { [selector: string]: string };
  export default content;
}

declare module '*.svg' {
  const content: any;
  export default content;
}
