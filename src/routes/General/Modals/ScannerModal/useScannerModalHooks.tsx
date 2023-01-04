import { useNavigation } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'
import { useCameraDevices } from 'react-native-vision-camera'
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner'

export default () => {
  const memberIdRef = useRef<string>('')
  const formatRef = useRef<string>('')

  const [isActive, setIsActive] = useState<boolean>(true)

  const navigation = useNavigation()

  const devices = useCameraDevices()
  const device = devices.back

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.ALL_FORMATS], {
    checkInverted: true
  })

  useEffect(() => {
    if (isActive === false) {
      navigation.navigate(
        'ScanResultModal' as never,
        { memberId: memberIdRef.current, format: formatRef.current } as never
      )
    }
  }, [isActive, navigation])

  useEffect(() => {
    if (barcodes[0] !== undefined && barcodes[0].rawValue !== undefined) {
      memberIdRef.current = barcodes[0].rawValue
      formatRef.current = BarcodeFormat[barcodes[0].format]
      setIsActive(false)
    }
  }, [barcodes])

  useEffect(() => {
    if (__DEV__) {
      memberIdRef.current = '633174918714801207'
      formatRef.current = BarcodeFormat[BarcodeFormat.CODE_128]
      setIsActive(false)
    }
    return () => {
      setIsActive(false)
    }
  }, [])

  return {
    isActive,
    device,
    barcodes,
    frameProcessor
  }
}
