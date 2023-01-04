import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import useScanResultModalHooks from './useScanResultModalHooks'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from 'routes/RoutesType'
import Barcode from '@kichiyaki/react-native-barcode-generator'
import FloatingBtn from 'commons/components/FloatingBtn/FloatingBtn'
import { screenWidth } from 'constants/VALUE'

type ScanResultModalProps = NativeStackScreenProps<StackParamList, 'ScanResultModal'>

const ScanResultModal = (props: ScanResultModalProps) => {
  const { generatorFormat, onNextPress } = useScanResultModalHooks(props.route.params)

  const { memberId, format } = props.route.params

  if (format === undefined) {
    // QR code
    return null
  }

  return (
    <View style={styles.bg}>
      <Text style={styles.text}>Please confirm the member id is correct</Text>
      <Text style={styles.text}>{memberId}</Text>
      <Barcode
        style={styles.barcode}
        format={generatorFormat}
        value={memberId}
        maxWidth={screenWidth}
      />
      <FloatingBtn iconName="caret-right" onPress={onNextPress} />
    </View>
  )
}

export default ScanResultModal
