<script>
    import { arc as d3arc } from 'd3';
  
    export let angleScale;
    export let innerRadius = 0;
    export let outerRadius = 0;
    export let isReduced = false;

    $: hours = isReduced ? [6, 12, 18] : Array.from({length: 23}).map((_, i) => i + 1);
  
    $: isTop = (d) => angleScale(d) > Math.PI / 2 && angleScale(d) < 1.5 * Math.PI;
  
    $: arc = d3arc()
      .startAngle(d => angleScale(d) - Math.PI / hours.length)
      .endAngle(d => angleScale(d) + Math.PI / hours.length)
      .innerRadius((d) => isTop(d) ? outerRadius : innerRadius)
      .outerRadius((d) => isTop(d) ? outerRadius : innerRadius);
  </script>

<g class="hour-labels">
    {#each hours as hour (hour)}
        <path
            id="hour-path-{hour}"
            d={arc(hour)}
            stroke="none"
            fill="none"
        />
        <text>
            <textPath
                xlink:href="#hour-path-{hour}"
                text-anchor="middle"
                startOffset="{isTop(hour) ? '7' : '2'}5%"
            >
                {hour + ([1, 6, 12, 18].includes(hour) ? ' Uhr' : '')}
            </textPath>
        </text>
    {/each}
</g>

<style>
    text {
        fill: #fff;
        font-size: 1rem;
        opacity: 0.9;
    }
</style>