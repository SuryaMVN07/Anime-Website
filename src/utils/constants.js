export const GENRES = [
  { id: null, label: 'All Genres' },
  { id: 1, label: 'Action' },
  { id: 2, label: 'Adventure' },
  { id: 4, label: 'Comedy' },
  { id: 10, label: 'Fantasy' },
  { id: 24, label: 'Sci-Fi' },
  { id: 14, label: 'Horror' },
  { id: 22, label: 'Romance' },
  { id: 36, label: 'Slice of Life' },
  { id: 30, label: 'Sports' },
  { id: 8, label: 'Drama' },
  { id: 7, label: 'Mystery' },
  { id: 37, label: 'Supernatural' }
];

export const ANIME_TYPES = [
  { value: null, label: 'Any Type' },
  { value: 'tv', label: 'TV Series' },
  { value: 'movie', label: 'Movie' },
  { value: 'ova', label: 'OVA' },
  { value: 'special', label: 'Special' },
  { value: 'ona', label: 'ONA' }
];

export const ANIME_STATUS = [
  { value: null, label: 'Any Status' },
  { value: 'airing', label: 'Airing' },
  { value: 'complete', label: 'Complete' },
  { value: 'upcoming', label: 'Upcoming' }
];

export const DEFAULT_ITEMS = [
  {
    mal_id: 21,
    title: "One Piece",
    title_english: "One Piece",
    images: { webp: { large_image_url: "https://cdn.myanimelist.net/images/anime/6/73245l.jpg" } },
    trailer: { youtube_id: "mfKZ5mwr0m4" },
    score: 9.7,
    year: 1999,
    aired: { string: "Oct 20, 1999 to ?" },
    status: "Currently Airing",
    genres: [{ name: "Action" }, { name: "Adventure" }, { name: "Fantasy" }],
    type: "TV",
    episodes: 1000,
    synopsis: "Gol D. Roger was known as the 'Pirate King', the strongest and most infamous being to have sailed the Grand Line..."
  },
  {
    mal_id: 40748,
    title: "Jujutsu Kaisen",
    title_english: "Jujutsu Kaisen",
    images: { webp: { large_image_url: "https://cdn.myanimelist.net/images/anime/1171/109222l.jpg" } },
    trailer: { youtube_id: "pkNE7D7LqU8" },
    score: 8.9,
    year: 2020,
    aired: { string: "Oct 3, 2020 to Mar 27, 2021" },
    status: "Finished Airing",
    genres: [{ name: "Action" }, { name: "Supernatural" }],
    type: "TV",
    episodes: 24,
    synopsis: "Idly indulging in baseless paranormal activities with the Occult Club, high schooler Yuuji Itadori spends his days..."
  },
  {
    mal_id: 38000,
    title: "Demon Slayer: Kimetsu no Yaiba",
    title_english: "Demon Slayer: Kimetsu no Yaiba",
    images: { webp: { large_image_url: "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg" } },
    trailer: { youtube_id: "VQGCKyvzIM4" },
    score: 8.9,
    year: 2019,
    aired: { string: "Apr 6, 2019 to Sep 28, 2019" },
    status: "Finished Airing",
    genres: [{ name: "Action" }, { name: "Demons" }, { name: "Historical" }],
    type: "TV",
    episodes: 26,
    synopsis: "Ever since the death of his father, the burden of supporting the family has fallen upon Tanjirou Kamado's shoulders..."
  },
  {
    mal_id: 1735,
    title: "Naruto: Shippuden",
    title_english: "Naruto: Shippuden",
    images: { webp: { large_image_url: "https://cdn.myanimelist.net/images/anime/5/17407l.jpg" } },
    trailer: { youtube_id: "1W8x7vC9eTs" },
    score: 8.2,
    year: 2007,
    aired: { string: "Feb 15, 2007 to Mar 23, 2017" },
    status: "Finished Airing",
    genres: [{ name: "Action" }, { name: "Adventure" }, { name: "Martial Arts" }],
    type: "TV",
    episodes: 500,
    synopsis: "It has been two and a half years since Naruto Uzumaki left Konohagakure, the Hidden Leaf Village..."
  },
  {
    mal_id: 16498,
    title: "Attack on Titan",
    title_english: "Attack on Titan",
    images: { webp: { large_image_url: "https://cdn.myanimelist.net/images/anime/10/47347l.jpg" } },
    trailer: { youtube_id: "MGRm4IzK1SQ" },
    score: 8.5,
    year: 2013,
    aired: { string: "Apr 7, 2013 to Sep 29, 2013" },
    status: "Finished Airing",
    genres: [{ name: "Action" }, { name: "Drama" }, { name: "Fantasy" }],
    type: "TV",
    episodes: 25,
    synopsis: "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans..."
  },
  {
    mal_id: 269,
    title: "Bleach",
    title_english: "Bleach",
    images: { webp: { large_image_url: "https://cdn.myanimelist.net/images/anime/3/40451l.jpg" } },
    trailer: { youtube_id: "B2tqA0Jp7wE" },
    score: 7.9,
    year: 2004,
    aired: { string: "Oct 5, 2004 to Mar 27, 2012" },
    status: "Finished Airing",
    genres: [{ name: "Action" }, { name: "Adventure" }, { name: "Super Power" }],
    type: "TV",
    episodes: 366,
    synopsis: "Ichigo Kurosaki is an ordinary high schooler—until his family is attacked by a Hollow, a corrupt spirit..."
  }
];

export const API_BASE = 'https://api.jikan.moe/v4';