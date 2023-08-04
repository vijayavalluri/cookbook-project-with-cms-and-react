import { createClient } from "contentful";

const useContentful = () => {
  const client = createClient({
    space: "zi6lefd4slos",
    accessToken: import.meta.env.VITE_APP_API_KEY,
    host: "preview.contentful.com"
  });

  const getFoods = async () => {
    try {
      const entries = await client.getEntries({
        content_type: "food",
        select: "fields"
      });

      const saniEntries = entries.items.map((item) => {
        const title = item.fields.title;
        const description = item.fields.description;
        const img = item.fields.img[0].fields.file.url;

        return { title, description, img };
      });

      return saniEntries;
    } catch (error) {
      console.log(error);
    }
  };

  return { getFoods };
};

export default useContentful;