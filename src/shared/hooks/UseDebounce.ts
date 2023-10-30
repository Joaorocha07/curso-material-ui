import { useCallback, useRef } from 'react'

export default function useDebounce(
  delay = 300, 
  notDeplayInFisrstTime = true
) {
  const isFirstTime = useRef(notDeplayInFisrstTime)
  const debounceing = useRef<NodeJS.Timeout>()
  
  const debounce = useCallback((func: () => void) => {
    if (isFirstTime.current) {
      isFirstTime.current = false
      func()
    } else {
      if (debounceing.current) {
        clearTimeout(debounceing.current)
      }
      debounceing.current = setTimeout(() => func(), delay)
    }
  }, [delay])
  return {debounce}
}