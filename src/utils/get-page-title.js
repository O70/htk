import defaultSettings from '@/settings'

const title = defaultSettings.title || 'HTK'

export default pageTitle => pageTitle ? `${pageTitle} - ${title}` : `${title}`
