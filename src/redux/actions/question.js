import axios from 'axios'

import * as types from './../types'
import { url } from './../../config/config'

export const getQuestion = (page) => {
    return {
        type : types.GET_QUESTION,
        payload : axios.get(`${url.server}/api/v1/question?number=${page}`)
    }
}