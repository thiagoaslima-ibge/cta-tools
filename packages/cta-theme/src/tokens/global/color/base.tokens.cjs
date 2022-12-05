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
 *
 * Os comentários referem ao valor de L extraído do site acima.
 */

/* @type DesignTokens */
module.exports = {
  color: {
    base: {
      ibge: {
        azul: {
          value: "#004282",
          comment: "Azul oficial do IBGE",
        },
      },
      institucional: {
        15: { value: "#002569", comment: "28.1" },
        30: { value: "{color.base.ibge.azul.value}", comment: "28.1" },
        50: { value: "#3579cc", comment: "50.4" },
        65: { value: "#629df4", comment: "64.4" },
        80: { value: "#92c8ff", comment: "78.8" },
      },
      neutro: {
        0: { value: "#000000", comment: "0" },
        5: { value: "#111111", comment: "5.1" },
        15: { value: "#242424", comment: "14.2" },
        25: { value: "#3d3d3d", comment: "25.8" },
        35: { value: "#565656", comment: "36.6" },
        50: { value: "#767676", comment: "49.6" },
        65: { value: "#999999", comment: "63.2" },
        80: { value: "#c5c5c5", comment: "79.5" },
        90: { value: "#dddddd", comment: "88.1" },
        95: { value: "#eeeeee", comment: "94.1" },
        100: { value: "#ffffff", comment: "100" },
      },
      azul: {
        25: { value: "#0022b9", comment: "25.7" },
        35: { value: "#003adf", comment: "34.7" },
        55: { value: "#006dff", comment: "59.7" },
        60: { value: "#008eff", comment: "58.6" },
        75: { value: "#74bdff", comment: "74.4" },
      },
      laranja: {
        20: { value: "#680001", comment: "19.8" },
        30: { value: "#900000", comment: "29.2" },
        55: { value: "#f14600", comment: "55.2" },
        65: { value: "#ff7200", comment: "64.4" },
        70: { value: "#ff8b00", comment: "69.3" },
      },
      pessego: {
        15: { value: "#5a0004", comment: "16.4" },
        25: { value: "#7f0023", comment: "25.7" },
        55: { value: "#d15761", comment: "53.2" },
        70: { value: "#fc7d84", comment: "67.3" },
        75: { value: "#ff9da3", comment: "74.8" },
      },
      turquesa: {
        15: { value: "#002c37", comment: "15.9" },
        20: { value: "#004a55", comment: "28.3" },
        45: { value: "#0078A8", comment: "47.3" },
        50: { value: "#00808b", comment: "48.6" },
        60: { value: "#16a0ab", comment: "60.1" },
        80: { value: "#63d7e2", comment: "80.0" },
      },
      verde: {
        15: { value: "#002f00", comment: "15.7" },
        30: { value: "#004d00", comment: "27.6" },
        35: { value: "#006600", comment: "36.9" },
        50: { value: "#138500", comment: "48.1" },
        60: { value: "#46a500", comment: "60.1" },
        80: { value: "#87dc00", comment: "79.8" },
      },
      violeta: {
        15: { value: "#240d6a", comment: "13.8" },
        25: { value: "#472b8b", comment: "26.5" },
        25: { value: "#472b8b", comment: "26.5" },
        50: { value: "#8764cd", comment: "50.3" },
        65: { value: "#ae88f5", comment: "64.3" },
        80: { value: "#dcb2ff", comment: "78.6" },
      },
    },
  },
};
