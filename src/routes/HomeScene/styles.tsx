import { StyleSheet } from 'react-native'
import COLORS from 'constants/COLORS'

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    margin: 20,
    fontSize: 25,
    color: COLORS.text,
    textAlign: 'center'
  },
  flex: {
    flex: 1
  },
  list: {
    justifyContent: 'space-between',
    paddingBottom: 60
  },
  addBtn: {
    position: 'relative',
    marginTop: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default styles
