import redis, { ClientOpts } from 'redis'
import GetConfig from '../../config/config';

const gConfig = GetConfig()

const redis_cfg = gConfig.redis
const subscriber = redis.createClient(redis_cfg);
const publisher = redis.createClient(redis_cfg);

let hooksTable = new Map<string, Array<(msg: string) => void>>()

subscriber.on('message', (channel, message) => hooksTable.get(channel)?.forEach(cb => cb(message)))



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
