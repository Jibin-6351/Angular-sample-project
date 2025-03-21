interface Movie {
  id: number;
  title: string;
  director: string;
  releaseDate: string;
  rating: string;
  description: string;
  genre: string;
  views: number;
}

interface File {
  id: number;
  name: string;
  path: string;
}

export interface MovieDisplay {
  id: number;
  title: string;
  director: string;
  releaseDate: string;
  rating: string;
  description: string;
  genre: string;
  views: number;
  likemovie: number;
  dislikemovie: number;
  file: File;
  movie_trailer: string;
}