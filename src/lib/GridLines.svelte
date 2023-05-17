<script>
    import { polarToCartesian } from '../utils/math';
  
    export let angleScale;
    export let innerRadius = 0;
    export let outerRadius = 0;
    export let isReduced = false;

    $: lines = isReduced ? [0, 6, 12, 18] : Array.from({length: 24}).map((_, i) => i);
  
    $: renderedLines = lines.map((d, i) => {
        const angle = angleScale(d);
        const { x: x1, y: y1 } = polarToCartesian(0, 0, innerRadius, angle);
        const { x: x2, y: y2 } = polarToCartesian(0, 0, outerRadius, angle);
        return {
            id: i,
            x1, y1,
            x2, y2
        };  
    });
  </script>

<g class="grid-lines">
    {#each renderedLines as { id, x1, y1, x2, y2 } (id)}
        <line
            x1={x1 || 0}
            y1={y1 || 0}
            x2={x2 || 0}
            y2={y2 || 0}
        />
    {/each}
</g>

<style>
    line {
        stroke: #aaa;
        stroke-width: 2;
        stroke-linecap: round;
        opacity: 0.2;
    }
</style>