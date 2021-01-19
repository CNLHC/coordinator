export interface Config {
    mongodb: Mongodb;
    redis: Redis;
    wx: Wx[];
    lark: Lark[];
    gitlab: Gitlab[];
}

export interface Gitlab {
    coorp: string;
    endpoint: string;
    token: string;
}

export interface Lark {
    namespace: string;
    uid: string;
    bots: Bot[];
}

export interface Bot {
    name: string;
    key: string;
    hooks: string;
}

export interface Mongodb {
    host: string;
    port: number;
    db: string;
}

export interface Redis {
    host: string;
    port: number;
    tls: TLS;
}

export interface TLS {
    servername: string;
}

export interface Wx {
    namespace: string
    app: App;
}

export interface App {
    agentid: number;
    secret: string;
    recv: Recv;
}

export interface Recv {
    token: string;
    aeskey: string;
}
