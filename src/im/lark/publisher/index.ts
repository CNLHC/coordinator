import Axios from "axios"
import GetConfig from "../../../config/config"
import Relay from "../../../relay"
import TopicsList from "../../../relay/topic_list"

const config = GetConfig()
const TokenToKey = (token?: string) => {
    switch (token) {
        case "40204ecc-b4d6-4ba8-a2d6-6d72eff69f26":
            return "act-sys"
        case "test_token":
        default:
            return "test"
    }
}
const GetBotFromKey = (key?: string) => config.lark.custom_bot.find(e => e.key == key)
const SendLarkBotMessage = (uuid: string, msg: string) => {
    Axios.post(`https://open.feishu.cn/open-apis/bot/v2/hook/${uuid}`, {
        msg_type: "text",
        content: {
            "text": msg
        }
    }).then(e => {
        console.log(e.data)

    }).catch(e => {
        console.error(e)
    })
}

export function InitLarkPublisher() {
    Relay.Subscribe(TopicsList.PAMLogin, (msg) => {
        const obj = JSON.parse(msg)
        const bot = GetBotFromKey(TokenToKey(obj.token))
        if (bot && obj.PAM_SERVICE == 'sshd') {
            SendLarkBotMessage(bot.uuid, `用户 ${obj.PAM_USER} 登陆了主机 ${obj.host} `)
        }
    })

}
