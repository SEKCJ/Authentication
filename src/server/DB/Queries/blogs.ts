import { Query } from '../index';

const all = async () => {
    return Query("SELECT * FROM blogs;");
}

const one = async (id: number) => {
    return Query("SELECT * FROM blogs WHERE id = ?;", [id]);
}

const post = async (title: string, content: string) => {
    let values = [title, content];
    return Query("INSERT INTO blogs (title, content) VALUES(?,?);", values);
}

const put = async (id: number, title: string, content: string) => {
    let values = [title, content, id];
    return Query("UPDATE blogs SET title = ?, content = ? WHERE id = ?", [title, content, id]);
}

const del = async (id: number) => {
    return Query("DELETE FROM blogs WHERE id = ?;", [id]);
}

export default {
    all,
    one,
    post,
    put,
    del
}