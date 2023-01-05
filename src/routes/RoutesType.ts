import { Format } from '@kichiyaki/react-native-barcode-generator'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { IMemberInfo } from 'models/IMember'

export type StackParamList = {
  Home: {
    newMemberInfo: IMemberInfo | undefined
    removeId: string | undefined
  }
  Detail: {
    memberInfo: IMemberInfo
  }
  ScannerModal: undefined
  ScanResultModal: {
    memberId: string
    format: Format
  }
  DataInputModal: {
    memberInfo: IMemberInfo
    isEditing: boolean
  }
}

export const Stack = createNativeStackNavigator<StackParamList>()
