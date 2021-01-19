import wxcli from './im/wx/sdk'
import GQLClient from './cvs/gitlab/client'
import "isomorphic-fetch"
import Relay from './relay'
import InitHooksServer from './hooks'
import { InitLarkPublisher } from './im/lark/publisher'
import GetConfig from './config/config'


async function main() {
    try {
        GetConfig()
        await InitHooksServer()
        await InitLarkPublisher()
    } catch (e) {
        console.log(e)

    }
}
main()

