import { useCallback, useEffect, useMemo, useState } from "react";
import { ALL_ITEM_IDS, ROADMAP } from "../data/roadmap";
import { ProgressContext } from "./progressContext";

const STORAGE_KEY = "dtg:roadmap:v1";

function loadFromStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    // データ定義から消えた項目のチェックは読み捨てる
    return Object.fromEntries(
      Object.entries(parsed).filter(([id, done]) => done === true && ALL_ITEM_IDS.includes(id)),
    );
  } catch {
    return {};
  }
}

export default function ProgressProvider({ children }) {
  const [done, setDone] = useState(loadFromStorage);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
    } catch {
      // プライベートブラウジングなどで保存できない場合は、その回だけ諦める
    }
  }, [done]);

  const toggle = useCallback((itemId) => {
    setDone((prev) => {
      const next = { ...prev };
      if (next[itemId]) {
        delete next[itemId];
      } else {
        next[itemId] = true;
      }
      return next;
    });
  }, []);

  const isDone = useCallback((itemId) => done[itemId] === true, [done]);

  const categoryProgress = useCallback(
    (categoryId) => {
      const category = ROADMAP.find((c) => c.id === categoryId);
      if (!category) return { done: 0, total: 0, percent: 0 };
      const total = category.items.length;
      const count = category.items.filter((item) => done[item.id]).length;
      return {
        done: count,
        total,
        percent: total === 0 ? 0 : Math.round((count / total) * 100),
      };
    },
    [done],
  );

  const totalProgress = useMemo(() => {
    const total = ALL_ITEM_IDS.length;
    const count = ALL_ITEM_IDS.filter((id) => done[id]).length;
    return {
      done: count,
      total,
      percent: total === 0 ? 0 : Math.round((count / total) * 100),
    };
  }, [done]);

  const resetAll = useCallback(() => setDone({}), []);

  const value = useMemo(
    () => ({ isDone, toggle, categoryProgress, totalProgress, resetAll }),
    [isDone, toggle, categoryProgress, totalProgress, resetAll],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}
