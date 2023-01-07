import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import useScanResultModalHooks from './useScanResultModalHooks'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from 'routes/RoutesType'
import Barcode from '@kichiyaki/react-native-barcode-generator'
import FloatingBtn from 'commons/components/FloatingBtn/FloatingBtn'
import { screenWidth } from 'constants/VALUE'
import QRCodeView from 'commons/components/QRCodeView/QRCodeView'

type ScanResultModalProps = NativeStackScreenProps<StackParamList, 'ScanResultModal'>

const ScanResultModal = (props: ScanResultModalProps) => {
  const { onClosePress, onNextPress } = useScanResultModalHooks(props.route.params)

  const { memberId, format } = props.route.params

  return (
    <View style={styles.bg}>
      <Text style={styles.text}>Please confirm the member id is correct</Text>
      <Text style={styles.text}>{memberId}</Text>
      {format !== undefined ? (
        <Barcode style={styles.barcode} format={format} value={memberId} maxWidth={screenWidth} />
      ) : (
        <QRCodeView style={styles.qrCode} value={memberId} size={screenWidth * 0.6} />
      )}
      <FloatingBtn style={styles.closeBtn} iconName="close" onPress={onClosePress} />
      <FloatingBtn iconName="caret-right" onPress={onNextPress} />
    </View>
  )
}

export default ScanResultModal
