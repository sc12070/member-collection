import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { IMemberInfo } from 'models/IMember'
import { useCallback, useState } from 'react'
import { Camera } from 'react-native-vision-camera'
import useMemberInfoHooks from './useMemberInfoHooks'

export default (props: {
  newMemberInfo: IMemberInfo | undefined
  removeId: string | undefined
}) => {
  const { memberInfoList, setMemberInfo } = useMemberInfoHooks(props)

  const [isEditing, setIsEditing] = useState<boolean>(false)

  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const onAddPress = useCallback(async () => {
    const newCameraPermission = await Camera.requestCameraPermission()
    if (newCameraPermission === 'denied') {
      return
    } else {
      navigation.navigate('ScannerModal')
    }
  }, [navigation])

  const onItemPress = useCallback(
    (memberInfo: IMemberInfo) => {
      navigation.navigate('Detail', { memberInfo })
    },
    [navigation]
  )

  const onStartEditing = useCallback(() => setIsEditing(true), [])

  const onEndEditing = useCallback(() => setIsEditing(false), [])

  const moveMemberInfo = useCallback(
    (newList: Array<IMemberInfo>) => setMemberInfo(newList),
    [setMemberInfo]
  )

  return {
    memberInfoList,
    isEditing,
    onStartEditing,
    onEndEditing,
    onAddPress,
    onItemPress,
    moveMemberInfo
  }
}
