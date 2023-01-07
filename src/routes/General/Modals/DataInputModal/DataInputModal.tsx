import React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import useDataInputModalHooks from './useDataInputModalHooks'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from 'routes/RoutesType'
import COLORS from 'constants/COLORS'
import CompanyIcon from 'commons/components/CompanyIcon/CompanyIcon'
import Slider from '@react-native-community/slider'
import ColorPicker from 'react-native-wheel-color-picker'
import FloatingBtn from 'commons/components/FloatingBtn/FloatingBtn'

type DataInputModalProps = NativeStackScreenProps<StackParamList, 'DataInputModal'>

const DataInputModal = (props: DataInputModalProps) => {
  const {
    isHideSlider,
    bgColor,
    textColor,
    companyName,
    fontSize,
    isEditingTextColor,
    isEditing,
    palette,
    setCompanyname,
    setFontSize,
    startEditBackgroundColor,
    startEditTextColor,
    onColorChange,
    onClosePress,
    onRemovePress,
    onConfirmPress
  } = useDataInputModalHooks(props.route.params)

  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView bounces={false}>
        <View style={styles.rowWrapper}>
          <TouchableOpacity style={styles.editColorBtn} onPress={startEditBackgroundColor}>
            <Text style={[styles.text, isEditingTextColor && styles.inactive]}>Background</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editColorBtn} onPress={startEditTextColor}>
            <Text style={[styles.text, !isEditingTextColor && styles.inactive]}>Text</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.iconWrapper}>
            <CompanyIcon
              companyName={companyName}
              bgColor={bgColor}
              textColor={textColor}
              fontSize={fontSize}
            />
          </View>
          <ColorPicker
            color={isEditingTextColor ? textColor : bgColor}
            onColorChange={onColorChange}
            swatchesOnly={isHideSlider}
            sliderHidden={false}
            thumbSize={40}
            sliderSize={40}
            noSnap={false}
            row={false}
            swatchesLast={true}
            swatches={false}
            discrete={true}
            palette={palette}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          keyboardVerticalOffset={30}>
          <Text style={styles.text}>Company</Text>
          <TextInput
            style={[styles.text, styles.input]}
            value={companyName}
            placeholder="Company"
            placeholderTextColor={COLORS.subText}
            onChangeText={setCompanyname}
            clearButtonMode="always"
          />
        </KeyboardAvoidingView>
        <Text style={styles.text}>Font size</Text>
        <Slider
          style={styles.slider}
          value={fontSize}
          minimumValue={10}
          maximumValue={50}
          step={1}
          minimumTrackTintColor={COLORS.green}
          maximumTrackTintColor={COLORS.green}
          onValueChange={setFontSize}
        />
      </ScrollView>
      <FloatingBtn style={styles.closeBtn} iconName="close" onPress={onClosePress} />
      {isEditing && (
        <FloatingBtn style={styles.removeBtn} iconName="trash" onPress={onRemovePress} />
      )}
      <FloatingBtn iconName="check" onPress={onConfirmPress} />
    </SafeAreaView>
  )
}

export default DataInputModal
