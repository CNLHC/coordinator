import wxcli from './im/wx/sdk'
import GQLClient from './cvs/gitlab/client'
import "isomorphic-fetch"
import Relay from './relay'
import InitHooksServer from './hooks'
import GetConfig from './config/config'


async function main() {
    GetConfig()
    await InitHooksServer()
}
main()

