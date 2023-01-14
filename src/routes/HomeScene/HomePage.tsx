import { NativeStackScreenProps } from '@react-navigation/native-stack'
import FlatListDraggable from 'commons/components/FlatListDraggable/FlatListDraggable'
import FloatingBtn from 'commons/components/FloatingBtn/FloatingBtn'
import { IMemberInfo } from 'models/IMember'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackParamList } from 'routes/RoutesType'
import CompanyItem from './components/CompanyItem'
import styles from './styles'
import useHomePageHooks from './useHomePageHooks'

type HomeProps = NativeStackScreenProps<StackParamList, 'Home'>

const HomePage = (props: HomeProps) => {
  const {
    memberInfoList,
    isEditing,
    onItemPress,
    onStartEditing,
    onEndEditing,
    onAddPress,
    moveMemberInfo
  } = useHomePageHooks(props.route.params)

  if (memberInfoList.length === 0) {
    return (
      <SafeAreaView style={styles.bg}>
        <Text style={styles.text}>Add your first member info</Text>
        <FloatingBtn style={styles.addBtn} iconName="plus" onPress={onAddPress} />
      </SafeAreaView>
    )
  }

  const keyExtractor = ({ id }: IMemberInfo) => id

  const renderItem = ({ item }: { item: IMemberInfo }) => (
    <CompanyItem memberInfo={item} onItemPress={onItemPress} onItemLongPress={onStartEditing} />
  )

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.flex} />
      <FlatListDraggable
        style={styles.list}
        contentContainerStyle={styles.content}
        itemContainerStyle={styles.itemContainerStyle}
        isEditing={isEditing}
        onOrderChanged={moveMemberInfo}
        numColumns={3}
        data={memberInfoList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      <View style={styles.flex} />
      {isEditing ? (
        <FloatingBtn style={styles.endEditBtn} iconName="check" onPress={onEndEditing} />
      ) : (
        <FloatingBtn iconName="plus" onPress={onAddPress} />
      )}
    </SafeAreaView>
  )
}

export default HomePage
