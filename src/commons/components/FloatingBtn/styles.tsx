import { StyleSheet } from 'react-native'
import COLORS from 'constants/COLORS'

const styles = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    bottom: 30,
    right: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default styles
