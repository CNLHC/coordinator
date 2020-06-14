const _config =
{
    redis: {
        host: 'redis.infrastructure.svc.cluster.local',
        port: 6379
    },
    wx: {
        corpid: 'wwdeb7a69582c3ebda',
        app: {
            agentid: 1000002,
            secret: 'vnskUi1yRF4-NMlQH_NUq1vAICxCfS5aeXPTY_Kekjk',
            recv: {
                token: 'ob2guM4UH2FYBLv',
                aeskey: 'iSTNrYiNpLY7YrJVaqZzcKhkoxCognYSgOKIgpBB5hu'
            }
        }
    },
    gitlab: {
        endpoint: 'https://code.cnworkshop.xyz:6443/api/graphql',
        token: 'DAMXx8-uymzN6QDgCMD1'
    }
}

function GetConfig(fp?: string) {
    return _config
}
export default GetConfig