import Link from "next/link";
import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold mb-4 text-center">
        Here you can find a list of videos
      </h1>
      <p className="text-center p-4 text-2xl">
        Made by Maryna Skyba for Vidext
      </p>
      <Link href="/video-list">
        <Button className="mt-6">Go to List of videos</Button>
      </Link>
    </div>
  );
}
