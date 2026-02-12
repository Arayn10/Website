// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// PWA installation prompt handling
let deferredPrompt;
const installButton = document.getElementById('install-pwa');
const installButtonMobile = document.getElementById('install-pwa-mobile');

// Hide install buttons by default
if (installButton) {
  installButton.style.display = 'none';
}

if (installButtonMobile) {
  installButtonMobile.style.display = 'none';
}

// Function to handle installation
const handleInstallClick = async (button) => {
  // Hide the install buttons
  if (installButton) installButton.style.display = 'none';
  if (installButtonMobile) installButtonMobile.style.display = 'none';
  
  // Show the install prompt
  deferredPrompt.prompt();
  
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  
  // Log the outcome
  console.log(`User ${outcome} the installation`);
  
  // Clear the deferredPrompt variable
  deferredPrompt = null;
};

// Listen for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Show the install buttons if available
  if (installButton) {
    installButton.style.display = 'flex';
    installButton.addEventListener('click', () => handleInstallClick(installButton));
  }
  
  if (installButtonMobile) {
    installButtonMobile.style.display = 'flex';
    installButtonMobile.addEventListener('click', () => handleInstallClick(installButtonMobile));
  }
});

// Listen for the appinstalled event
window.addEventListener('appinstalled', (e) => {
  console.log('PWA was installed');
});