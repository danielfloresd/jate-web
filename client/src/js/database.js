import { openDB } from "idb";

const initdb = async () =>
  // create a new database named 'jate' which will user version 1 of database
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      // Create new object store for data and give it a key name of 'id' which increments automatically
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT to the database");
  // Create a connection to the database database and version we want to use.
  const todosDb = await openDB("jate", 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = todosDb.transaction("jate", "readwrite");
  // Open up the desired object store.
  const store = tx.objectStore("jate");
  // Use the .put() method to get all data in the database.
  const request = store.put({ id:1, content: content });
  // Get confirmation of the request.
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// Logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET all from the database");
  // Create a connection to the database database and version we want to use.
  const todosDb = await openDB("jate", 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = todosDb.transaction("jate", "readonly");
  // Open up the desired object store.
  const store = tx.objectStore("jate");
  // Use the .getAll() method to get all data in the database.
  const request = store.get(1);
  // Get confirmation of the request.
  const result = await request;
  console.log("result.value", result);
  return result.content;
};

initdb();
