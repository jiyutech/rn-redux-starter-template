
export default function (state = {
  hiMessageFromGlobal: 'Global: Opps...',
}, action) {
  switch (action.type) {

    case 'SAY_HI':
      state.hiMessageFromGlobal = 'Global: Hi there, this is a screen.'
      return { ...state }

    case 'SAY_HI_ASYNC_START':
      state.hiMessageFromGlobal = 'Global: Hi there, Emmmm...'
      return { ...state }

    case 'SAY_HI_ASYNC_FINISHED':
      state.hiMessageFromGlobal = action.payload
      return { ...state }

    default:
      return state
  }

}
