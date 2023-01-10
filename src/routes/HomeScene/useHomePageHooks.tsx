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
  const { memberInfoList, moveMemberInfo } = useMemberInfoHooks(props)

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isEnableScroll, setIsEnableScroll] = useState<boolean>(true)
  const [dragIndex, setDragIndex] = useState<number | undefined>(undefined)
  const [dragToIndex, setDragToIndex] = useState<number | undefined>(undefined)

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

  const onStartDrag = useCallback((index: number) => {
    setIsEnableScroll(false)
    setDragIndex(index)
  }, [])

  const updateDragToIndex = useCallback((index: number | undefined) => setDragToIndex(index), [])

  const onEndDrag = useCallback(
    (from: number, to: number) => {
      setIsEnableScroll(true)
      setDragIndex(undefined)
      setDragToIndex(undefined)
      if (from === to) {
        return
      }
      moveMemberInfo(from, to)
    },
    [moveMemberInfo]
  )

  return {
    memberInfoList,
    dragIndex,
    dragToIndex,
    isEditing,
    isEnableScroll,
    onStartEditing,
    onEndEditing,
    onAddPress,
    onItemPress,
    onStartDrag,
    updateDragToIndex,
    onEndDrag
  }
}
