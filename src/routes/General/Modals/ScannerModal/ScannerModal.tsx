import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Camera } from 'react-native-vision-camera'
import 'react-native-reanimated'
import styles from './styles'
import useScannerModalHooks from './useScannerModalHooks'

const ScannerModal = () => {
  const { isActive, device, frameProcessor } = useScannerModalHooks()

  if (device == null) {
    return <View style={styles.bg} />
  }

  return (
    <SafeAreaView style={styles.bg}>
      <Text style={styles.text}>Scan your barcode or QR code</Text>
      <View style={styles.cameraWrapper}>
        <Camera
          style={styles.absoluteFill}
          device={device}
          frameProcessor={frameProcessor}
          isActive={isActive}
        />
      </View>
    </SafeAreaView>
  )
}

export default ScannerModal
