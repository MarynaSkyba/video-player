"use client";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import { trpc } from "@/app/_trpc/client";

type Video = {
  id: string;
  title: string;
  description: string;
  url: string;
  img: string;
  watchCount: number;
  likeCount: number;
};

const VideoList = () => {
  const { data: videos, isLoading, error } = trpc.getVideos.useQuery();
  if (isLoading) return <div>Loading videos...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 ">List of Videos</h1>
      <div className="container mx-auto grid gap-10  ">
        {videos?.map((video: Video) => (
          <div
            key={video.id}
            className="border rounded-lg p-4 hover:border-[#A2D94B] flex flex-col md:flex-row "
          >
            <div className="flex-1 md:mr-4">
              <h2 className="text-xl font-semibold">{video.title}</h2>
              <Image
                src={video.img}
                alt={video.title}
                width={150}
                height={100}
                priority
                className="w-auto h-auto rounded-md mt-2"
              />
            </div>

            <div className="flex-1">
              <p className="mt-2">{video.description}</p>
              <div className="mt-4 text-sm text-gray-600">
                <p>Views: {video.watchCount}</p>
                <p>Likes: {video.likeCount}</p>
              </div>
              <Link href={`/video/${video.id}`}>
                <Button className="mt-8">Whatch video</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
