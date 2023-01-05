import { useCallback, useEffect, useState } from 'react'
import AsyncStorageHelper from 'utils/AsyncStorageHelper'

export default () => {
  const [language, setLanguage] = useState<string>('en')

  const saveLanguage = useCallback(async (newLang: string) => {
    setLanguage(newLang)
    await AsyncStorageHelper.save('language', newLang)
  }, [])

  const initData = useCallback(async () => {
    const data = await AsyncStorageHelper.get('language')
    if (typeof data === 'string') {
      setLanguage(data)
    }
  }, [])

  useEffect(() => {
    initData()
  }, [initData])

  return {
    language,
    saveLanguage
  }
}
