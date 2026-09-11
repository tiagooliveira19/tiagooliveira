import { pt } from './pt.js';
import { en } from './en.js';

export const dictionaries = { pt, en };
export const defaultLocale = 'pt';
export const supportedLocales = Object.keys(dictionaries);
