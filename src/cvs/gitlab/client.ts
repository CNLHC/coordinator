import { GraphQLClient } from 'graphql-request'
import GetConfig from '../../config/config'
const config = GetConfig().gitlab


const GQLClient = new GraphQLClient(
    config.endpoint,
    {
        headers: {
            authorization: `Bearer ${config.token}`,
        }
    }
)


export default GQLClient


