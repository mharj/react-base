import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).init({
	resources: {
		en: {
			translations: {
				hello: 'Hello',
				world: 'world',
				home: 'Home',
				login: 'Login',
				logout: 'Logout',
				secret: 'Secret',
				fin: 'Finnish',
				eng: 'English',
				sve: 'Swedish',
			},
		},
		fi: {
			translations: {
				hello: 'Hei',
				world: 'maailma',
				home: 'Koti',
				login: 'Kirjaudu sisään',
				logout: 'Kirjaudu ulos',
				secret: 'Salainen',
				fin: 'Suomi',
				eng: 'Englanti',
				sve: 'Ruotsi',
			},
		},
		sv: {
			translations: {
				hello: 'Hej',
				world: 'världen',
				home: 'Hem',
				login: 'Anmelden',
				logout: 'Abmelden',
				secret: 'Memlighet',
				fin: 'Finska',
				eng: 'Engelska',
				sve: 'Svenska',
			},
		},
	},
	fallbackLng: 'en',
	ns: ['translations'],
	defaultNS: 'translations',
	keySeparator: false, // we use content as keys
	interpolation: {
		escapeValue: false, // not needed for react!!
		formatSeparator: ',',
	},
	react: {
		wait: true,
	},
});
export default i18n;
