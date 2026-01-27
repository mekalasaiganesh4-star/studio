"use client";

import { useState, useEffect, useMemo } from 'react';

export const useCountdown = (targetDate: string) => {
  const countDownDate = useMemo(() => new Date(targetDate).getTime(), [targetDate]);

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    // This effect runs only on the client
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);
  
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])


  if (!isClient) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  if (countDown < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isExpired: false };
};
