import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Camera } from 'react-native-vision-camera'
import 'react-native-reanimated'
import styles from './styles'
import useScannerPageHooks from './useScannerPageHooks'
import FloatingBtn from 'commons/components/FloatingBtn/FloatingBtn'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/FontAwesome'
import COLORS from 'constants/COLORS'

const ScannerPage = () => {
  const { isActive, torchState, device, frameProcessor, toggleTorch, onPickerPress, onClosePress } =
    useScannerPageHooks()

  return (
    <SafeAreaView style={styles.bg}>
      <Text style={styles.text}>Scan your code by camera</Text>
      <View style={styles.cameraWrapper}>
        {device !== undefined ? (
          <Camera
            style={styles.camera}
            device={device}
            frameProcessor={frameProcessor}
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
      <Text style={styles.text}>Or</Text>
      <TouchableOpacity style={styles.pickerWrapper} onPress={onPickerPress}>
        <Text style={styles.text}>Scan your code from gallery</Text>
        <Icon name="photo" size={30} color={COLORS.text} />
      </TouchableOpacity>
      <FloatingBtn style={styles.pickerBtn} iconName="photo" onPress={onPickerPress} />
      <FloatingBtn style={styles.closeBtn} iconName="close" onPress={onClosePress} />
    </SafeAreaView>
  )
}

export default ScannerPage
