"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ThumbsUp, SquarePlay } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { trpc } from "@/app/_trpc/client";
import { use } from "react";

type Video = {
  id: string;
  title: string;
  description: string;
  url: string;
  img: string;
  watchCount: number;
  likeCount: number;
};

export default function VideoDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = use(params);

  const {
    data: video,
    isLoading,
    error,
    refetch,
  } = trpc.getVideoById.useQuery(id);

  const { data: allVideos } = trpc.getVideos.useQuery();

  const { mutateAsync: updateCounts } =
    trpc.updateLikeAndViewCount.useMutation();

  const handleWatch = async () => {
    await updateCounts({
      id,
      incrementWatchCount: true,
      incrementLikeCount: false,
    });
    refetch();
  };

  const handleLike = async () => {
    await updateCounts({
      id,
      incrementWatchCount: false,
      incrementLikeCount: true,
    });
    refetch();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!video) {
    notFound();
  }

  const otherVideos = allVideos?.filter((v: Video) => v.id !== id) || [];

  return (
    <div className="max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-semibold">{video?.title}</h1>
      <p className="mt-2">{video?.description}</p>
      <div className="flex items-center space-x-4 mt-4">
        <Button>
          <SquarePlay className="stroke-[#CAF34E]" />
          <p>{video?.watchCount}</p>
        </Button>
        <Button
          onClick={handleLike}
          className="hover:bg-[#A0D300] active:translate-y-1 active:shadow-sm transition-transform"
        >
          <ThumbsUp className="stroke-[#CAF34E]" />
          <p>{video?.likeCount}</p>
        </Button>
      </div>
      <div className="mt-6">
        <video controls className="w-full h-auto" onPlay={handleWatch}>
          <source src={video?.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Other Videos</h2>
        <ul className="mt-4 flex space-x-4 overflow-x-auto pb-4">
          {otherVideos.map((otherVideo: any) => (
            <li key={otherVideo.id} className="flex-none w-48">
              <Link href={`/video/${otherVideo.id}`}>
                <div className="flex flex-col items-center space-y-2 hover:bg-gray-100 p-2 rounded-md">
                  <Image
                    src={otherVideo.img}
                    alt={otherVideo.title}
                    width={200}
                    height={150}
                    priority
                    className="w-full h-auto"
                  />
                  <p className="text-blue-600 hover:text-blue-800 text-sm">
                    {otherVideo.title}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
