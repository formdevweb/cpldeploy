<script setup>
import { ref } from 'vue'
import ValuesModal from '../components/ValuesModal.vue'

import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const isModalOpen = ref(false)
const selectedValue = ref(null)

const openModal = (value) => {
  selectedValue.value = value
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedValue.value = null
}

const carouselImages = [
  '/assets/installation1.webp',
  '/assets/installation2.webp',
  '/assets/installation3.webp',
  '/assets/installation4.webp'
]

const team = [
  {
    name: 'Thierry Guilbert',
    role: 'Président',
    description: 'Président du club, passionné de tennis de table depuis de nombreuses années.'
  },
  {
    name: 'Francis Poudroux',
    role: 'Secrétaire',
    description: 'Secrétaire du club, responsable du secrétariat et des procès-verbaux.'
  },
  {
    name: 'Cédric DELGEHIER',
    role: 'Secrétaire adjoint',
    description: 'Secrétaire adjoint, responsable de la communication et du site web.'
  },
  {
    name: 'Patrick Levray',
    role: 'Trésorier',
    description: 'Trésorier, gère les finances et la comptabilité du club.'
  },
  {
    name: 'Vincent DARUL',
    role: 'Trésorier adjoint',
    description: 'Trésorier adjoint, assiste le trésorier dans la gestion financière du club.'
  },
  {
    name: 'Nathalie Guilbert',
    role: 'Déléguée aux manifestations',
    description: "Responsable de l'organisation des événements et tournois du club."
  },
  {
    name: 'Rejoignez-nous !',
    role: 'Poste à pourvoir',
    description: 'Envie de vous investir dans la vie du club ? Nous recherchons des bénévoles passionnés pour renforcer notre comité directeur. Contactez-nous !',
    isInvitation: true
  },
  {
    name: 'Votre place est ici !',
    role: 'Bénévole actif',
    description: 'Participez à l\'organisation de nos événements, aidez au développement du club et partagez votre passion. Toutes les bonnes volontés sont les bienvenues !',
    isInvitation: true
  }
]

const achievements = [
  {
    year: '2025',
    title: 'Grand Prix des Jeunes Pongistes & Coupe du Pas-de-Calais',
    description: 'Félicitations à Lilou Sart et Florine Lavoisier qui montent sur le podium du Crédit Agricole (GRJP) et de la Coupe du Pas-de-Calais lors de ces compétitions à Béthune.',
    color: 'bg-blue-500', // Nouvelle couleur
    icon: '🏅' // Nouvelle icône
  },
  {
    year: '2025',
    title: 'Équipe Junior 1 vice-championne régionale',
    description: "Notre équipe Junior 1 termine vice-championne régionale, une performance exceptionnelle qui récompense le travail et l'engagement de nos jeunes joueurs.",
    color: 'bg-green-500', // Nouvelle couleur
    icon: '🥈' // Nouvelle icône
  },
  {
    year: '2025',
    title: 'Florine Lavoisier 4ème aux Championnats Individuels des Hauts-de-France',
    description: 'Lors des Championnats Individuels des Hauts-de-France à Divion, Florine Lavoisier a brillé en terminant 4ème de toute la région, une performance remarquable.',
    color: 'bg-red-500', // Nouvelle couleur
    icon: '🌟' // Nouvelle icône
  },
  {
    year: '2025',
    title: 'Montée en J2 de notre équipe principale',
    description: "L'équipe qui a brillamment réussi sa montée en J2 a été récompensée pour son travail, son esprit d'équipe et sa persévérance tout au long de l'année.",
    color: 'bg-purple-500', // Nouvelle couleur
    icon: '🚀' // Nouvelle icône
  },
  {
    year: '2025',
    title: "Prix de la meilleure progression d'effectif dans le Pas-de-Calais",
    description: 'Le club a reçu le prix de la meilleure progression d\'effectif dans le Pas-de-Calais avec 78 licenciés cette saison, témoignant de notre développement.',
    color: 'bg-indigo-500', // Nouvelle couleur
    icon: '📈' // Nouvelle icône
  }
]

const missionValues = [
  { emoji: '🤝', title: 'Esprit d\'équipe', hoverClass: 'hover:bg-blue-50', description: 'Nous cultivons un environnement où l\'entraide et la collaboration sont au cœur de notre réussite collective. Chaque membre contribue à la force du groupe.', proverb: 'Seul on va plus vite, ensemble on va plus loin.' },
  { emoji: '❤️', title: 'Respect et fair-play', hoverClass: 'hover:bg-red-50', description: 'Le respect de l\'adversaire, des arbitres et des règles est une valeur fondamentale. Nous promouvons un sport propre et honnête.', proverb: 'L\'important n\'est pas de gagner, mais de participer avec honneur.' },
  { emoji: '📈', title: 'Progression et excellence', hoverClass: 'hover:bg-green-50', description: 'Nous encourageons chaque joueur à donner le meilleur de lui-même et à viser l\'excellence, quel que soit son niveau. La progression de chacun est notre fierté.', proverb: 'La perfection n\'est pas atteignable, mais si nous visons la perfection, nous pouvons atteindre l\'excellence.' },
  { emoji: '😊', title: 'Convivialité', hoverClass: 'hover:bg-yellow-50', description: 'Le plaisir de jouer et de se retrouver est essentiel. Nous organisons régulièrement des moments de partage pour renforcer les liens entre nos membres.', proverb: 'Le bonheur est la seule chose qui se double si on le partage.' },
  { emoji: '🎓', title: 'Transmission', hoverClass: 'hover:bg-purple-50', description: 'Les plus expérimentés partagent leur savoir avec les plus jeunes, assurant ainsi la pérennité du club et la transmission de notre passion pour le tennis de table.', proverb: 'Celui qui partage son savoir multiplie sa connaissance.' }
]

const getOptimizedImageSrcset = (baseName) => {
  const widths = [600, 1200, 1800];
  return widths.map(width => `/assets/${baseName}-${width}w.webp ${width}w`).join(', ');
};
</script>

<template>
  <section class="py-16 md:py-32 bg-gradient-to-r from-brand-surface/80 via-brand-primary/80 to-brand-accent/80 text-white">
    <div class="container mx-auto px-4 lg:px-12 text-center">
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 lg:mb-4 tracking-tight text-brand-gold text-shadow-sm">À propos du Club</h2>
      <p class="text-3xl font-medium mb-12 lg:mb-20 text-white text-shadow-sm">Club Pongiste Libercourtois - Une passion depuis 1970</p>
      <div class="flex flex-wrap justify-center gap-8 lg:gap-16">
        <div class="bg-brand-primary p-6 rounded-lg shadow-xl w-full sm:w-60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-center hover:bg-brand-primary/80">
          <div class="flex items-center justify-center mb-4">
            <svg class="w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <p class="text-4xl sm:text-5xl font-bold text-white">78</p>
          <p class="text-xl mt-2 lg:mt-4 text-white">Licenciés</p>
        </div>
        <div class="bg-brand-accent p-6 rounded-lg shadow-xl w-full sm:w-60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-center hover:bg-brand-accent/80">
          <div class="flex items-center justify-center mb-4">
            <svg class="w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <p class="text-4xl sm:text-5xl font-bold text-white">7</p>
          <p class="text-xl mt-2 lg:mt-4 text-white">Équipes</p>
        </div>
        <div class="bg-brand-gold p-6 rounded-lg shadow-xl w-full sm:w-60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-center hover:bg-brand-gold/80 text-brand-dark">
          <div class="flex items-center justify-center mb-4">
            <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <p class="text-4xl sm:text-5xl font-bold">55</p>
          <p class="text-xl mt-2 lg:mt-4">Années</p>
        </div>
      </div>
    </div>
  </section>

  <section class="pt-16 md:pt-32 bg-gray-200 text-gray-800">
    <div class="container mx-auto px-4 lg:px-12">
      <div class="flex flex-col md:flex-row items-center gap-8 md:gap-16 relative">
        <div class="md:w-7/12 text-left p-4 sm:p-6 border border-brand-accent rounded-lg transition hover:shadow-lg bg-white" >
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-brand-accent" data-aos="fade-up">Notre Histoire</h2>
          <div class="space-y-4">
            <p class="text-xl font-medium leading-relaxed" data-aos="fade-up" data-aos-delay="100">Club de tennis de table situé à Libercour, offrant des activités pour tous les âges et tous les niveaux depuis plus de 50 ans.</p>
            <p class="text-xl font-medium leading-relaxed" data-aos="fade-up" data-aos-delay="200">Fondé en 1970, le Club Pongiste Libercourtois a vu naître et grandir plusieurs générations de joueurs passionnés. Depuis plus de 50 ans, nous perpétuons les valeurs du tennis de table dans un esprit convivial et sportif.</p>
            <p class="text-xl font-medium leading-relaxed" data-aos="fade-up" data-aos-delay="300">Notre club a évolué au fil des décennies, s'adaptant aux nouvelles pratiques tout en conservant son âme familiale. Aujourd'hui, nous accueillons des joueurs de tous âges et tous niveaux, des débutants aux compétiteurs confirmés.</p>
          </div>
        </div>
        <div class="md:w-5/12 flex flex-col items-center md:ml-8 z-10" data-aos="fade-left">
          <picture>
            <source :srcset="getOptimizedImageSrcset('plaque')" sizes="600px" type="image/webp">
            <source srcset="/assets/plaque.png" type="image/png">
            <img src="/assets/plaque.webp" alt="Plaque commémorative du club" class="max-w-full h-auto rounded-lg shadow-md border border-gray-300 transition-transform duration-300 hover:scale-105" data-aos="zoom-in" loading="lazy" width="600" height="450">
          </picture>
          <p class="text-base mt-4 text-gray-600" data-aos="fade-up" data-aos-delay="400">Plaque commémorative du Club Pongiste Libercourtois</p>
        </div>
      </div>
    </div>
  </section>

  <div class="bg-gray-200">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220" class="w-full block">
      <path fill="#e5e7eb" d="M0,96L120,117.3C240,139,480,181,720,181.3C960,181,1200,139,1320,117.3L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z" stroke="#1ABC9C" stroke-width="1"></path>
    </svg>
  </div>

  <section class="py-16 md:py-32 bg-gray-200 text-gray-800">
    <div class="container mx-auto px-4 lg:px-12 text-center">
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-brand-primary" data-aos="fade-up">Nos Valeurs</h2>
      <p class="text-xl font-medium mb-32 max-w-3xl mx-auto text-gray-700" data-aos="fade-up" data-aos-delay="100">Les principes qui guident notre club au quotidien.</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                  <div v-for="(value, index) in missionValues" :key="value.title"
                       @click="openModal(value)"
                       :class="[
                         'bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer',
                         value.hoverClass,
                         { 'mt-16': index === 1 || index === 3 }
                       ]"
                       data-aos="fade-up" :data-aos-delay="index * 100 + 200">
                    <div class="text-5xl text-yellow-500 mb-4">{{ value.emoji }}</div>
                    <h3 class="text-xl font-semibold">{{ value.title }}</h3>
                                <div class="mt-4 text-sm text-blue-600 md:hidden flex items-center justify-center gap-1">
                                  En savoir plus
                                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                                </div>                  </div>      </div>
    </div>
  </section>

  <div class="bg-gray-200">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220" class="w-full block" transform="scale(1, -1)">
      <path fill="#e5e7eb" d="M0,96L120,117.3C240,139,480,181,720,181.3C960,181,1200,139,1320,117.3L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z" stroke="#1ABC9C" stroke-width="1"></path>
    </svg>
  </div>

  <section class="py-16 md:py-32 bg-gray-200 text-gray-800">
    <div class="container mx-auto px-4 lg:px-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-primary mb-6 tracking-tight">Nos Installations</h2>
          <div class="space-y-4">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-brand-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h2M9 7h6m-6 4h6m-6 4h6" /></svg>
              <span>Salle Deladerriere - Complexe Sportif Léo Lagrange</span>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-brand-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>Complexe Sportif Léo Lagrange, 62820 Libercour</span>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-brand-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
              <span>24 tables de compétition</span>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-brand-primary mt-8 mb-4">Équipements disponibles</h3>
          <ul class="space-y-3">
            <li class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>24 tables de compétition Cornilleau</li>
            <li class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>Sol sportif homologué FFTT</li>
            <li class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>Espace convivialité</li>
            <li class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>Éclairage professionnel LED</li>
            <li class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>Vestiaires et sanitaires</li>
          </ul>
        </div>
        <div>
          <Carousel :items-to-show="1" :wrap-around="true" class="shadow-xl rounded-lg">
            <Slide v-for="(image, index) in carouselImages" :key="index">
              <div class="h-128">
                <picture>
                  <source :srcset="getOptimizedImageSrcset(image.split('/').pop().split('.')[0])" sizes="910px" type="image/webp">
                  <source :srcset="image.replace('.webp', '.jpg')" type="image/jpeg">
                  <img :src="image" :alt="'Installation ' + (index + 1)" class="rounded-lg w-full h-full object-cover" loading="lazy" width="910" height="512">
                </picture>
              </div>
            </Slide>

            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
        </div>
      </div>
    </div>
  </section>
  <ValuesModal
    :isOpen="isModalOpen"
    :title="selectedValue?.title"
    :description="selectedValue?.description"
    :emoji="selectedValue?.emoji"
    :proverb="selectedValue?.proverb"
    @close="closeModal"
  />
</template>

<style scoped>
:deep(.carousel__prev),
:deep(.carousel__next) {
  box-sizing: content-box;
  background-color: rgba(0, 0, 0, 0.5); /* Gris foncé semi-transparent */
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

:deep(.carousel__prev:hover),
:deep(.carousel__next:hover) {
  background-color: rgba(0, 0, 0, 0.7); /* Gris foncé plus opaque au survol */
}

:deep(.carousel__prev) {
  left: 16px;
}

:deep(.carousel__next) {
  right: 16px;
}

:deep(.carousel__pagination-button::after) {
  background-color: #9ca3af; /* gray-400 color */
  border-radius: 50%;
  width: 10px;
  height: 10px;
}

:deep(.carousel__pagination-button--active::after) {
  background-color: #ef4444; /* brand-primary color */
}
</style>