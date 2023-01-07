import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types'
import { useCallback, useEffect, useState } from 'react'
import AsyncStorageHelper from 'utils/AsyncStorageHelper'

export default () => {
  const [language, setLanguage] = useState<string>('en')
  const [screenBrightness, setScreenBrightness] = useState<number>(0.7)

  const saveLanguage = useCallback(async (newLang: string) => {
    setLanguage(newLang)
    await AsyncStorageHelper.save('language', newLang)
  }, [])

  const saveScreenBrightness = useCallback(async (brightness: number) => {
    setScreenBrightness(brightness)
    await AsyncStorageHelper.save('brightness', brightness.toString())
  }, [])

  const initData = useCallback(async () => {
    const dataList = await AsyncStorageHelper.multiGet(['language', 'brightness'])
    dataList?.map((result: KeyValuePair) => {
      const key = result[0]
      const value = result[1]
      if (typeof value !== 'string') {
        return
      }
      switch (key) {
        case 'language':
          setLanguage(value)
          break
        case 'brightness':
          setScreenBrightness(parseFloat(value))
          break
      }
    })
  }, [])

  useEffect(() => {
    initData()
  }, [initData])

  return {
    language,
    screenBrightness,
    saveLanguage,
    saveScreenBrightness
  }
}
