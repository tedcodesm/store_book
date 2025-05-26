import axios from "axios";

const GUTENDEX_URL = "https://gutendex.com/books";

export async function searchBooks(query) {
  const { data } = await axios.get(
    `${GUTENDEX_URL}?search=${encodeURIComponent(query)}`
  );
  return data.results.map((book) => ({
    id: book.id,
    title: book.title,
    authors: book.authors.map((a) => a.name).join(", "),
    cover: book.formats["image/jpeg"],
    textUrl:
      book.formats["text/plain; charset=utf-8"] ||
      book.formats["text/plain"] ||
      null,
  }));
}

export async function getBookText(id) {
  const { data } = await axios.get(`${GUTENDEX_URL}/${id}`);
  const formats = data.formats;
  const textUrl =
    formats["text/plain; charset=utf-8"] ||
    formats["text/plain"];

  if (!textUrl) throw new Error("Text not available");

  const response = await axios.get(textUrl);
  return response.data;
}
