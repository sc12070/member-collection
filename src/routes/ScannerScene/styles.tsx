import { StyleSheet } from 'react-native'
import COLORS from 'constants/COLORS'
import { screenWidth } from 'constants/VALUE'

const cameraWrapper = screenWidth * 0.82
const cameraWidth = screenWidth * 0.8

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    height: 40,
    fontSize: 20,
    color: COLORS.text
  },
  cameraWrapper: {
    width: cameraWrapper,
    height: cameraWrapper,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center'
  },
  camera: {
    width: cameraWidth,
    height: cameraWidth,
    backgroundColor: COLORS.bg,
    borderWidth: 5
  },
  torchBtn: {
    margin: 20
  },
  pickerWrapper: {
    alignItems: 'center'
  },
  pickerBtn: {
    right: 10
  },
  closeBtn: {
    left: 10
  }
})

export default styles
