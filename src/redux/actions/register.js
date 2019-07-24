import axios from 'axios'

import * as types from './../types'
import { url } from './../../config/config'

export const postRegister = newUser => {
    return {
        type : types.REGISTER,
        payload : axios.post(`${url.server}/api/v1/user`, newUser)
    }
}