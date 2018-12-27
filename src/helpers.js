import axios from 'axios'
import moment from 'moment'

const getStoreIdQueryParam = () => {
  const url = new URL(window.location.href)
  return url.searchParams.get('storeId') || null
}
export const formatStoreData = stores => {
  const storeFilter = getStoreIdQueryParam()
  return stores
    .map(store =>
      store.devices
        .filter(device => {
          const recentScreenshot =
            device.moki_screenshot_url &&
            moment(Number(device.moki_screenshot_date)).isAfter(
              moment().subtract(3, 'days')
            )
          const matchesFilter = storeFilter
            ? device.storeId === Number(storeFilter)
            : true
          return recentScreenshot && matchesFilter
        })
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
