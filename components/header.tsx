"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Header({ genres }: { genres: string[] }) {
  const [linkGenre, setLinkGenre] = useState<string[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname.includes("/genres/")) {
      const allGenresFromUrl = pathname.replace("/genres/", "").split("/");
      setLinkGenre(allGenresFromUrl);
    }
  }, [pathname]);

  const onClick = (genre: string) => {
    if (linkGenre.includes(genre)) {
      const filteredGenres = linkGenre.filter((link) => link !== genre);
      setLinkGenre(filteredGenres);
      if (filteredGenres.length === 0) {
        router.push(`/`);
      } else {
        router.push(`/genres/${filteredGenres.join("/")}`);
      }
    } else {
      const newLinkGenre = [...linkGenre, genre];
      setLinkGenre(newLinkGenre);
      router.push(`/genres/${newLinkGenre.join("/")}`);
    }
  };

  return (
    <header className="bg-black text-white flex justify-center py-5 gap-5">
      <Link href={"/"}>Home</Link>
      <div className="group">
        Genre
        <div className="hidden group-hover:grid grid-cols-4 gap-2 absolute text-black bg-white p-5 border z-10">
          {genres.map((genre, i) => (
            <div key={i} className="space-x-2">
              <label htmlFor={`genre-${i}`}>{genre}</label>
              <input
                id={`genre-${i}`}
                type="checkbox"
                checked={linkGenre.includes(genre)} // Set checkbox checked if genre is in linkGenre
                onChange={() => onClick(genre)} // Update on genre click
              />
            </div>
          ))}
        </div>
      </div>
      <div>Country</div>
    </header>
  );
}
