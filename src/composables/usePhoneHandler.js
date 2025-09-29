
import { inject } from 'vue';

export function usePhoneHandler() {
  const showInfo = inject('showInfo');

  const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const handlePhoneClick = async (phoneNumber, event) => {
    if (isMobile()) {
      // On mobile, we want the default 'tel:' link action to proceed.
      // We must not prevent the default event.
      return;
    }

    // On desktop, we prevent the default 'tel:' link action and copy to clipboard.
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(phoneNumber);
      if (showInfo) {
        showInfo(`Le numéro de téléphone ${phoneNumber} a été copié dans le presse-papiers !`, 'success');
      }
    } catch (err) {
      console.error('Failed to copy phone number: ', err);
      if (showInfo) {
        showInfo('Impossible de copier le numéro de téléphone. Veuillez le copier manuellement.', 'error');
      }
    }
  };

  return { handlePhoneClick };
}
