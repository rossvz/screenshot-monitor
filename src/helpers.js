import axios from 'axios'
import moment from 'moment'

const getStoreIdQueryParam = () => {
  const url = new URL(window.location.href)
  return url.searchParams.get('storeId') || null
}

const getStoreNameQueryParam = () => {
  const url = new URL(window.location.href)
  return url.searchParams.get('name') || null
}

const isActive = ({ status }) => status !== 'inactive'
const isStaging = ({ name }) => name.toLowerCase().includes('staging')
const isProdDevice = device => isActive(device) && !isStaging(device)
const hasRecentScreenshot = device =>
  device.moki_screenshot_url &&
  moment(Number(device.moki_screenshot_date)).isAfter(
    moment().subtract(3, 'days')
  )

const deviceMatchesFilter = (storeFilter, storeName) => device =>
  isProdDevice(device) &&
  hasRecentScreenshot(device) &&
  (device.storeId === Number(storeFilter) ||
    device.name.toLowerCase().includes(storeName))

export const formatStoreData = stores => {
  const storeFilter = getStoreIdQueryParam()
  const storeName = getStoreNameQueryParam()
  const shouldShow = deviceMatchesFilter(storeFilter, storeName)
  return stores
    .map(store =>
      store.devices
        .filter(device =>
          storeFilter || storeName ? shouldShow(device) : true
        )
        .map(device => ({
          name: device.name,
          screenshot: device.moki_screenshot_url || '',
          timestamp: moment(Number(device.moki_screenshot_date)).fromNow(),
          storeId: device.storeId
        }))
    )
    .reduce((prev, current) => [...prev, ...current], [])
}

export const getDevices = async () => {
  const results = await axios.get('https://api.sllr.io/devices/stores')
  return formatStoreData(results.data.stores)
}
