import { isObjectBindingPattern, textChangeRangeIsUnchanged } from "typescript";
export function GenLarkTextMsg(text: string) {
    return {
        msg_type: "text",
        content: {
            text: text
        }
    }

}

export function GenLarkBasicDescriptionMsg(opt: {
    title: string
    kvs: {
        [key: string]: string
    }

}) {
    return {
        msg_type: "post",
        content: {
            post: {
                zh_cn: {
                    title: opt.title,
                    content: Object.entries(opt.kvs).map(
                        ([k, v]) => ([{
                            tag: 'text',
                            text: `${k}: \t`
                        }, {
                            tag: 'text',
                            text: `${v}`
                        }]))
                }
            }
        }
    }
}