export type SearchResult = {
  id: string;
  volumeInfo: {
    title: string;
    authors: string | string[];
    publishedDate: string;
    imageLinks: {
      thumbnail: string;
    };
  };
};
