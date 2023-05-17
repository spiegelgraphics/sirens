import { derived } from 'svelte/store';
import { json, max } from 'd3';

import { params } from './params';

const hour = 1000 * 60 * 60;
const monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const getDayOfYear = (date) => {
    const month = +date.getMonth();
    const day = +date.getDate();

    const previousMonthDays = monthDays.slice(0, month).reduce((acc, cur) => acc + cur, 0);

    return previousMonthDays + day;
};

const formatTimeArray = (arr, resolutionInMins) => {
    const sortedArr = arr.sort();
    const result = [];
    for (let i = 0; i < sortedArr.length; i += 2) {
        const startMs = sortedArr[i] * 1000;
        const endMs = sortedArr[i + 1] * 1000;
        if ((endMs - startMs) / (1000 * 60) > resolutionInMins) {
            const period = [new Date(startMs + hour), new Date(endMs + hour)];
            const formattedPeriod = period.map(date => {
                const day = getDayOfYear(date);
                const dayProgress = date.getHours() + (date.getMinutes() / 60) + (date.getSeconds() / 3600);
                return {
                    timestamp: date,
                    day,
                    dayProgress,
                    totalProgress: day + (dayProgress / 24)
                };
            });
            result.push({start: formattedPeriod[0], end: formattedPeriod[1]});
        }
    }
    return result;
};

export const data = derived(params, async ($params, set) => {
    const translations = await json($params.data_translations);

    const rawData = await json($params.data);

    const data = Object.keys(rawData).map(key => {
        const place = translations[key] || key;
        const rawDatum = rawData[key]
        const data = formatTimeArray(rawDatum, $params.resolution_in_mins);
        return {
            place,
            key,
            data,
            raw: rawDatum
        };
    });

    set(data);
}, []);

export const maxDay = derived(data, $data => {
    return max($data.map(d => d.data.map(dd => [dd.start.day, dd.end.day])).flat(2));
})