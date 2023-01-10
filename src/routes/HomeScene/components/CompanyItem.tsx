import CompanyIcon from 'commons/components/CompanyIcon/CompanyIcon'
import { IMemberInfo } from 'models/IMember'
import React from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import styles from './styles'
import useAnimHooks from './useAnimHooks'
import usePanResponderViewHooks from './usePanResponderViewHooks'

const CompanyItem = ({
  memberInfo,
  isEditing,
  index,
  dragItemOriginIndex,
  dragItemTargetIndex,
  onItemPress,
  onItemLongPress,
  onStartDrag,
  updateDragToIndex,
  onEndDrag
}: {
  memberInfo: IMemberInfo
  isEditing: boolean
  index: number
  dragItemOriginIndex: number | undefined
  dragItemTargetIndex: number | undefined
  onItemPress: (memberInfo: IMemberInfo) => void
  onItemLongPress: () => void
  onStartDrag: (index: number) => void
  updateDragToIndex: (index: number | undefined) => void
  onEndDrag: (from: number, to: number) => void
}) => {
  const { moveXAnim, moveYAnim, rotateAnim } = useAnimHooks({
    isEditing,
    index,
    dragItemOriginIndex,
    dragItemTargetIndex
  })

  const { panResponder, dragXAnim, dragYAnim } = usePanResponderViewHooks({
    index,
    isEditing,
    onStartDrag,
    updateDragToIndex,
    onEndDrag
  })

  const onPress = () => onItemPress(memberInfo)

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.wrapper,
        {
          transform: [
            {
              translateX: index === dragItemOriginIndex ? dragXAnim : moveXAnim
            },
            {
              translateY: index === dragItemOriginIndex ? dragYAnim : moveYAnim
            },
            {
              rotate: rotateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '3deg']
              })
            }
          ]
        }
      ]}>
      <TouchableOpacity onPress={onPress} onLongPress={onItemLongPress}>
        <CompanyIcon {...memberInfo} />
      </TouchableOpacity>
    </Animated.View>
  )
}

export default CompanyItem
