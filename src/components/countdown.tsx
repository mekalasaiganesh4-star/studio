"use client";

import { useCountdown } from "@/hooks/use-countdown";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

type CountdownProps = {
  targetDate: string;
};

export function Countdown({ targetDate }: CountdownProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  if (isExpired) {
    return (
      <div className="flex items-center text-sm text-destructive font-medium">
        <Clock className="mr-2 h-4 w-4" />
        <span>Expired</span>
      </div>
    );
  }

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex items-center text-sm text-muted-foreground font-mono">
      <Clock className="mr-2 h-4 w-4" />
      <span>
        {days > 0 && `${format(days)}d `}
        {format(hours)}h {format(minutes)}m {format(seconds)}s
      </span>
    </div>
  );
}
