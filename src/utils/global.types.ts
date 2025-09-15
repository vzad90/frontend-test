export interface Movie {
  id: string;
  poster: string
  title: string;
  year: string;
  runtime: string;
  genre: string;
  director: string
  isFavorite: boolean;
}

export type OmdbSearchItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type OmdbSearchResponse = {
  Search: OmdbSearchItem[];
  totalResults: string;
  Response: "True" | "False";
  Error?: string;
};

export type OmdbMovieDetail = {
  Title: string;
  Year: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: Array<{ Source: string; Value: string }>;
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID: string;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: "True" | "False";
  Error?: string;
};
