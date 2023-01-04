import { NativeStackScreenProps } from '@react-navigation/native-stack'
import CompanyIcon from 'commons/components/CompanyIcon/CompanyIcon'
import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackParamList } from 'routes/RoutesType'
import QRCode from 'react-native-qrcode-svg'
import styles from './styles'
import useDetailPageHooks from './useDetailPageHooks'
import { screenWidth } from 'constants/VALUE'
import Barcode from '@kichiyaki/react-native-barcode-generator'
import FloatingBtn from 'commons/components/FloatingBtn/FloatingBtn'

type DetailPageProps = NativeStackScreenProps<StackParamList, 'Detail'>

const DetailPage = (props: DetailPageProps) => {
  const { memberInfo } = props.route.params
  const { onBack } = useDetailPageHooks()

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.qrCodeWrapper}>
        <QRCode
          value={memberInfo.memberId}
          size={screenWidth * 0.8}
          logo={require('assets/icons/pin_home.png')}
          logoSize={40}
          logoMargin={5}
        />
        <View style={styles.iconWrapper}>
          <CompanyIcon {...memberInfo} />
        </View>
      </View>
      <Barcode
        style={styles.barcode}
        format={memberInfo.format}
        value={memberInfo.memberId}
        maxWidth={screenWidth}
      />
      <FloatingBtn iconName="caret-left" style={styles.closeBtn} onPress={onBack} />
      <Text style={styles.text}>{memberInfo.memberId}</Text>
    </SafeAreaView>
  )
}

export default DetailPage
