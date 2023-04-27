import parseXML from "./parseXML";
import stripHTML from "./stripHTML";
import stripURLParameters from "./stripURLParameters";

const fetchGoodReadsData = async (shelf = "%23ALL%23") => {
  const data = await parseXML(`https://www.goodreads.com/review/list_rss/148878929?shelf=${shelf}&sort=title&order=asc`)
    .then((result) => result.rss.channel[0]);

  const base4Encode = (str) => Buffer.from(str).toString("base64");

  const formattedBookData = data.item.map((item) => ({
    id: item.book_id[0],
    encodedTitle: base4Encode(item.title[0]),
    shelf: item.user_shelves[0],
    title: item.title[0],
    author: item.author_name[0],
    description: stripHTML(item.book_description[0]),
    avgRating: item.average_rating[0],
    bookPublished: item.book_published[0],
    guid: stripURLParameters(item.guid[0]),
    images: {
      image: item.book_image_url[0],
      small: item.book_small_image_url[0],
      medium: item.book_medium_image_url[0],
      large: item.book_large_image_url[0],
    },
    userRating: item.user_rating[0],
    userDateAdded: item.user_date_added[0],
  }));

  return formattedBookData;
};

export default fetchGoodReadsData;
