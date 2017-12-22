import appConf from './app-config.build.json'

export default {
  version: appConf.version,
  build: appConf.build,
  appName: appConf.appName,
  appId: appConf.appId,
  packageName: appConf.packageName,
  apiBase: {
    qdy: 'http://test-gofishing.jiyutech.net/'
  },
}
