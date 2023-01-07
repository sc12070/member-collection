import { Format } from '@kichiyaki/react-native-barcode-generator'

export interface IIconInfo {
  companyName: string
  bgColor: string
  textColor: string
  fontSize: number
  logoImg?: string | undefined
}

export interface IMemberInfo extends IIconInfo {
  id: string
  memberId: string
  format?: Format
  withQR: boolean
}
