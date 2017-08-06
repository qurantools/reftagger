const translation = {
  en: {
    notFound: 'This chapter is not available in this version. Please choose a different chapter or version.',
    readMore: 'Read more'
  },
  ar: {
    notFound: 'TODO',
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
