export interface IMessage {
    source: "grafana-webhook"
    namespace: string,
    token: string[]
    raw: any
}