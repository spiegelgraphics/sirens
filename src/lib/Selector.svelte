<script>
    export let selectedOption;
    export let options;

    function handleClick(id) {
        selectedOption = id;
    }
</script>

<ul class="selector">
    {#each options as id (id)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
            class:active={selectedOption && selectedOption === id}
            on:click={() => handleClick(id)}
        >
            <span>
                {id}
            </span>
        </li>
    {/each}
</ul>

<style>
    .selector {
        display: flex;
        justify-content: center;
        margin: 0;
        padding: 0;
        color: #ccc;
        font-size: 1rem;
        list-style-type: none;
    }

    li {
        padding: 0 0.75rem 0.375rem 0.75rem;
        text-align: center;
        border-bottom: 1px solid;
        border-color: #ccc;
        cursor: pointer;
        box-sizing: border-box;
        user-select: none;
    }

    li.active {
        color: #fff;
        border-bottom: 2px solid;
        border-color: #fff;
    }

    li:hover:not(.active) {
        color: #ccc;
        border-color: #ccc;
    }
</style>