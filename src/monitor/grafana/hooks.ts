import { FastifyInstance } from "fastify"
import { IMessage } from "../../message/type"
import Relay from "../../relay"
import TopicsList from "../../relay/topic_list"
import GetLogger from "../../utility/logger"
import { IGrafanaHooks } from "./type"

function mapRuleURLToNamespace(r: string) {
    return "YYTG"
}


module.exports = async function (app: FastifyInstance, opts: any) {
    app.post('/', async (req, resp) => {
        const query: any = req.query
        console.log('grafana,hooks', query)
        const Msg: IMessage = {
            source: "grafana-webhook",
            namespace: "YYTG",
            token: query.token,
            raw: req.body,
        }
        Relay.Publish(TopicsList.LarkBotSend, JSON.stringify(Msg))
        resp.code(200).send({ status: "ok" })
    })
}
