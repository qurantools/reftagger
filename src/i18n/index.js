const translation = {
  tr: {
    notFound: 'Bu sure bu versiyonda mevcut değil. Lütfen farklı bir sure veya versiyon seçin.',
    readMore: 'Devamını oku'
  },
  en: {
    notFound: 'This chapter is not available in this version. Please choose a different chapter or version.',
    readMore: 'Read more'
  },
  ar: {
    notFound: 'غير موجود',
    readMore: 'اقرأ أكثر'
  }
};

export default class I18n {
  lang(lang) {
    this.language = lang;
  }

  get(key) {
    try {
      return translation[this.language || 'en'][key];
    } catch(e) {
      return `[I18n:${this.language}:${key}]`;
    }
  }
}
