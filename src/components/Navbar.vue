<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { store } from '../store'

const logout = () => {
  store.clearAuth()
}

const isMenuOpen = ref(false)
const logoRef = ref(null)
const hamburgerButton = ref(null)
const mobileMenuRef = ref(null)
const closeButtonRef = ref(null)
const hasShadow = ref(false)
const activeIndex = ref(0)

function setActiveBySlug(slug) {
  const idx = navItems.findIndex(n => n.to.path === slug)
  if (idx >= 0) {
    activeIndex.value = idx
    try { localStorage.setItem('activeNav', slug) } catch {}
  }
}

const navItems = [
  { label: 'Accueil', slug: 'accueil', to: { name: 'accueil', path: '/' }, icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>' },
  { label: 'Le Club', slug: 'club', to: { name: 'club', path: '/club' }, icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.04z" /></svg>' },
  { label: 'Licenciés', slug: 'licencies', to: { name: 'licencies', path: '/licencies' }, icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>', requiresAdmin: true },
  { label: 'Calendrier', slug: 'calendrier', to: { name: 'calendrier', path: '/calendrier' }, icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>' },
  { label: 'Horaires & Tarifs', slug: 'horaires-tarifs', to: { name: 'horaires-tarifs', path: '/horaires-tarifs' }, icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' },
  { label: 'FAQ', slug: 'faq', to: { name: 'faq', path: '/faq' }, icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.79 4 4s-1.79 4-4 4c-1.742 0-3.223-.835-3.772-2M12 18.5v.01M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>' },
  { label: 'Contact', slug: 'contact', to: { name: 'contact', path: '/contact' }, icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>' },
  { label: 'Messages Admin', slug: 'admin-contacts', to: { name: 'admin-contacts', path: '/admin/contacts' }, icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>', requiresAdmin: true }
]

onMounted(() => {
  const onScroll = () => {
    hasShadow.value = window.scrollY > 4
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  let cleanup = () => window.removeEventListener('scroll', onScroll)

  // init active from hash or storage
  const fromHash = (location.hash || '').replace(/^#/, '')
  const stored = (() => { try { return localStorage.getItem('activeNav') } catch { return null } })()
  if (fromHash) setActiveBySlug(fromHash)
  else if (stored) setActiveBySlug(stored)

  // sync with back/forward
  const onHash = () => {
    const slug = (location.hash || '').replace(/^#/, '')
    if (slug) setActiveBySlug(slug)
  }
  window.addEventListener('hashchange', onHash)
  const prevCleanup = cleanup
  cleanup = () => {
    prevCleanup && prevCleanup()
    window.removeEventListener('hashchange', onHash)
  }
})

let previouslyFocusedElement = null

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    isMenuOpen.value = false
  } else if (event.key === 'Tab' && mobileMenuRef.value) {
    event.preventDefault()
    const focusableElements = Array.from(
      mobileMenuRef.value.querySelectorAll(
        'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'))

    if (focusableElements.length === 0) return

    const firstFocusableEl = focusableElements[0]
    const lastFocusableEl = focusableElements[focusableElements.length - 1]

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus()
      } else {
        const index = focusableElements.indexOf(document.activeElement)
        if (index > 0) {
          focusableElements[index - 1].focus()
        } else {
          lastFocusableEl.focus() // Fallback to last if somehow not on first
        }
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus()
      } else {
        const index = focusableElements.indexOf(document.activeElement)
        if (index < focusableElements.length - 1) {
          focusableElements[index + 1].focus()
        } else {
          firstFocusableEl.focus() // Fallback to first if somehow not on last
        }
      }
    }
  }
}

watch(isMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    previouslyFocusedElement = document.activeElement
    nextTick(() => {
      if (closeButtonRef.value) {
        closeButtonRef.value.focus()
      }
      if (mobileMenuRef.value) {
        mobileMenuRef.value.addEventListener('keydown', handleKeydown)
      }
    })
  } else {
    document.body.style.overflow = ''
    if (mobileMenuRef.value) {
      mobileMenuRef.value.removeEventListener('keydown', handleKeydown)
    }
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus()
      previouslyFocusedElement = null
    }
  }
})

let cleanup = null
onBeforeUnmount(() => { if (cleanup) cleanup() })

const getOptimizedImageSrcset = (baseName) => {
  const widths = [600, 1200, 1800];
  return widths.map(width => `/assets/${baseName}-${width}w.webp ${width}w`).join(', ');
};
</script>

<template>
  <div>
    <header :class="['fixed top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-shadow duration-200 w-full border-b border-brand-gold', hasShadow ? 'shadow-md border-b border-gray-200 bg-white/90' : 'border-b border-gray-200 bg-white/80']">
      <nav class="mx-auto flex overflow-hidden max-w-7xl items-center justify-between px-2 py-5 sm:px-6 lg:px-8 box-border">
        <!-- Left: Logo -->
        <RouterLink to="/" class="group flex items-center gap-1 min-w-0 flex-shrink-0">
          <div class="rounded-full ring-0 ring-transparent transition group-hover:ring-1 group-hover:ring-[var(--accent)]/60">
            <picture>
              <source :srcset="getOptimizedImageSrcset('logo-club')" sizes="56px" type="image/webp">
              <source srcset="/assets/logo-club.png" type="image/png">
              <img ref="logoRef" src="/assets/logo-club.webp" alt="Logo du club" class="h-8 sm:h-14 w-auto object-contain transition-transform group-hover:scale-[1.03]" loading="lazy" width="56" height="56" />
            </picture>
          </div>
          <span class="sr-only">Accueil</span>
        </RouterLink>

        <!-- Center: Desktop menu -->
        <ul :class="['hidden gap-2 text-sm font-medium text-gray-900 lg:flex heading']">
          <li v-for="(item, i) in navItems" :key="item.label">
            <RouterLink v-if="!(item.requiresAdmin && !store.isAdmin)" :to="item.to"
               @click.prevent="activeIndex = i; setActiveBySlug(item.slug)"
               :class="[
                 'inline-block px-1 py-0.5 transition-all duration-200 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2',
                 activeIndex === i
                   ? 'bg-[var(--accent)] text-white font-semibold border-b-2 border-[var(--primary)]'
                   : 'text-gray-900 hover:bg-[var(--accent-dark)] hover:text-white'
               ]"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>

        <!-- Right: actions -->
        <div class="hidden items-center gap-3 lg:flex">
          
          <RouterLink v-if="!store.isAdmin" to="/login" class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 cursor-pointer">
              Admin
          </RouterLink>
          <button v-else @click="logout()" class="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 cursor-pointer">
              Déconnexion
          </button>
        </div>

        <!-- Mobile: hamburger -->
        <button ref="hamburgerButton" @click="isMenuOpen = !isMenuOpen" :aria-expanded="isMenuOpen" aria-controls="mobile-menu" class="z-50 inline-flex items-center justify-center rounded-md border border-[var(--accent)] bg-white p-1 text-[var(--accent)] shadow-sm transition-colors duration-200 hover:border-[var(--primary)] hover:text-[var(--primary)] lg:hidden cursor-pointer min-w-0 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </nav>
      <div class="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-70"></div>
    </header>

    <!-- Mobile menu overlay -->
    <transition
      enter-active-class="transition-opacity duration-300 ease-in-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div ref="mobileMenuRef" v-show="isMenuOpen" id="mobile-menu" role="dialog" aria-modal="true" class="fixed inset-0 z-50 bg-brand-neutral lg:hidden p-8">
        <!-- Logo -->
        <picture>
          <source :srcset="getOptimizedImageSrcset('logo-club')" sizes="56px" type="image/webp">
          <source srcset="/assets/logo-club.png" type="image/png">
          <img src="/assets/logo-club.webp" alt="Logo du club" class="absolute top-5 left-5 h-14 w-auto" loading="lazy" width="56" height="56" />
        </picture>

        <!-- Close button -->
        <button ref="closeButtonRef" @click="isMenuOpen = false" class="absolute top-5 right-5 inline-flex items-center justify-center rounded-md border border-[var(--accent)] p-2 text-[var(--accent)] shadow-sm transition-colors duration-200 hover:border-[var(--primary)] hover:text-[var(--primary)] cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Menu links -->
        <div class="flex flex-col items-center justify-center h-full">
          <TransitionGroup
            v-if="isMenuOpen"
            tag="ul"
            appear
            enter-active-class="transition-all duration-500"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-opacity duration-200 ease-in-out"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0"
            class="space-y-8 text-2xl text-white"
          >
            <li v-for="(item, i) in navItems" :key="item.label + '-m'" :style="{ 'transition-delay': `${i * 75}ms` }">
              <RouterLink v-if="!(item.requiresAdmin && !store.isAdmin)"
                :to="item.to"
                @click="isMenuOpen = false; activeIndex = i; setActiveBySlug(item.slug)"
                :class="[
                  'transition-colors duration-200 flex items-center space-x-4',
                  activeIndex === i ? 'text-[var(--accent)] font-semibold' : 'hover:text-[var(--accent)]'
                ]"
              >
                <div class="h-7 w-7" v-html="item.icon"></div>
                <span>{{ item.label }}</span>
              </RouterLink>
            </li>
            
            <li class="pt-8" :key="'admin-button-li'" :style="{ 'transition-delay': `${(navItems.length + 1) * 75}ms` }">
                <RouterLink v-if="!store.isAdmin" to="/login" @click="isMenuOpen = false" class="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md cursor-pointer">
                    Admin
                </RouterLink>
                <button v-else @click="logout()" class="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md cursor-pointer">
                    Déconnexion
                </button>
            </li>
          </TransitionGroup>
        </div>
      </div>
    </transition>

  </div>
</template>