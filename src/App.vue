<script setup>
import SiteSection from './components/SiteSection.vue'
import LinkRow from './components/LinkRow.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import { profile, experience, stack, projects, writing, contact } from './content.js'

const year = new Date().getFullYear()
</script>

<template>
  <div class="page">
    <header class="hero">
      <div class="hero-top">
        <img class="avatar" :src="profile.avatar" :alt="profile.name" width="64" height="64" />
        <ThemeToggle />
      </div>
      <h1 class="name">{{ profile.name }}</h1>
      <p class="role">
        {{ profile.role }}
        <span class="muted">· previously {{ profile.previously }}</span>
      </p>
      <p class="location">{{ profile.location }}</p>
    </header>

    <main>
      <SiteSection id="about" title="about">
        <p v-for="(paragraph, i) in profile.intro" :key="i" class="prose">{{ paragraph }}</p>
      </SiteSection>

      <SiteSection id="experience" title="experience">
        <ul class="list">
          <LinkRow
            v-for="job in experience"
            :key="job.period + job.role"
            :title="`${job.role} · ${job.company}`"
            :url="job.url"
            :description="job.description"
          >
            <template #aside>{{ job.period }}</template>
          </LinkRow>
        </ul>
      </SiteSection>

      <SiteSection id="stack" title="stack">
        <ul class="tags">
          <li v-for="item in stack" :key="item">{{ item }}</li>
        </ul>
      </SiteSection>

      <SiteSection id="projects" title="projects">
        <ul class="list">
          <LinkRow
            v-for="project in projects"
            :key="project.title"
            :title="project.title"
            :url="project.url"
            :description="project.description"
            :meta="project.tags.join(' · ')"
          />
        </ul>
      </SiteSection>

      <SiteSection id="writing" title="writing">
        <ul class="list">
          <LinkRow v-for="post in writing" :key="post.url" :title="post.title" :url="post.url" />
        </ul>
      </SiteSection>

      <SiteSection id="contact" title="contact">
        <p class="prose">
          Want to chat about support, front-end or anything in between? Send me an email at
          <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>.
        </p>
        <ul class="links">
          <li v-for="link in contact.links" :key="link.url">
            <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }} ↗</a>
          </li>
        </ul>
      </SiteSection>
    </main>

    <footer class="footer">
      <span>© {{ year }} {{ profile.name }}</span>
      <span>Built with Vue</span>
    </footer>
  </div>
</template>

<style scoped>
.page {
  max-width: 40rem;
  margin: 0 auto;
  padding: clamp(3rem, 10vw, 6rem) 1.5rem 3rem;
  animation: fade-in 0.6s ease both;
}

.hero-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 999px;
  object-fit: cover;
  filter: grayscale(1);
  transition: filter 0.3s;
}

.avatar:hover {
  filter: none;
}

.name {
  margin: 0;
  font-size: clamp(1.75rem, 5vw, 2.25rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.role {
  margin: 0.5rem 0 0;
  font-size: 1.0625rem;
}

.location {
  margin: 0.25rem 0 0;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--muted);
}

.muted {
  color: var(--muted);
}

.prose {
  margin: 0 0 1rem;
  max-width: 36rem;
}

.list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.tags,
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tags li {
  padding: 0.25rem 0.625rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--muted);
}

.links {
  gap: 1.25rem;
  margin-top: 0.5rem;
}

.footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--muted);
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
}
</style>
