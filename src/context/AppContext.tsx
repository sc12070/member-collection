import { createContext } from 'react'

export const AppContext = createContext({
  language: 'en',
  screenBrightness: 0.7,
  saveLanguage: (_lang: string) => {},
  saveScreenBrightness: (_brightness: number) => {}
})
