import { Format } from '@kichiyaki/react-native-barcode-generator'

export interface IFormatMapping {
  [key: string]: Format
}

export const formatMapping: IFormatMapping = {
  CODE_128: 'CODE128',
  CODE_39: 'CODE39',
  CODABAR: 'codabar',
  EAN_13: 'EAN13',
  EAN_8: 'EAN8',
  ITF: 'ITF',
  UPC_A: 'UPC',
  UPC_E: 'UPCE'
}

export const formatRNQRGeneratorMapping: IFormatMapping = {
  Code128: 'CODE128',
  Code39: 'CODE39',
  Codabar: 'codabar',
  Ean13: 'EAN13',
  Ean8: 'EAN8',
  ITF: 'ITF',
  UPCA: 'UPC',
  UPCE: 'UPCE'
}
