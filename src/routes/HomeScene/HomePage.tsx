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
  const {
    memberInfoList,
    dragIndex,
    dragToIndex,
    isEditing,
    isEnableScroll,
    onStartEditing,
    onEndEditing,
    onAddPress,
    onItemPress,
    onStartDrag,
    updateDragToIndex,
    onEndDrag
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

  const renderItem = ({ item, index }: { item: IMemberInfo; index: number }) => (
    <CompanyItem
      dragItemOriginIndex={dragIndex}
      dragItemTargetIndex={dragToIndex}
      index={index}
      memberInfo={item}
      isEditing={isEditing}
      onStartDrag={onStartDrag}
      updateDragToIndex={updateDragToIndex}
      onEndDrag={onEndDrag}
      onItemPress={onItemPress}
      onItemLongPress={onStartEditing}
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
        scrollEnabled={isEnableScroll}
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
