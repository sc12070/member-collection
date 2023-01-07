import React from 'react'
import { Image, ImageStyle, View } from 'react-native'

import useQRCodeViewHooks from './useQRCodeViewHooks'

const QRCodeView = ({
  value,
  size,
  style
}: {
  value: string
  size: number
  style?: ImageStyle
}) => {
  const { qrBase64 } = useQRCodeViewHooks(value)

  if (qrBase64 === '') {
    return <View style={[style, { width: size, height: size }]} />
  }

  return (
    <Image
      style={[style, { width: size, height: size }]}
      source={{ uri: `data:image/png;base64,${qrBase64}` }}
    />
  )
}

export default QRCodeView
