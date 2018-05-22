const translation = {
  tr: {
    notFound: 'Bu sure bu versiyonda mevcut değil. Lütfen farklı bir sure veya versiyon seçin.',
    readMore: 'Devamını oku',
    'Türkçe': 'Türkçe',
    'İngilizce': 'İngilizce',
    'Arapça': 'Arapça',
    'Dil Seçiniz': 'Dil Seçiniz',
    'Meal Seçiniz': 'Meal Seçiniz',
    'Detaylı inceleme »': 'Detaylı inceleme »'
  },
  en: {
    notFound: 'This chapter is not available in this version. Please choose a different chapter or version.',
    readMore: 'Read more',
    'Türkçe': 'Turkish',
    'İngilizce': 'English',
    'Arapça': 'Arabic',
    'Dil Seçiniz': 'Select Language',
    'Meal Seçiniz': 'Select Translation',
    'Detaylı inceleme »': 'Detailed review »'
  },
  ar: {
    notFound: 'غير موجود',
    readMore: 'اقرأ أكثر',
    'Türkçe': 'اللغة التركية',
    'İngilizce': 'الإنجليزية',
    'Arapça': 'العربية',
    'Dil Seçiniz': 'ديل سيزينز',
    'Meal Seçiniz': 'اختر وجبة',
    'Detaylı inceleme »': 'مراجعة تفصيلية »'
  }
};

export default class I18n {
  lang(lang) {
    this.language = lang;
  }

  get(key) {
    try {
      return translation[this.language || 'tr'][key];
    } catch(e) {
      return `[I18n:${this.language}:${key}]`;
    }
  }
}
