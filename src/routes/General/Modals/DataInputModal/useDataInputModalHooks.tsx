import uuid from 'react-native-uuid'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import COLORS from 'constants/COLORS'
import { IMemberInfo } from 'models/IMember'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from 'context/AppContext'
import { Format } from '@kichiyaki/react-native-barcode-generator'

export default ({ memberId, format }: { memberId: string; format: Format }) => {
  const [isHideSlider, setIsHideSlider] = useState<boolean>(true)
  const [bgColor, setBgColor] = useState<string>(COLORS.isDark ? '#FFFFFF' : '#010101')
  const [textColor, setTextColor] = useState<string>(COLORS.isDark ? '#010101' : '#FFFFFF')
  const [companyName, setCompanyname] = useState<string>('')
  const [fontSize, setFontSize] = useState<number>(30)
  const [isEditingTextColor, setIsEditingTextColor] = useState<boolean>(false)
  const palette = useMemo(() => [], [])

  const { addMemberInfo } = useContext(AppContext)
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const startEditBackgroundColor = useCallback(() => setIsEditingTextColor(false), [])

  const startEditTextColor = useCallback(() => setIsEditingTextColor(true), [])

  const onColorChange = useCallback(
    (color: string) => {
      if (isEditingTextColor) {
        setTextColor(color)
      } else {
        setBgColor(color)
      }
    },
    [isEditingTextColor]
  )

  const onConfirm = useCallback(async () => {
    const newMemberInfo: IMemberInfo = {
      id: uuid.v4().toString(),
      memberId,
      format,
      withQR: format === undefined,
      companyName,
      bgColor,
      textColor,
      fontSize
    }
    await addMemberInfo(newMemberInfo)
    navigation.popToTop()
  }, [memberId, format, companyName, bgColor, textColor, fontSize, navigation, addMemberInfo])

  useEffect(() => {
    setTimeout(() => setIsHideSlider(false), 100)
  }, [])

  return {
    isHideSlider,
    bgColor,
    textColor,
    companyName,
    fontSize,
    isEditingTextColor,
    palette,
    setCompanyname,
    setFontSize,
    startEditBackgroundColor,
    startEditTextColor,
    onColorChange,
    onConfirm
  }
}
