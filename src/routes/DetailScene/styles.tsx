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
    paddingVertical: 10
  },
  text: {
    marginTop: 20,
    color: COLORS.text,
    fontSize: 20,
    alignSelf: 'center'
  },
  closeBtn: {
    left: 10
  },
  modifyBtn: {
    right: 10,
    backgroundColor: COLORS.gold
  },
  removeBtn: {
    right: 75,
    backgroundColor: COLORS.red
  },
  slider: {
    marginHorizontal: 20,
    marginTop: 30
  },
  brightnessIcon: {
    alignSelf: 'center',
    marginBottom: 50
  }
})

export default styles
