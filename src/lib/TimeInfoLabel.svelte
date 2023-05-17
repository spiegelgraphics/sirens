<script>
    import { arc as d3arc } from 'd3';
  
    export let radius;

    $: labelObj = {
        startAngle: -Math.PI / 4,
        endAngle: Math.PI / 2,
        radius,
        label: 'Ortszeit →'
    };
  
    $: arc = d3arc()
      .startAngle(d => d.startAngle)
      .endAngle(d => d.endAngle)
      .innerRadius(d => d.radius)
      .outerRadius(d => d.radius);
  </script>

<g class="time-info-labels">
    <path
        id="time-info-label-path"
        d={arc(labelObj)}
        stroke="none"
        fill="none"
    />
    <text>
        <textPath
            xlink:href="#time-info-label-path"
            text-anchor="middle"
            startOffset="25%"
        >
            {labelObj.label}
        </textPath>
    </text>
</g>

<style>
    text {
        fill: #fff;
        font-size: 1rem;
        font-weight: bold;
        opacity: 0.9;
    }
</style>