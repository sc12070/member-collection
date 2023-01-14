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
  Scanner: undefined
  ScanResult: {
    memberId: string
    format: Format
  }
  DataInput: {
    memberInfo: IMemberInfo
    isEditing: boolean
  }
}

export const Stack = createNativeStackNavigator<StackParamList>()
