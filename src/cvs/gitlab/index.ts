import GQLClient from './client'
import "isomorphic-fetch"

const query = /* GraphQL */ ` 
{
  group(fullPath:"pa"){
    fullName
    milestones(state: active){
      nodes{
        title
        state
        webPath
      }
    } 
  } 
}`

GQLClient.request(query)
  .then(d=>console.log(d.group.milestones.nodes))
  .catch(e=>console.log(e))

