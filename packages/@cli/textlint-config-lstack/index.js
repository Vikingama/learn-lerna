module.exports = {
  rules: {
    '@textlint-rule/no-unmatched-pair': true,
    apostrophe: true,
    'common-misspellings': true,
    diacritics: true,
    'en-capitalization': {
      allowHeading: false,
    },
    'stop-words': {
      severity: 'warning',
    },
    terminology: {
      // Load default terms (see terms.json in the repository)
      defaultTerms: true,
      // Syntax elements to skip. Overrides the default
      skip: ['Blockquote'],
      // List of terms
      terms: [
        'Less',
        'npm',
        'Stylus',
        'VuePress',
        'LStack',
        'Launcher',
        'XLauncher',
        ['front[- ]matter', 'frontmatter'],
      ],
      // Excludes terms
      exclude: ['CSS'],
    },
    'write-good': {
      severity: 'warning',
    },
    '@textlint-rule/preset-google': true,
    'zh-half-and-full-width-bracket': true,
    'ja-space-between-half-and-full-width': {
      space: 'always',
    },
  },
  filters: {
    comments: true,
  },
}
