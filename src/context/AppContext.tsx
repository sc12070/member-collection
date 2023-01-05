import { createContext } from 'react'

export const AppContext = createContext({
  language: 'en',
  saveLanguage: (_: string) => {}
})
