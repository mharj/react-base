import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next.use(LanguageDetector).init({
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
				broken: 'Broken',
				fatal_error: 'Fatal error',
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
				broken: 'Rikki',
				fatal_error: 'Vakava virhe',
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
				broken: 'Bruten',
				fatal_error: 'Allvarligt fel',
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
export default i18next;
