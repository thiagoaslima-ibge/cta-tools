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
    base: {
      family: {
        sans: {
          value: "Roboto, sans-serif",
        },
        monospace: {
          value: "'Roboto Mono', monospace, 'courier new', serif",
        },
        default: {
          value: "{ font.base.family.sans.value }",
        },
      },
      variant: {
        text: {
          default: {
            value: "common-ligatures"
          },
          abbreviation: {
            value: "small-caps"
          },
        },
        numbers: {
          oldStyle: {
            value: "oldstyle-nums proportional-nums"
          },
          lining: {
            value: "lining-nums proportional-nums"
          },
          tabular: {
            value: "lining-nums tabular-nums"
          },
          ordinal: {
            value: "lining-nums ordinal"
          },
          default: {
            value: "{ font.base.variant.numbers.oldStyle.value }"
          }
        }
      },
      size: {

      },
    },
    heading: {
      family: {
        value: "{ font.base.family.default.value }",
      },
      variant: {
        value: "{ font.base.variant.text.default.value } { font.base.variant.numbers.lining.value }"
      }
    },
    body: {
      family: {
        value: "{ font.base.family.default.value }",
      },
      variant: {
        value: "{ font.base.variant.text.default.value } { font.base.variant.numbers.default.value }"
      }
    },
    table: {
      family: {
        value: "{ font.base.family.default.value }",
      },
      variant: {
        value: "{ font.base.variant.text.default.value } { font.base.variant.numbers.tabular.value }"
      }
    },
    abbreviation: {
      family: {
        value: "{ font.base.family.default.value }",
      },
      variant: {
        value: "{ font.base.variant.text.abbreviation.value } { font.base.variant.numbers.default.value }"
      }
    },
    code: {
      family: {
        value: "{ font.base.family.monospace.value }",
      },
      variant: {
        value: "{ font.base.variant.text.default.value } { font.base.variant.numbers.tabular.value }"
      }
    }
  },
};
