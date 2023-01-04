import { Dimensions } from 'react-native'

// height in android would be affected by soft menu bar
export const screenWidth = Dimensions.get('window').width

export const iconWidth = (screenWidth - 60) / 3
