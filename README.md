# member-collection

## Installation

```
yarn install
yarn prepare
cd ios
pod install
```

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

1. handle scan QR code

2. allow users pop back during adding new member info

3. allow users to modify existing member info

4. allow users to change the order
