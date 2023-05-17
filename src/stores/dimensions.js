import { writable, readable } from 'svelte/store';

export const width = writable(0);
export const height = writable(0);

export const isMobile = readable(false, set => {
    set(('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
});