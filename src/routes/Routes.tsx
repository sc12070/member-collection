import React from 'react'
import DetailPage from './DetailScene/DetailPage'
import DataInputPage from './DataInputScene/DataInputPage'
import ScannerPage from './ScannerScene/ScannerPage'
import ScanResultPage from './ScanResultScene/ScanResultPage'
import HomePage from './HomeScene/HomePage'
import { Stack } from './RoutesType'

const hideHeaderOption = { headerShown: false }

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={hideHeaderOption}
        initialParams={{}}
      />
      <Stack.Screen name="Scanner" component={ScannerPage} options={hideHeaderOption} />
      <Stack.Screen name="ScanResult" component={ScanResultPage} options={hideHeaderOption} />
      <Stack.Screen name="DataInput" component={DataInputPage} options={hideHeaderOption} />
      <Stack.Screen name="Detail" component={DetailPage} options={hideHeaderOption} />
    </Stack.Navigator>
  )
}

export default Routes
