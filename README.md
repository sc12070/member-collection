# member-collection

![](./__doc__/camera.gif)
![](./__doc__/gallery.gif)
![](./__doc__/ordering.gif)

## Installation

```
yarn install
yarn prepare
cd ios
pod install
```

### No camera can be used in iOS simulator, please use the application in real device or android emulator.

## Testing

```
yarn jest
```

## Commit

if the following error occured during commit

```
.husky/pre-commit: line 4: yarn: command not found
```

run

```
yarn export-huskyrc
```

## TODO

1. Optimize performance

2. Extract the PanResponder with FlatList
