import { useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'

export default () => {
  const navigation = useNavigation()

  const onBack = useCallback(() => navigation.goBack(), [navigation])

  return {
    onBack
  }
}
