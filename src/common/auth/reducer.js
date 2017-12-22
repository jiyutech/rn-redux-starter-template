export default function (state = {
  key: '',
  storeInfo: {
  //     "id": "617",
  //     "vat": "19.6",
  //     "currency_symbol": "€",
  //     "pic_domain": "http://s3-eu-west-1.amazonaws.com/emcmobile-image/user_617",
  //     "company_name": "一个公司名字",
  //     "company_email": "c_email-邮箱",
  //     "company_tel": "c_tel-电话",
  //     "company_person": "c_person-公司法人-联系人",
  //     "company_web": "c_web-网址",
  //     "company_country": "DK",
  //     "company_city": "c_city-城市",
  //     "company_zip": "c_zip-邮编",
  //     "company_add": "c_add-地址",
  //     "ship": [
  //         "SF",
  //         "UPS",
  //         "P2P"
  //     ],
  //     "payment": [
  //         "CASH",
  //         "VISA",
  //         "OK-PAY",
  //         "MasterCard",
  //         "PayPal"
  //     ],
  //     "is_translator": "0"
  },
  clientInfo: {
  //     "id": "0",
  //     "retail_show_price": "1",
  //     "invoice_add_id": "0",
  //     "sale": 0,
  //     "default_address": "0",
  //     "address": [
  //         {
  //             "id": "0",
  //             "name": "guest",
  //             "phone": "",
  //             "email": "",
  //             "country": "",
  //             "city": "",
  //             "zip": "0",
  //             "address": "",
  //             "sale": "0"
  //         },
  //         {
  //             "id": "8177",
  //             "name": "d",
  //             "phone": "",
  //             "email": "",
  //             "country": "",
  //             "city": "",
  //             "zip": "",
  //             "address": "送货地址已有",
  //             "sale": ""
  //         },
  //         {
  //             "id": "8178",
  //             "name": "哈哈哈",
  //             "phone": "",
  //             "email": "",
  //             "country": "",
  //             "city": "",
  //             "zip": "",
  //             "address": "送货地址地址",
  //             "sale": ""
  //         },
  //         {
  //             "id": "8179",
  //             "name": "送货的",
  //             "phone": "",
  //             "email": "",
  //             "country": "",
  //             "city": "",
  //             "zip": "",
  //             "address": "分分钟",
  //             "sale": ""
  //         },
  //         {
  //             "id": "8180",
  //             "name": "人法国",
  //             "phone": "",
  //             "email": "",
  //             "country": "",
  //             "city": "",
  //             "zip": "",
  //             "address": "送货地址的",
  //             "sale": ""
  //         },
  //         {
  //             "id": "8181",
  //             "name": "给红红火火",
  //             "phone": "",
  //             "email": "",
  //             "country": "",
  //             "city": "",
  //             "zip": "",
  //             "address": "送货地址已有的东西",
  //             "sale": ""
  //         },
  //         {
  //             "id": "8208",
  //             "name": "阿斯兰",
  //             "phone": "",
  //             "email": "",
  //             "country": "",
  //             "city": "",
  //             "zip": "",
  //             "address": "",
  //             "sale": ""
  //         },
  //         {
  //             "id": "8213",
  //             "name": "ydhdb",
  //             "phone": "",
  //             "email": "",
  //             "country": "",
  //             "city": "",
  //             "zip": "",
  //             "address": "",
  //             "sale": ""
  //         }
  //     ]
  }
}, action) {
  switch (action.type) {

    case 'UPDATE_STARTUP_INFO': // in saga
      return state

    case 'UPDATE_STARTUP_INFO_FINISHED':
      return { ...state, ...action.payload }

    case 'LOG_IN_REQUEST': // in saga
      return state

    case 'LOG_IN_FAILED': // in saga
      return state

    case 'LOG_IN_SUCCEED':
      return { ...state }

    case 'CHECK_IF_LOGGED_IN': // in saga
      return state

    case 'CHECK_LOGIN_FINISHED': // in saga
      return state

    case 'ENSURED_HAS_LOGGED_IN': // in saga
      if ( action.payload.key ) state.key = action.payload.key // startup接口不返回key
      state.storeInfo = action.payload.storeInfo
      state.clientInfo = action.payload.clientInfo
      return { ...state }

    case 'LOG_OUT':
      if ( action.payload && action.payload.cleanData ) {
        state.key = ''
        state.storeInfo = {}
        state.clientInfo = {}
      }
      return { ...state }

    default:
      return state
  }

}
