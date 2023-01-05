import { NativeStackScreenProps } from '@react-navigation/native-stack'
import FloatingBtn from 'commons/components/FloatingBtn/FloatingBtn'
import { IMemberInfo } from 'models/IMember'
import React from 'react'
import { Text, FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackParamList } from 'routes/RoutesType'
import CompanyItem from './components/CompanyItem'
import styles from './styles'
import useHomePageHooks from './useHomePageHooks'

type HomeProps = NativeStackScreenProps<StackParamList, 'Home'>

const HomePage = (props: HomeProps) => {
  const { memberInfoList, onItemPress, onItemLongPress, onAddPress } = useHomePageHooks(
    props.route.params
  )

  if (memberInfoList.length === 0) {
    return (
      <SafeAreaView style={styles.bg}>
        <Text style={styles.text}>Add your first member info</Text>
        <FloatingBtn style={styles.addBtn} iconName="plus" onPress={onAddPress} />
      </SafeAreaView>
    )
  }

  const keyExtractor = ({ id }: IMemberInfo) => id

  const renderItem = ({ item, index }: { item: IMemberInfo; index: number }) => (
    <CompanyItem
      key={index}
      memberInfo={item}
      onItemPress={onItemPress}
      onItemLongPress={onItemLongPress}
    />
  )

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.flex} />
      <FlatList
        contentContainerStyle={styles.list}
        data={memberInfoList}
        keyExtractor={keyExtractor}
        numColumns={3}
        renderItem={renderItem}
      />
      <View style={styles.flex} />
      <FloatingBtn iconName="plus" onPress={onAddPress} />
    </SafeAreaView>
  )
}

export default HomePage
