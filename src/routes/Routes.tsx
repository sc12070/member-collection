import React from 'react'
import DetailPage from './DetailScene/DetailPage'
import DataInputModal from './General/Modals/DataInputModal/DataInputModal'
import ScannerModal from './General/Modals/ScannerModal/ScannerModal'
import ScanResultModal from './General/Modals/ScanResultModal/ScanResultModal'
import HomePage from './HomeScene/HomePage'
import { Stack } from './RoutesType'

const hideHeaderOption = { headerShown: false }

const Routes = () => {
  console.log('This render once only, no need to memorise functions or components')

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomePage} options={hideHeaderOption} />
      <Stack.Screen name="Detail" component={DetailPage} options={hideHeaderOption} />
      <Stack.Group>
        <Stack.Screen name="ScannerModal" component={ScannerModal} options={hideHeaderOption} />
        <Stack.Screen
          name="ScanResultModal"
          component={ScanResultModal}
          options={hideHeaderOption}
        />
        <Stack.Screen name="DataInputModal" component={DataInputModal} options={hideHeaderOption} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default Routes
