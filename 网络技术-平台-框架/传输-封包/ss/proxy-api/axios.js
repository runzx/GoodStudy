const axios = require('axios')
const SocksProxyAgent = require('socks-proxy-agent')
// replace with your proxy's hostname and port
const proxyHost = REPLACE_ME,
  proxyPort = REPLACE_ME
// the full socks5 address
const proxyOptions = `socks5://${proxyHost}:${proxyPort}`
// create the socksAgent for axios
// 'socks:': // no version specified, default to 5h
const httpsAgent = new SocksProxyAgent(proxyOptions)
// the baseUrl for the api you are going to hit
const baseUrl = 'https://google.com'
// create a new axios instance
const client = axios.create({ baseUrl, httpsAgent })

/* axios 分
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

*/
