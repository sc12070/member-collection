import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Camera } from 'react-native-vision-camera'
import 'react-native-reanimated'
import styles from './styles'
import useScannerModalHooks from './useScannerModalHooks'
import FloatingBtn from 'commons/components/FloatingBtn/FloatingBtn'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from 'constants/COLORS'

const ScannerModal = () => {
  const { isActive, torchState, device, frameProcessor, toggleTorch, onClosePress } =
    useScannerModalHooks()

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
            torch={torchState}
          />
        ) : (
          <View style={styles.camera} />
        )}
      </View>
      <TouchableOpacity onPress={toggleTorch} style={styles.torchBtn}>
        <MaterialCommunityIcons
          name={torchState === 'on' ? 'flashlight' : 'flashlight-off'}
          size={30}
          color={torchState === 'on' ? COLORS.text : COLORS.inactive}
        />
      </TouchableOpacity>
      <FloatingBtn style={styles.closeBtn} iconName="close" onPress={onClosePress} />
    </SafeAreaView>
  )
}

export default ScannerModal
