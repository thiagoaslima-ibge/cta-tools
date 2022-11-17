/// <reference types="style-dictionary" />

/** @type {import('style-dictionary').DesignToken} */
/** @type {import('style-dictionary').DesignTokens} */

/**
 * Os nomes das cores variam de 0 a 100, preferencialmente variando de 5 em 5
 * Os números são baseados no valor de Lightness do espaço de cor HSLuv
 * Números maiores indicam corem mais claras
 * Números menos indicam cores mais escuras
 * Preto é 0 e Branco é 100
 * Mais informação em {@link hsluv.org}
 */

/* @type DesignTokens */
module.exports = {
  color: {
    ibge: {
      azul: {
        value: "#004282",
        comment: "Azul oficial do IBGE",
      },
    },
    institucional: {
      15: {
        value: "#002569",
        comment: "Valor de L: 28.1",
      },
      50: {
        value: "#3579cc",
        comment: "Valor de L: 50.4",
      },
      65: {
        value: "#629df4",
        comment: "Valor de L: 64.4",
      },
      80: {
        value: "#92c8ff",
        comment: "Valor de L: 78.8",
      },
    },
    neutro: {
      value: 
    }
    gray: {
      light: { value: "#CCCCCC" },
      medium: { value: "#999999" },
      dark: { value: "#111111" },
    },
    red: { value: "#FF0000" },
    green: { value: "#00FF00" },
  },
};
