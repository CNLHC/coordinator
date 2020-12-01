
import { FastifyInstance } from 'fastify'
import Relay from '../../relay'
import TopicsList from '../../relay/topic_list'

module.exports = async function (app: FastifyInstance, opts: any) {
    app.post('/', function (req, resp) {
        Relay.Publish(TopicsList.PAMLogin, JSON.stringify(req.body))
        resp.status(204).send()
    })

}
