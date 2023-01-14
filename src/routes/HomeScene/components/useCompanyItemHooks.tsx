import { IMemberInfo } from 'models/IMember'
import { useCallback } from 'react'

export default ({
  memberInfo,
  onItemPress
}: {
  memberInfo: IMemberInfo
  onItemPress: (memberInfo: IMemberInfo) => void
}) => {
  const onPress = useCallback(() => onItemPress(memberInfo), [memberInfo, onItemPress])

  return {
    onPress
  }
}
