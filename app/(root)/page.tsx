import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants/indes";

export default async function Home() {

  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title = "Latest Book"
        books = {sampleBooks}
        containerClassName = "mt-28"
      />
    </>
  );
}
