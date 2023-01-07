import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import uuid from 'react-native-uuid'
import { IMemberInfo } from 'models/IMember'
import { useCallback, useEffect } from 'react'
import { Format } from '@kichiyaki/react-native-barcode-generator'
import COLORS from 'constants/COLORS'

export default ({ memberId, format }: { memberId: string; format: Format }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const onClosePress = useCallback(() => navigation.popToTop(), [navigation])

  const onNextPress = useCallback(() => {
    const memberInfo: IMemberInfo = {
      id: uuid.v4().toString(),
      memberId,
      format,
      withQR: format === undefined,
      companyName: 'Company',
      bgColor: COLORS.isDark ? '#FFFFFF' : '#010101',
      textColor: COLORS.isDark ? '#010101' : '#FFFFFF',
      fontSize: 20
    }
    navigation.navigate('DataInputModal', { memberInfo })
  }, [memberId, format, navigation])

  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      return
    })
  }, [navigation])

  return {
    onClosePress,
    onNextPress
  }
}
