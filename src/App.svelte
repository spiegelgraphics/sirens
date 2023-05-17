<script>
  import { maxDay, data } from './stores/data';
  import { selectedPlaceName, selectedPlaces } from './stores/places';
  import { params } from './stores/params';

  import Header from './lib/Header.svelte';
  import Selector from './lib/Selector.svelte';
  import Spiral from './lib/Spiral.svelte';
  import Footer from './lib/Footer.svelte';

  $: placeOptionNames = $params.place_options.split(';');
  $: selectedPlaceName.set($params.place);
  $: placeData = $data.filter(d => $selectedPlaces.includes(d.place)).map(d => d.data).flat();
</script>

<div
  class="content"
>
  <Header
      title={$params.title}
      subtitle={$params.subtitle}
  />
  {#if (placeOptionNames.length > 1)}
      <Selector
          options={placeOptionNames}
          bind:selectedOption={$selectedPlaceName}
      />
  {/if}
  <Spiral
      data={placeData}
      minDay={$params.min_day}
      maxDay={$maxDay}
      resolutionInMins={$params.resolution_in_mins}
  />
  <Footer
      sources={$params.sources}
  />
</div>

<style>
  .content {
      display: flex;
      flex-direction: column;
      background-color: #000;
  }
</style>