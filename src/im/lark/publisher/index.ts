import Axios from "axios"
import GetConfig from "../../../config/config"
import { IMessage } from "../../../message/type"
import { IGrafanaHooks } from "../../../monitor/grafana/type"
import Relay from "../../../relay"
import TopicsList from "../../../relay/topic_list"
import GetLogger from "../../../utility/logger"

const config = GetConfig()
const gLogger = GetLogger()
const TokenToKey = (token?: string) => {
    switch (token) {
        case "40204ecc-b4d6-4ba8-a2d6-6d72eff69f26":
            return "act-sys"
        case "test_token":
        default:
            return "test"
    }
}


const GetBotFromNamespace = (ns: string) => config.lark.find(e => e.namespace === ns)?.bots ?? []

const SendLarkBotMessage = (hooks: string, msg: string) => {
    Axios.post(hooks, {
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
    })

    Relay.Subscribe(TopicsList.LarkBotSend, (msg) => {
        const obj = (JSON.parse(msg)) as IMessage
        switch (obj.source) {
            case "grafana-webhook":
                const raw = obj.raw as IGrafanaHooks
                const bots = GetBotFromNamespace(obj.namespace)
                for (const bot of bots)
                    SendLarkBotMessage(bot.hooks, JSON.stringify(raw))
                return
            default: gLogger.error("receive unknown msg ", msg)
        }
    })
}
