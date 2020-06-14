import RedisRelayBackend from "./redis"

function Publish(topic: string, payload: string) {
    RedisRelayBackend.Publish(topic, payload)
}

function Subscribe(topic: string, callback: (msg: string) => void) {
    RedisRelayBackend.Subscribe(topic, callback)
}

const Relay = {
    Publish,
    Subscribe
}

export default Relay
