<script>
    export let x0;
    export let y0;

    const label = '↑ Tag';
</script>

<div
    class="day-info-label"
    style="top: {y0}px; left: {x0}px;"
>
    {label}
</div>

<style>
    .day-info-label {
        position: absolute;
        color: #fff;
        font-size: 1rem;
        font-weight: bold;
        white-space: nowrap;
        transform: translateX(-50%) translateY(0);
    }
</style>