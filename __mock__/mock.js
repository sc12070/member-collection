const navigationMock = {
  navigate: jest.fn(),
  reset: jest.fn()
}

const useNavigationMock = () => navigationMock

jest.mock('@react-navigation/core', () => {
  return {
    ...jest.requireActual('@react-navigation/core'),
    useNavigation: useNavigationMock
  }
})

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesome')
