import { NativeStackScreenProps } from '@react-navigation/native-stack'
import CompanyIcon from 'commons/components/CompanyIcon/CompanyIcon'
import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackParamList } from 'routes/RoutesType'
import QRCode from 'react-native-qrcode-svg'
import Slider from '@react-native-community/slider'
import styles from './styles'
import useDetailPageHooks from './useDetailPageHooks'
import { screenWidth } from 'constants/VALUE'
import Barcode from '@kichiyaki/react-native-barcode-generator'
import FloatingBtn from 'commons/components/FloatingBtn/FloatingBtn'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from 'constants/COLORS'

type DetailPageProps = NativeStackScreenProps<StackParamList, 'Detail'>

const DetailPage = (props: DetailPageProps) => {
  const { memberInfo } = props.route.params
  const { currentBrightness, onBrightnessChange, onBack } = useDetailPageHooks()

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.qrCodeWrapper}>
        <QRCode
          value={memberInfo.memberId}
          size={screenWidth * 0.6}
          logo={require('assets/icons/pin_home.png')}
          logoSize={40}
          logoMargin={5}
        />
        <View style={styles.iconWrapper}>
          <CompanyIcon {...memberInfo} />
        </View>
      </View>
      {memberInfo.format !== undefined && (
        <Barcode
          style={styles.barcode}
          format={memberInfo.format}
          value={memberInfo.memberId}
          maxWidth={screenWidth}
        />
      )}
      <FloatingBtn iconName="caret-left" style={styles.closeBtn} onPress={onBack} />
      <Text style={styles.text}>{memberInfo.memberId}</Text>
      <Slider
        style={styles.slider}
        value={currentBrightness}
        minimumValue={0}
        maximumValue={1}
        step={0.01}
        minimumTrackTintColor={COLORS.green}
        maximumTrackTintColor={COLORS.green}
        onValueChange={onBrightnessChange}
      />
      <MaterialCommunityIcons
        style={styles.brightnessIcon}
        name="white-balance-sunny"
        size={30}
        color={COLORS.text}
      />
    </SafeAreaView>
  )
}

export default DetailPage
