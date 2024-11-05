import { Movie } from "@/types/movie";

export async function getMovies() {
  const res = await fetch(
    "https://raw.githubusercontent.com/toedter/movies-demo/refs/heads/master/backend/src/main/resources/static/movie-data/movies-250.json"
  );

  const data = await res.json();
  return data.movies as Movie[];
}
