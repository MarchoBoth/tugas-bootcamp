import { getMovies } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type MovieDetailProps = {
  params: {
    movieId: string;
  };
};

export default async function MovieDetail(props: MovieDetailProps) {
  const { params } = props;
  const { movieId } = await params;

  const movies = await getMovies();
  const movie = movies.find((item) => item.imdbID === movieId);

  if (!movie) {
    return notFound();
  }

  const genres = movie.Genre.split(",");

  return (
    <div className="flex max-w-screen-lg mx-auto h-full items-center justify-center gap-5">
      <div>
        <Image src={movie.Poster} width={450} height={150} alt={movie.Title} />
      </div>
      <div className="col-span-2 text-lg space-y-2">
        <h2 className="text-3xl font-semibold">{movie?.Title}</h2>
        <p>
          Genre :{" "}
          {genres.map((genre, i) => (
            <span key={i}>
              <Link className="text-blue-500" href={`/genres/${genre.trim()}`}>
                {genre.trim()}
              </Link>
              {i < genres.length - 1 && ", "}
            </span>
          ))}
        </p>
        <p>Actor : {movie.Actors}</p>
        <p>Language : {movie.Language}</p>
        <p>Director : {movie.Director}</p>
        <p>Plot : {movie.Plot}</p>
      </div>
    </div>
  );
}
