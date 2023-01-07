import { formatRNQRGeneratorMapping } from 'models/Barcode'
import { useCallback } from 'react'
import { launchImageLibrary } from 'react-native-image-picker'
import RNQRGenerator from 'rn-qr-generator'

export default () => {
  const scanCodeInPhoto = useCallback(async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      quality: 1
    })
    if (result.assets === undefined) {
      return undefined
    }
    const imageInfo = result.assets[0]
    if (imageInfo === undefined || imageInfo.uri === undefined) {
      return undefined
    }
    try {
      const codes = await RNQRGenerator.detect({
        uri: imageInfo.uri
      })
      if (codes.values.length > 0) {
        return {
          memberId: codes.values[0],
          format: formatRNQRGeneratorMapping[codes.type]
        }
      }
    } catch {}
    return undefined
  }, [])

  return {
    scanCodeInPhoto
  }
}
