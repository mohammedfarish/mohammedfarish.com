import React from "react";
import axios from "axios";
// import Moment from "moment-timezone";
import isDev from "isdev";

// import Comments from "../../../components/books/page/comments/Comments";
import CustomHead from "../../../components/head/Head";
import Error404 from "../../404/index";
import Error500 from "../../500/index";
// import Hero from "../../../components/books/page/hero/Hero";

import fetchGoodReadsData from "../../../utils/functions/fetchGoodReadsData";

const index = ({ data, error }) => {
  if (error) return <Error500 error={error} />;
  if (!data) return <Error404 />;

  return (
    <>
      <CustomHead
        title={`${data.openLibraryData.title.split(":")[0]}`}
        content={data.openLibraryData.description && `${data.openLibraryData.description.substring(0, 151)} ...`}
        image={data.imageURL}
      />
      <div className="w-full md:w-2/3 flex flex-col items-center">

        {/* {data.openLibraryData.additional.isbn[0] && (
          <img
            src={`https://covers.openlibrary.org/b/isbn/${data.openLibraryData.additional.isbn[0]}-L.jpg`}
            alt="test"
          />
        )} */}
        {data.openLibraryData.additional.isbn.map((item) => (
          <img
            key={item}
            src={`https://covers.openlibrary.org/b/isbn/${item}-L.jpg`}
            alt="test"
          />
        ))}
      </div>
    </>
  );
};

export default index;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(ctx) {
  const { id } = ctx.params;

  const base4Decode = (str) => Buffer.from(str, "base64").toString("utf8");

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
    popularReviews: [
      {
        user: {
          name: "Dylan McIntosh",
          imageURL: "https://images.gr-assets.com/users/1325629438p2/3439872.jpg",
        },
        likes: 94,
        body: "I read Animal Farm once a decade. It is a quick read that constantly reminds me that I need to keep the blinders off and not take everything for granted. \n\nI have a strange desire for bacon for some reason.",
        bodyHTML: "I read Animal Farm once a decade. It is a quick read that constantly reminds me that I need to keep the blinders off and not take everything for granted. <br><br>I have a strange desire for bacon for some reason.",
        rating: 4,
        date: "Mar 15, 2010",
      },
      {
        user: {
          name: "C",
          imageURL: "https://images.gr-assets.com/users/1629834917p2/1586355.jpg",
        },
        likes: 55,
        body: "These are Orwell's most famous books. Both are dystopian tales of the dangers of a totalitarian government.\n\nSimilarities between the books:\nThe government knows best.\nThe intelligentsia seize power.\nThe naive proletariat are oppressed and kept ignorant.\nThe government bends or breaks its own rules for its benefit.\nThe government uses propaganda to keep the proletariat in check.\nThe government rewrites history to prove that it's correct and that life is better with the government than it was before the government's rise to power.\nBoth books have pessimistic endings.\n\nHere are my reviews of the books:\nAnimal Farm\n1984\n\nThe SparkNotes for both books are very good: Animal Farm and 1984.",
        bodyHTML: "These are Orwell's most famous books. Both are dystopian tales of the dangers of a totalitarian government.<br><br><b>Similarities between the books:</b><br>The government knows best.<br>The intelligentsia seize power.<br>The naive proletariat are oppressed and kept ignorant.<br>The government bends or breaks its own rules for its benefit.<br>The government uses propaganda to keep the proletariat in check.<br>The government rewrites history to prove that it's correct and that life is better with the government than it was before the government's rise to power.<br>Both books have pessimistic endings.<br><br>Here are my reviews of the books:<br><a href=\"https://www.goodreads.com/review/show/276291755\" rel=\"nofollow noopener\">Animal Farm</a><br><a href=\"https://www.goodreads.com/review/show/276291087\" rel=\"nofollow noopener\">1984</a><br><br>The SparkNotes for both books are very good: <a href=\"http://www.sparknotes.com/lit/animalfarm/\" rel=\"nofollow noopener\">Animal Farm</a> and <a href=\"http://www.sparknotes.com/lit/1984/\" rel=\"nofollow noopener\">1984</a>.",
        rating: 4,
        date: "May 14, 2009",
      },
      {
        user: {
          name: "Janete Fabricio on semi-hiatus",
          imageURL: "https://images.gr-assets.com/users/1556756114p2/66787248.jpg",
        },
        likes: 59,
        body: "Two of my favorites books of all the time.",
        bodyHTML: "Two of my favorites books of all the time.",
        rating: 5,
        date: "Feb 16, 2018",
      },
      {
        user: {
          name: "Patrick Peterson",
          imageURL: "https://images.gr-assets.com/users/1485370968p2/2173066.jpg",
        },
        likes: 25,
        body: "2020-09-22 (This review is of 1984 only, at least for now.)\n\n\"the three slogans of the Party stood out in bold capitals: \nWAR IS PEACE \nFREEDOM IS SLAVERY \nIGNORANCE IS STRENGTH.\"\n\nThis is the defining import of this book to me. The slogans were not only repeated many times in the book, but what they represented was carefully explained many times and ways. Orwell's masterpiece did a fantastic job of showing how corruption of the language (in \"Newspeak\" words were supposed to mean the exact opposite of what they originally and truly meant) was key to the horror of the total state and every citizen's being controlled by \"the party\" of \"Big Brother.\"\n\nI first read this book about 50 years ago, when I was in High School. It made a very big impression on me. I learned much about it and from it. Over the years I have been referred to it or myself referred to it literally hundreds of times. Fortunately, it is a classic and still well read. It has so much to offer. It is so prescient in so many ways.\n\nBut probably because there were major errors, confusions, an almost total pessimism and lack of any good understanding of what a free society is really based on, that too many people just did not quite get or lost sight of the good and important parts. Our society today is so overrun by the very things that Orwell so graphically warned us about, that I urge you in the strongest terms to read this book (or again, like me, if necessary).\n\nTake the three slogans highlighted above. Orwell calls them part of the \"Doublethink\" he explains was the crucial strategy of the party/Big Brother to get people to eliminate any real critical thinking and be able to just parrot back anything the party wanted them to believe. The book goes into example after example. But let me suggest a few that are happening in our society today\n(and for the last 150 years or so), to show you how important Orwell's concept is:\n\nProgressive = those who believe in progress, right? Well, in fact, NO. It means the OPPOSITE to the people who claim that title. \"Progressives\" for the last 140+ years have believed in and acted on the idea that slavery = freedom, that more government control of our lives somehow equals more freedom. Their program is to slowly, piece by piece (or faster, if they come clean and admit to being Marxists, Bolsheviks, Khmer Rouge, Chavistas, Juche, etc. etc.) put government in control of our lives by taxing, regulating, regimenting - controlling us.\n\nLiberal = those who believe in liberty, right? Well, in fact, for most of them, NO, except in a few select areas. People who have taken over this word in the US (not everywhere in the world, where it actually does still mean pro-liberty policies, to a bit greater extent), want less liberty and more government taxes, schools, controls, regulations, etc. Very similarly to how \"progressive\" was corrupted the same way - liberal really now means partial slave or at least anti-liberty, in most key areas. They just delude themselves when they think they are getting more liberty with their policies. They always conveniently forget that taxes are compulsory, regulations put you in jail if you don't follow them, that you have less of your freedom the more the government takes from you or tells you what to do.\n\nAntifa = those who are Anti-Fascist, and actually fight fascists, right? Well, in fact NO. They are the ones who act most like the fascists of the 1930s and 40s - using violence to achieve their goals. Not caring about civilized behavior at all. Starting or expanding riots. Disrupting peaceful meetings, so audiences cannot hear speakers, but only the chants/shouting of the \"protesters.\" Guess why I put that word in quotations? Bet you can. Does the term \"mostly peaceful\" ring a bell? Another lie and type of doublespeak of the mainstream media. Sure, most of the \"protesters\" may well be \"peaceful,\" for a time. But when they allow and actually support (even if passively) the violent rioters, arsonists, looters, etc. they should be called accomplices, NOT protesters at that point.\n\nSo, I have tried to give you just a small taste of how super-relevant Orwell's classic is today. There are so many parts I could highlight to show this. But I trust you get it. Treat yourself - you will not regret it.\n\nSo I want to move on to just a little on 1984's deficits and where you can and should go AFTER reading or rereading 1984. First is a great biography of Orwell: \"Orwell Your Orwell\" by David Ramsay Steele. It is simply indispensable in explaining Orwell 's milieu and his thinking on this and all his other key writings, and life. Orwell's pessimism and pro-socialist confusions (in 1984 and elsewhere) as well as brilliant insights are explained in that book. Don't miss it.\n\nBut in addition to Steele's bio of Orwell, one really needs to read at least some key works of Ludwig Mises to understand not just where Orwell went wrong, but the positive case for a better world, a free, peaceful and abundant world and the system of human social cooperation that makes it possible - free markets, otherwise known as capitalism, if you have a clear understanding of that term. To start, I would pick his \"Liberalism\" (in the original/classical sense). And next I would go to his fairly long, but totally worth it, \"Socialism\" to eviscerate that scourge of the mind and of the real physical world.\n\nFeel free to check out any of my Goodreads reviews of these books.\n\nAddenda:\nPerhaps listing some more gems of doublethink terms from 1984's Newspeak might be enticing:\nMinistry of Truth - Where the main character Winston works changing the historical record to suit the current party/Big Brother needs. Gee, any connection here to what Youtube, Google, Facebook, Twitter, etc. are doing with dissenting opinion from the mainstream government orthodoxy these days?\nMemory Hole - where the past evidence is put and taken to be burned - and sooooo close to what is happening today.\nMinistry of Love - where the torture of citizens is performed - especially in \"Room 101.\" Think Lubyanka Prison.\nMinistry of Peace - war making part of the government\n\nAnd how about a few passages I loved that seem so appropriate today:\n\"He was a fattish but active man of paralyzing stupidity, a mass of imbecile enthusiasms—one of those completely unquestioning, devoted drudges on whom, more even than on the Thought Police, the stability of the Party depended.\"\n\n\"so vicious was the boy’s demeanor, that it was not altogether a game.... He spun round just in time to see Mrs. Parsons dragging her son back into the doorway while the boy pocketed a catapult [slingshot]. “Goldstein!” bellowed the boy as the door closed on him. But what most struck Winston was the look of helpless fright on the woman’s grayish face....Another year, two years, and they would be watching her night and day for symptoms of unorthodoxy. Nearly all children nowadays were horrible. What was worst of all was that by means of such organizations as the Spies they were systematically turned into ungovernable little savages...\" Any parallels with today's society?\n\n\"and yet this produced in them no tendency whatever to rebel against the discipline of the Party. On the contrary, they adored the Party and everything connected with it. The songs, the processions, the banners, the hiking, the drilling with dummy rifles, the yelling of slogans, the worship of Big Brother—it was all a sort of glorious game to them. All their ferocity was turned outwards, against the enemies of the State, against foreigners, traitors, saboteurs, thought-criminals. It was almost normal for people over thirty to be frightened of their own children. And with good reason, for hardly a week passed in which the Times did not carry a paragraph describing how some eavesdropping little sneak—“child hero” was the phrase generally used—had overheard some compromising remark and denounced his parents to the Thought Police.\"\nThink: Hitler youth, Red Guards, young pioneers, communist youth, present day eco groups, SJW groups ...\n\n\"Even the slogans will change. How could you have a slogan like ‘freedom is slavery’ when the concept of freedom has been abolished?\" Note: it is freedom that is abolished, not slavery!\n\n\"In fact there will be no thought, as we understand it now. Orthodoxy means not thinking—not needing to think. Orthodoxy is unconsciousness.” Note: Anther key point (think PC speak for \"orthodoxy\") that is happening now too.\n\n“There is a word in Newspeak,” said Syme. “I don’t know whether you know it: duckspeak, to quack like a duck. It is one of those interesting words that have two contradictory meanings. Applied to an opponent, it is abuse; applied to someone you agree with, it is praise.” Unquestionably Syme will be vaporized, Winston thought again. He thought it with a kind of sadness, although well knowing that Syme despised him and slightly disliked him, and was fully capable of denouncing him as a thought-criminal if he saw any reason for doing so. There was something subtly wrong with Syme. There was something that he lacked: discretion, aloofness, a sort of saving stupidity.\"\n\nI could go on and on. this book has so much to give. But I bet you get the point.",
        bodyHTML: "2020-09-22 (This review is of 1984 only, at least for now.)<br><br>\"the three slogans of the Party stood out in bold capitals: <br>WAR IS PEACE <br>FREEDOM IS SLAVERY <br>IGNORANCE IS STRENGTH.\"<br><br>This is the defining import of this book to me. The slogans were not only repeated many times in the book, but what they represented was carefully explained many times and ways. Orwell's masterpiece did a fantastic job of showing how corruption of the language (in \"Newspeak\" words were supposed to mean the exact opposite of what they originally and truly meant) was key to the horror of the total state and every citizen's being controlled by \"the party\" of \"Big Brother.\"<br><br>I first read this book about 50 years ago, when I was in High School. It made a very big impression on me. I learned much about it and from it. Over the years I have been referred to it or myself referred to it literally hundreds of times. Fortunately, it is a classic and still well read. It has so much to offer. It is so prescient in so many ways.<br><br>But probably because there were major errors, confusions, an almost total pessimism and lack of any good understanding of what a free society is really based on, that too many people just did not quite get or lost sight of the good and important parts. Our society today is so overrun by the very things that Orwell so graphically warned us about, that I urge you in the strongest terms to read this book (or again, like me, if necessary).<br><br>Take the three slogans highlighted above. Orwell calls them part of the \"Doublethink\" he explains was the crucial strategy of the party/Big Brother to get people to eliminate any real critical thinking and be able to just parrot back anything the party wanted them to believe. The book goes into example after example. But let me suggest a few that are happening in our society today<br>(and for the last 150 years or so), to show you how important Orwell's concept is:<br><br>Progressive = those who believe in progress, right? Well, in fact, NO. It means the OPPOSITE to the people who claim that title. \"Progressives\" for the last 140+ years have believed in and acted on the idea that slavery = freedom, that more government control of our lives somehow equals more freedom. Their program is to slowly, piece by piece (or faster, if they come clean and admit to being Marxists, Bolsheviks, Khmer Rouge, Chavistas, Juche, etc. etc.) put government in control of our lives by taxing, regulating, regimenting - controlling us.<br><br>Liberal = those who believe in liberty, right? Well, in fact, for most of them, NO, except in a few select areas. People who have taken over this word in the US (not everywhere in the world, where it actually does still mean pro-liberty policies, to a bit greater extent), want less liberty and more government taxes, schools, controls, regulations, etc. Very similarly to how \"progressive\" was corrupted the same way - liberal really now means partial slave or at least anti-liberty, in most key areas. They just delude themselves when they think they are getting more liberty with their policies. They always conveniently forget that taxes are compulsory, regulations put you in jail if you don't follow them, that you have less of your freedom the more the government takes from you or tells you what to do.<br><br>Antifa = those who are Anti-Fascist, and actually fight fascists, right? Well, in fact NO. They are the ones who act most like the fascists of the 1930s and 40s - using violence to achieve their goals. Not caring about civilized behavior at all. Starting or expanding riots. Disrupting peaceful meetings, so audiences cannot hear speakers, but only the chants/shouting of the \"protesters.\" Guess why I put that word in quotations? Bet you can. Does the term \"mostly peaceful\" ring a bell? Another lie and type of doublespeak of the mainstream media. Sure, most of the \"protesters\" may well be \"peaceful,\" for a time. But when they allow and actually support (even if passively) the violent rioters, arsonists, looters, etc. they should be called accomplices, NOT protesters at that point.<br><br>So, I have tried to give you just a small taste of how super-relevant Orwell's classic is today. There are so many parts I could highlight to show this. But I trust you get it. Treat yourself - you will not regret it.<br><br>So I want to move on to just a little on 1984's deficits and where you can and should go AFTER reading or rereading 1984. First is a great biography of Orwell: \"Orwell Your Orwell\" by David Ramsay Steele. It is simply indispensable in explaining Orwell 's milieu and his thinking on this and all his other key writings, and life. Orwell's pessimism and pro-socialist confusions (in 1984 and elsewhere) as well as brilliant insights are explained in that book. Don't miss it.<br><br>But in addition to Steele's bio of Orwell, one really needs to read at least some key works of Ludwig Mises to understand not just where Orwell went wrong, but the positive case for a better world, a free, peaceful and abundant world and the system of human social cooperation that makes it possible - free markets, otherwise known as capitalism, if you have a clear understanding of that term. To start, I would pick his \"Liberalism\" (in the original/classical sense). And next I would go to his fairly long, but totally worth it, \"Socialism\" to eviscerate that scourge of the mind and of the real physical world.<br><br>Feel free to check out any of my Goodreads reviews of these books.<br><br>Addenda:<br>Perhaps listing some more gems of doublethink terms from 1984's Newspeak might be enticing:<br>Ministry of Truth - Where the main character Winston works changing the historical record to suit the current party/Big Brother needs. Gee, any connection here to what Youtube, Google, Facebook, Twitter, etc. are doing with dissenting opinion from the mainstream government orthodoxy these days?<br>Memory Hole - where the past evidence is put and taken to be burned - and sooooo close to what is happening today.<br>Ministry of Love - where the torture of citizens is performed - especially in \"Room 101.\" Think Lubyanka Prison.<br>Ministry of Peace - war making part of the government<br><br>And how about a few passages I loved that seem so appropriate today:<br>\"He was a fattish but active man of paralyzing stupidity, a mass of imbecile enthusiasms—one of those completely unquestioning, devoted drudges on whom, more even than on the Thought Police, the stability of the Party depended.\"<br><br>\"so vicious was the boy’s demeanor, that it was not altogether a game.... He spun round just in time to see Mrs. Parsons dragging her son back into the doorway while the boy pocketed a catapult [slingshot]. “Goldstein!” bellowed the boy as the door closed on him. But what most struck Winston was the look of helpless fright on the woman’s grayish face....Another year, two years, and they would be watching her night and day for symptoms of unorthodoxy. Nearly all children nowadays were horrible. What was worst of all was that by means of such organizations as the Spies they were systematically turned into ungovernable little savages...\" Any parallels with today's society?<br><br>\"and yet this produced in them no tendency whatever to rebel against the discipline of the Party. On the contrary, they adored the Party and everything connected with it. The songs, the processions, the banners, the hiking, the drilling with dummy rifles, the yelling of slogans, the worship of Big Brother—it was all a sort of glorious game to them. All their ferocity was turned outwards, against the enemies of the State, against foreigners, traitors, saboteurs, thought-criminals. It was almost normal for people over thirty to be frightened of their own children. And with good reason, for hardly a week passed in which the Times did not carry a paragraph describing how some eavesdropping little sneak—“child hero” was the phrase generally used—had overheard some compromising remark and denounced his parents to the Thought Police.\"<br>Think: Hitler youth, Red Guards, young pioneers, communist youth, present day eco groups, SJW groups ...<br><br>\"Even the slogans will change. How could you have a slogan like ‘freedom is slavery’ when the concept of freedom has been abolished?\" Note: it is freedom that is abolished, not slavery!<br><br>\"In fact there will be no thought, as we understand it now. Orthodoxy means not thinking—not needing to think. Orthodoxy is unconsciousness.” Note: Anther key point (think PC speak for \"orthodoxy\") that is happening now too.<br><br>“There is a word in Newspeak,” said Syme. “I don’t know whether you know it: duckspeak, to quack like a duck. It is one of those interesting words that have two contradictory meanings. Applied to an opponent, it is abuse; applied to someone you agree with, it is praise.” Unquestionably Syme will be vaporized, Winston thought again. He thought it with a kind of sadness, although well knowing that Syme despised him and slightly disliked him, and was fully capable of denouncing him as a thought-criminal if he saw any reason for doing so. There was something subtly wrong with Syme. There was something that he lacked: discretion, aloofness, a sort of saving stupidity.\"<br><br>I could go on and on. this book has so much to give. But I bet you get the point.",
        rating: 4,
        date: "Sep 22, 2020",
      },
      {
        user: {
          name: "Mariel",
          imageURL: "https://images.gr-assets.com/users/1451321467p2/647547.jpg",
        },
        likes: 15,
        body: "Celebrity Death Match tournament versus Macbeth.\nIn a galaxy that's this one and today only most people don't realize it because it scrolls on the screen in teeny tiny neon green letters with a sterile surgical instrumental backdrop. Or CNN. Once upon a time that's today. There was a MAN and a Big Brother and they were one and the same. What about the sisters?\n\"You could be big brother, you know. People always ask who the MAN is supposed to be. You're a man, aren't you? Although it has been some time since you were able to get it up... I do know you're keeping me down with your accepted level of mediocrity.\"\nMacbeth was tired after a long day of omitting the thous and thys from the Dougie Howser's Dictionary. His wife reported his mouth breathing coworker and he was a shoo-in for the promotion of updating each and every one of Shakespeare's plays into a high school comedy for the ABC Big Brother telescreens. Why couldn't she let him be well enough alone? Why did they have to move up one more spot on the assembly line?\n\"I've enrolled you into the adopt a brother program. To be a Big Brother you must be a brother.\"\n\"But that's for perverts!\"\nIt was useless to argue. The two minutes of hate was over and it wouldn't do to have a tiff with his wife that couldn't be passed off as mandatory aggression. Macbeth did not want to argue with his wife. To end it meant doing something.\nThe girl half of the Macbeth team had assigned herself another job. \"It's not like I'm not working for us too, you know. I have to hit on that duffer Winston. Do you think that I like suggesting power behind the curtain to feeble men who cannot live with themselves as impotence personified?\"\n\"Duffer is out of the accepted lingo, as is impotence. How about loser?\" Offered the Macbeth with a penis. Lady Macbeth wanted Macbeth to think for himself, so long as he was thinking what she wanted him to think. Was that too much to ask? The use of if-you-don't-already-know-then-I-can't-tell-you worked wonders on the thoughtpolice. They were helpless against it.\n\"If no one knows who Big Brother really is then why can't it be you?\"\n\"You is out of the dictionary. How about they?\"\n\"That's my point! Who is they? Why can't they be me?\"\nMacbeth did not understand what his wife was saying. He had not the words to understand it. He had worked all day to take those words away from himself. Work and the telescreen. Who had room for anything else?\n\"Are you a man?\"\nMacbeth did not know.\n\"What do I want to be married to this man for? I don't know what I want and the thoughtpolice cannot tell me what that is. I know that.\"\nWhat was that feeling? The sense of things that were already bad getting a lot worse. It happened more frequently than anything touching on how to dust off the twenty dollar words no one could afford anymore (after all, they were not on the rations list) to describe the other range of experience and emotions. Ambition? Voided out. Don't look to see the man behind the curtain.\n\"Um, honey, you left the telescreen on, didn't you?\"\n\"No, they did.\"\n\nWin: 1984",
        bodyHTML: "<a href=\"https://www.goodreads.com/story/show/277496-celebrity-death-match-review-elimination-tournament?chapter=4\" rel=\"nofollow noopener\">Celebrity Death Match</a> tournament versus Macbeth.<br>In a galaxy that's this one and today only most people don't realize it because it scrolls on the screen in teeny tiny neon green letters with a sterile surgical instrumental backdrop. Or CNN. Once upon a time that's today. There was a MAN and a Big Brother and they were one and the same. What about the sisters?<br>\"You could be big brother, you know. People always ask who the MAN is supposed to be. You're a man, aren't you? Although it has been some time since you were able to get it up... I do know you're keeping me down with your accepted level of mediocrity.\"<br>Macbeth was tired after a long day of omitting the thous and thys from the Dougie Howser's Dictionary. His wife reported his mouth breathing coworker and he was a shoo-in for the promotion of updating each and every one of Shakespeare's plays into a high school comedy for the ABC Big Brother telescreens. Why couldn't she let him be well enough alone? Why did they have to move up one more spot on the assembly line?<br>\"I've enrolled you into the adopt a brother program. To be a Big Brother you must be a brother.\"<br>\"But that's for perverts!\"<br>It was useless to argue. The two minutes of hate was over and it wouldn't do to have a tiff with his wife that couldn't be passed off as mandatory aggression. Macbeth did not want to argue with his wife. To end it meant doing something.<br>The girl half of the Macbeth team had assigned herself another job. \"It's not like I'm not working for us too, you know. I have to hit on that duffer Winston. Do you think that I like suggesting power behind the curtain to feeble men who cannot live with themselves as impotence personified?\"<br>\"Duffer is out of the accepted lingo, as is impotence. How about loser?\" Offered the Macbeth with a penis. Lady Macbeth wanted Macbeth to think for himself, so long as he was thinking what she wanted him to think. Was that too much to ask? The use of if-you-don't-already-know-then-I-can't-tell-you worked wonders on the thoughtpolice. They were helpless against it.<br>\"If no one knows who Big Brother really is then why can't it be you?\"<br>\"You is out of the dictionary. How about they?\"<br>\"That's my point! Who is they? Why can't they be me?\"<br>Macbeth did not understand what his wife was saying. He had not the words to understand it. He had worked all day to take those words away from himself. Work and the telescreen. Who had room for anything else?<br>\"Are you a man?\"<br>Macbeth did not know.<br>\"What do I want to be married to this man for? I don't know what I want and the thoughtpolice cannot tell me what that is. I know that.\"<br>What was that feeling? The sense of things that were already bad getting a lot worse. It happened more frequently than anything touching on how to dust off the twenty dollar words no one could afford anymore (after all, they were not on the rations list) to describe the other range of experience and emotions. Ambition? Voided out. Don't look to see the man behind the curtain.<br>\"Um, honey, you left the telescreen on, didn't you?\"<br>\"No, they did.\"<br><br><b>Win: 1984</b>",
        date: "Oct 18, 2011",
      },
      {
        user: {
          name: "Steven Fisher",
          imageURL: "https://images.gr-assets.com/users/1563189674p2/23545239.jpg",
        },
        likes: 14,
        body: "University&nbsp;of Northampton have issued a trigger&nbsp;warning&nbsp;for&nbsp;Orwell's&nbsp;novel on the grounds that it contains 'explicit material' which some students may find 'offensive and upsetting'.",
        bodyHTML: "University&nbsp;of Northampton have issued a trigger&nbsp;warning&nbsp;for&nbsp;Orwell's&nbsp;novel on the grounds that it contains 'explicit material' which some students may find 'offensive and upsetting'.",
        rating: 5,
        date: "Feb 05, 2022",
      },
      {
        user: {
          name: "Garg Ankit",
          imageURL: "https://images.gr-assets.com/users/1446406366p2/5181592.jpg",
        },
        likes: 16,
        body: "4.5 rounded to 5 stars.\n\nFor individual reviews, follow the links below:\nAnimal Farm\n1984",
        bodyHTML: "4.5 rounded to 5 stars.<br><br>For individual reviews, follow the links below:<br><a href=\"https://www.goodreads.com/review/show/2535217881\" rel=\"nofollow noopener\">Animal Farm</a><br><a href=\"https://www.goodreads.com/review/show/2602376299\" rel=\"nofollow noopener\">1984</a>",
        rating: 5,
        date: "Aug 20, 2020",
      },
      {
        user: {
          name: "Markus Molina",
          imageURL: "https://images.gr-assets.com/users/1565100176p2/10102477.jpg",
        },
        likes: 13,
        body: "I love 1984, I love Animal Farm, and I love George Orwell. There is so much wisdom and depth to these two stories and there is so much that has been written or said about them, it would be a struggle to review them without subconsciously regurgitating all the good things I've heard. I just feel like both of these stories, and especially 1984 should be read by everyone. I believe it helps you appreciate what you got and to question everything you hear. I believe they are some of the most thought provoking stories ever written and they're also fun to read, which sometimes isn't the case for a lot of the literary books people tell you that you should read.\n\nI recall once when my friend Winston (I actually have a friend named Winston, I'm not referring to the protagonist of 1984,) had to read 1984 and was kind of down about it because he heard it was just political satire or something and he presumed it would be dull. I told him that I really enjoyed it and I assumed he would too. And when he was finished with it, he came up to me and told me how when he finished-- he had tears streaming down his eyes from how much it had touched him and that he loved it.\n\nAnd, even after having finished it for a 2nd time, I had tears welling up and my heart strings were being tugged and my love for these stories has only grown. These are the types of stories that turn people into readers. The endings for both of them are probably my two favorite endings of all time and I feel that would be a crime not to mention.\n\n10/10",
        bodyHTML: "I love 1984, I love Animal Farm, and I love George Orwell. There is so much wisdom and depth to these two stories and there is so much that has been written or said about them, it would be a struggle to review them without subconsciously regurgitating all the good things I've heard. I just feel like both of these stories, and especially 1984 should be read by everyone. I believe it helps you appreciate what you got and to question everything you hear. I believe they are some of the most thought provoking stories ever written and they're also fun to read, which sometimes isn't the case for a lot of the literary books people tell you that you should read.<br><br>I recall once when my friend Winston (I actually have a friend named Winston, I'm not referring to the protagonist of 1984,) had to read 1984 and was kind of down about it because he heard it was just political satire or something and he presumed it would be dull. I told him that I really enjoyed it and I assumed he would too. And when he was finished with it, he came up to me and told me how when he finished-- he had tears streaming down his eyes from how much it had touched him and that he loved it.<br><br>And, even after having finished it for a 2nd time, I had tears welling up and my heart strings were being tugged and my love for these stories has only grown. These are the types of stories that turn people into readers. The endings for both of them are probably my two favorite endings of all time and I feel that would be a crime not to mention.<br><br>10/10",
        rating: 5,
        date: "Jun 09, 2012",
      },
      {
        user: {
          name: "M.M. Strawberry Library & Reviews",
          imageURL: "https://images.gr-assets.com/users/1346883958p2/12558730.jpg",
        },
        likes: 11,
        body: "Two classic books in one! I read both of these stories years ago and loved them.",
        bodyHTML: "Two classic books in one! I read both of these stories years ago and loved them.",
        rating: 5,
        date: "May 21, 2019",
      },
      {
        user: {
          name: "Ali",
          imageURL: "https://images.gr-assets.com/users/1581269910p2/5868080.jpg",
        },
        likes: 8,
        body: "Re-read. \nbrilliant. a must-read.",
        bodyHTML: "Re-read. <br>brilliant. a must-read.",
        rating: 5,
        date: "Dec 26, 2020",
      },
      {
        user: {
          name: "Dana Turk",
          imageURL: "https://s.gr-assets.com/assets/nophoto/user/m_50x66-82093808bca726cb3249a493fbd3bd0f.png",
        },
        likes: 7,
        body: "It is difficult to rate a novel which is incomplete. This version if Animal Farm and 1984 does not contain the full versions of either book. Animal Farm has only the first 10 chapters and ends abruptly on page 86. 1984 has only the first 3 sections and repeats itself.\nThis is more a sampling of Orwells Classics rather than a complete read. \nIf you want to read the full novel. Don't purchase this one",
        bodyHTML: "It is difficult to rate a novel which is incomplete. This version if Animal Farm and 1984 does not contain the full versions of either book. Animal Farm has only the first 10 chapters and ends abruptly on page 86. 1984 has only the first 3 sections and repeats itself.<br>This is more a sampling of Orwells Classics rather than a complete read. <br>If you want to read the full novel. Don't purchase this one",
        rating: 3,
        date: "Nov 19, 2017",
      },
      {
        user: {
          name: "Kara Belden",
          imageURL: "https://images.gr-assets.com/users/1528118614p2/6183712.jpg",
        },
        likes: 7,
        body: "Two of my favorite books! Meant to re-read 1984 with the student book club, but it got away from me. 1984 was one of my favorite required high school reads my senior year, and I LOVE to teach Animal Farm! ",
        bodyHTML: "Two of my favorite books! Meant to re-read 1984 with the student book club, but it got away from me. 1984 was one of my favorite required high school reads my senior year, and I LOVE to teach Animal Farm! ",
        rating: 5,
        date: "Apr 06, 2017",
      },
      {
        user: {
          name: "Text Publishing",
          imageURL: "https://images.gr-assets.com/users/1606110591p2/11635439.jpg",
        },
        likes: 6,
        body: "‘There are no replacements for George Orwell, just as there are no replacements for a Bernard Shaw or a Mark Twain…he pricked, provoked and badgered lazy minds, delighted those who enjoyed watching an original intelligence at work.’\nTime",
        bodyHTML: "<i>‘There are no replacements for George Orwell, just as there are no replacements for a Bernard Shaw or a Mark Twain…he pricked, provoked and badgered lazy minds, delighted those who enjoyed watching an original intelligence at work.’</i><br><b>Time</b>",
        rating: 5,
        date: "Jun 25, 2017",
      },
      {
        user: {
          name: "Leonard",
          imageURL: "https://images.gr-assets.com/users/1406152730p2/4940476.jpg",
        },
        likes: 6,
        body: "“All animals are equal but some animals are more equal than others.” \n\n \nJoseph Stalin\n\nIn Animal Farm George Orwell reenacted the Russian Revolution and its aftermath, Major, Napoleon, Snowball, Jones, and Frederick incarnating Lenin, Stalin, Trotsky, Tsar Nicolas II and Hitler. But through the fable, Orwell critiques not only communism but also any corruption of power, leaders highlighting real or imagined threats to instill fear in followers and solidify power. \n\n \nLeon Trotsky\n\nAs often repeated throughout history, people out of fear often would submit to the state’s unchecked power in exchange for security real or imagined. In the end, Napoleon exploited the animals just as Farmer Jones previously had and even emulated humans when he gave a dinner to neighboring farmers, who represented the leaders of other nations and would gladly play poker with the tyrant as long as they can benefit from the friendship. \n\nAnimal Farm is a lighthearted fable for a serious subject.\n\n-----------------------------------------------------------\n\nUnder Big Brother’s omniscient eyes, Winston Smith tried to ignite his only freedom, the freedom to believe in “obvious” truths, but by the novel’s end, at the café Winston was unsure what two plus two would make, a sign that O’Brien had successfully reintegrated a “lost soul” and Winston had become like his friends and neighbors, unable to question and thus unable to revolt. What sends shivers down our spines is not the various tortures O’Brien performed, but after these tortures, Winston’s total capitulation¾mind, body, and soul¾to Big Brother. When the mind kowtows to external authority and ceases to reflect and question, then the individual had successfully metamorphosed into a machine.\n\n \nOceania Society\n\nWinston, by editing previous documents to conform to Oceana’s present position, such as whether Eurasia is friend or foe, had helped the regime’s guardians, who like O’Brien believed “who controls the past controls the future; who controls the present controls the past,” mold the citizens’ minds. But Oceana, like other totalitarian regimes, also turned to the indispensable tool, fear, to chisel its citizens’ minds and hearts to its agenda’s shape and form. To stimulate fear and rouse its citizens to a common cause, it would when necessary create fathom enemies, either Eurasia or Eastasia, even though these totalitarian regimes also had similar ideologies, or rather, like Oceana, no ideologies. \n\nUnder 1984’s dystopian sky, Winston must bow, not only because of Big Brother’s overwhelming power and presence, but also because of Winston’s inability to form any ideologies. Even though he wanted to think freely, he lacked the training and thus the analytical mind to counter O’Brien’s offenses. In the end, his mind followed the path of least resistance.\n\nOrwell’s 1984 is a dark apocalypse of sub-human society where homo-sapiens had replaced machines to operate an efficient hierarchy, an apocalypse which any people would usher wherever and whenever they ceased to question “intuitively obvious truths.”\n\n\n \nGeorge Orwell",
        bodyHTML: "“All animals are equal but some animals are more equal than others.” <br><br> <img src=\"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/hostedimages/1405807538i/10455190.jpg\" width=\"180\" height=\"220\" alt=\"Joseph Stalin\" class=\"gr-hostedUserImg\"><br><b>Joseph Stalin</b><br><br>In Animal Farm George Orwell reenacted the Russian Revolution and its aftermath, Major, Napoleon, Snowball, Jones, and Frederick incarnating Lenin, Stalin, Trotsky, Tsar Nicolas II and Hitler. But through the fable, Orwell critiques not only communism but also any corruption of power, leaders highlighting real or imagined threats to instill fear in followers and solidify power. <br><br> <img src=\"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/hostedimages/1405807743i/10455248._SY540_.jpg\" width=\"180\" height=\"220\" alt=\"Leon Trotsky\" class=\"gr-hostedUserImg\"><br><b>Leon Trotsky</b><br><br>As often repeated throughout history, people out of fear often would submit to the state’s unchecked power in exchange for security real or imagined. In the end, Napoleon exploited the animals just as Farmer Jones previously had and even emulated humans when he gave a dinner to neighboring farmers, who represented the leaders of other nations and would gladly play poker with the tyrant as long as they can benefit from the friendship. <br><br>Animal Farm is a lighthearted fable for a serious subject.<br><br>-----------------------------------------------------------<br><br>Under Big Brother’s omniscient eyes, Winston Smith tried to ignite his only freedom, the freedom to believe in “obvious” truths, but by the novel’s end, at the café Winston was unsure what two plus two would make, a sign that O’Brien had successfully reintegrated a “lost soul” and Winston had become like his friends and neighbors, unable to question and thus unable to revolt. What sends shivers down our spines is not the various tortures O’Brien performed, but after these tortures, Winston’s total capitulation¾mind, body, and soul¾to Big Brother. When the mind kowtows to external authority and ceases to reflect and question, then the individual had successfully metamorphosed into a machine.<br><br> <img src=\"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/hostedimages/1405213662i/10363543._SX540_.png\" width=\"180\" height=\"200\" alt=\"Oceania Society\" class=\"gr-hostedUserImg\"><br>Oceania Society<br><br>Winston, by editing previous documents to conform to Oceana’s present position, such as whether Eurasia is friend or foe, had helped the regime’s guardians, who like O’Brien believed “who controls the past controls the future; who controls the present controls the past,” mold the citizens’ minds. But Oceana, like other totalitarian regimes, also turned to the indispensable tool, fear, to chisel its citizens’ minds and hearts to its agenda’s shape and form. To stimulate fear and rouse its citizens to a common cause, it would when necessary create fathom enemies, either Eurasia or Eastasia, even though these totalitarian regimes also had similar ideologies, or rather, like Oceana, no ideologies. <br><br>Under 1984’s dystopian sky, Winston must bow, not only because of Big Brother’s overwhelming power and presence, but also because of Winston’s inability to form any ideologies. Even though he wanted to think freely, he lacked the training and thus the analytical mind to counter O’Brien’s offenses. In the end, his mind followed the path of least resistance.<br><br>Orwell’s 1984 is a dark apocalypse of sub-human society where homo-sapiens had replaced machines to operate an efficient hierarchy, an apocalypse which any people would usher wherever and whenever they ceased to question “intuitively obvious truths.”<br><br><br> <img src=\"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/hostedimages/1391208294i/8349701.jpg\" width=\"180\" height=\"220\" alt=\"George Orwell\" class=\"gr-hostedUserImg\"><br><b>George Orwell</b>",
        rating: 5,
        date: "Sep 01, 2015",
      },
      {
        user: {
          name: "Corey",
          imageURL: "https://images.gr-assets.com/users/1608640015p2/68077761.jpg",
        },
        likes: 6,
        body: "Re-read this gem last night. It never gets old. Truly another beautifully written classic",
        bodyHTML: "Re-read this gem last night. It never gets old. Truly another beautifully written classic",
        rating: 4,
        date: "Aug 09, 2020",
      },
      {
        user: {
          name: "Farnoosh Brock",
          imageURL: "https://images.gr-assets.com/users/1644935976p2/17483237.jpg",
        },
        likes: 6,
        body: "You Must Read Animal Farm. That's the brief version of my review.\n\nEric Arthur Blair, or George Orwell as the world knows him, is a genius at describing fear, terror, doubt, uncertainty, mischief, evil, and hopelessness. The writing is beyond exquisite, even if the topic is morose. Such a loss to the world that Mr. Orwell died when he was just 46 years old. The unwritten works that he never wrote, the works that would have enriched our world and weren't meant to be. In Animal Farm, much like 1984, Orwell goes where you just don't want him to go - painting a dark grim bleak picture that grows worse by the page, of precisely what happens when the evil minds take over the masses, and scheme lie after lie until the truth is so distorted one can't even trust one's own memory. A fantastic allegory to the horrific Russian revolution and the communist party, one that makes you want to open up real history book to remind yourself that yes, this actually happened not to imagery sheep and hens and horses and farm animals in a little work of fiction, this happened to millions of people and this is still happening.\n\nWell, I am so SO so glad I read this book even though it was uncomfortable, disturbing and scary - not half as scary as 1984 but scary enough to never forget. But I'm also glad it's over. It was heavy reading and an interesting feeling between loving the writer, loving the writing but resenting the story because it brings to light the ugliest of all ugliness in the world and puts it on the spotlight.\n\nMy favorite lines - favorite is a funny sort of word to use for lines that make your blood run cold but here goes:\n\"All animals are equal but some are more equal than others.\",\n\"No animal shall drink ... to excess.\",\n\"Four legs good, two legs better.\"\n“Comrades!' he cried. 'You do not imagine, I hope, that we pigs are doing this in a spirit of selfishness and privilege?\"\n\"Surely comrades, you don't want Jones back now do you?\"\n\"The animals wished there were less figures and more food in their bellies.\"\nAnd on and on and on. This book is a gem, Orwell was a gift, and I am so grateful that I had the opportunity to read Animal Farm.\n",
        bodyHTML: "You Must Read Animal Farm. That's the brief version of my review.<br><br>Eric Arthur Blair, or George Orwell as the world knows him, is a genius at describing fear, terror, doubt, uncertainty, mischief, evil, and hopelessness. The writing is beyond exquisite, even if the topic is morose. Such a loss to the world that Mr. Orwell died when he was just 46 years old. The unwritten works that he never wrote, the works that would have enriched our world and weren't meant to be. In Animal Farm, much like 1984, Orwell goes where you just don't want him to go - painting a dark grim bleak picture that grows worse by the page, of precisely what happens when the evil minds take over the masses, and scheme lie after lie until the truth is so distorted one can't even trust one's own memory. A fantastic allegory to the horrific Russian revolution and the communist party, one that makes you want to open up real history book to remind yourself that yes, this actually happened not to imagery sheep and hens and horses and farm animals in a little work of fiction, this happened to millions of people and this is still happening.<br><br>Well, I am so SO so glad I read this book even though it was uncomfortable, disturbing and scary - not half as scary as 1984 but scary enough to never forget. But I'm also glad it's over. It was heavy reading and an interesting feeling between loving the writer, loving the writing but resenting the story because it brings to light the ugliest of all ugliness in the world and puts it on the spotlight.<br><br>My favorite lines - favorite is a funny sort of word to use for lines that make your blood run cold but here goes:<br>\"All animals are equal but some are more equal than others.\",<br>\"No animal shall drink ... to excess.\",<br>\"Four legs good, two legs better.\"<br>“Comrades!' he cried. 'You do not imagine, I hope, that we pigs are doing this in a spirit of selfishness and privilege?\"<br>\"Surely comrades, you don't want Jones back now do you?\"<br>\"The animals wished there were less figures and more food in their bellies.\"<br>And on and on and on. This book is a gem, Orwell was a gift, and I am so grateful that I had the opportunity to read Animal Farm.<br>",
        rating: 5,
        date: "Feb 02, 2015",
      },
      {
        user: {
          name: "Suad Alhalwachi",
          imageURL: "https://images.gr-assets.com/users/1611645839p2/48493963.jpg",
        },
        likes: 6,
        body: "If you read this book as a straight fiction then it’s a novel for children and I am sure they will enjoy it and of course they will start to hate the pigs (maybe that’s why we don’t see many cartoons or stories with pigs for children except Peppa pig which my grandkids love so much). \n\nHowever if it’s a political story that represents a party that overthrows a government and takes over the country giving promises to the people and then in years to come changes those promises, then the writer had succeeded in proving the point. The book can be applied to any country as in my opinion any new comer wants to make himself lovable by the people, slowly making changes that benefit himself and maybe his party and forgets about the livelihood of the public. We can also apply the novel to revolutions, new comers to politics, whether religious or otherwise, and personal takeover of governments. When economy shows improvement then a human being will show his real self, he or she will think of maximum gains to oneself and forget about the others, ensuring that they will either be killed or imprisoned. \n\nThe story narrates our life since time memorial and I have to say that I had felt great pain after reading it. \n\nI left the preface to the story to the end. It seems that the writer meant The Soviet Union!! What was interesting to me that I read the book on the way to Russia, and when I reached there I was discussing it with my Russian friend who said that the book was written about UK government. So there is a great misconception in the book that I am not going to indulge in. \n\nGood book. I gave 3 stars because of my sad feeling and not because it’s a bad book. ",
        bodyHTML: "If you read this book as a straight fiction then it’s a novel for children and I am sure they will enjoy it and of course they will start to hate the pigs (maybe that’s why we don’t see many cartoons or stories with pigs for children except Peppa pig which my grandkids love so much). <br><br>However if it’s a political story that represents a party that overthrows a government and takes over the country giving promises to the people and then in years to come changes those promises, then the writer had succeeded in proving the point. The book can be applied to any country as in my opinion any new comer wants to make himself lovable by the people, slowly making changes that benefit himself and maybe his party and forgets about the livelihood of the public. We can also apply the novel to revolutions, new comers to politics, whether religious or otherwise, and personal takeover of governments. When economy shows improvement then a human being will show his real self, he or she will think of maximum gains to oneself and forget about the others, ensuring that they will either be killed or imprisoned. <br><br>The story narrates our life since time memorial and I have to say that I had felt great pain after reading it. <br><br>I left the preface to the story to the end. It seems that the writer meant The Soviet Union!! What was interesting to me that I read the book on the way to Russia, and when I reached there I was discussing it with my Russian friend who said that the book was written about UK government. So there is a great misconception in the book that I am not going to indulge in. <br><br>Good book. I gave 3 stars because of my sad feeling and not because it’s a bad book. ",
        rating: 3,
        date: "Jun 17, 2019",
      },
      {
        user: {
          name: "Maria Lasprilla",
          imageURL: "https://images.gr-assets.com/users/1503923424p2/7499654.jpg",
        },
        likes: 6,
        body: "Aninal Farm was entertaining until I kept on finding the similarities with Venezuela. It was like the history of the last 15-20 years of the country told in the form of a fable and written decades earlier. \n\n1984: this was worse than watching a horror movie (which I hate) because while in a movie I'm always aware it's fiction, the book kept on confusing me making me feel I was actually going through a factual piece. Only specific elements got me out of it. The biggest impressions happened while reading \"The Book\" in part 2 and feeling like I was reading history of the world. You realize we live in a scary and predictable world when it can get mixed up with a fiction book from more than half a century ago.\n\nP.S. What a wonderful analysis of the language he makes in the Appendix describing Newspeak. The structure, the sounds, the meanings... it only makes me want to read more of everything and question, think, break rules, widen my vocabulary. Anything that takes me in the opposite direction of becoming an Ingsoc kind of...thinker?",
        bodyHTML: "Aninal Farm was entertaining until I kept on finding the similarities with Venezuela. It was like the history of the last 15-20 years of the country told in the form of a fable and written decades earlier. <br><br>1984: this was worse than watching a horror movie (which I hate) because while in a movie I'm always aware it's fiction, the book kept on confusing me making me feel I was actually going through a factual piece. Only specific elements got me out of it. The biggest impressions happened while reading \"The Book\" in part 2 and feeling like I was reading history of the world. You realize we live in a scary and predictable world when it can get mixed up with a fiction book from more than half a century ago.<br><br>P.S. What a wonderful analysis of the language he makes in the Appendix describing Newspeak. The structure, the sounds, the meanings... it only makes me want to read more of everything and question, think, break rules, widen my vocabulary. Anything that takes me in the opposite direction of becoming an Ingsoc kind of...thinker?",
        rating: 5,
        date: "Jul 10, 2016",
      },
      {
        user: {
          name: "Dayla",
          imageURL: "https://images.gr-assets.com/users/1599444676p2/118158326.jpg",
        },
        likes: 6,
        body: "Very clever book. \n\nIn this book, the hidden veil of Democracy vs Socialism is entirely explained through this wonderful analogy.\n\n\nSomeone recently stated that if one really lived by the principles of most of the New Testament, one's world view would be Socialism/Communism as explained by Marx. However, no one has ever truly tried to live in a world that is without a caste system.",
        bodyHTML: "Very clever book. <br><br>In this book, the hidden veil of Democracy vs Socialism is entirely explained through this wonderful analogy.<br><br><br>Someone recently stated that if one really lived by the principles of most of the New Testament, one's world view would be Socialism/Communism as explained by Marx. However, no one has ever truly tried to live in a world that is without a caste system.",
        rating: 5,
        date: "Aug 31, 2020",
      },
      {
        user: {
          name: "Jazzy Lemon",
          imageURL: "https://images.gr-assets.com/users/1382910217p2/6958514.jpg",
        },
        likes: 6,
        body: "Orwellian has been introduced into the English language for good reason. ",
        bodyHTML: "Orwellian has been introduced into the English language for good reason. ",
        rating: 5,
        date: "Sep 02, 2018",
      },
      {
        user: {
          name: "Nameeta",
          imageURL: "https://images.gr-assets.com/users/1469556563p2/41087872.jpg",
        },
        likes: 5,
        body: "It is always difficult to review a book so widely read and appreciated. Especially one which is still relevant since the time it was written. I do not know anything about the Russian Revolution which this book is supposed to be based on nor am I well versed with the aristocratic/ political regimes of the world.\n\nThe title is so misleading, could have fooled me into thinking that this was a book about a farm where animals can talk and live together harmoniously... sort of like something Enid Blyton would write. But I have read 1984 so I know that isn't George Orwell's genre.\n\nThis book is about humans and their behavior portrayed by animals which does not in anyway reduce the relevance of what it tries to tell us. Each of these animals represents people or a segment of society we see in our everyday lives. And that being said everything that happens is what has probably happened and will probably keep happening as long as we continue to function as we do as a species.\n\nI read 1984 a while back (my first dystopian) and the world created by Orwell has stuck with me till this day and Animal Farm I am sure is going to be no different. I recommend these 2 books to anyone and everyone.",
        bodyHTML: "It is always difficult to review a book so widely read and appreciated. Especially one which is still relevant since the time it was written. I do not know anything about the Russian Revolution which this book is supposed to be based on nor am I well versed with the aristocratic/ political regimes of the world.<br><br>The title is so misleading, could have fooled me into thinking that this was a book about a farm where animals can talk and live together harmoniously... sort of like something Enid Blyton would write. But I have read 1984 so I know that isn't George Orwell's genre.<br><br>This book is about humans and their behavior portrayed by animals which does not in anyway reduce the relevance of what it tries to tell us. Each of these animals represents people or a segment of society we see in our everyday lives. And that being said everything that happens is what has probably happened and will probably keep happening as long as we continue to function as we do as a species.<br><br>I read 1984 a while back (my first dystopian) and the world created by Orwell has stuck with me till this day and Animal Farm I am sure is going to be no different. I recommend these 2 books to anyone and everyone.",
        rating: 5,
        date: "May 10, 2018",
      },
      {
        user: {
          name: "Behrokh",
          imageURL: "https://images.gr-assets.com/users/1571290865p2/93231010.jpg",
        },
        likes: 5,
        body: "The Animal Castle novel has a simple, humorous language, and is very entertaining and engaging, yet is based on a symbolic and symbolic style. She takes it upon herself and expresses her personal emotion in this novel with complete honesty and courage. In the novel, the farm animal revolution symbolizes the workers' revolution and its fate against the capitalist system.\n\n\"All animals are equal, but some are more equal\" ...\"",
        bodyHTML: "The Animal Castle novel has a simple, humorous language, and is very entertaining and engaging, yet is based on a symbolic and symbolic style. She takes it upon herself and expresses her personal emotion in this novel with complete honesty and courage. In the novel, the farm animal revolution symbolizes the workers' revolution and its fate against the capitalist system.<br><br>\"All animals are equal, but some are more equal\" ...\"",
        rating: 5,
        date: "Dec 07, 2019",
      },
      {
        user: {
          name: "Bruce Hatton",
          imageURL: "https://images.gr-assets.com/users/1451944782p2/51061124.jpg",
        },
        likes: 6,
        body: "It must be at least 20 years since I last read these two dystopian classics. Although, I'm certain my opinion of them wouldn't have diminished one iota if I were to read them today. In fact, I'm sure they would, even now, contain much relevance to the current political scene.\nThe ending of Animal Farm is particularly prescient: the abandoned and betrayed animals looking in through the windows of the farmhouse and being unable to tell the pigs from the humans. This from a novel written 10 years before the discovery of DNA, which revealed that, of all the farmyard animals, the most closely related to humans were.....the porkers.",
        bodyHTML: "It must be at least 20 years since I last read these two dystopian classics. Although, I'm certain my opinion of them wouldn't have diminished one iota if I were to read them today. In fact, I'm sure they would, even now, contain much relevance to the current political scene.<br>The ending of <i>Animal Farm</i> is particularly prescient: the abandoned and betrayed animals looking in through the windows of the farmhouse and being unable to tell the pigs from the humans. This from a novel written 10 years before the discovery of DNA, which revealed that, of all the farmyard animals, the most closely related to humans were.....the porkers.",
        rating: 5,
        date: "Nov 30, 2018",
      },
      {
        user: {
          name: "Amber",
          imageURL: "https://images.gr-assets.com/users/1571060345p2/55219317.jpg",
        },
        likes: 5,
        body: "Who controls the past controls the future. ...",
        bodyHTML: "Who controls the past controls the future. ...",
        rating: 4,
        date: "Feb 19, 2021",
      },
      {
        user: {
          name: "Jongalt",
          imageURL: "https://s.gr-assets.com/assets/nophoto/user/u_50x66-632230dc9882b4352d753eedf9396530.png",
        },
        likes: 5,
        body: "Its quite unique how he portrays his characters as animals. And its often hilarious. But once again...hes a socialist...this is what he wants...why does he trash it here but fight for it in real life? But I have to thank him just like I did for 1984 for making a great book explaining the pitfalls of socialism. \n\nOverall:\nStoryline is funny yet serious.\nYou hate pigs more after your done.\nYou realize that George Orwell is a hypocrite.\nRead it and feel great we aren't to this point...yet.",
        bodyHTML: "Its quite unique how he portrays his characters as animals. And its often hilarious. But once again...hes a socialist...this is what he wants...why does he trash it here but fight for it in real life? But I have to thank him just like I did for 1984 for making a great book explaining the pitfalls of socialism. <br><br>Overall:<br>Storyline is funny yet serious.<br>You hate pigs more after your done.<br>You realize that George Orwell is a hypocrite.<br>Read it and feel great we aren't to this point...yet.",
        rating: 4,
        date: "Feb 26, 2009",
      },
      {
        user: {
          name: "Eli Hornyak",
          imageURL: "https://images.gr-assets.com/users/1532653811p2/84551680.jpg",
        },
        likes: 5,
        body: "Big Brother is watching",
        bodyHTML: "Big Brother is watching",
        rating: 4,
        date: "Mar 30, 2021",
      },
      {
        user: {
          name: "David Clouse",
          imageURL: "https://images.gr-assets.com/users/1557783349p2/96773873.jpg",
        },
        likes: 4,
        body: "In my opinion, some “classics” get their name but don’t live up to them. Animal Farm doesn’t fit that category. Animal Farm is short and so clearly communicates the point it’s trying to get across and it does a great job. The slow decline from one “master” into another, the ability to be free, but just as bad or worse off than when they were under Mr. Jones. Orwell does a great job showing how quickly a society can collapse under a bad ruler. \n\nSimilarly, 1984 is a book that I think had some slow parts, but was overall, exciting. Winston lives in a world where he is always seen and monitored. He wrestles with life and what it might look like to betray this government but often feels hopeless. This book has some very dark turns but does a great job showing what a totalitarian regime could be like if it really succeeded in its plans. By the end, I didn’t want to stop reading.",
        bodyHTML: "In my opinion, some “classics” get their name but don’t live up to them. Animal Farm doesn’t fit that category. Animal Farm is short and so clearly communicates the point it’s trying to get across and it does a great job. The slow decline from one “master” into another, the ability to be free, but just as bad or worse off than when they were under Mr. Jones. Orwell does a great job showing how quickly a society can collapse under a bad ruler. <br><br>Similarly, 1984 is a book that I think had some slow parts, but was overall, exciting. Winston lives in a world where he is always seen and monitored. He wrestles with life and what it might look like to betray this government but often feels hopeless. This book has some very dark turns but does a great job showing what a totalitarian regime could be like if it really succeeded in its plans. By the end, I didn’t want to stop reading.",
        rating: 4,
        date: "Aug 07, 2021",
      },
      {
        user: {
          name: "Ahmad Qassab Bashi",
          imageURL: "https://images.gr-assets.com/users/1368274163p2/7943978.jpg",
        },
        likes: 4,
        body: "I liked the Animal Farm more than 1984- As for the 1984 nothing strange for me. I'm from Syria and I know that what he said is what we lived in the 80s and 90s but the prisons are much much worse. \nThe Animal Farm 4 stars\n1984- 3 ",
        bodyHTML: "I liked the Animal Farm more than 1984- As for the 1984 nothing strange for me. I'm from Syria and I know that what he said is what we lived in the 80s and 90s but the prisons are much much worse. <br>The Animal Farm 4 stars<br>1984- 3 ",
        rating: 5,
        date: "Nov 26, 2012",
      },
      {
        user: {
          name: "Melody",
          imageURL: "https://images.gr-assets.com/users/1549862079p2/3786385.jpg",
        },
        likes: 4,
        body: "I have finally read 1984. It just took me a few years to pick it up. My rating is leaning more toward 3.5 more than 3. \n\nI enjoyed the book. I really don't know how to express my feelings about it yet. But I did enjoyed it. ",
        bodyHTML: "I have finally read 1984. It just took me a few years to pick it up. My rating is leaning more toward 3.5 more than 3. <br><br>I enjoyed the book. I really don't know how to express my feelings about it yet. But I did enjoyed it. ",
        rating: 3,
        date: "Jun 09, 2013",
      },
      {
        user: {
          name: "Wendy Jones",
          imageURL: "https://images.gr-assets.com/users/1646574300p2/63752476.jpg",
        },
        likes: 4,
        body: "I never saw that ending coming!",
        bodyHTML: "I never saw that ending coming!",
        rating: 4,
        date: "Aug 21, 2019",
      },
    ],
  };

  if (isDev) {
    const result = await axios.get(`https://openlibrary.org/search.json?q=${base4Decode(id)}`)
      .then((res) => res.data);
    const result2 = await axios.get(`https://openlibrary.org/${result.docs[0].key}.json`)
      .then((res) => ({
        key: result.docs[0].key,
        ...res.data,
        additional: result.docs[0],
      }));

    // console.log(result2);

    return { props: { data: { testData, openLibraryData: result2 } } };
  }

  const list = await fetchGoodReadsData();

  const existing = list.find((item) => item.id === id);
  if (!existing) return { props: { data: null } };

  const data = await axios.get(`https://goodreads-books.p.rapidapi.com/books/${id}`, {
    headers: {
      "x-rapidapi-host": "goodreads-books.p.rapidapi.com",
      "x-rapidapi-key": process.env.GOODREADS_API_KEY,
    },
  }).then((response) => response.data)
    .catch((err) => ({ error: err.response.data }));
  if (data.error) {
    return {
      props: {
        data: null,
        error: {
          ...ctx,
          data,
        },
      },
    };
  }

  const openLibrarySearch = await axios.get(`https://openlibrary.org/search.json?q=${data.title}`)
    .then((res) => res.data);
  const openLibraryData = await axios.get(`https://openlibrary.org/${openLibrarySearch.docs[0].key}.json`)
    .then((res) => res.data);

  return {
    props: { data: { ...data, openLibraryData } },
    revalidate: 3600 * 12,
  };
}
