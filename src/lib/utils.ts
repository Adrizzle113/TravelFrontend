import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getNights = (checkin: string, checkout: string) => {
  const inDate = new Date(checkin);
  const outDate = new Date(checkout);
  const diff = outDate.getTime() - inDate.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const jsonToQueryString = <T extends object>(obj: T): string => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, String(v)));
    } else if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  }

  return `?${params.toString()}`;
};

export {jsonToQueryString}