import { ArrowRight } from "./arrowRight";
import { Check } from "./check";
import { Close } from "./close";

export const icons = {
  arrowRight: ArrowRight,
  check: Check,
  close: Close,
} as const;

export type IconName = keyof typeof icons;
