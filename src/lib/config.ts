
export function getParam(name: string) {
  return new URLSearchParams(window.location.search).get(name) || ''
}
export const BRIDE_NAME = () => getParam('name') || 'моя любимая'
