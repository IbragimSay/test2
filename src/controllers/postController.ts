import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import multer from 'multer';
import { createClient } from 'redis';
import { addContent, createPost, deletePost, getPost, updataPost } from '../models/postModel';

const client = createClient();

const SecretKey = process.env.SecretKey || 'SecretKey';

export const getPayload = (req: Request): { id: number; role: string } | undefined => {
  const token: string | undefined = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return undefined;
  }
  return jwt.verify(token, SecretKey, (err, data) => {
    if (err) {
      return undefined;
    } else {
      return data;
    }
  }) as { id: number; role: string } | undefined;
};

const createPostController = async (req: Request, res: Response) => {
  try {
    const { title }: { title: string } = req.body;
    const payload = getPayload(req);

    if (!title) {
      return res.status(400).json({
        msg: 'данные невалидные',
      });
    }

    if (!payload) {
      return res.status(401).json({
        msg: 'вы не авторизованы',
      });
    }

    await createPost(payload, title);
    await client.connect();
    await client.DEL(`user${payload.id}`);
    await client.disconnect();

    return res.status(200).json({
      msg: 'пост добавлен',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: 'Eror',
    });
  }
};

const deletePostController = async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);

    const payload = getPayload(req);
    if (!payload) {
      return res.status(400).json({
        msg: 'вы не авторизованы',
      });
    }

    const post = await getPost(id);

    if (!post) {
      return res.status(400).json({
        msg: 'такого поста не существует',
      });
    }

    if (payload.role == 'Admin') {
      await client.connect();
      await client.DEL(`user${payload.id}`);
      await client.disconnect();
      await deletePost(id, post.userId);
      return res.status(200).json({
        msg: 'пост был удалён',
      });
    }

    if (post.userId != payload.id) {
      return res.status(400).json({
        msg: 'у вас нет прав чтобы удалять пост',
      });
    }

    await client.connect();
    await client.DEL(`user${payload.id}`);
    await client.disconnect();
    await deletePost(id, post.userId);

    return res.status(200).json({
      msg: 'пост был удалён',
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: 'Eror',
    });
  }
};

const updataPostController = async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);

    const { title }: { title: string } = req.body;
    if (!title) {
      return res.status(400).json({
        msg: 'данные невалидные',
      });
    }

    const payload = getPayload(req);
    if (!payload) {
      return res.status(400).json({
        msg: 'вы не авторизованы',
      });
    }

    const post = await getPost(id);

    if (!post) {
      return res.status(400).json({
        msg: 'такого поста не существует',
      });
    }

    if (payload.role == 'Admin') {
      await client.connect();
      await client.DEL(`user${payload.id}`);
      await client.disconnect();
      await updataPost(id, post.userId, title);
      return res.status(200).json({
        msg: 'пост был изменён',
      });
    }

    if (post.userId != payload.id) {
      return res.json({
        msg: 'у вас нет прав чтобы изменить этот пост',
      });
    }
    await client.connect();
    await client.DEL(`user${payload.id}`);
    await client.disconnect();
    await updataPost(id, post.userId, title);

    return res.status(200).json({
      msg: 'пост был изменён',
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: 'Eror',
    });
  }
};
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'image');
  },
  filename: (_, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const addContentController = async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);
    await addContent(id, req);
    res.status(200).json({
      msg: `ваш контент: ${req.file?.filename}`,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: 'Eror',
    });
  }
};

export {
  createPostController,
  deletePostController,
  updataPostController,
  addContentController,
  upload,
};
