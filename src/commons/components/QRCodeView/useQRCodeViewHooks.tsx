import { useCallback, useEffect, useState } from 'react'
import RNQRGenerator from 'rn-qr-generator'
import { screenWidth } from 'constants/VALUE'

export default (value: string) => {
  const [qrBase64, setQrBase64] = useState<string>('')

  const generateQrCodeImage = useCallback(async (v: string) => {
    const result = await RNQRGenerator.generate({
      value: v,
      height: screenWidth * 0.6,
      width: screenWidth * 0.6,
      correctionLevel: 'H',
      base64: true
    })
    console.log('result.base64', result)
    if (result.base64 !== undefined) {
      setQrBase64(result.base64)
    } else {
      setQrBase64('')
    }
  }, [])

  useEffect(() => {
    generateQrCodeImage(value)
  }, [value, generateQrCodeImage])

  return {
    qrBase64
  }
}
