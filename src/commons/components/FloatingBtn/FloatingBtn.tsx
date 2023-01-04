import COLORS from 'constants/COLORS'
import React from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'

const FloatingBtn = ({
  iconName,
  style,
  onPress
}: {
  iconName: string
  style?: ViewStyle
  onPress: () => void
}) => {
  return (
    <TouchableOpacity style={[styles.addBtn, style]} onPress={onPress}>
      <Icon name={iconName} size={30} color={COLORS.bg} />
    </TouchableOpacity>
  )
}

export default FloatingBtn
