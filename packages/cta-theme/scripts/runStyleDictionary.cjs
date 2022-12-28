// @ts-check

const GLOBAL_STYLES = 'src/tokens/global/**/*.tokens.cjs';

/**
 * @param  {string[]} files The list of token files of a specific theme
 * @returns string[]
 */
const themeSource = (...files) => {
  return files;
}

const themePlatform = (destinationFolder) => {
  return {
    json: {
      buildPath: destinationFolder,
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
      buildPath: destinationFolder,
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
  };
}

[
  {theme: 'estatistica', variant: 'light'},
  {theme: 'estatistica', variant: 'dark'},
].forEach(({theme, variant}) => {
  const dictionary = require('style-dictionary').extend({
    include: [GLOBAL_STYLES],
    source: themeSource(`src/tokens/theme/${theme}/**/*-${variant}.tokens.cjs`),
    platforms: themePlatform(`src/theme/${theme}/${variant}/`),
  });
  
  dictionary.buildAllPlatforms();
})