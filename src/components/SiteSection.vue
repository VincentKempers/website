<script setup>
defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
})
</script>

<template>
  <section :id="id" class="section" :aria-labelledby="`${id}-title`">
    <h2 :id="`${id}-title`" class="section-title">
      <span aria-hidden="true">// </span>{{ title }}
    </h2>
    <slot />
  </section>
</template>

<style scoped>
.section {
  margin-top: 4rem;
}

.section-title {
  margin: 0 0 1.25rem;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: var(--muted);
}
</style>
