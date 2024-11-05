import { getMovies } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type GenreSlugPageProps = {
  params: {
    slug: string[];
  };
};

export default async function GenreSlugPage({ params }: GenreSlugPageProps) {
  const { slug } = await params;

  const movies = await getMovies();

  // Filter movies based on the slug array
  const selectMovies = movies.filter((movie) => {
    // Split and trim genres from the movie data
    const genres = movie.Genre.split(",").map((genre) => genre.trim());

    // Check if every genre in slug is included in the genres of the movie
    return slug.every((s) => genres.includes(s));
  });

  return (
    <div className="h-full space-y-10 my-20">
      <h1 className="text-center text-3xl font-semibold">Movie List</h1>
      <div className="grid grid-cols-4 max-w-screen-xl gap-5 mx-auto">
        {selectMovies.map((movie, i) => (
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
      {selectMovies.length === 0 && (
        <p className="w-full text-center">No movies</p>
      )}
    </div>
  );
}
