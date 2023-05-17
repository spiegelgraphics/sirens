import { writable, derived } from 'svelte/store';
import { json } from 'd3';

import { params } from './params';

export const selectedPlaceName = writable();

export const placeCombinations = derived(params, async ($params, set) => {
    const data = await json($params.data_place_combinations);
    set(data);
}, []);

export const selectedPlaces = derived([selectedPlaceName, placeCombinations], ([$selectedPlaceName, $placeCombinations]) => {
    const { places = [] } = $placeCombinations.find(d => d.name === $selectedPlaceName) || {};
    return places;
});