<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
const activities = [
  {
    icon: '🎓',
    title: "École de Tennis de Table",
    description:
      "Pour les tout petits. Coordination main-œil, service, règles et coups de base. Initiation ludique et pédagogique.",
    tag: 'Tout petits',
  },
  {
    icon: '🏓',
    title: 'Entraînement Jeunes',
    description:
      "Suite logique de l'école jusqu'à Cadet 2. Perfectionnement technique et tactique.",
    tag: "Jusqu'à Cadet 2",
  },
  {
    icon: '🤝',
    title: 'Tennis de Table Loisir',
    description:
      'Pratique conviviale pour tous. Ambiance détendue, plaisir de jouer, tous niveaux confondus.',
    tag: 'Tous âges',
  },
  {
    icon: '⭐',
    title: 'Compétition',
    description:
      'Équipes engagées en championnat départemental et régional. Pour joueurs motivés par la performance.',
    tag: 'Tous niveaux',
  },
  {
    icon: '💚',
    title: 'Ping Santé',
    description:
      "Découvrir le sport ou conserver une activité physique. Adapté aux seniors et reprise d'activité.",
    tag: 'Seniors',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Famille & Découverte',
    description:
      'Séances ouvertes pour découvrir le club en famille et entre amis.',
    tag: 'Découverte',
  },
]

// Palette issue de la navbar (accent, gold, primary).
// On alterne ces accents sur les cartes pour rythmer visuellement la grille.
const accents = [
  {
    bg: 'bg-blue-100',
    ring: 'border-blue-300',
    grad: 'from-blue-500 via-blue-400 to-blue-500',
    chip: 'bg-blue-100 border-blue-300 text-blue-800',
  },
  {
    bg: 'bg-green-100',
    ring: 'border-green-300',
    grad: 'from-green-500 via-green-400 to-green-500',
    chip: 'bg-green-100 border-green-300 text-green-800',
  },
  {
    bg: 'bg-yellow-100',
    ring: 'border-yellow-300',
    grad: 'from-yellow-500 via-yellow-400 to-yellow-500',
    chip: 'bg-yellow-100 border-yellow-300 text-yellow-800',
  },
]

// Animation d'apparition progressive
const sectionRef = ref(null)
const revealed = ref(Array.from({ length: activities.length }, () => false))

onMounted(() => {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealed.value = revealed.value.map(() => true)
    return
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const idx = Number(entry.target.getAttribute('data-idx') || '0')
        revealed.value[idx] = true
        observer.unobserve(entry.target)
      }
    }
  }, { threshold: 0.25, rootMargin: '0px 0px -10% 0px' })

  const cards = sectionRef.value?.querySelectorAll('.activity-card') || []
  cards.forEach((el) => observer.observe(el))

  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <section ref="sectionRef" class="relative bg-white border border-gray-200 py-12 sm:py-16 lg:py-24 overflow-hidden">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 sm:mb-16 lg:mb-20">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-rose-600 mb-4 text-shadow-sm">Nos Activités</h2>
        <div class="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-[var(--primary)] via-[var(--gold)] to-[var(--accent)] opacity-80"></div>
        <p class="mt-4 max-w-2xl mx-auto text-gray-700 text-base sm:text-lg md:text-xl leading-7 sm:leading-7 md:leading-8">
          Du loisir à la compétition, découvrez des activités adaptées à chaque âge et niveau.
        </p>
      </div>

      <div class="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(a, idx) in activities"
          :key="idx"
          class="activity-card card group h-full overflow-hidden transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xl focus-within:-translate-y-0.5 will-change-transform"
          :data-idx="idx"
          :style="{ transitionDelay: revealed[idx] ? '0ms' : `${idx * 280}ms` }"
          :class="[
            revealed[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
            accents[idx % accents.length].bg.replace('bg-', 'hover:bg-').replace('-100', '-50')
          ]"
        >
          <div class="p-6 sm:p-8">
            <div
              class="flex items-center justify-center h-14 w-14 rounded-full text-2xl"
              :class="[accents[idx % accents.length].bg, accents[idx % accents.length].ring, 'border']"
            >
              <span class="select-none">{{ a.icon }}</span>
            </div>
            <h3 class="mt-6 text-lg sm:text-xl font-semibold text-gray-800">{{ a.title }}</h3>
            <p class="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              {{ a.description }}
            </p>
            <div class="mt-6">
              <span
                class="inline-flex items-center rounded-full px-3 py-1 text-sm text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                :class="[accents[idx % accents.length].chip]"
              >
                {{ a.tag }}
              </span>
            </div>
          </div>
          <div class="h-1 opacity-80 group-hover:opacity-100 transition"
               :class="[
                 'bg-gradient-to-r',
                 accents[idx % accents.length].grad,
                 (idx === 1 || idx === 5) ? 'absolute bottom-0 left-0 right-0' : ''
               ]"></div>
        </article>
      </div>

      <div class="mt-12 sm:mt-14 flex justify-center">
        <RouterLink to="/contact" class="btn btn-primary rounded-md px-6 py-3 shadow-sm transition hover:shadow-lg hover:-translate-y-0.5">
          Nous rejoindre
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>


le>