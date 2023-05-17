import { readable, derived } from 'svelte/store';

export const isDarkMode = readable(false, set => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    set(prefersDarkMode.matches);
    const updateThemeOnChange = e => set(e.matches);
    prefersDarkMode.addListener(updateThemeOnChange);
});