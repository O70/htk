import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Boardroom'

export default pageTitle => pageTitle ? `${pageTitle} - ${title}` : `${title}`
