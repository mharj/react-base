import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
	.use(LanguageDetector)
	.init({
		resources: {
			en: {
				translations: {
					'hello': 'Hello',
					'world': 'world',
				}
			},
			fi: {
				translations: {
					'hello': 'Hei',
					'world': 'maailma',
				}
			},
			sv: {
				translations: {
					'hello': 'Hej',
					'world': 'världen',
				}
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
