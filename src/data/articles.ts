export type Article = {
  title: string;
  description: string;
  url: string;
  date: string;
};

export const ARTICLES: Article[] = [
  // Add articles here as you publish them, for example:
  // {
  //   title: "How I Built a CDC Lakehouse From Scratch",
  //   description: "A walkthrough of streaming Postgres changes into a Delta Lake medallion architecture.",
  //   url: "https://yourwordpresssite.com/cdc-lakehouse-writeup",
  //   date: "2026-09-01",
  // },
];
