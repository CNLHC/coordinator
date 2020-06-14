
import fastify from 'fastify'
import { verify_integrity, decrypt_message } from '../sdk/crypto'
import Relay from '../../../relay'
import TopicsList from '../../../relay/topic_list'
import xmlparser from 'fast-xml-parser'
import GetConfig from '../../../config/config'

const config = GetConfig().wx

module.exports = async function (app: fastify.FastifyInstance, opts: any) {
    app.post('/', async (req, resp) => {
        const recv = decrypt_message({
            aeskey: config.app.recv.aeskey,
            encrypted: req.body.xml.Encrypt
        })
        if (recv?.msg) {
            Relay.Publish(TopicsList.WorkWXReceivedMessage, JSON.stringify(xmlparser.parse(recv?.msg)))
            resp.status(200).send()
            return
        }
        resp.status(405).send()

    })

    app.get('/', async (req, resp) => {
        if (!verify_integrity({
            token: config.app.recv.token,
            encrypted: req.query.echostr,
            nonce: req.query.nonce,
            timestamp: req.query.timestamp,
            signature: req.query.msg_signature
        })) {
            resp.code(405).send("invalid message")
            return
        }
        const res = decrypt_message({
            aeskey: config.app.recv.aeskey,
            encrypted: req.query.echostr,
        })

        resp.code(200).send(res?.msg)


    })
}
