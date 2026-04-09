<script>

  import { onMount } from 'svelte';
  import MITHLogoBlk from '../assets/images/MITH-logostack-blk.svg?url';

  let dialog;
  let pagefind;
  let query = '';
  let results = [];
  let resultCount = '';
  let isLoading = false;

  onMount(async () => {
    await initPageFind();
  });

  async function initPageFind() {
    if (pagefind) return;
    const pagefindPath = '/pagefind/pagefind.js';
    pagefind = await import(/* @vite-ignore */ pagefindPath);
    await pagefind.options({ showImages: false });
  }

  async function handleInput() {
    // Fix: guard against empty string so results don't flash on backspace-to-empty
    if (!query.trim()) {
      results = [];
      resultCount = '';
      return;
    }

    isLoading = true;
    await initPageFind();

    const search = await pagefind.search(query);

    if (search.results.length === 0) {
      results = [];
      resultCount = 'No results';
      isLoading = false;
      return;
    }

    const data = await Promise.all(search.results.map(r => r.data()));
    results = data;
    resultCount = `${data.length} result${data.length === 1 ? '' : 's'}`;
    isLoading = false;
  }

  function openModal() {
    dialog.showModal();
  }

  function closeOnBackdrop(e) {
    if (e.target === dialog) {
      dialog.close();
    }
  }

  $: isEmpty = !query.trim();
</script>

<!-- Trigger button -->
<button
  class="h-16 flex items-center btn btn-ghost hover:border-transparent hover:bg-transparent hover:shadow-none"
  on:click={openModal}
  aria-label="Search this site"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
</button>

<!-- Modal -->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  class="modal"
  on:click={closeOnBackdrop}
>
  <div class="modal-box cursor-default relative max-w-4xl p-0 max-md:h-[85vh] md:mt-[10vh] md:h-[clamp(13rem,80vh,80vh)] md:w-11/12">
    <div
      class="rounded-box h-full overflow-y-auto [scrollbar-width:thin]"
      style="scroll-padding-top: 3.5rem;"
    >

      <!-- Search input -->
      <span class="input input-lg 2xl:input-xl bg-base-100 border-base-300 sticky top-0 z-1 mb-2 w-full rounded-none border-0 border-b shadow-none focus-within:shadow-none focus-within:outline-none 2xl:px-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input
          type="text"
          autocomplete="off"
          placeholder="Type to search..."
          bind:value={query}
          on:input={handleInput}
        />
        {#if resultCount}
          <span class="badge badge-xs">{resultCount}</span>
        {/if}
      </span>

      <!-- Results container -->
      <div class="p-4">

        <!-- Empty state: logo shown only when query is blank -->
        {#if isEmpty}
          <div class="flex items-center justify-center min-h-[50vh]">
            <img src={MITHLogoBlk} alt="MITH logo" class="w-50" loading="lazy" />
          </div>

        <!-- Loading -->
        {:else if isLoading}
          <div class="flex items-center justify-center min-h-[50vh]">
            <span class="loading loading-spinner loading-md text-base-content/40"></span>
          </div>

        <!-- No results -->
        {:else if results.length === 0}
          <p class="text-base-content/60">No results found</p>

        <!-- Results list -->
        {:else}
          {#each results as result}
            <div class="mb-4 p-3 hover:bg-base-200 rounded-lg cursor-pointer">
              <a href={result.url} class="block">
                <h3 class="font-bold text-lg">{result.meta.title || 'Untitled'}</h3>
                <p class="text-sm text-base-content/70 mt-1">{@html result.excerpt}</p>
              </a>
            </div>
          {/each}
        {/if}

      </div>
    </div>
  </div>

  <!-- Backdrop close -->
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>