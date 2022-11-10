import { I18n } from 'i18n-js';
import pl from '../i18n/pl.json'
import en from '../i18n/en.json'


const translations = {
    en: en,
    pl: pl,
};

const i18n = new I18n(translations);

i18n.fallbacks = true;


export default i18n
