/**
 * Fonction utilitaire simple pour valider un email
 * @param email - L'email à valider
 * @returns true si l'email est valide
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Fonction pour valider un mot de passe
 * @param password - Le mot de passe à valider
 * @returns true si le mot de passe respecte les critères
 */
export const isValidPassword = (password: string): boolean => {
  // Au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
};
