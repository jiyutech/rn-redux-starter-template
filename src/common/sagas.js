import example from './_example/saga'
import app from './app/saga'
import i18n from './i18n/saga'
import nav from './nav/saga'
import auth from './auth/saga'

import _ from 'lodash'
// Sagas命名不敏感
export default _.flatten([
  example,
  app,
  i18n,
  nav,
  // auth,
])
