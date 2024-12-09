// eslint.config.js
const js = require("@eslint/js"); // Package recommandé pour les règles de base
const globals = require("globals"); // Package pour définir les variables globales

module.exports = [
  {
    files: ["**/*.js"], // Appliquer les règles à tous les fichiers JavaScript
    languageOptions: {
      ecmaVersion: "latest", // ES2021 ou plus récent
      sourceType: "module", // Pour les modules ES
      globals: {
        ...globals.node, // Variables globales Node.js
        ...globals.browser, // Variables globales pour le navigateur
      },
    },
    rules: {
      "no-unused-vars": "warn", // Exemple de règle : avertir sur les variables inutilisées
      "no-console": "off", // Désactiver les avertissements pour `console.log`
    },
  },
];
