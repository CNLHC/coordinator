
import fastify, { FastifyInstance } from 'fastify'
import Relay from '../../../relay'
import TopicsList from '../../../relay/topic_list'
import xmlparser from 'fast-xml-parser'
import GetConfig from '../../../config/config'

const config = GetConfig().wx

module.exports = async function (app: FastifyInstance, opts: any) {
    app.post('/bot', async (req, resp) => {
        const payload: any = req.body
        console.log(payload)
        if (payload.type === 'url_verification') {
            resp.code(200).send(payload)
        }
    })
}
