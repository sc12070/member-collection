import CompanyIcon from 'commons/components/CompanyIcon/CompanyIcon'
import { IMemberInfo } from 'models/IMember'
import React from 'react'
import { TouchableOpacity } from 'react-native'

import styles from './styles'

const CompanyItem = ({
  memberInfo,
  onItemPress,
  onItemLongPress
}: {
  memberInfo: IMemberInfo
  onItemPress: (memberInfo: IMemberInfo) => void
  onItemLongPress: (memberInfo: IMemberInfo) => void
}) => {
  const onPress = () => onItemPress(memberInfo)

  const onLongPress = () => onItemLongPress(memberInfo)

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress} onLongPress={onLongPress}>
      <CompanyIcon {...memberInfo} />
    </TouchableOpacity>
  )
}

export default CompanyItem
