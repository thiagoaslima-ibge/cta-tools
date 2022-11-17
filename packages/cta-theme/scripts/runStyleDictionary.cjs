// @ts-check

const { fileURLToPath } = require('node:url');
const { dirname, join, resolve } = require('node:path');

const StyleDictionary = require('style-dictionary').extend({
  source: ['src/tokens/**/*.tokens.cjs'],
  platforms: {
    json: {
      buildPath: 'src/theme/',
      transformGroup: 'web',
      files: [{
        destination: 'tokens-log.json',
        format: 'json'
      },
      {
        destination: 'tokens.json',
        format: 'json/nested'
      }],
    },
    css: {
      buildPath: 'src/theme/',
      transformGroup: 'web',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: {
          outputReferences: true, // new setting, if true will use variable references
        }
      },{
        destination: 'tokens.scss',
        format: 'scss/variables',
        options: {
          outputReferences: true, // new setting, if true will use variable references
        }
      }]
    }
  }
});

StyleDictionary.buildAllPlatforms();