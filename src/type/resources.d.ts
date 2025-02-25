declare module '@resources' {
  interface ResourceMap {
    img: {
      [key: string]: string;
    };
    svg: {
      [key: string]: string;
    };
    lotties: {
      [key: string]: any;
    };
  }

  const R: ResourceMap;
  export default R;
}
