<script setup>
// A single row in a list: title (optionally linked), description and meta text.
defineProps({
  title: { type: String, required: true },
  url: { type: String, default: '' },
  description: { type: String, default: '' },
  meta: { type: String, default: '' },
})
</script>

<template>
  <li class="row">
    <component
      :is="url ? 'a' : 'div'"
      class="row-inner"
      :href="url || undefined"
      :target="url ? '_blank' : undefined"
      :rel="url ? 'noopener noreferrer' : undefined"
    >
      <span v-if="$slots.aside" class="row-aside"><slot name="aside" /></span>
      <span class="row-body">
        <span class="row-title">
          {{ title }}
          <span v-if="url" class="arrow" aria-hidden="true">↗</span>
        </span>
        <span v-if="description" class="row-description">{{ description }}</span>
        <span v-if="meta" class="row-meta">{{ meta }}</span>
      </span>
    </component>
  </li>
</template>

<style scoped>
.row + .row {
  border-top: 1px solid var(--border);
}

.row-inner {
  display: flex;
  gap: 1.5rem;
  padding: 1rem 0;
  color: inherit;
  text-decoration: none;
}

.row-aside {
  flex: 0 0 7.5rem;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--muted);
  padding-top: 0.125rem;
}

.row-body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.row-title {
  font-weight: 500;
}

.arrow {
  display: inline-block;
  margin-left: 0.125rem;
  color: var(--muted);
  transition: transform 0.2s ease, color 0.2s;
}

a.row-inner:hover .arrow,
a.row-inner:focus-visible .arrow {
  color: var(--accent);
  transform: translate(2px, -2px);
}

a.row-inner:hover .row-title {
  color: var(--accent);
}

.row-description {
  color: var(--muted);
}

.row-meta {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--muted);
}

@media (max-width: 560px) {
  .row-inner {
    flex-direction: column;
    gap: 0.25rem;
  }

  .row-aside {
    flex-basis: auto;
  }
}
</style>
