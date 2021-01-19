export interface IMessage {
    source: "grafana-webhook"
    namespace: string,
    raw: any
}