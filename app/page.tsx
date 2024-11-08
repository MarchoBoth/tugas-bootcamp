import { getMovies } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const movies = await getMovies();

  return (
    <div className="h-full space-y-10 my-20">
      <h1 className="text-center text-3xl font-semibold">Movie List</h1>
      <div className="grid grid-cols-4 max-w-screen-xl gap-5 mx-auto">
        {movies.map((movie, i) => (
          <div
            key={i}
            className="relative aspect-square rounded-lg overflow-hidden shadow-lg group flex items-center justify-center"
          >
            <Image
              src={movie.Poster}
              alt={movie.Title}
              fill
              className="object-cover"
            />
            <Link
              href={`/movies/${movie.imdbID}`}
              className="absolute bg-green-500 px-5 py-2 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
