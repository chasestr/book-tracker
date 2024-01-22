import axios from "axios";
import { SearchResult } from "./types/SearchResult";
import { imageBackup } from "../../server/src/constants";

const api = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/volumes",
});

export const getSearch = async (query: string) => {
  const {
    data: { items },
  } = await api.get("?q=" + query + "&maxResults=20");

  const dataFormat = items?.map((item: SearchResult) => {
    return {
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      published: item.volumeInfo.publishedDate || "Unknown",
      srcImg: item.volumeInfo.imageLinks?.thumbnail || imageBackup,
    };
  });
  return dataFormat;
};

export const getBook = async (id: string) => {
  const { data } = await api.get(id);
  const dataFormat = {
    title: data?.volumeInfo.title,
    authors: data?.volumeInfo.authors,
    publisher: data?.volumeInfo.publisher,
    pages: data?.volumeInfo.pageCount,
    description: data?.volumeInfo.description,
    published: data?.volumeInfo.publishedDate,
    categories: data?.volumeInfo.categories,
    srcImg:
      data.volumeInfo.imageLinks?.thumbnail ||
      data.volumeInfo.imageLinks?.smallThumbnail ||
      data.volumeInfo.imageLinks?.small ||
      data.volumeInfo.imageLinks?.medium ||
      data.volumeInfo.imageLinks?.large ||
      data.volumeInfo.imageLinks?.extraLarge ||
      imageBackup,
  };
  return dataFormat;
};
