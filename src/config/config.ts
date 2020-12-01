const _config =
{
    redis: {
        host: 'redis.cnworkshop.xyz',
        port: 20000,
        tls: {
            servername: 'redis.cnworkshop.xyz'
        }
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
    lark: {
        custom_bot: [{
            key: 'act-sys',
            uuid: '8dc4e146-18c5-4054-b2a0-d008750bb6d3'
        }]

    },
    gitlab: {
        endpoint: 'https://code.cnworkshop.xyz/api/graphql',
        token: 'DAMXx8-uymzN6QDgCMD1'
    }
}

function GetConfig(fp?: string) {
    return _config
}

export default GetConfig