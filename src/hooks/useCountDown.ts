import { useState, useEffect, useRef } from "react";

export default function useCountDown(initCount: number = 60) {
  const timeRef = useRef<number | null>(null);
  const [count, setCount] = useState(initCount);

  const start = () => {
    setCount(initCount);
    timeRef.current = window.setInterval(() => setCount((c) => c - 1), 1000);
  };

  useEffect(() => {
    window.clearInterval(timeRef.current!);
    timeRef.current = null;
  }, []);

  useEffect(() => {
    if (count === 0) {
      window.clearInterval(timeRef.current!);
      timeRef.current = null;
    }
  }, [count]);
  return { count, start };
}
