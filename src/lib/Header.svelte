<script>
    export let title;
    export let subtitle;
</script>

<div class="header">
    {#if (title)}
        <h2>
            {title}
        </h2>
    {/if}
    {#if (subtitle)}
        <h3>
            {@html subtitle}
        </h3>
    {/if}
</div>

<style>
    .header {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        width: 100%;
        height: 100%;
        margin: 0.5rem 0;
    }

    h2 {
        margin: 0;
        color: #000;
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1.05;
        letter-spacing: 0;
        opacity: 1;
    }

    h3 {
        margin: 0;
        color: #fff;
        font-weight: 400;
        font-size: 1rem;
        text-align: left;
    }
</style>