export type TDisposable = () => void;

export interface IDisposable {
  disposes: TDisposable[];
  dispose(): void;
}