import { useCallback, useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'

export default ({
  itemWidth,
  itemHeight,
  numColumns,
  isEditing,
  index,
  dragItemOriginIndex,
  dragItemTargetIndex,
  animMoveDuration
}: {
  itemWidth: number
  itemHeight: number
  numColumns: number
  isEditing: boolean
  index: number
  dragItemOriginIndex: number | undefined
  dragItemTargetIndex: number | undefined
  animMoveDuration: number
}) => {
  const isMoved = useRef<boolean>(false)
  const moveXAnimRef = useRef(new Animated.Value(0))
  const moveYAnimRef = useRef(new Animated.Value(0))
  const rotateAnim = useRef(new Animated.Value(0)).current

  const animRef = useRef(
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 150,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(rotateAnim, {
          toValue: -1,
          duration: 150,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true
        })
      ])
    )
  )

  const restore = useCallback(() => {
    if (isMoved.current === false) {
      return
    }
    isMoved.current = false
    Animated.parallel([
      Animated.timing(moveXAnimRef.current, {
        toValue: 0,
        duration: animMoveDuration,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease)
      }),
      Animated.timing(moveYAnimRef.current, {
        toValue: 0,
        duration: animMoveDuration,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease)
      })
    ]).start()
  }, [animMoveDuration])

  const movePrev = useCallback(() => {
    isMoved.current = true
    if (index % numColumns === 0) {
      Animated.parallel([
        Animated.timing(moveXAnimRef.current, {
          toValue: itemWidth * (numColumns - 1),
          duration: animMoveDuration,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease)
        }),
        Animated.timing(moveYAnimRef.current, {
          toValue: -itemHeight,
          duration: animMoveDuration,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease)
        })
      ]).start()
    } else {
      Animated.timing(moveXAnimRef.current, {
        toValue: -itemWidth,
        duration: animMoveDuration,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease)
      }).start()
    }
  }, [index, itemWidth, itemHeight, numColumns, animMoveDuration])

  const moveNext = useCallback(() => {
    isMoved.current = true
    if (index % numColumns === numColumns - 1) {
      Animated.parallel([
        Animated.timing(moveXAnimRef.current, {
          toValue: -itemWidth * (numColumns - 1),
          duration: animMoveDuration,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease)
        }),
        Animated.timing(moveYAnimRef.current, {
          toValue: itemHeight,
          duration: animMoveDuration,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease)
        })
      ]).start()
    } else {
      Animated.timing(moveXAnimRef.current, {
        toValue: itemWidth,
        duration: animMoveDuration,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease)
      }).start()
    }
  }, [index, itemWidth, itemHeight, numColumns, animMoveDuration])

  const startRotate = useCallback(() => {
    animRef.current.reset()
    animRef.current.start()
  }, [])

  const stopRotate = useCallback(() => {
    animRef.current.stop()
  }, [])

  useEffect(() => {
    if (isEditing === true) {
      setTimeout(startRotate, Math.random() * animMoveDuration)
    } else {
      stopRotate()
      rotateAnim.setValue(0)
    }
  }, [isEditing, rotateAnim, animMoveDuration, startRotate, stopRotate])

  useEffect(() => {
    if (dragItemOriginIndex === undefined || dragItemTargetIndex === undefined) {
      restore()
      return
    }
    if (index === dragItemOriginIndex) {
      return
    }
    if (dragItemTargetIndex < dragItemOriginIndex) {
      // drag to prev
      if (index > dragItemOriginIndex) {
        restore()
        return
      }
      if (index >= dragItemTargetIndex) {
        moveNext()
        return
      }
    } else if (dragItemTargetIndex > dragItemOriginIndex) {
      // drag to next
      if (index < dragItemOriginIndex) {
        restore()
        return
      }
      if (index <= dragItemTargetIndex) {
        movePrev()
        return
      }
    }
    restore()
  }, [index, dragItemOriginIndex, dragItemTargetIndex, moveNext, movePrev, restore])

  return {
    moveXAnim: moveXAnimRef.current,
    moveYAnim: moveYAnimRef.current,
    rotateAnim,
    startRotate
  }
}
