import { Format } from '@kichiyaki/react-native-barcode-generator'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { IMemberInfo } from 'models/IMember'

export type StackParamList = {
  Home: undefined
  Detail: {
    memberInfo: IMemberInfo
  }
  ScannerModal: undefined
  DataInputModal: {
    memberId: string
    format: Format
  }
  ScanResultModal: {
    memberId: string
    format: Format
  }
}

export const Stack = createNativeStackNavigator<StackParamList>()
