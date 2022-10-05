import { useState, useRef } from "react";

export default function useStopwatch () {

  const [isRunning, setIsRunning] = useState(false);
  // hold date
  const dateRef = useRef<Date>();
  // time
  const timeRef = useRef<number>(0);

  const startStopwatch = () => {
    // create date
    console.log("starting");
    dateRef.current = new Date();
    setIsRunning(true);
  };

  const pauseStopwatch = () => {
    setIsRunning(false);
    timeRef.current = calculateElapsedTime();
  };

  const resetStopwatch = () => {
    console.log("resetting");
    setIsRunning(false);
    timeRef.current = calculateElapsedTime();
    dateRef.current = undefined;
  };

  const calculateElapsedTime = () => {

    if (typeof dateRef.current === "undefined") {
      return 0;
    }
    // get curr date
    const _now = new Date();
    const _prev = dateRef.current;
    // get diff
    return Math.floor((_now.getTime() - _prev.getTime()) / 1000);
  };

  return {
    isRunning,
    startStopwatch,
    pauseStopwatch,
    resetStopwatch,
    calculateElapsedTime
  };

};