import { StyleSheet } from 'react-native'
import COLORS from 'constants/COLORS'

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: COLORS.bg,
    justifyContent: 'center'
  },
  qrCodeWrapper: {
    backgroundColor: 'white',
    padding: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconWrapper: {
    opacity: 1,
    position: 'absolute',
    marginBottom: 20,
    transform: [{ scale: 0.6 }]
  },
  barcode: {
    marginTop: 50,
    marginVertical: 20,
    paddingVertical: 10
  },
  text: {
    color: COLORS.text,
    fontSize: 20,
    alignSelf: 'center'
  },
  closeBtn: {
    left: 10
  }
})

export default styles
