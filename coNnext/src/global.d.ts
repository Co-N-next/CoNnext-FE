// 프로젝트 전역 타입 선언
declare module "*.css";
declare module "*.scss";
declare module "*.png";
declare module "*.jpg";
declare module "*.svg";

interface ImportMetaEnv {
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  // 필요한 경우 추가 환경변수 타입을 여기에 선언하세요.
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
