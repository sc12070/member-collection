import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { IMemberInfo } from 'models/IMember'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert } from 'react-native'
import update from 'react-addons-update'

export default ({ memberInfo, isEditing }: { memberInfo: IMemberInfo; isEditing: boolean }) => {
  const [isHideSlider, setIsHideSlider] = useState<boolean>(true)
  const [bgColor, setBgColor] = useState<string>(memberInfo.bgColor)
  const [textColor, setTextColor] = useState<string>(memberInfo.textColor)
  const [companyName, setCompanyname] = useState<string>(memberInfo.companyName || 'Company')
  const [fontSize, setFontSize] = useState<number>(memberInfo.fontSize)
  const [isEditingTextColor, setIsEditingTextColor] = useState<boolean>(false)
  const palette = useMemo<Array<string>>(() => [], [])

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

  const onClosePress = useCallback(
    () =>
      Alert.alert('Input data will be lost', 'Are you sure to quit?', [
        { text: 'Cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            navigation.popToTop()
          }
        }
      ]),
    [navigation]
  )

  const onRemovePress = useCallback(() => {
    Alert.alert('Deletion is not reversible.', `Delete '${memberInfo.companyName}'?`, [
      { text: 'Cancel' },
      {
        text: 'Confirm',
        onPress: async () => {
          navigation.navigate('Home', { removeId: memberInfo.id })
        }
      }
    ])
  }, [memberInfo, navigation])

  const onConfirmPress = useCallback(() => {
    const updatedMemberInfo: IMemberInfo = update(memberInfo, {
      companyName: { $set: companyName },
      bgColor: { $set: bgColor },
      textColor: { $set: textColor },
      fontSize: { $set: fontSize }
    })
    navigation.navigate('Home', { newMemberInfo: updatedMemberInfo })
  }, [memberInfo, companyName, bgColor, textColor, fontSize, navigation])

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
    isEditing,
    palette,
    setCompanyname,
    setFontSize,
    startEditBackgroundColor,
    startEditTextColor,
    onColorChange,
    onClosePress,
    onRemovePress,
    onConfirmPress
  }
}
