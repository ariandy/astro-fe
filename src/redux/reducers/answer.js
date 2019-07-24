import * as types from './../types'

const initialState = {
    data: [],
    isLoading : false,
    isError : false,
    errorMessage  : "",
    isSuccess : false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case types.SEND_ANSWER:
      return {...state, isLoading: true}
    case types.SEND_ANSWER_FULFILLED:
      return {...state, isLoading: false, isSuccess: true}
    case types.SEND_ANSWER_REJECTED:
      return {...state, isLoading: false, isError: true}
    default :
      return state
  }
}