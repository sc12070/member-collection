import { IMemberInfo } from 'models/IMember'
import { useCallback, useMemo } from 'react'

export default ({
  memberInfo,
  index,
  dragItemOriginIndex,
  onItemPress
}: {
  memberInfo: IMemberInfo
  index: number | undefined
  dragItemOriginIndex: number | undefined
  onItemPress: (memberInfo: IMemberInfo) => void
}) => {
  const isDragging = useMemo(() => index === dragItemOriginIndex, [index, dragItemOriginIndex])

  const onPress = useCallback(() => onItemPress(memberInfo), [memberInfo, onItemPress])

  return {
    isDragging,
    onPress
  }
}
