import { IMemberInfo } from 'models/IMember'
import { useCallback, useEffect, useState } from 'react'
import update from 'react-addons-update'
import AsyncStorageHelper from 'utils/AsyncStorageHelper'

export default () => {
  const [memberInfoList, setMemberInfoList] = useState<Array<IMemberInfo>>([])

  const addMemberInfo = useCallback(
    async (newInfo: IMemberInfo) => {
      const newList = update(memberInfoList, { $push: [newInfo] })
      setMemberInfoList(newList)
      await AsyncStorageHelper.save('memberInfoList', JSON.stringify(newList))
    },
    [memberInfoList]
  )

  const removeMemberInfo = useCallback(
    async (id: string) => {
      let idx = memberInfoList.findIndex((info: IMemberInfo) => info.id === id)
      if (idx === -1) {
        console.warn('useSchedulePageHook.removeSchedule fail: Schedule not found', id)
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

  return {
    memberInfoList,
    addMemberInfo,
    removeMemberInfo
  }
}
