
import { procedure, router } from './trpc';
import fs from 'fs/promises';
import path from 'path';
import {z} from "zod";


async function getData() {
  const filePath = path.join(process.cwd(), 'src/data/db.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}


 async function saveData(data:any) {
  const filePath = 'src/data/db.json'; 
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export const appRouter = router({
  getVideos: procedure.query(async () => {
    const data = await getData();
    return data;
  }),
  getVideoById: procedure
  .input(z.string()) 
  .query(async (opts) => {
    const { input: videoId } = opts;
    const data = await getData();
    const video = data.find((video: { id: string }) => video.id === videoId);
    if (!video) {
      throw new Error('Video not found');
    }
    return video;
  }),
  updateLikeAndViewCount: procedure.input(
    z.object({
      id: z.string(),
      incrementWatchCount: z.boolean(),
      incrementLikeCount: z.boolean(),
    })
  ).mutation(async (opts) => {
    const { id, incrementWatchCount, incrementLikeCount } = opts.input;
    let data = await getData(); 
    const video = data.find((v: { id: string }) => v.id === id); 
    if (!video) {
      throw new Error('Video not found');
    }
    if (incrementWatchCount) {
      video.watchCount += 1; 
    }

    if (incrementLikeCount) {
      video.likeCount += 1; 
    }

    await saveData(data);  
    return {
      watchCount: video.watchCount,  
      likeCount: video.likeCount,  
    };
  }),
});

export type AppRouter = typeof appRouter;