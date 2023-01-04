import { IMemberInfo } from 'models/IMember'
import { createContext } from 'react'

export const AppContext = createContext({
  memberInfoList: [],
  addMemberInfo: (_: IMemberInfo) => {},
  removeMemberInfo: (_: string) => {}
})
