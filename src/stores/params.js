import { readable } from 'svelte/store';
import { autoType } from 'd3';

const defaultParams = {
    data: 'data/data.json',
    data_translations: 'data/data_translations.json',
    data_place_combinations: 'data/data_place_combinations.json',
    title: '',
    subtitle: 'Zeiten aktiver Luftalarmsirenen im März und April 2022 in verschiedenen Städten der Ukraine',
    place: 'Charkiw',
    place_options: 'Kiew;Lwiw;Charkiw',
    min_day: 76,
    resolution_in_mins: 5,
    sources: 'Quelle: Volodymyr Agafonkin, Air Alert Ukraine Telegram-Kanal',
    debug: true
};

export const params = readable(defaultParams, set => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams);
    const completeParams = {
        ...defaultParams,
        ...autoType(params)
    };
    set(completeParams);
});