import { StyleSheet } from 'react-native'
import COLORS from 'constants/COLORS'

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible'
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
    width: '100%',
    overflow: 'visible'
  },
  content: {
    justifyContent: 'flex-start',
    paddingBottom: 60
  },
  itemContainer: {
    padding: 10
  },
  addBtn: {
    position: 'relative',
    marginTop: 20,
    marginLeft: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.green
  },
  endEditBtn: {
    backgroundColor: COLORS.gold
  }
})

export default styles
