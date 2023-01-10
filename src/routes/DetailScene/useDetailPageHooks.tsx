import { useNavigation } from '@react-navigation/native'
import ScreenBrightness from 'react-native-screen-brightness'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { AppState } from 'react-native'
import { AppContext } from 'context/AppContext'
import { IMemberInfo } from 'models/IMember'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export default (memberInfo: IMemberInfo) => {
  const { screenBrightness, saveScreenBrightness } = useContext(AppContext)

  const [currentBrightness, setCurrentBrightness] = useState<number>(screenBrightness)

  const appState = useRef(AppState.currentState)
  const currentBrightnessRef = useRef<number>(0)
  const originBrightnessRef = useRef<number>(0)

  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const onBack = useCallback(() => navigation.goBack(), [navigation])

  const onBrightnessChange = useCallback((newBrightness: number) => {
    currentBrightnessRef.current = newBrightness
    setCurrentBrightness(newBrightness)
    ScreenBrightness.setBrightness(newBrightness)
  }, [])

  const onStartModify = useCallback(
    () => navigation.navigate('DataInputModal', { memberInfo, isEditing: true }),
    [memberInfo, navigation]
  )

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState.match(/inactive|background/) && appState.current === 'active') {
        ScreenBrightness.setBrightness(originBrightnessRef.current)
      } else if (nextAppState === 'active' && appState.current.match(/inactive|background/)) {
        ScreenBrightness.setBrightness(currentBrightnessRef.current)
      }
      appState.current = nextAppState
    })

    return () => {
      subscription.remove()
    }
  }, [])

  useEffect(() => {
    ScreenBrightness.getBrightness().then((originBrightness: number) => {
      originBrightnessRef.current = originBrightness
      currentBrightnessRef.current = screenBrightness
      ScreenBrightness.setBrightness(screenBrightness)
    })
    return () => {
      if (screenBrightness !== currentBrightnessRef.current) {
        saveScreenBrightness(currentBrightnessRef.current)
      }
      ScreenBrightness.setBrightness(originBrightnessRef.current)
    }
  }, [screenBrightness, saveScreenBrightness])

  return {
    currentBrightness,
    onBrightnessChange,
    onStartModify,
    onBack
  }
}
