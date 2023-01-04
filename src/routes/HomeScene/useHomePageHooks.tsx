import { useNavigation } from '@react-navigation/native'
import { AppContext } from 'context/AppContext'
import { IMemberInfo } from 'models/IMember'
import { useCallback, useContext } from 'react'
import { Alert } from 'react-native'
import { Camera } from 'react-native-vision-camera'

export default () => {
  const { memberInfoList, removeMemberInfo } = useContext(AppContext)

  const navigation = useNavigation()

  const onAddPress = useCallback(async () => {
    const newCameraPermission = await Camera.requestCameraPermission()
    if (newCameraPermission === 'denied') {
      return
    } else {
      navigation.navigate('ScannerModal' as never)
    }
  }, [navigation])

  const onItemPress = useCallback(
    (memberInfo: IMemberInfo) => {
      navigation.navigate('Detail' as never, { memberInfo } as never)
    },
    [navigation]
  )

  const onItemLongPress = useCallback(
    (memberInfo: IMemberInfo) => {
      Alert.alert('Deletion is not reversible.', `Delete '${memberInfo.companyName}'?`, [
        { text: 'Cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            await removeMemberInfo(memberInfo.id)
          }
        }
      ])
    },
    [removeMemberInfo]
  )

  return {
    memberInfoList,
    onAddPress,
    onItemPress,
    onItemLongPress
  }
}
