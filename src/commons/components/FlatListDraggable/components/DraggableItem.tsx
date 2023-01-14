import React from 'react'
import { Animated, View, ViewStyle } from 'react-native'
import styles from './styles'
import useAnimHooks from './useAnimHooks'
import useDraggableItemHooks from './useDraggableItemHooks'
import usePanResponderViewHooks from './usePanResponderViewHooks'

const DraggableItem = ({
  children,
  style,
  itemWidth,
  itemHeight,
  numColumns,
  isEditing,
  index,
  dragItemOriginIndex,
  dragItemTargetIndex,
  animMoveDuration,
  onStartDrag,
  updateDragToIndex,
  onEndDrag
}: {
  children?: JSX.Element
  itemWidth: number
  itemHeight: number
  numColumns: number
  style: ViewStyle
  isEditing: boolean
  index: number
  dragItemOriginIndex: number | undefined
  dragItemTargetIndex: number | undefined
  animMoveDuration: number
  onStartDrag: (index: number) => void
  updateDragToIndex: (index: number | undefined) => void
  onEndDrag: (from: number, to: number) => void
}) => {
  const { isDragging } = useDraggableItemHooks({
    index,
    dragItemOriginIndex
  })

  const { moveXAnim, moveYAnim, rotateAnim } = useAnimHooks({
    itemWidth,
    itemHeight,
    numColumns,
    isEditing,
    index,
    dragItemOriginIndex,
    dragItemTargetIndex,
    animMoveDuration
  })

  const { panResponder, dragXAnim, dragYAnim } = usePanResponderViewHooks({
    itemWidth,
    itemHeight,
    numColumns,
    index,
    isEditing,
    onStartDrag,
    updateDragToIndex,
    onEndDrag
  })

  return (
    <Animated.View
      style={[
        style,
        styles.wrapper,
        {
          width: itemWidth,
          height: itemHeight,
          transform: [
            {
              translateX: isDragging ? dragXAnim : moveXAnim
            },
            {
              translateY: isDragging ? dragYAnim : moveYAnim
            },
            {
              rotate: rotateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '3deg']
              })
            }
          ]
        },
        isDragging && styles.dragging
      ]}>
      <View {...panResponder.panHandlers}>{children}</View>
    </Animated.View>
  )
}

export default DraggableItem
