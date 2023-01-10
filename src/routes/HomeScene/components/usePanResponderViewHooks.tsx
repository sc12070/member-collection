import { itemSize } from 'constants/VALUE'
import { useMemo, useRef } from 'react'
import { Animated, PanResponder } from 'react-native'

const sectionWidth = itemSize / 2

export default ({
  index,
  isEditing,
  onStartDrag,
  updateDragToIndex,
  onEndDrag
}: {
  index: number
  isEditing: boolean
  onStartDrag: (index: number) => void
  updateDragToIndex: (index: number | undefined) => void
  onEndDrag: (from: number, to: number) => void
}) => {
  const row = useMemo(() => index % 3, [index])
  const column = useMemo(() => Math.floor(index / 3), [index])
  const normaliseXOffset = useMemo(() => itemSize * row + sectionWidth, [row])
  const normaliseYOffset = useMemo(() => itemSize * column + sectionWidth, [column])
  const dummyPanResponder = useMemo(() => ({ panHandlers: {} }), [])

  const dragXAnimRef = useRef(new Animated.Value(0))
  const dragYAnimRef = useRef(new Animated.Value(0))

  const toIndexRef = useRef<number>(index)

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (_evt, _gestureState) => true,
        onStartShouldSetPanResponderCapture: (_evt, _gestureState) => true,
        onMoveShouldSetPanResponder: (_evt, _gestureState) => true,
        onMoveShouldSetPanResponderCapture: (_evt, _gestureState) => true,
        onPanResponderStart: (_evt, _gestureState) => {
          onStartDrag(index)
        },
        onPanResponderMove: (_evt, gestureState) => {
          const { dx, dy } = gestureState

          const normaliseX = normaliseXOffset + dx
          const normaliseY = normaliseYOffset + dy
          const sectionX = Math.floor(normaliseX / sectionWidth / 2)
          const sectionY = Math.floor(normaliseY / sectionWidth / 2)
          toIndexRef.current = sectionY * 3 + sectionX
          updateDragToIndex(toIndexRef.current)

          dragXAnimRef.current.setValue(dx)
          dragYAnimRef.current.setValue(dy)
        },
        onPanResponderTerminationRequest: (_evt, _gestureState) => false,
        onPanResponderRelease: (_evt, _gestureState) => {
          onEndDrag(index, toIndexRef.current)
          dragXAnimRef.current.setValue(0)
          dragYAnimRef.current.setValue(0)
        },
        onPanResponderTerminate: (_evt, _gestureState) => {},
        onShouldBlockNativeResponder: (_evt, _gestureState) => {
          return true
        }
      }),
    [index, normaliseXOffset, normaliseYOffset, onStartDrag, updateDragToIndex, onEndDrag]
  )

  return {
    panResponder: isEditing ? panResponder : dummyPanResponder,
    dragXAnim: dragXAnimRef.current,
    dragYAnim: dragYAnimRef.current
  }
}
