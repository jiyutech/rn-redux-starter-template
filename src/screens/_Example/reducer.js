export default function (state = {
  hiMessage: 'Opps...',
}, action) {
  switch (action.type) {

    case 'exampleScreenVM/SET_STATE':
      return {...state, ...action.payload}

    case 'exampleScreenVM/SAY_HI':
      state.hiMessage = 'Hi there, this is a screen.'
      return { ...state }

    case 'exampleScreenVM/SAY_HI_ASYNC_START':
      state.hiMessage = 'Hi there, Emmmm...'
      return { ...state }

    case 'exampleScreenVM/SAY_HI_ASYNC_FINISHED':
      state.hiMessage = action.payload
      return { ...state }

    default:
      return state
  }

}
