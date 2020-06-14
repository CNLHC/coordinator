import fastify from 'fastify'
import Relay from '../../../relay'
import TopicsList from '../../../relay/topic_list'


module.exports = async function (app: fastify.FastifyInstance, opt: any) {
    app.post("/", async (req, resp) => {
        Relay.Publish(TopicsList.GitlabReceiveMR, JSON.stringify(req.body))
        resp.code(200).send()
    })
}