import { getMovies } from '@/lib/utils';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
type ActorDetailProps = {
  params: {
    actorName: string;
  };
};
export default async function ActorDetail(props: ActorDetailProps) {
  const { params } = props;
  const { actorName } = await params;
  const actor = actorName.replaceAll('%20', ' ');
  const movies = await getMovies();
  const selectMovieActor = movies.filter((movie) =>
    movie.Actors.includes(actor)
  );

  return (
    <div className="h-full space-y-10 my-20">
      <h1 className="text-center text-3xl font-semibold">Movies by {actor}</h1>
      <div className="grid grid-cols-4 max-w-screen-xl gap-5 mx-auto">
        {selectMovieActor.map((movie, i) => (
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
              href={`/movies/${movie.imdbID}`} // Corrected link
              className="absolute bg-green-500 px-5 py-2 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Detail
            </Link>
          </div>
        ))}
      </div>
      {selectMovieActor.length === 0 && (
        <p className="w-full text-center">No movies found for this actor</p>
      )}
    </div>
  );
}
