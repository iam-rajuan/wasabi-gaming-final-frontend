
const SECRET_KEY = process.env.NEXTAUTH_SECRET || "default_secret_key";

// Simple XOR obfuscation to avoid plain text, better than just Base64 but simple enough without deps
const xorEncrypt = (text, key) => {
  return text.split('').map((c, i) =>
    String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))
  ).join('');
};

export const secureStorage = {
  setItem: (key, value) => {
    try {
      if (typeof window !== "undefined") {
        const stringValue = JSON.stringify(value);
        // XOR then Base64
        const encrypted = btoa(xorEncrypt(stringValue, SECRET_KEY));
        localStorage.setItem(key, encrypted);
      }
    } catch (error) {
      console.error("Encryption failed:", error);
    }
  },

  getItem: (key) => {
    try {
      if (typeof window === "undefined") return null;
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;

      // Base64 decode then XOR
      const decryptedString = xorEncrypt(atob(encrypted), SECRET_KEY);
      return JSON.parse(decryptedString);
    } catch (error) {
      console.error("Decryption failed:", error);
      return null;
    }
  },

  removeItem: (key) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  },
};
