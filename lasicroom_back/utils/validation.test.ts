import { isValidEmail, isValidPassword } from "../utils/validation";

describe("Validation Functions", () => {
  describe("isValidEmail", () => {
    it("devrait accepter un email valide", () => {
      expect(isValidEmail("user@example.com")).toBe(true);
    });

    it("devrait accepter un email avec tiret et underscore", () => {
      expect(isValidEmail("user_name-123@example.co.uk")).toBe(true);
    });

    it("devrait rejeter un email sans @", () => {
      expect(isValidEmail("invalid-email.com")).toBe(false);
    });

    it("devrait rejeter un email sans domaine", () => {
      expect(isValidEmail("user@")).toBe(false);
    });

    it("devrait rejeter une chaîne vide", () => {
      expect(isValidEmail("")).toBe(false);
    });

    it("devrait rejeter un email avec espaces", () => {
      expect(isValidEmail("user @example.com")).toBe(false);
    });
  });

  describe("isValidPassword", () => {
    it("devrait accepter un mot de passe valide", () => {
      expect(isValidPassword("SecurePass123")).toBe(true);
    });

    it("devrait accepter un mot de passe long", () => {
      expect(isValidPassword("MyVeryLongAndSecurePassword2024")).toBe(true);
    });

    it("devrait rejeter un mot de passe trop court", () => {
      expect(isValidPassword("Short1A")).toBe(false); // 7 caractères
    });

    it("devrait rejeter un mot de passe sans majuscule", () => {
      expect(isValidPassword("lowercase123")).toBe(false);
    });

    it("devrait rejeter un mot de passe sans minuscule", () => {
      expect(isValidPassword("UPPERCASE123")).toBe(false);
    });

    it("devrait rejeter un mot de passe sans chiffre", () => {
      expect(isValidPassword("NoNumbers")).toBe(false);
    });

    it("devrait rejeter une chaîne vide", () => {
      expect(isValidPassword("")).toBe(false);
    });
  });
});
