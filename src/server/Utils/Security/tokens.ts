import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import Config from '../../Config';
import DbTokens from '../../DB/Queries/accesstokens';

export const CreateToken = async (payload: IPayload) => {
    let tokenid: any = await DbTokens.post(payload.userid);
    payload.accesstokenid = tokenid.insertId;
    payload.unique = crypto.randomBytes(32).toString('hex');
    let token = await jwt.sign(payload, Config.auth.secret);
    await DbTokens.put(payload.accesstokenid, token);
    return token;
}

export const ValidToken = async (token: string) => {
    let payload: IPayload = <IPayload>jwt.decode(token);
    let [accesstokenid] = await DbTokens.one(payload.accesstokenid, token);
    if (!accesstokenid) {
        throw new Error("Invalid Token")
    } else {
        return payload;
    }
}

export interface IPayload {
    [key: string]: any;
    userid: number,
    unique?: string;
}