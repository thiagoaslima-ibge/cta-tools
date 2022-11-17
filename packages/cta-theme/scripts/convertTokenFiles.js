// @ts-check

import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const themeFolder = resolve(__dirname, '..', 'src/theme/');
const jsonFile = join(themeFolder, 'tokens.json');
const jsFile = join(themeFolder, 'tokens.js');
const tsFile = join(themeFolder, 'tokens.ts');

const fileContent = readFileSync(jsonFile, { encoding: 'utf-8' });

const disclaimer = `/**
 * Do not edit directly
 * Generated on ${new Date().toUTCString()}
 */`;

writeFileSync(
  jsFile, 
  [
    disclaimer,
    fileContent.replace('{', 'export const tokens = {').replace(new RegExp('}$'), '};')
  ].join('\n\n'),
  { encoding: 'utf-8' }
);

writeFileSync(
  tsFile, 
  [
    disclaimer,
    fileContent.replace('{', 'export const tokens = {').replace(new RegExp('}$'), '} as const;')
  ].join('\n\n'),
  { encoding: 'utf-8' }
);
