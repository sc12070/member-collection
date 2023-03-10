import React from 'react'
import { LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './routes/Routes'
import { AppContext } from 'context/AppContext'
import useAppHooks from 'hooks/useAppHooks'

LogBox.ignoreLogs(['Warning: ...'])
LogBox.ignoreAllLogs()

const App = () => {
  return (
    <AppContext.Provider value={useAppHooks()}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AppContext.Provider>
  )
}

export default App
