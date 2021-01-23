
import fastify, { FastifyInstance } from 'fastify'
import { verify_integrity, decrypt_message } from '../sdk/crypto'
import Relay from '../../../relay'
import TopicsList from '../../../relay/topic_list'
import xmlparser from 'fast-xml-parser'
import GetConfig from '../../../config/config'

const config = GetConfig().wx

module.exports = async function (app: FastifyInstance, opts: any) {
    app.post('/', async (req: any, resp) => {
        const recv = decrypt_message({
            aeskey: config[0].app.recv.aeskey,
            encrypted: req.body.xml.Encrypt
        })
        if (recv?.msg) {
            Relay.Publish(TopicsList.WorkWXReceivedMessage, JSON.stringify(xmlparser.parse(recv?.msg)))
            resp.status(200).send()
            return
        }
        resp.status(405).send()

    })

    app.get('/', async (req: any, resp) => {
        if (!verify_integrity({
            token: config[0].app.recv.token,
            encrypted: req.query.echostr,
            nonce: req.query.nonce,
            timestamp: req.query.timestamp,
            signature: req.query.msg_signature
        })) {
            resp.code(405).send("invalid message")
            return
        }
        const res = decrypt_message({
            aeskey: config[0].app.recv.aeskey,
            encrypted: req.query.echostr,
        })

        resp.code(200).send(res?.msg)


    })
}
