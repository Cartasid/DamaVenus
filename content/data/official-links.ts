export const officialLinks = {
  website: "https://damavenus.eu",
  instagram: "https://www.instagram.com/ichbindamavenus",
  youtube: "https://www.youtube.com/@damavenus",
  linkedin: "https://www.linkedin.com/in/dama-venus-tamiris-brasil-b186613b2/",
  filmmakers: "https://www.filmmakers.eu/en/actors/tamiris-dama-venus",
  amazonMusic: "https://music.amazon.in/artists/B0DS9J3DPX/dama-venus"
} as const;

export const officialReleaseLinks = {
  lonelyBerlin: "https://music.amazon.com/albums/B0GYGDDD5V",
  valentines: "https://music.amazon.in/albums/B0GPKXTGF9",
  eclipse: "https://music.amazon.com/albums/B0FG2WH6TG",
  closeFriend: "https://music.amazon.in/albums/B0DV4QF1DX"
} as const;

export const artistSameAs = [
  officialLinks.instagram,
  officialLinks.youtube,
  officialLinks.linkedin,
  officialLinks.filmmakers,
  officialLinks.amazonMusic
] as const;
