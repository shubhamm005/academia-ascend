import { useCounter } from "@/hooks/use-counter";

export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const v = useCounter(value);
  return <>{v.toLocaleString()}{suffix}</>;
}
