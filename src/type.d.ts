declare module 'react-native-screen-brightness' {
  export function getBrightness(): Promise<number>
  export function setBrightness(brightness: number): void
}
