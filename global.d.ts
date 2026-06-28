declare module "pdfjs-dist/legacy/build/pdf" {
  const pdfjs: any;
  export = pdfjs;
}

declare module "pdfjs-dist/legacy/build/pdf.worker?url" {
  const url: string;
  export default url;
}