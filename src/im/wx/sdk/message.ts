import Axios from "axios";
import { get_access_token } from "./token";
import GetConfig from "../../../config/config";

const config = GetConfig().wx

interface ISendMessagePayload {
    touser?: string
    toparty?: string
    totag?: string
    msgtype: "text" | "image" | "voice" | "video" | "file" | "textcard" | "news" | "mpnews" | "markdown" | "miniprogram_notice"
    | "taskcard"
    agentid?: number
    text?: {
        content: string
    }
    textcard?: {
        title: string,
        description: string
        url: string
        btnext: string
    }
    safe?: number
    enable_id_trans?: number
    enable_duplicate_check?: number
    duplicate_check_interval?: number
}

export async function send_message(payload: ISendMessagePayload) {
    if (!payload.agentid)
        payload.agentid = config.app.agentid
    const url = `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${await get_access_token()}`
    return await Axios.post(url,
        payload, {
    })
}