import { NativeStackScreenProps } from '@react-navigation/native-stack'
import FloatingBtn from 'commons/components/FloatingBtn/FloatingBtn'
import { IMemberInfo } from 'models/IMember'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackParamList } from 'routes/RoutesType'
import CompanyItem from './components/CompanyItem'
import styles from './styles'
import useHomePageHooks from './useHomePageHooks'
import DraggableGridView from 'react-native-drag-sort-gridview'

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
      <DraggableGridView
        style={styles.list}
        contentContainerStyle={styles.content}
        itemContainerStyle={styles.itemContainer}
        isEditing={isEditing}
        onOrderChanged={moveMemberInfo}
        numColumns={3}
        //debounce={300}
        data={memberInfoList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        shouldAnimOnRelease={true}
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
