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
        const id = item.sys.id; // Add this line
        const title = item.fields.title;
        const description = item.fields.description;
        const img = item.fields.img[0].fields.file.url;
  
        return { id, title, description, img }; // Include id here
      });
  
      return saniEntries;
    } catch (error) {
      console.log(error);
    }
  };

  const getFoodById = async (id) => {
    try {
      const entry = await client.getEntry(id);

      const title = entry.fields.title;
      const description = entry.fields.description;
      const img = entry.fields.img[0].fields.file.url;

      return { title, description, img };
    } catch (error) {
      console.log(error);
    }
  };

  return { getFoods, getFoodById };
};

export default useContentful;