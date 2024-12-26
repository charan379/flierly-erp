import english_us from './english_us'
import telugu_in from './telugu_in'

const languages = {
  en_us: english_us,
  te_in: telugu_in,
}

// Function to get the language object by passing the language key
export function getLanguageObject(languageKey: string) {
  if (!Object.prototype.hasOwnProperty.call(languages, languageKey)) {
    return {}
  }
  return languages[languageKey as keyof typeof languages]
}

export default languages
