import { useEffect, useState } from 'react';

const useCountdown = (dDay: Date) => {
  const calculateTimeRest = () => {
    const now = new Date().getTime();
    const difference = dDay.getTime() - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeRest());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeRest());
    }, 1000);

    return () => clearInterval(interval);
  }, [dDay]);

  return timeLeft;
};

export default useCountdown;
