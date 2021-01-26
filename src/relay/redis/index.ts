import redis, { ClientOpts } from 'redis'
import GetConfig from '../../config/config';
import GetLogger from '../../utility/logger';

const gConfig = GetConfig()
const gLogger = GetLogger()
let subscriber: redis.RedisClient
let hooksTable = new Map<string, Array<(msg: string) => void>>()
let publisher: redis.RedisClient


function errorHandler(err: any, role: "sub" | "pub") {
    gLogger.error(`${role} err:${err}`)
}


function init() {
    try {
        const redis_cfg = {
            ...gConfig.redis,
            socket_keepalive: true
        }
        subscriber = redis.createClient(redis_cfg);
        publisher = redis.createClient(redis_cfg);

        subscriber.on('error', (err) => errorHandler(err, 'sub'))
        publisher.on('error', (err) => errorHandler(err, 'pub'))

        subscriber.on('message', (channel, message) => hooksTable.get(channel)?.forEach(cb => cb(message)))
    } catch (e) {
        gLogger.error(e)
    }
}

init()





function Publish(topic: string, payload: string) {
    publisher.publish(topic, payload)
}

function Subscribe(topic: string, callback: (msg: string) => void) {
    subscriber.subscribe(topic)
    if (hooksTable.has(topic))
        hooksTable.get(topic)?.push(callback)
    else
        hooksTable.set(topic, [callback])
}

const RedisRelayBackend = {
    Publish,
    Subscribe
}

export default RedisRelayBackend
