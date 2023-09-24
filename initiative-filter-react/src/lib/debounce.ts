// Debounce a function
const debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => T = (func, wait) => {
  let timeout: ReturnType<typeof setTimeout>
  return ((...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }) as any
}
export default debounce
