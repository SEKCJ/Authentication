import * as express from 'express';
import DbBlogs from '../DB/Queries/blogs';
import { RequestHandler } from 'express-serve-static-core';

const router = express.Router();

const isAdmin: RequestHandler = (req: any, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.sendStatus(401);
    } else {
        return next();
    }
}

router.get('/', async (req, res, next) => {
    try {
        let blogs = await DbBlogs.all();
        res.send(blogs);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

router.get('/:id', isAdmin, async (req, res, next) => {
    let id = parseInt(req.params.id, 10);
    console.log("Test!")
    try {
        let blog = await DbBlogs.one(id);
        res.send(blog);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

// router.get('/:id?', async (req, res) => {
//     let id: number = parseInt(req.params.id, 10);
//     if (id) {
//         try {
//             res.json((await DbBlogs.one(id))[0])
//         } catch (error) {
//             if (error) throw error;
//             res.sendStatus(500);
//         }
//     } else {
//         try {
//             res.json(await DbBlogs.all())
//         } catch (error) {
//             if (error) throw error;
//             res.sendStatus(500);
//         }
//     }
// })


// router.post("/", async (req, res) => {
//     let title = req.body.title;
//     let content = req.body.content;
//     try {
//         res.json(await DbBlogs.post(title, content))
//     } catch (error) {
//         if (error) throw error;
//         res.sendStatus(500);
//     }
// });

// router.put("/:id?", async (req, res) => {
//     let id: number = parseInt(req.params.id, 10);
//     if (id) {
//         let title: string = req.body.title;
//         let content: string = req.body.content;
//         try {
//             res.json(await DbBlogs.put(id, title, content))
//         } catch (error) {
//             if (error) throw error;
//             res.sendStatus(500);
//         }
//     } else {
//         res.sendStatus(500);
//     }
// });

// router.delete("/id?", async (req, res) => {
//     let id: number = parseInt(req.params.id);
//     if (id) {
//         try {
//             res.json(await DbBlogs.del(id));
//         } catch (error) {
//             if (error) throw error;
//             res.sendStatus(500);
//         }
//     } else {
//         res.sendStatus(500).json("id not provided")
//     }
// });


export default router; 