import fastify from 'fastify'
import { InitWxPublish } from '../im/wx/publisher'

const app = fastify({ logger: true })

async function InitHooksServer() {
    app.register(require('fastify-xml-body-parser'))

    app.register(require('../im/wx/hooks/index'), { prefix: "/hooks/wx" })
    app.register(require('../im/lark/hooks/index'), { prefix: "/hooks/lark" })
    app.register(require('../cvs/gitlab/hooks'), { prefix: "/hooks/gitlab" })
    app.register(require('../pam/hooks'), { prefix: "/hooks/pam" })
    app.register(require("../monitor/grafana/hooks"), { prefix: "/hooks/grafana" })

    app.listen(8765, "0.0.0.0", (err, address) => {
        InitWxPublish()
        if (err) console.log(err)
        console.log(`Hooks server listen at ${address}`)
    })
}

export default InitHooksServer
