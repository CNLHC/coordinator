import moment from 'moment'
import Axios from 'axios'
import GetConfig from '../../../config/config'

const config = GetConfig().wx

let access_token: string | undefined = undefined
let access_token_expired_at: moment.Moment | undefined = undefined

export async function get_access_token() {
    if (access_token_expired_at
        && access_token_expired_at.isAfter(moment())) {
        return access_token
    }

    const res = await Axios.get("https://qyapi.weixin.qq.com/cgi-bin/gettoken", {
        // params: {
        //     corpid: config.w,
        //     corpsecret: config.app.secret
        // }
    })

    if (res.data?.errcode == 0 && res.data?.access_token) {
        access_token = res.data?.access_token
        access_token_expired_at = moment().add(1.5, 'hour');
        return access_token
    }
    return undefined
}