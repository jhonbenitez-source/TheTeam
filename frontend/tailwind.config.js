module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        emerald: {
          50: '#f0fdf4',
          600: '#16a34a',
          700: '#15803d',
        }
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      zIndex: {
        '50': '50',
        '60': '60',
        '70': '70',
        '80': '80',
      }
    }
  },
  plugins: [],
  safelist: [
    // Print classes
    'print:break-inside-avoid',
    'print:inline-block',
    'no-print',
    // Dynamic colors
    'bg-purple-100', 'text-purple-800', 'border-purple-200',
    'bg-blue-100', 'text-blue-800', 'border-blue-200',
    'bg-cyan-100', 'text-cyan-800', 'border-cyan-200',
    'bg-teal-100', 'text-teal-800', 'border-teal-200',
    'bg-emerald-100', 'text-emerald-800', 'border-emerald-200',
    'bg-green-100', 'text-green-800', 'border-green-200',
    'bg-lime-100', 'text-lime-800', 'border-lime-200',
    'bg-yellow-100', 'text-yellow-800', 'border-yellow-200',
    'bg-amber-100', 'text-amber-800', 'border-amber-200',
    'bg-orange-100', 'text-orange-800', 'border-orange-200',
    'bg-red-100', 'text-red-800', 'border-red-200',
    'bg-rose-100', 'text-rose-800', 'border-rose-200',
    'bg-pink-100', 'text-pink-800', 'border-pink-200',
    'bg-fuchsia-100', 'text-fuchsia-800', 'border-fuchsia-200',
    'bg-indigo-100', 'text-indigo-800', 'border-indigo-200',
    'bg-violet-100', 'text-violet-800', 'border-violet-200',
  ]
};
