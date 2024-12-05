import { 
  useState, useEffect, useRef,
  useMemo
} from "react";

interface ICountdownProps {
  minutes: number;
  seconds: number;
}

const getInitCountdownMs = (minutes: number, seconds: number) => {
  const initMin = minutes * 60 * 1000;
  const initSec = seconds * 1000;

  return initMin + initSec;
};

export default function useCountdownTimer (props? :ICountdownProps) {

  const minutes = props ? props.minutes : 0
  const seconds = props ? props.seconds : 0

  const [countdown, setCountdown] = useState<number>(getInitCountdownMs(minutes, seconds));
  const [hookState, setHookState] = useState({isStarted: false});
  const intervalRef = useRef<NodeJS.Timeout>();


  const getNextCountdownMs = () => {
    setCountdown(prevValue => {

      if (prevValue - 1000 <= 0) {
        setHookState(prev => ({...prev, isStarted: false}));
        return 0;
      }

      return prevValue - 1000;
    });
  };

  const resetCountdown = (timeInfo? :ICountdownProps) => {

    const newMin = timeInfo ? timeInfo.minutes : minutes;
    const newSec = timeInfo ? timeInfo.seconds : seconds;

    const _initMin = newMin * 60 * 1000;
    const _initSec = newSec * 1000;
    
    setCountdown(_initMin + _initSec);
    setHookState(prev => ({...prev, isStarted: true}));
  };

  const startCountdown = () => {
    setHookState(prev => ({...prev, isStarted: true}));
  };

  const stopCountdown = () => {
    setHookState(prev => ({...prev, isStarted: false}));
  };

  const countdownInSeconds = useMemo(() => {
    return Math.floor(countdown / 1000);
  }, [countdown]);

  useEffect(() => {
    if (hookState.isStarted) {
      intervalRef.current = setInterval(getNextCountdownMs, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [hookState.isStarted]);

  return {
    countdown,
    countdownInSeconds,
    startCountdown,
    stopCountdown,
    resetCountdown
  };
};