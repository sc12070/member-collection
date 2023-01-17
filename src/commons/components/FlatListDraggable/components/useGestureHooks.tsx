import { useEffect, useMemo } from 'react'
import { Gesture } from 'react-native-gesture-handler'
import { runOnJS, SharedValue, useSharedValue } from 'react-native-reanimated'

export default ({
  movementOffset,
  itemWidth,
  itemHeight,
  numColumns,
  index,
  isEditing,
  onStartDrag,
  updateDragToIndex,
  onEndDrag
}: {
  movementOffset: SharedValue<any>
  itemWidth: number
  itemHeight: number
  numColumns: number
  index: number
  isEditing: boolean
  onStartDrag: (index: number) => void
  updateDragToIndex: (index: number | undefined) => void
  onEndDrag: (from: number, to: number) => void
}) => {
  const sectionWidth = useMemo(() => itemWidth / 2, [itemWidth])
  const sectionHeight = useMemo(() => itemHeight / 2, [itemHeight])
  const row = useMemo(() => index % numColumns, [index, numColumns])
  const column = useMemo(() => Math.floor(index / numColumns), [index, numColumns])
  const normaliseXOffset = useMemo(
    () => itemWidth * row + sectionWidth,
    [itemWidth, sectionWidth, row]
  )
  const normaliseYOffset = useMemo(
    () => itemHeight * column + sectionHeight,
    [itemHeight, sectionHeight, column]
  )

  const toIndex = useSharedValue<number>(0)

  const gesture = Gesture.Pan()
    .onBegin(() => {
      runOnJS(onStartDrag)(index)
    })
    .onUpdate(e => {
      const { translationX, translationY } = e
      const sectionX = Math.floor((normaliseXOffset + translationX) / sectionWidth / 2)
      const sectionY = Math.floor((normaliseYOffset + translationY) / sectionHeight / 2)
      const newToIndex = sectionY * numColumns + sectionX
      if (newToIndex !== toIndex.value) {
        toIndex.value = newToIndex
        runOnJS(updateDragToIndex)(toIndex.value)
      }

      movementOffset.value = {
        x: e.translationX,
        y: e.translationY
      }
    })
    .onEnd(() => {
      runOnJS(onEndDrag)(index, Math.max(0, toIndex.value))
    })

  useEffect(() => {
    gesture.enabled(isEditing)
  }, [isEditing, gesture])

  return {
    gesture
  }
}
