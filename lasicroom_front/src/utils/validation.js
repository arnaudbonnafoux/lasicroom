// Nom : lettres et espaces, max 50 caractères
export const validateName = (name) => {
  if (!name || !/^[a-zA-ZÀ-ÿ\s]{1,50}$/.test(name)) {
    return "Nom invalide (lettres seulement, max 50 caractères)";
  }
  return null;
};

// Email standard
export const validateEmail = (email) => {
  if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    return "Email invalide";
  }
  return null;
};

// Mot de passe : minimum 8 caractères, lettres et chiffres
export const validatePassword = (password) => {
  if (!password || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
    return "Mot de passe invalide (min 8 caractères, lettres et chiffres)";
  }
  return null;
};

// Style musical : lettres, accents, espaces et tirets, max 50 caractères
export const validateStyle = (style) => {
  if (!style || !/^[a-zA-ZÀ-ÿ\s-]{1,50}$/.test(style)) {
    return "Style invalide (lettres, espaces, tirets, max 50 caractères)";
  }
  return null;
};

// Texte libre : lettres, chiffres, ponctuation basique, max 200 caractères
export const validateText = (text, maxLength = 200) => {
  if (!text || text.length > maxLength || /[<>]/.test(text)) {
    return `Texte invalide (max ${maxLength} caractères, pas de < ou >)`;
  }
  return null;
};
