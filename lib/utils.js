import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(word) {
    if (!word) {
        return word;
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
}
