import { IIconInfo } from 'models/IMember'
import React from 'react'
import { Image, Text, View } from 'react-native'

import styles from './styles'

const CompanyIcon = ({ logoImg, companyName, bgColor, textColor, fontSize }: IIconInfo) => {
  if (logoImg !== undefined) {
    return <Image style={styles.icon} source={{ uri: logoImg }} />
  }

  return (
    <View style={[styles.icon, { backgroundColor: bgColor }]}>
      <Text adjustsFontSizeToFit={true} style={[styles.text, { color: textColor, fontSize }]}>
        {companyName}
      </Text>
    </View>
  )
}

export default CompanyIcon
