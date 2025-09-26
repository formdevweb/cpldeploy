<script setup>
import { inject } from 'vue';
const navLinks = [
  { label: 'Accueil', slug: '#accueil' },
  { label: 'À propos', slug: '#club' },
  { label: 'Calendrier', slug: '#calendrier' },
  { label: 'Horaires & Tarifs', slug: '#horaires-tarifs' },
  { label: 'Contact', slug: '#contact' }
]

const schedule = [
  { day: 'Lundi', hours: '17h30 - 20h30' },
  { day: 'Mardi', hours: '17h30 - 20h30' },
  { day: 'Mercredi', hours: '17h30 - 20h00' },
  { day: 'Jeudi', hours: '17h30 - 20h30' },
  { day: 'Vendredi', hours: '17h30 - 20h30' },
]

const showInfo = inject('showInfo');

const copyPhoneNumber = async (phoneNumber) => {
  try {
    await navigator.clipboard.writeText(phoneNumber);
    showInfo(`Le numéro de téléphone ${phoneNumber} a été copié dans le presse-papiers !`, 'success');
  } catch (err) {
    console.error('Failed to copy phone number: ', err);
    showInfo('Impossible de copier le numéro de téléphone. Veuillez le copier manuellement.', 'error');
  }
};
</script>

<template>
  <footer class="border-t border-white/10 bg-brand-neutral text-white">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div class="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
        
        <!-- Navigation -->
        <div class="rounded-lg border border-brand-gold p-6">
          <h3 class="text-sm font-semibold uppercase tracking-wider heading text-center">Navigation</h3>
          <ul class="mt-6 space-y-4">
            <li v-for="link in navLinks" :key="link.label">
              <a :href="link.slug" class="footer-link text-base text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-neutral">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="rounded-lg border border-brand-gold p-6">
          <h3 class="text-sm font-semibold uppercase tracking-wider heading text-center">Contact</h3>
          <div class="mt-6 space-y-4 text-base text-white/80">
            <p class="flex items-start">
              <span class="mt-1 h-5 w-5 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg>
              </span>
              <span class="ml-3">
                Salle Deladerriere<br>
                Complexe Sportif Léo Lagrange<br>
                62820 Libercourt
              </span>
            </p>
            <p class="flex items-center">
              <span class="h-5 w-5 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 004.28 4.28l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
              </span>
              <a @click.prevent="copyPhoneNumber('0660051241')" class="ml-3 hover:text-white cursor-pointer" title="Cliquez pour copier le numéro">06 60 05 12 41</a>
            </p>
            <p class="flex items-center">
              <span class="h-5 w-5 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
              </span>
              <a href="mailto:cplibercourt@gmail.com" class="ml-3 hover:text-white">cplibercourt@gmail.com</a>
            </p>
          </div>
        </div>

        <!-- Suivez-nous -->
        <div class="rounded-lg border border-brand-gold p-6">
          <h3 class="text-sm font-semibold uppercase tracking-wider heading text-center">Suivez-nous</h3>
          <div class="mt-6 flex justify-center gap-6">
            <a href="#" class="text-white/80 hover:text-[var(--accent)] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-neutral active:opacity-90">
              <span class="sr-only">Facebook</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
            </a>
            <a href="#" class="text-white/80 hover:text-[var(--accent)] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-neutral active:opacity-90">
              <span class="sr-only">Instagram</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0-2a7 7 0 110 14 7 7 0 010-14zm6.406-1.18a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" clip-rule="evenodd" /></svg>
            </a>
          </div>
          <div class="mt-6">
            <img src="/src/assets/social.jpg" alt="Réseaux sociaux du club" loading="lazy" class="w-full h-40 md:h-auto lg:h-auto rounded-md border border-white/10 object-cover" />
          </div>
        </div>

        <!-- Horaires -->
        <div class="rounded-lg border border-brand-gold p-6">
          <h3 class="text-sm font-semibold uppercase tracking-wider heading text-center">Horaires</h3>
          <dl class="mt-6 space-y-3 text-base text-white/80">
            <div v-for="item in schedule" :key="item.day" class="flex justify-between">
              <dt>{{ item.day }}</dt>
              <dd class="text-right">{{ item.hours }}</dd>
            </div>
          </dl>
        </div>

      </div>

      <div class="mt-12 sm:mt-16 border-t border-brand-gold pt-8 text-center text-sm text-white">
        <p>&copy; {{ new Date().getFullYear() }} CPL. Tous droits réservés. | <RouterLink :to="{ name: 'mentions-legales' }" class="footer-router-link">Mentions légales</RouterLink> | <RouterLink :to="{ name: 'politique-confidentialite' }" class="footer-router-link">Politique de confidentialité</RouterLink></p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-link {
  transition: color 0.2s ease-in-out;
}

.footer-router-link {
  display: inline-block; /* Add this */
  transition: color 0.3s ease, transform 0.3s ease;
}

.footer-router-link:hover {
  color: var(--gold); /* Yellow */
  transform: scale(1.02);
}
</style>

