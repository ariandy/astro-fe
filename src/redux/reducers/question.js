import * as types from './../types'

const initialState = {
    data: [],
    isLoading : false,
    isError : false,
    errorMessage  : "",
    isSuccess : false,
    page: 1,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case types.GET_QUESTION:
      return {...state, isLoading: true}
    case types.GET_QUESTION_FULFILLED:
      let data = action.payload.data 
      if ( data === "") {
        data = []
      }
      return {...state,
        isLoading: false,
        page: state.page + 1,
        isSuccess: true,
        data
      }
    case types.GET_QUESTION_REJECTED:
      return {...state, isLoading: false, isError: true}
    default :
      return state
  }
}