// @ts-check
import { fileURLToPath } from "node:url";
import { readdirSync, existsSync, writeFileSync } from "node:fs";
import { relative, resolve, normalize, dirname, join } from "node:path";
import camelCase from "lodash/camelCase.js";
import kebabCase from "lodash/kebabCase.js";

/**
 * @typedef {Object} IconValue
 * @property {string} id
 * @property {string} markup
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const iconsFolder = resolve(__dirname, "..", normalize("src/assets/icons"));
const destinationFolder = resolve(
  __dirname,
  "..",
  normalize("src/components/Icon/sync")
);
const destinationFile = join(destinationFolder, "iconsMap.ts");

if (!existsSync(iconsFolder)) {
  throw new Error("Icons not found");
}

if (!existsSync(destinationFolder)) {
  throw new Error(
    "Could not find the folder where the iconsMap should be saved"
  );
}

const importPath = relative(destinationFolder, iconsFolder);
const fileExtension = ".svg";

const iconsFolderContent = readdirSync(iconsFolder, {
  encoding: "utf-8",
  withFileTypes: true,
});

/** @type {string[]} */
const headerImports = [];

/** @type {IconValue[]} */
const values = [];

for (const dirent of iconsFolderContent) {
  if (!dirent.isFile()) {
    continue;
  }

  const filename = dirent.name;

  if (!filename.endsWith(fileExtension)) {
    continue;
  }

  includeImportInHeader(filename);
  registerValue(filename);
}

const fileContent = `${renderImportHeader()}

export const iconsMap = {
${renderIconMapValues()}
} as const;

export type IconName = keyof typeof iconsMap;
export type IconData = typeof iconsMap[IconName];
`;

writeFileSync(destinationFile, fileContent, { encoding: "utf-8", flag: "w" });

/**
 *
 * @param {string} filename
 * @returns {string}
 */
function toImportVariable(filename) {
  const name = filename.replace(fileExtension, "");
  return `${camelCase(name)}IconSvg`;
}

/**
 *
 * @param {string} filename
 * @returns {string}
 */
function generateImportPath(filename) {
  return join(importPath, filename);
}

/**
 *
 * @param {string} filename
 * @returns {void}
 */
function includeImportInHeader(filename) {
  headerImports.push(
    `import ${toImportVariable(filename)} from "${generateImportPath(filename)}?raw";`
  );
}

/**
 *
 * @param {string} filename
 * @return {void}
 */
function registerValue(filename) {
  const id = kebabCase(filename.replace(fileExtension, ""));

  // We set this to the improt variable
  // This will be handled by vite building,
  // which will replace this with the real code during buils
  const markup = toImportVariable(filename);

  values.push({ id, markup });
}

function renderImportHeader() {
  return headerImports.join("\n");
}

function renderIconMapValues() {
  const lines = [];

  for (const { id, markup } of values) {
    lines.push(`\t'${id}': {`);
    lines.push(`\t\tid: '${id}',`);
    lines.push(`\t\tmarkup: ${markup},`);
    lines.push(`\t},`);
  }

  return lines.join("\n");
}
