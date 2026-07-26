import { createContext, useContext } from "react";

export const ProgressContext = createContext(null);

// チェック状態を読み書きするためのフック。
// isDone / toggle / categoryProgress / totalProgress / resetAll が取り出せる。
export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress は ProgressProvider の内側で使ってください");
  }
  return context;
}
