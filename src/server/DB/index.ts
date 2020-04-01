import * as mysql from 'mysql';
import Config from '../Config';
import Tokens from './Queries/accesstokens';
import Users from './Queries/users';
import Blogs from './Queries/blogs';

export const pool = mysql.createPool(Config.mysql);

export const Query = (query: string, values?: Array<string | number>) => {
    return new Promise<Array<any>>((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            if (err) reject(err);
            return resolve(results);
        })
    })
}

export default {
    Tokens,
    Users,
    Blogs
}