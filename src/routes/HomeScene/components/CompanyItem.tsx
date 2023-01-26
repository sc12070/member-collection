import CompanyIcon from 'commons/components/CompanyIcon/CompanyIcon'
import { IMemberInfo } from 'models/IMember'
import React, { memo } from 'react'
import { TouchableOpacity } from 'react-native'
import useCompanyItemHooks from './useCompanyItemHooks'

const CompanyItem = ({
  memberInfo,
  onItemPress,
  onItemLongPress
}: {
  memberInfo: IMemberInfo
  onItemPress: (memberInfo: IMemberInfo) => void
  onItemLongPress: () => void
}) => {
  const { onPress } = useCompanyItemHooks({ memberInfo, onItemPress })

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onItemLongPress}>
      <CompanyIcon {...memberInfo} />
    </TouchableOpacity>
  )
}

export default memo(CompanyItem)
