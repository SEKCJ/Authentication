import { Query } from '../index';

const one = async (id: number, token: string) => {
    return Query('SELECT * FROM tokens WHERE id = ? AND token = ?', [id, token]);
}

const post = async (userid: number) => {
    return Query('INSERT INTO tokens (userid) VALUES (?);', [userid])
}

const put = async (id: number, token: string) => {
    return Query("UPDATE tokens SET token = ? WHERE id = ?", [token, id]);
}

export default {
    one,
    post,
    put
}