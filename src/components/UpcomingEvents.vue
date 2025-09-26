<script setup>
import { RouterLink } from 'vue-router'

const events = [
  {
    tag: 'Compétition',
    title: 'Jour 1 Phase 1 - Adulte',
    date: '21 septembre 2025',
    description: "Première journée de compétition adulte de la Phase 1",
    location: 'Complexe Sportif Leo Lagrange, 32 Rue André Pantigny, 62820 Libercourt',
    status: 'Inscriptions fermées'
  },
  {
    tag: 'Compétition',
    title: 'Jour 1 Phase 1 - Junior',
    date: '27 septembre 2025',
    description: 'Première journée de compétition junior de la Phase 1',
    location: 'Complexe Sportif Leo Lagrange, 32 Rue André Pantigny, 62820 Libercourt',
    status: 'Inscriptions fermées'
  },
  {
    tag: 'Compétition',
    title: 'Jour 2 Phase 1 - Adulte',
    date: '28 septembre 2025',
    description: 'Deuxième journée de compétition adulte de la Phase 1',
    location: 'Complexe Sportif Leo Lagrange, 32 Rue André Pantigny, 62820 Libercourt',
    status: 'Inscriptions fermées'
  }
]
</script>

<template>
  <section class="relative bg-white border border-gray-200 pt-12 pb-8 sm:pt-16 sm:pb-12 lg:pt-24 lg:pb-24" data-aos="fade-up">

    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-10 sm:mb-14 lg:mb-20 text-center sm:text-left">
        <div class="mx-auto sm:mx-0 max-w-2xl">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-rose-600 mb-4 text-shadow-sm">Prochains Événements</h2>
          <p class="mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-700 leading-7 sm:leading-7 md:leading-8">Restez informé des compétitions et temps forts du club.</p>
        </div>
        <RouterLink
          to="/calendrier"
          class="btn rounded-md border border-blue-600 px-3 py-1 sm:px-4 sm:py-2 text-blue-600 hover:bg-blue-100 transition w-full sm:w-auto text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:opacity-90"
        >
          Voir tout le calendrier
        </RouterLink>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(e, idx) in events"
          :key="idx"
          class="card h-full overflow-hidden transition duration-200 group border border-white/15 bg-white/8 backdrop-blur-md sm:hover:-translate-y-1 sm:hover:shadow-2xl sm:hover:ring-1 sm:hover:ring-white/15 hover:bg-green-50 active:translate-y-0.5"
        >
          <div class="p-4 sm:p-6">
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs text-blue-800 border-blue-300 bg-blue-100">{{ e.tag }}</span>
              <span class="text-xs sm:text-sm text-gray-500">{{ e.date }}</span>
            </div>
            <h3 class="mt-3 text-lg sm:text-xl font-semibold text-gray-800">{{ e.title }}</h3>
            <p class="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">{{ e.description }}</p>
            <p class="mt-3 text-xs sm:text-sm text-gray-500">{{ e.location }}</p>
            <p class="mt-2 text-xs sm:text-sm text-red-600">{{ e.status }}</p>
          </div>
          <div class="h-1 bg-gradient-to-r from-[var(--accent)] via-[var(--gold)] to-[var(--primary)] opacity-80 group-hover:opacity-100"></div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>

