// Suprimir errores de Firebase en modo demo
export function setupErrorHandler() {
  window.addEventListener('error', (event) => {
    if (event.message && event.message.includes('Firebase')) {
      const demoRaw = localStorage.getItem('theteam_demo_current');
      if (demoRaw) {
        event.preventDefault();
        console.log('[Demo Mode] Firebase error suppressed:', event.message);
      }
    }
  });

  // También suprimir unhandledrejection para promesas rechazadas
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && typeof event.reason === 'string' && event.reason.includes('Firebase')) {
      const demoRaw = localStorage.getItem('theteam_demo_current');
      if (demoRaw) {
        event.preventDefault();
        console.log('[Demo Mode] Firebase promise error suppressed:', event.reason);
      }
    } else if (event.reason?.message && event.reason.message.includes('Firebase')) {
      const demoRaw = localStorage.getItem('theteam_demo_current');
      if (demoRaw) {
        event.preventDefault();
        console.log('[Demo Mode] Firebase promise error suppressed:', event.reason.message);
      }
    }
  });
}
