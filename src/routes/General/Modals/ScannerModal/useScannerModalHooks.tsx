import { Format } from '@kichiyaki/react-native-barcode-generator'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { formatMapping } from 'models/Barcode'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Alert } from 'react-native'
import { runOnJS } from 'react-native-reanimated'
import { Camera, Frame, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera'
import { BarcodeFormat, scanBarcodes } from 'vision-camera-code-scanner'

export default () => {
  const isCompletedRef = useRef<boolean>(false)
  const memberIdRef = useRef<string | undefined>(undefined)
  const formatRef = useRef<Format | undefined>(undefined)

  const [isActive, setIsActive] = useState<boolean>(true)
  const [isTimeouted, setIsTimeouted] = useState<boolean>(false)

  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const devices = useCameraDevices()
  const device = devices.back

  const onGetCodes = useCallback(
    ({ memberId, formatIdx }: { memberId: string; formatIdx: number }) => {
      if (isCompletedRef.current === true) {
        return
      }
      isCompletedRef.current = true
      memberIdRef.current = memberId
      formatRef.current = formatMapping[BarcodeFormat[formatIdx]]
      setIsActive(false)
    },
    []
  )

  const frameProcessor = useFrameProcessor((frame: Frame) => {
    'worklet'
    const barcodes = scanBarcodes(frame, [BarcodeFormat.ALL_FORMATS])
    if (barcodes[0] !== undefined && barcodes[0].rawValue !== undefined) {
      const rawValue = barcodes[0].rawValue
      runOnJS(onGetCodes)({ memberId: rawValue, formatIdx: barcodes[0].format })
    }
  }, [])

  const initCamera = useCallback(async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus()
    if (cameraPermission !== 'denied') {
      return
    }
    const newCameraPermission = await Camera.requestCameraPermission()
    if (newCameraPermission === 'denied') {
      Alert.alert('Sorry', 'We must access to camera, please try again')
      navigation.goBack()
    }
  }, [navigation])

  const onClosePress = useCallback(() => {
    setIsActive(false)
  }, [])

  useEffect(() => {
    if (isActive === true) {
      return
    }
    if (isCompletedRef.current === true && memberIdRef.current !== undefined) {
      navigation.navigate('ScanResultModal', {
        memberId: memberIdRef.current,
        format: formatRef.current
      })
    } else {
      navigation.goBack()
    }
  }, [isActive, navigation])

  useEffect(() => {
    // if (__DEV__) {
    //   isCompletedRef.current = true
    //   memberIdRef.current = '633174918714801207'
    //   formatRef.current = formatMapping[BarcodeFormat[BarcodeFormat.CODE_128]]
    //   setIsActive(false)
    //   return
    // }
    initCamera()
    setTimeout(() => setIsTimeouted(true), 500)
    return () => {
      setIsActive(false)
    }
  }, [initCamera])

  return {
    isActive: isActive && isTimeouted,
    device,
    frameProcessor,
    onClosePress
  }
}
