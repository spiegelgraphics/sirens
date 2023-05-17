<script>
    import { scaleLinear } from 'd3';
    import { range } from 'lodash-es';

    import GridLines from './GridLines.svelte';
    import Line from './Line.svelte';
    import TimeInfoLabel from './TimeInfoLabel.svelte';
    import HourLabels from './HourLabels.svelte';
    import DayInfoLabel from './DayInfoLabel.svelte';
    import DayLabels from './DayLabels.svelte';

    export let data;
    export let minDay;
    export let maxDay;
    export let resolutionInMins;

    const padding = 16 * 2;

    let width;
    
    $: height = width;
    $: radiusOffset = width / 220;

    $: isReduced = width < 580;
    
    $: dayRange = [minDay, maxDay];

    $: angleScale = scaleLinear()
        .domain([0, 24])
        .range([0, 2 * Math.PI]);

    $: radiusScale = scaleLinear()
        .domain(dayRange)
        .range([width / 10, width / 2 - padding]);
    
    $: increment = 1 / (24 * 60 / resolutionInMins);
    $: spiral = range(dayRange[0], dayRange[1], increment).map(progress => {
        return {
            angle: angleScale((progress % 1) * 24),
            innerRadius: radiusScale(progress) || 0,
            outerRadius: radiusScale(progress) || 0
        };
    });

    $: renderedData = range(dayRange[0], dayRange[1], increment).map(progress => {
        const datum = data.find(d => d.start.totalProgress <= progress && d.end.totalProgress >= progress);
        const offset = datum ? radiusOffset : 0;
        return {
            angle: angleScale((progress % 1) * 24),
            innerRadius: radiusScale(progress) - offset || 0,
            outerRadius: radiusScale(progress) + offset || 0
        };
    });
</script>

<div
    class="spiral"
    bind:clientWidth={width}
    style:height="{height}px"
>
    <svg
        width={width}
        height={height}
    >
        <g transform="translate({(width || 0) / 2} {(height || 0) / 2})">
            <GridLines
                angleScale={angleScale}
                innerRadius={width / 10}
                outerRadius={width / 2 - padding}
            />
            <Line
                data={spiral}
                isBackground
            />
            <Line
                data={renderedData}
            />
            <TimeInfoLabel
                radius={radiusScale.range()[1] + (isReduced ? padding / 2 : padding)}
            />
            <HourLabels
                angleScale={angleScale}
                innerRadius={radiusScale.range()[1] + padding / 4}
                outerRadius={radiusScale.range()[1] + padding * 0.8}
                isReduced={isReduced}
            />
        </g>
    </svg>
    <div class="html-wrapper">
        <DayInfoLabel
            x0={width / 2}
            y0={height / 2 - radiusScale.range()[0] + (isReduced ? padding / 2 : padding)}
        />
        <DayLabels
            scale={radiusScale}
            x0={width / 2}
            y0={height / 2}
            isReduced={isReduced}
        />
    </div>
</div>

<style>
    .spiral {
        position: relative;
        width: 100%;
        overflow: hidden;
    }

    svg {
        position: relative;
    }

    .html-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
    }
</style>