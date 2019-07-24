import * as types from './../types'

const initialState = {
    data: [],
    isLoading : false,
    isError : false,
    errorMessage  : "",
    isSuccess : false,
    userId: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case types.REGISTER:
      return {...state, isLoading: true}
    case types.REGISTER_FULFILLED:
      return {...state, isLoading: false, isSuccess: true, data: action.payload.data}
    case types.REGISTER_REJECTED:
      return {...state, isLoading: false, isError: true}
    default :
      return state
  }
}