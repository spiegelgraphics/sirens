<script>
    import { fade } from 'svelte/transition';
    import { areaRadial, curveBasis as curve } from 'd3';
  
    export let data;
    export let isBackground = false;

    $: area = areaRadial()
      .angle((d) => d.angle)
      .innerRadius((d) => d.innerRadius)
      .outerRadius((d) => d.outerRadius)
      .curve(curve);

    $: path = area(data);
</script>

{#key (data)}
    <g
        class="alarms"
        transition:fade
    >
        <path
            class:background={isBackground}
            d={path}
        />
    </g>
{/key}

<style>
    path {
        stroke: none;
        fill: red;
    }

    path.background {
        stroke: red;
        stroke-width: 1;
        stroke-opacity: 0.15;
        fill: none;
    }
</style>