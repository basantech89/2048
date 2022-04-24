import React from 'react'

import { keys } from '../utils/constants'

const useArrowKeys = (callback: (code: string | number) => void) => {
  const [key, setKey] = React.useState<string | number>(-Infinity)

  const keyPressed = (event: KeyboardEvent) => {
    const code = event.which || event.keyCode
    if (Object.values(keys).includes(code)) {
      event.preventDefault()
    }
    setKey(code)
    callback(code)
  }

  React.useEffect(() => {
    document.addEventListener('keydown', keyPressed)
    return () => {
      document.removeEventListener('keydown', keyPressed)
    }
  }, [callback])

  return key
}

export default useArrowKeys
