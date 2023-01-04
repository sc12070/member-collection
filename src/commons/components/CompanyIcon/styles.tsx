import { StyleSheet } from 'react-native'
import COLORS from 'constants/COLORS'
import { iconWidth } from 'constants/VALUE'

const styles = StyleSheet.create({
  icon: {
    height: iconWidth,
    width: iconWidth,
    borderRadius: 20,
    backgroundColor: COLORS.bg,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default styles
