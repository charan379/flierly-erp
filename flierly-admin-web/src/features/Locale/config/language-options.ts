const languages: Language[] = [
  { name: 'English', country: 'US', code: 'en_us' },
  { name: 'Telugu', country: 'IN', code: 'te_in' },
]

const getLanguageOptions = (): Array<{ value: string; label: string }> =>
  languages.map(({ code, country, name }) => ({
    value: code,
    label: `${country} ${name}`,
  }))

export default getLanguageOptions
