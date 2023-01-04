import AsyncStorage from '@react-native-async-storage/async-storage'

const get = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch (e) {
    console.warn('asyncStorageHelper.get failed', e)
  }
}

const multiGet = async (keyList: Array<string>) => {
  try {
    return await AsyncStorage.multiGet(keyList)
  } catch (e) {
    console.warn('asyncStorageHelper.multiGet failed', e)
  }
}

const save = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    console.warn('asyncStorageHelper.save failed', e)
  }
}

const multiSave = async (keyValuePairs: Array<[string, string]>) => {
  try {
    await AsyncStorage.multiSet(keyValuePairs)
  } catch (e) {
    console.warn('asyncStorageHelper.save failed', e)
  }
}

const remove = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
    console.warn('asyncStorageHelper.remove failed', e)
  }
}

export default { get, multiGet, save, multiSave, remove }
