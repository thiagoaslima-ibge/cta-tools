/// <reference types="style-dictionary" />

/** @type {import('style-dictionary').DesignToken} */
/** @type {import('style-dictionary').DesignTokens} */

/**
 * Definições tipográficas:
 *  - Família tipográfica usada em cada tipo de conteúdo
 *  - Tamanho do tipo
 */

/* @type DesignTokens */
module.exports = {
  font: {
    family: {
      base: {
        sans: {
          value: "Roboto, sans-serif",
        },
        monospace: {
          value: "'Roboto Mono', monospace, 'courier new', serif",
        },
        general: {
          value: "{ font.base.sans }",
        },
      },
      heading: {
        value: "{ font.base.general }",
      },
      body: {
        value: "{ font.base.general }",
      },
      table: {
        value: "{ font.base.general }",  
      },
      code: {
        value: "{ font.base.monospace }",
      }
    }
  },
};
