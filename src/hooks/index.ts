import fastify from 'fastify'
import { InitWxPublish } from '../im/wx/publisher'

const app = fastify({ logger: true })

async function InitHooksServer() {
    app.register(require('fastify-xml-body-parser'))

    app.register(require('../im/wx/hooks/index'), { prefix: "/hooks/wx" })

    app.register(require('../cvs/gitlab/hooks'), { prefix: "/hooks/gitlab" })

    app.register(require('../pam/hooks'), { prefix: "/hooks/pam" })

    app.listen(8765, "0.0.0.0", (err, address) => {
        InitWxPublish()
        if (err) console.log(err)
        console.log(`Hooks server listen at ${address}`)
    })
}

export default InitHooksServer
