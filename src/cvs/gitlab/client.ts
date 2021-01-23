import { GraphQLClient } from 'graphql-request'
import GetConfig from '../../config/config'
const config = GetConfig().gitlab


const GQLClient = new GraphQLClient(
    config[0].endpoint,
    {
        headers: {
            authorization: `Bearer ${config[0].token}`,
        }
    }
)


export default GQLClient


