import { dictionaries, defaultLocale, supportedLocales } from '../i18n/index.js';

const STORAGE_KEY = 'locale';

function getNestedValue(object, path) {
  return path.split('.').reduce((value, key) => {
    if (value && Object.hasOwn(value, key)) {
      return value[key];
    }
    return undefined;
  }, object);
}

export function getInitialLocale() {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('lang');
  if (fromQuery && supportedLocales.includes(fromQuery)) {
    return fromQuery;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && supportedLocales.includes(stored)) {
    return stored;
  }

  return defaultLocale;
}

export function setLocale(locale) {
  if (!supportedLocales.includes(locale)) {
    return defaultLocale;
  }

  localStorage.setItem(STORAGE_KEY, locale);
  document.documentElement.setAttribute('lang', locale === 'pt' ? 'pt-BR' : 'en');

  const url = new URL(window.location.href);
  url.searchParams.set('lang', locale);
  window.history.replaceState({}, '', url);

  return locale;
}

function renderListSection(container, items, mapper) {
  if (!container) {
    return;
  }

  container.replaceChildren(...items.map(mapper));
}

export function applyTranslations(locale) {
  const dictionary = dictionaries[locale] || dictionaries[defaultLocale];

  document.title = dictionary.meta.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute('content', dictionary.meta.description);
  }

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    const value = getNestedValue(dictionary, key);
    if (typeof value === 'string') {
      element.textContent = value;
    }
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
    const key = element.getAttribute('data-i18n-aria');
    const value = getNestedValue(dictionary, key);
    if (typeof value === 'string') {
      element.setAttribute('aria-label', value);
    }
  });

  document.querySelectorAll('[data-i18n-alt="hero.photoAlt"]').forEach((photo) => {
    photo.setAttribute('alt', dictionary.hero.photoAlt);
  });

  renderListSection(
    document.querySelector('[data-i18n-list="areas"]'),
    dictionary.areas.items,
    (item) => {
      const li = document.createElement('li');
      const title = document.createElement('strong');
      title.textContent = item.title;
      const descriptionNode = document.createElement('span');
      descriptionNode.textContent = item.description;
      li.append(title, descriptionNode);
      return li;
    },
  );

  const renderTimelineList = (listKey, items) => {
    renderListSection(
      document.querySelector(`[data-i18n-list="${listKey}"]`),
      items,
      (item) => {
        const article = document.createElement('article');
        article.className = 'timeline__item';

        const meta = document.createElement('p');
        meta.className = 'timeline__meta';
        meta.textContent = item.meta;

        const title = document.createElement('h3');
        title.textContent = item.title;

        article.append(meta, title);

        if (item.description) {
          const descriptionNode = document.createElement('p');
          descriptionNode.textContent = item.description;
          article.append(descriptionNode);
        }

        return article;
      },
    );
  };

  renderTimelineList('experience', dictionary.experience.items);
  renderTimelineList('education.academic', dictionary.education.academic);
  renderTimelineList('education.certifications', dictionary.education.certifications);

  const renderSkillGroups = (listKey, groups) => {
    renderListSection(
      document.querySelector(`[data-i18n-list="${listKey}"]`),
      groups,
      (group) => {
        const div = document.createElement('div');
        div.className = 'skills-group';

        const title = document.createElement('h4');
        title.textContent = group.title;

        const list = document.createElement('ul');
        group.items.forEach((skill) => {
          const li = document.createElement('li');
          li.textContent = skill;
          list.append(li);
        });

        div.append(title, list);
        return div;
      },
    );
  };

  renderSkillGroups('skills.stack', dictionary.skills.stack);
  renderSkillGroups('skills.competencies', dictionary.skills.competencies);

  renderListSection(
    document.querySelector('[data-i18n-list="downloads"]'),
    dictionary.downloads.items,
    (item) => {
      const anchor = document.createElement('a');
      anchor.href = `${import.meta.env.BASE_URL}${item.href}`;
      anchor.download = item.file;
      anchor.setAttribute('data-cv', item.file);

      const role = document.createElement('span');
      role.className = 'downloads-list__role';
      role.textContent = item.role;

      const meta = document.createElement('span');
      meta.className = 'downloads-list__meta';
      meta.textContent = `${dictionary.downloads.action} · ${item.file}`;

      anchor.append(role, meta);
      return anchor;
    },
  );

  document.querySelectorAll('[data-lang]').forEach((button) => {
    const isActive = button.getAttribute('data-lang') === locale;
    button.setAttribute('aria-pressed', String(isActive));
  });
}
