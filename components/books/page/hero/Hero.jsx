import React, { useState } from "react";
import Chance from "chance";

function Hero({ data }) {
  const chanceObj = new Chance();
  const testData = {
    id: 5472,
    isbn: null,
    title: "Animal Farm / 1984",
    series: null,
    description: "This edition features George Orwell’s best-known novels—1984 and Animal Farm—with an introduction by Christopher Hitchens.In 1984, London is a grim city where Big Brother is always watching you and the Thought Police can practically read your mind. Winston Smith joins a secret revolutionary organisation called The Brotherhood, dedicated to the destruction of the Party. Together with his beloved Julia, he hazards his life in a deadly match against the powers that be. Animal Farm is Orwell’s classic satire of the Russian Revolution - an account of the bold struggle, initiated by the animals, that transforms Mr. Jones’s Manor Farm into Animal Farm - a wholly democratic society built on the credo that All Animals Are Created Equal. But are they? AUTHOR: George Orwell (1903-1950) was born in India and served with the Imperial Police in Burma before joining the Republican Army in the Spanish Civil War. Orwell was the author of six novels as well as numerous essays and nonfiction works.",
    pages: 400,
    publicationDate: "June 1st 2003",
    language: "English",
    rating: 4.3,
    ratings: 179190,
    imageURL: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327959366l/5472.jpg",
    genres: [
      "Classics",
      "Fiction",
      "Science Fiction > Dystopia",
      "Literature",
      "Science Fiction",
      "Politics",
      "Fantasy",
      "Novels",
      "Academic > School",
      "Philosophy",
    ],
    amazonLink: "https://www.goodreads.com/buy_buttons/12/follow?book_id=5472&page_type=book&page_type_id=5472&ref=x_gr_w_bb_sout&sub_page_type=show&tag=x_gr_w_bb_sout-20",
    author: {
      name: "George Orwell",
      about: "Eric Arthur Blair, better known by his pen name George Orwell, was an English author and journalist. His work is marked by keen intelligence and wit, a profound awareness of social injustice, an intense opposition to totalitarianism, a passion for clarity in language, and a belief in democratic socialism.\n\nIn addition to his literary career Orwell served as a police officer with the Indian Imperial Police in Burma from 1922-1927 and fought with the Republicans in the Spanish Civil War from 1936-1937. Orwell was severely wounded when he was shot through his throat. Later the organization that he had joined when he joined the Republican cause, The Workers Party of Marxist Unification (POUM), was painted by the pro-Soviet Communists as a Trotskyist organization (Trotsky was Joseph Stalin's enemy) and disbanded. Orwell and his wife were accused of \"rabid Trotskyism\" and tried in absentia in Barcelona, along with other leaders of the POUM, in 1938. However by then they had escaped from Spain and returned to England. \n\nBetween 1941 and 1943, Orwell worked on propaganda for the BBC. In 1943, he became literary editor of the Tribune, a weekly left-wing magazine. He was a prolific polemical journalist, article writer, literary critic, reviewer, poet, and writer of fiction, and, considered perhaps the twentieth century's best chronicler of English culture. \n\nOrwell is best known for the dystopian novel Nineteen Eighty-Four (published in 1949) and the satirical novella Animal Farm (1945) — they have together sold more copies than any two books by any other twentieth-century author. His 1938 book Homage to Catalonia, an account of his experiences as a volunteer on the Republican side during the Spanish Civil War, together with numerous essays on politics, literature, language, and culture, have been widely acclaimed.\n \nOrwell's influence on contemporary culture, popular and political, continues decades after his death. Several of his neologisms, along with the term \"Orwellian\" — now a byword for any oppressive or manipulative social phenomenon opposed to a free society — have entered the vernacular.",
      aboutHTML: "<b>Eric Arthur Blair</b>, better known by his pen name <b>George Orwell</b>, was an English author and journalist. His work is marked by keen intelligence and wit, a profound awareness of social injustice, an intense opposition to totalitarianism, a passion for clarity in language, and a belief in democratic socialism.<br><br>In addition to his literary career Orwell served as a police officer with the Indian Imperial Police in Burma from 1922-1927 and fought with the Republicans in the Spanish Civil War from 1936-1937. Orwell was severely wounded when he was shot through his throat. Later the organization that he had joined when he joined the Republican cause, The Workers Party of Marxist Unification (POUM), was painted by the pro-Soviet Communists as a Trotskyist organization (Trotsky was Joseph Stalin's enemy) and disbanded. Orwell and his wife were accused of \"rabid Trotskyism\" and tried in absentia in Barcelona, along with other leaders of the POUM, in 1938. However by then they had escaped from Spain and returned to England. <br><br>Between 1941 and 1943, Orwell worked on propaganda for the BBC. In 1943, he became literary editor of the Tribune, a weekly left-wing magazine. He was a prolific polemical journalist, article writer, literary critic, reviewer, poet, and writer of fiction, and, considered perhaps the twentieth century's best chronicler of English culture. <br><br>Orwell is best known for the dystopian novel <i>Nineteen Eighty-Four</i> (published in 1949) and the satirical novella <i>Animal Farm</i> (1945) — they have together sold more copies than any two books by any other twentieth-century author. His 1938 book <i>Homage to Catalonia</i>, an account of his experiences as a volunteer on the Republican side during the Spanish Civil War, together with numerous essays on politics, literature, language, and culture, have been widely acclaimed.<br> <br>Orwell's influence on contemporary culture, popular and political, continues decades after his death. Several of his neologisms, along with the term \"Orwellian\" — now a byword for any oppressive or manipulative social phenomenon opposed to a free society — have entered the vernacular.",
      imageURL: "https://images.gr-assets.com/authors/1588856560p3/3706.jpg",
      followers: 37959,
    },
  };
  if (!testData) return <div hidden />;

  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full flex xs:flex-col xs:items-center ">
      <div className="w-1/4 px-2 xs:w-full xs:flex xs:justify-center xs:mb-4">
        <img
          className="mf-bevel"
          src={data.imageURL}
          alt="cover"
        />
      </div>
      <div className="w-3/4 flex flex-col px-2 xs:w-full xs:text-center">
        <span className="font-black text-3xl">{data.title}</span>
        <span className="text-sm">
          by
          {" "}
          {data.author.name}
        </span>
        <div title={`Rating ${data.rating} of 5`} className="flex  my-2 xs:items-center xs:justify-center">
          {Array.from({ length: Math.floor(data.rating) }, () => (
            <button key={chanceObj.guid()} className="appearance-none disabled:opacity-50" type="button" tabIndex="-1" aria-label="Rating 1 of 5">
              <svg className="h-5 w-5 shrink-0 fill-amber-400" viewBox="0 0 256 256">
                <path d="M239.2,97.4A16.4,16.4,0,0,0,224.6,86l-59.4-4.1-22-55.5A16.4,16.4,0,0,0,128,16h0a16.4,16.4,0,0,0-15.2,10.4L90.4,82.2,31.4,86A16.5,16.5,0,0,0,16.8,97.4,16.8,16.8,0,0,0,22,115.5l45.4,38.4L53.9,207a18.5,18.5,0,0,0,7,19.6,18,18,0,0,0,20.1.6l46.9-29.7h.2l50.5,31.9a16.1,16.1,0,0,0,8.7,2.6,16.5,16.5,0,0,0,15.8-20.8l-14.3-58.1L234,115.5A16.8,16.8,0,0,0,239.2,97.4Z" />
              </svg>
            </button>
          ))}
          {Array.from({ length: 5 - Math.floor(data.rating) }, () => (
            <button key={chanceObj.guid()} className="appearance-none disabled:opacity-50" type="button" tabIndex="-1" aria-label="Rating 4 of 5">
              <svg className="h-5 w-5 shrink-0 fill-gray-300" viewBox="0 0 256 256">
                <path d="M239.2,97.4A16.4,16.4,0,0,0,224.6,86l-59.4-4.1-22-55.5A16.4,16.4,0,0,0,128,16h0a16.4,16.4,0,0,0-15.2,10.4L90.4,82.2,31.4,86A16.5,16.5,0,0,0,16.8,97.4,16.8,16.8,0,0,0,22,115.5l45.4,38.4L53.9,207a18.5,18.5,0,0,0,7,19.6,18,18,0,0,0,20.1.6l46.9-29.7h.2l50.5,31.9a16.1,16.1,0,0,0,8.7,2.6,16.5,16.5,0,0,0,15.8-20.8l-14.3-58.1L234,115.5A16.8,16.8,0,0,0,239.2,97.4Z" />
              </svg>
            </button>
          ))}
          <span className="ml-2 text-sm">
            {data.rating}
            /5 (Goodreads Rating)
          </span>
        </div>
        <div className="w-full flex flex-col mt-0">
          {data.description.length > 993 ? (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              {expanded ? (
                <>
                  <span className="text-justify">{data.description}</span>
                  <span
                    onClick={() => setExpanded(false)}
                    className="cursor-pointer font-bold text-sm hover:underline mt-2 w-32 text-left "
                  >
                    read less
                  </span>
                </>
              ) : (
                <>
                  <span className="text-justify line-clamp-6">{data.description}</span>
                  <span
                    onClick={() => setExpanded(true)}
                    className="cursor-pointer font-bold text-sm hover:underline mt-2 w-32 text-left"
                  >
                    read more
                  </span>
                </>
              )}
            </>
          ) : (
            <span className="text-justify">{data.description}</span>
          )}
        </div>
        <div className="flex flex-wrap mt-4 items-center select-none">
          {testData.genres.map((genre) => (
            <span
              className="bg-mf-black text-mf-white text-xs py-1 px-2 mr-2 mb-2 rounded-full "
              key={chanceObj.guid()}
            >
              {genre.includes(">") ? genre.split(">")[1] : genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
