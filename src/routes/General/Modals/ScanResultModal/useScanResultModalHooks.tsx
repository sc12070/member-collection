import { useNavigation } from '@react-navigation/native'
import { formatMapping } from 'models/Barcode'
import { useCallback } from 'react'

export default ({ memberId, format }: { memberId: string; format: string }) => {
  const navigation = useNavigation()

  const onNextPress = useCallback(
    () =>
      navigation.navigate(
        'DataInputModal' as never,
        { memberId, format: formatMapping[format] } as never
      ),
    [memberId, format, navigation]
  )

  return {
    generatorFormat: formatMapping[format],
    onNextPress
  }
}
