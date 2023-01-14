import { IMemberInfo } from 'models/IMember'
import { useCallback, useEffect, useRef, useState } from 'react'
import update from 'react-addons-update'
import isEqual from 'react-fast-compare'
import AsyncStorageHelper from 'utils/AsyncStorageHelper'

export default (props: {
  newMemberInfo: IMemberInfo | undefined
  removeId: string | undefined
}) => {
  const { newMemberInfo, removeId } = props

  const [memberInfoList, setMemberInfoList] = useState<Array<IMemberInfo>>([])

  const newMemberInfoRef = useRef<IMemberInfo | undefined>(undefined)
  const removeIdRef = useRef<string | undefined>(undefined)

  const addMemberInfo = useCallback(
    async (newInfo: IMemberInfo) => {
      let idx = memberInfoList.findIndex((info: IMemberInfo) => info.id === newInfo.id)
      if (idx > -1 && isEqual(memberInfoList[idx], newInfo) === true) {
        return
      }
      const newMemberInfoList =
        idx === -1
          ? update(memberInfoList, { $push: [newInfo] })
          : update(memberInfoList, { [idx]: { $set: newInfo } })
      setMemberInfoList(newMemberInfoList)
      await AsyncStorageHelper.save('memberInfoList', JSON.stringify(newMemberInfoList))
    },
    [memberInfoList]
  )

  const setMemberInfo = useCallback(
    async (newList: Array<IMemberInfo>) => {
      if (isEqual(newList, memberInfoList)) {
        return
      }
      setMemberInfoList(newList)
      await AsyncStorageHelper.save('memberInfoList', JSON.stringify(newList))
    },
    [memberInfoList]
  )

  const removeMemberInfo = useCallback(
    async (id: string) => {
      let idx = memberInfoList.findIndex((info: IMemberInfo) => info.id === id)
      if (idx === -1) {
        console.warn('removeMemberInfo fail: MemberInfo not found', id)
        return
      }
      const newList = update(memberInfoList, { $splice: [[idx, 1]] })
      setMemberInfoList(newList)
      await AsyncStorageHelper.save('memberInfoList', JSON.stringify(newList))
    },
    [memberInfoList]
  )

  const initData = useCallback(async () => {
    const data = await AsyncStorageHelper.get('memberInfoList')
    if (typeof data === 'string') {
      setMemberInfoList(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    initData()
  }, [initData])

  useEffect(() => {
    if (newMemberInfoRef.current === newMemberInfo) {
      return
    }
    if (newMemberInfo !== undefined) {
      newMemberInfoRef.current = newMemberInfo
      addMemberInfo(newMemberInfo)
    }
  }, [newMemberInfo, addMemberInfo])

  useEffect(() => {
    if (removeIdRef.current === removeId) {
      return
    }
    if (removeId !== undefined) {
      removeIdRef.current = removeId
      removeMemberInfo(removeId)
    }
  }, [removeId, removeMemberInfo])

  return {
    memberInfoList,
    setMemberInfo
  }
}
