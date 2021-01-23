import Axios from "axios"
import GetConfig from "../../../config/config"
import { IMessage } from "../../../message/type"
import { IGrafanaHooks } from "../../../monitor/grafana/type"
import Relay from "../../../relay"
import TopicsList from "../../../relay/topic_list"
import GetLogger from "../../../utility/logger"
import { GenLarkBasicDescriptionMsg, GenLarkTextMsg } from "./template"

const config = GetConfig()
const gLogger = GetLogger()

const GetBotFromNamespace = (ns: string) => config.lark.find(e => e.namespace === ns)?.bots ?? []

const SendLarkBotMessage = (hooks: string, msg: any) => {
    Axios.post(hooks, msg).then(e => {
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
                console.log(raw)
                for (const bot of bots)
                    SendLarkBotMessage(bot.hooks, GenLarkBasicDescriptionMsg(
                        {
                            title: raw.ruleName,
                            kvs: {
                                规则: raw.ruleName,
                                报警信息: raw.message,
                                数据地址: raw.ruleUrl.replace('http', 'https').replace(":3000", ""),
                                状态: raw.state
                            }
                        }
                    ))
                return
            default: gLogger.error("receive unknown msg ", msg)
        }
    })
}
