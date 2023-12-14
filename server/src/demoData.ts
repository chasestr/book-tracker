import { BookStatus } from "./entities/Book";

export const bookData = async (userId: number) => [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    status: BookStatus.IN_PROGRESS,
    publisher: "Scribner",
    pages: 180,
    startDate: "2022-01-15",
    finishDate: "2022-02-20",
    notes: "Classic novel set in the Jazz Age.",
    summary: "A story of love, wealth, and the American Dream.",
    genre: "Fiction",
    rating: 4.5,
    userId,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    status: BookStatus.FINISHED,
    publisher: "J.B. Lippincott & Co.",
    pages: 281,
    startDate: "2021-04-10",
    finishDate: "2021-05-25",
    notes: "Compelling tale of racial injustice.",
    summary: "A timeless classic exploring moral growth and empathy.",
    genre: "Fiction",
    rating: 4.8,
    userId,
  },
  {
    title: "1984",
    author: "George Orwell",
    status: BookStatus.IN_PROGRESS,
    publisher: "Secker & Warburg",
    pages: 328,
    startDate: "2021-07-01",
    finishDate: "2021-08-15",
    notes: "Dystopian vision of a totalitarian society.",
    summary: "A cautionary tale about the dangers of oppressive regimes.",
    genre: "Fiction",
    rating: 4.7,
    userId,
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    status: BookStatus.IN_PROGRESS,
    publisher: "Little, Brown and Company",
    pages: 224,
    startDate: "2022-05-10",
    notes: "Coming-of-age novel with a distinctive narrative voice.",
    genre: "Fiction",
    userId,
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    status: BookStatus.IN_PROGRESS,
    publisher: "Harper",
    notes: "Exploration of the history and impact of Homo sapiens.",
    genre: "Non-Fiction",
    userId,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    status: BookStatus.IN_PROGRESS,
    publisher: "Allen & Unwin",
    pages: 310,
    startDate: "2022-08-20",
    finishDate: "2022-09-30",
    notes: "Fantasy adventure novel set in Middle-earth.",
    summary: "The prelude to The Lord of the Rings series.",
    genre: "Fantasy",
    rating: 4.9,
    userId,
  },
  {
    title: "Educated",
    author: "Tara Westover",
    status: BookStatus.IN_PROGRESS,
    publisher: "Random House",
    pages: 334,
    startDate: "2023-02-05",
    finishDate: "2023-03-20",
    notes: "Memoir about the author's pursuit of education.",
    summary: "A powerful story of self-discovery and resilience.",
    genre: "Memoir",
    rating: 4.6,
    userId,
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    status: BookStatus.FINISHED,
    publisher: "HarperOne",
    pages: 197,
    startDate: "2022-11-10",
    finishDate: "2022-12-25",
    notes: "Philosophical novel about pursuing dreams and destiny.",
    summary: "A journey of self-discovery and spiritual awakening.",
    genre: "Fiction",
    rating: 4.5,
    userId,
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    status: BookStatus.NOT_STARTED,
    publisher: "Celadon Books",
    pages: 336,
    startDate: "2023-01-15",
    notes: "Psychological thriller with unexpected twists.",
    genre: "Mystery",
    userId,
  },
  {
    title: "The Power of Habit",
    author: "Charles Duhigg",
    status: BookStatus.NOT_STARTED,
    publisher: "Random House",
    notes: "Exploration of the science behind habits and how they work.",
    genre: "Non-Fiction",
    userId,
  },
];

export interface logDataInput {
  date: string;
  bookId: number;
  userId: number;
  pagesRead?: number;
  minutes?: number;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomDateWithinLastYear(): Date {
  const currentDate = new Date();
  const lastYear = new Date(currentDate);
  lastYear.setFullYear(currentDate.getFullYear() - 1);

  return new Date(getRandomInt(lastYear.getTime(), currentDate.getTime()));
}

export const logData = async (bookIds: number[], userId: number) => {
  const logs: logDataInput[] = [];

  // Generate at least 20 logs within the last week
  logs.push(...generateLogs(bookIds, userId, 20, "lastWeek"));

  // Generate at least 20 logs within the last month
  logs.push(...generateLogs(bookIds, userId, 20, "lastMonth"));

  // Generate the rest of the logs within the last year
  logs.push(
    ...generateLogs(
      bookIds,
      userId,
      10 * bookIds.length - logs.length,
      "lastYear"
    )
  );

  return logs;
};

function generateLogs(
  bookIds: number[],
  userId: number,
  count: number,
  timePeriod: "lastWeek" | "lastMonth" | "lastYear"
): logDataInput[] {
  const logs: logDataInput[] = [];
  const currentDate = new Date();

  for (let i = 0; i < count; i++) {
    let randomDate: Date;

    if (timePeriod === "lastWeek") {
      randomDate = getRandomDateWithinLastWeek(currentDate);
    } else if (timePeriod === "lastMonth") {
      randomDate = getRandomDateWithinLastMonth(currentDate);
    } else {
      randomDate = getRandomDateWithinLastYear();
    }

    const bookId = bookIds[i % bookIds.length];
    logs.push({
      date: formatDate(randomDate),
      bookId,
      userId,
      pagesRead: getRandomInt(10, 50),
      minutes: getRandomInt(15, 120),
    });
  }

  return logs;
}

function formatDate(date: Date): string {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

function getRandomDateWithinLastWeek(currentDate: Date): Date {
  const lastWeek = new Date(currentDate);
  lastWeek.setDate(currentDate.getDate() - 7);
  return getRandomDateWithinRange(lastWeek, currentDate);
}

function getRandomDateWithinLastMonth(currentDate: Date): Date {
  const lastMonth = new Date(currentDate);
  lastMonth.setMonth(currentDate.getMonth() - 1);
  return getRandomDateWithinRange(lastMonth, currentDate);
}

function getRandomDateWithinRange(startDate: Date, endDate: Date): Date {
  return new Date(getRandomInt(startDate.getTime(), endDate.getTime()));
}
