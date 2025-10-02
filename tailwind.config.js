/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': 'var(--brand-primary)',
        'brand-accent': 'var(--brand-accent)',
        'brand-gold': 'var(--gold)',
        'brand-neutral': 'var(--neutral)',
        'brand-surface': 'var(--surface)',
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-gray-100',
    'bg-yellow-400',
    'bg-blue-100',
    'bg-blue-600',
    'text-yellow-700',
    'text-blue-800',
    'bg-blue-500',
    'bg-green-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-indigo-500',
    'hover:bg-blue-100',
    'hover:bg-green-100',
    'hover:bg-yellow-100',
    'hover:bg-purple-100',
    'hover:bg-red-100',
    'hover:bg-indigo-50',
    'hover:bg-blue-50',
    'hover:bg-green-50',
    'hover:bg-yellow-50',
    'hover:bg-blue-200',
    'hover:bg-pink-200',
    'hover:bg-sky-200',
    'hover:bg-amber-200',
    'hover:bg-indigo-200',
    'bg-gradient-to-r',
    'from-brand-surface/80',
    'via-brand-primary/80',
    'to-brand-accent/80',
  ]
}