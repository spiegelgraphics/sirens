<script>
    import { formatValue } from '../utils/format';

    export let scale;
    export let x0;
    export let y0;
    export let isReduced = false;

    const year = 2022;

    $: ticks = scale.ticks(isReduced ? 3 : 5);
</script>

<div class="day-labels">
    {#each ticks as tick}
        <div
            class="day-label"
            style="top: {y0 - scale(tick)}px; left: {x0}px;"
        >
            {formatValue(new Date(year, 0, tick), 'day-month')}
        </div>
    {/each}
</div>

<style>
    .day-labels {
        position: absolute;
        top: 0;
        left: 0;
    }

    .day-label {
        position: absolute;
        padding: 0 0.5rem;
        color: #fff;
        font-size: 1rem;
        white-space: nowrap;
        transform: translateX(-50%) translateY(-120%);
        border: none;
        border-radius: 1.5px;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
        opacity: 0.9;
    }
</style>