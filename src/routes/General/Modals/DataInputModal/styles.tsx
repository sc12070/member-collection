import { StyleSheet } from 'react-native'
import COLORS from 'constants/COLORS'

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  wrapper: {
    height: 300,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  iconWrapper: {
    alignSelf: 'center'
  },
  text: {
    fontSize: 20,
    color: COLORS.text,
    marginBottom: 10
  },
  input: {
    fontSize: 18,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginBottom: 20
  },
  fontSizeWrapper: {
    flexDirection: 'row'
  },
  slider: {
    width: '90%',
    height: 40,
    alignSelf: 'center',
    marginBottom: 20
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  inactive: {
    opacity: 0.6
  },
  editColorBtn: {
    flex: 1,
    alignItems: 'center'
  }
})

export default styles
