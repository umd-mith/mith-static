<script lang="ts">
  type Topic = { topic: string };
  type Method = { name: string };
  type Discipline = { name: string };
  type ResearchType = { "research type": string };

  type Project = {
    slug: string;
    title: string;
    subtitle?: string;
    "year start": number;
    "year end"?: number;
    excerpt?: string;
    image?: string;
    alt?: string;
    topics?: Topic[];
    methods?: Method[];
    disciplines?: Discipline[];
    "research types"?: ResearchType[];
  };

  export let projects: Project[] = [];
  export let placeholderHtml: string = "";

  // --- Derive all unique facet values from the full project list ---
  function unique(arr: string[]): string[] {
    return [...new Set(arr)].sort();
  }

  $: allTopics = unique(
    projects.flatMap((p) => (p.topics ?? []).map((t) => t.topic))
  );
  $: allMethods = unique(
    projects.flatMap((p) => (p.methods ?? []).map((m) => m.name))
  );
  $: allDisciplines = unique(
    projects.flatMap((p) => (p.disciplines ?? []).map((d) => d.name))
  );
  $: allResearchTypes = unique(
    projects.flatMap((p) =>
      (p["research types"] ?? []).map((r) => r["research type"])
    )
  );

  // --- Filter state ---
  let searchQuery = "";
  let selectedTopics: Set<string> = new Set();
  let selectedMethods: Set<string> = new Set();
  let selectedDisciplines: Set<string> = new Set();
  let selectedResearchTypes: Set<string> = new Set();

  function toggle(set: Set<string>, value: string): Set<string> {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    return next;
  }

  function clearAll() {
    searchQuery = "";
    selectedTopics = new Set();
    selectedMethods = new Set();
    selectedDisciplines = new Set();
    selectedResearchTypes = new Set();
  }

  $: hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedTopics.size > 0 ||
    selectedMethods.size > 0 ||
    selectedDisciplines.size > 0 ||
    selectedResearchTypes.size > 0;

  // --- Filtered results ---
  $: filtered = projects.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    if (q && !p.title.toLowerCase().includes(q)) return false;

    if (
      selectedTopics.size > 0 &&
      !(p.topics ?? []).some((t) => selectedTopics.has(t.topic))
    )
      return false;

    if (
      selectedMethods.size > 0 &&
      !(p.methods ?? []).some((m) => selectedMethods.has(m.name))
    )
      return false;

    if (
      selectedDisciplines.size > 0 &&
      !(p.disciplines ?? []).some((d) => selectedDisciplines.has(d.name))
    )
      return false;

    if (
      selectedResearchTypes.size > 0 &&
      !(p["research types"] ?? []).some((r) =>
        selectedResearchTypes.has(r["research type"])
      )
    )
      return false;

    return true;
  });
</script>

<div>
  <div class="collapse collapse-arrow border">
    <input type="checkbox" aria-label="Toggle filter options"/>
    <div class="collapse-title font-semibold">Filter Projects</div>
    <div class="collapse-content">
      <!-- Search bar -->
      <label class="input w-full">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search" placeholder="Search by title" id="research-search" bind:value={searchQuery}/>
      </label>

      <div>
  
      <!-- Facet: Topics -->
      {#if allTopics.length > 0}
        <div class="collapse collapse-arrow">
          <input type="checkbox" aria-label="Toggle topics filter" />
          <div class="collapse-title font-semibold">Topics</div>
          <div class="collapse-content flex flex-wrap gap-2">
            {#each allTopics as topic}
              <label
                class="badge badge-lg gap-2 cursor-pointer text-base-content"
                class:badge-accent={selectedTopics.has(topic)}
                class:badge-outline={!selectedTopics.has(topic)}
              >
                <input
                  type="checkbox"
                  class="checkbox checkbox-sm"
                  checked={selectedTopics.has(topic)}
                  on:change={() => (selectedTopics = toggle(selectedTopics, topic))}
                />
                {topic}
              </label>
            {/each}
          </div>
        </div>
      {/if}
  
      <!-- Facet: Methods -->
      {#if allMethods.length > 0}
        <div class="collapse collapse-arrow">
          <input type="checkbox" aria-label="Toggle methods filter"/>
          <div class="collapse-title font-semibold">Methods</div>
          <div class="collapse-content flex flex-wrap gap-2">
            {#each allMethods as method}
              <label
                class="badge badge-lg gap-2 cursor-pointer text-base-content"
                class:badge-accent={selectedMethods.has(method)}
                class:badge-outline={!selectedMethods.has(method)}
              >
                <input
                  type="checkbox"
                  class="checkbox checkbox-sm"
                  checked={selectedMethods.has(method)}
                  on:change={() => (selectedMethods = toggle(selectedMethods, method))}
                />
                {method}
              </label>
            {/each}
          </div>
        </div>
      {/if}
  
      <!-- Facet: Disciplines -->
      {#if allDisciplines.length > 0}
        <div class="collapse collapse-arrow">
          <input type="checkbox" aria-label="Toggle disciplines filter" />
          <div class="collapse-title font-semibold">Disciplines</div>
          <div class="collapse-content flex flex-wrap gap-2">
            {#each allDisciplines as discipline}
              <label
                class="badge badge-lg gap-2 cursor-pointer text-base-content"
                class:badge-accent={selectedDisciplines.has(discipline)}
                class:badge-outline={!selectedDisciplines.has(discipline)}
              >
                <input
                  type="checkbox"
                  class="checkbox checkbox-sm"
                  checked={selectedDisciplines.has(discipline)}
                  on:change={() => (selectedDisciplines = toggle(selectedDisciplines, discipline))}
                />
                {discipline}
              </label>
            {/each}
          </div>
        </div>
      {/if}
  
      <!-- Facet: Research Types -->
      {#if allResearchTypes.length > 0}
        <div class="collapse collapse-arrow">
          <input type="checkbox" aria-label="Toggle research types filter"/>
          <div class="collapse-title font-semibold">Research Types</div>
          <div class="collapse-content flex flex-wrap gap-2">
            {#each allResearchTypes as researchType}
              <label
                class="badge badge-lg gap-2 cursor-pointer text-base-content"
                class:badge-accent={selectedResearchTypes.has(researchType)}
                class:badge-outline={!selectedResearchTypes.has(researchType)}
              >
                <input
                  type="checkbox"
                  class="checkbox checkbox-sm"
                  checked={selectedResearchTypes.has(researchType)}
                  on:change={() => (selectedResearchTypes = toggle(selectedResearchTypes, researchType))}
                />
                {researchType}
              </label>
            {/each}
          </div>
        </div>
      {/if}
  
      {#if hasActiveFilters}
        <button type="button" class="btn btn-ghost btn-sm" on:click={clearAll}>
          Clear all filters
        </button>
      {/if}
    </div>
    </div>
  </div>
  <!-- Result count -->
  <p class="text-sm">
    {filtered.length}
    {filtered.length === 1 ? "project" : "projects"} shown
    {#if hasActiveFilters}(filtered from {projects.length} total){/if}
  </p>

  <!-- Cards grid -->
  {#if filtered.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
      {#each filtered as project (project.slug)}
        <div class="card bg-base-100 w-full shadow-sm">
          {#if project.image}
            <figure class="h-80">
              <a href={`/archive/${project.slug}`} aria-hidden="true" tabindex="-1">
                <img src={project.image} alt={project.alt} loading="eager" class="w-full h-full object-contain"/>
              </a>
            </figure>
          {:else}
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html placeholderHtml}
          {/if}
          <div class="card-body">
            <h3 class="card-title"><a href={`/archive/${project.slug}`}>{project.title}</a></h3>
            {#if project.subtitle}
              <h4>{project.subtitle}</h4>
            {/if}
            <p>{project['year start']}{project['year end'] && ` – ${project['year end']}`}</p>
            {#if project.excerpt}
              <!-- eslint-disable-next-line svelte/no-at-html-tags -->
              {@html project.excerpt}
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p>No projects match your filters.</p>
  {/if}
</div>