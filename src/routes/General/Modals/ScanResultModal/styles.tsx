import { StyleSheet } from 'react-native'
import COLORS from 'constants/COLORS'

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingVertical: 20,
    paddingHorizontal: 0,
    justifyContent: 'center'
  },
  barcode: {
    marginVertical: 20,
    paddingVertical: 10
  },
  text: {
    fontSize: 20,
    color: COLORS.text,
    alignSelf: 'center',
    marginVertical: 5
  }
})

export default styles
