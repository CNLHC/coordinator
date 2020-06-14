import 'isomorphic-fetch'
import Relay from '../../../relay'
import WXWorkClient from '../sdk'
import TopicsList from '../../../relay/topic_list'
import GQLClient from '../../../cvs/gitlab/client'


export function InitWxPublish() {
    Relay.Subscribe(TopicsList.GitlabReceiveMR, (msg) => {
        const obj = JSON.parse(msg)
        WXWorkClient.send_message({
            touser: "@all",
            msgtype: "textcard",
            textcard: {
                title: "合并请求",
                description: `
                <div class=\"normal\"> 
                ${obj?.user?.name} 在仓库
                <div class=\"highlight\">${obj?.repository?.name}</div>
                中创建了一个新的合并请求:
                <br/>
                ${obj.object_attributes.title}:${obj.object_attributes.description}
                </div>
                `,
                url: obj?.object_attributes?.url,
                btnext: "围观"
            }
        })
    })

    Relay.Subscribe(TopicsList.WorkWXReceivedMessage, (msg) => {
        const obj = JSON.parse(msg)
        if (obj.xml.Content == '待办') {
            let gitlab_username: string
            if (obj.xml.FromUserName == "DingGuanHua") {
                gitlab_username = "npeight"
            } else
                gitlab_username = 'CNLHC'

            GQLClient.request(
                /* GraphQL */`
            query($username:String){
            group(fullPath:"pa"){
                webUrl
            issues(state:opened,assigneeUsername:$username){
                nodes{
                title,
                createdAt,
                webUrl
                }
            }
            }
            } `, {
                username: gitlab_username
            }
            ).then(data => {
                console.log(data)
                const payload = {
                    touser: obj.xml.FromUserName,
                    msgtype: "text" as "textcard",
                    text: {
                        content: `待办项目\n${data.group.issues.nodes.map((e: any) => `<a href="${e.webUrl}#targe=out"> ${e.title}</a>`).join("\n")}`
                    }
                }
                WXWorkClient.send_message(payload)
            })
        }
    })
}
