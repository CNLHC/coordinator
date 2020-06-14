import CryptoJS from "crypto-js"


export function decrypt_message(
    param: {
        aeskey: string,
        encrypted: string,
    }
) {
    const aes_key = CryptoJS.enc.Base64.parse(`${param.aeskey}=`)
    const aes_iv = CryptoJS.enc.Base64.parse(Buffer.from(`${param.aeskey}=`, "base64")
        .slice(0, 16).toString('base64'))
    const aes_encrypted = param.encrypted
    try {
        let buf = Buffer.from(
            CryptoJS.AES.decrypt(aes_encrypted, aes_key, {
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
                iv: aes_iv
            }).toString(CryptoJS.enc.Base64), 'base64')

        //remove random bits
        buf = buf.slice(16)
        const msg_len = (buf[0] << 24) + (buf[1] << 16) + (buf[2] << 8) + (buf[3])
        const msg = buf.slice(4, msg_len + 4).toString('utf8')
        const receive_id = buf.slice(msg_len + 4).toString('utf8')
        return {
            msg,
            receive_id
        }
    } catch (e) {
        return undefined
    }
}

export function verify_integrity(param: {
    token: string,
    encrypted: string
    nonce: string
    timestamp: string
    signature: string
}): boolean {
    console.log(0, param)
    console.log(111,
        CryptoJS.SHA1([
            param.token,
            param.timestamp,
            param.nonce,
            param.encrypted
        ].sort().join("")
        ).toString(CryptoJS.enc.Hex)

    )
    console.log(222,
        param.signature
    )
    return CryptoJS.SHA1([
        param.token,
        param.timestamp,
        param.nonce,
        param.encrypted
    ].sort().join("")
    ).toString(CryptoJS.enc.Hex) == param.signature
}
