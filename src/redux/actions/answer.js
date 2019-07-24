import axios from 'axios'

import * as types from './../types'
import { url } from './../../config/config'

export const sendAnswer = newAnswer => {
    return {
        type : types.SEND_ANSWER,
        payload : axios({
            method : "POST",
            url : `${url.server}/api/v1/answer`,
            data : {
                questionId : newAnswer.question_id,
                userId : newAnswer.user_id,
                answer : newAnswer.answer
            }
        })
    }
}