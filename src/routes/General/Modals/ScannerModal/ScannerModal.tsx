import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Camera } from 'react-native-vision-camera'
import 'react-native-reanimated'
import styles from './styles'
import useScannerModalHooks from './useScannerModalHooks'
import FloatingBtn from 'commons/components/FloatingBtn/FloatingBtn'

const ScannerModal = () => {
  const { isActive, device, frameProcessor, onClosePress } = useScannerModalHooks()

  return (
    <SafeAreaView style={styles.bg}>
      <Text style={styles.text}>Scan your barcode or QR code</Text>
      <View style={styles.cameraWrapper}>
        {device !== undefined ? (
          <Camera
            style={styles.camera}
            device={device}
            frameProcessor={frameProcessor}
            // frameProcessorFps={1}
            isActive={isActive}
          />
        ) : (
          <View style={styles.camera} />
        )}
      </View>
      <FloatingBtn style={styles.closeBtn} iconName="close" onPress={onClosePress} />
    </SafeAreaView>
  )
}

export default ScannerModal
