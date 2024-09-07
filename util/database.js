import * as SQLite from "expo-sqlite";

import { Place } from "../models/place";

const database = SQLite.openDatabaseSync("places.db");

// ______________________________________________________________________
export function init() {
  return database.withTransactionSync(() => {
    database.runSync(
      `CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL, 
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL, 
                address TEXT NOT NULL, 
                lat REAL NOT NULL, 
                lng REAL NOT NULL
            )`,
    );
  });
}

// ______________________________________________________________________
export async function insertPlace(place) {
  await database.withTransactionAsync(() => {
    console.log("🪚 place: ", place);
    try {
      const result = database.runSync(
        `INSERT INTO places(title, imageUri, address, lat, lng) VALUES(?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
      );
      console.log("🪚 result:", result);
    } catch (error) {
      console.log(error);
    }
  });
}

// ______________________________________________________________________
export const fetchPlaces = async () => {
  const placesArray = [];
  const places = await database.getAllAsync("SELECT * FROM places");
  console.log("🪚 places", places);
  places.forEach((place) =>
    placesArray.push(
      new Place(
        place.title,
        place.imageUri,
        {
          address: place.address,
          latitude: place.lat,
          longitude: place.lng,
        },
        place.id,
      ),
    ),
  );
  return placesArray;
};

// ______________________________________________________________________
export const fetchPlaceDetails = async (id) => {
  const stmt = await database.prepareAsync(
    "SELECT * FROM places WHERE id = $id",
  );
  const result = await stmt.executeAsync({ $id: id });
  const firstRow = await result.getFirstAsync();
  // console.log("🪚 firstRow:", firstRow);
  const place = new Place(
    firstRow.title,
    firstRow.imageUri,
    {
      lat: firstRow.lat,
      lng: firstRow.lng,
      address: firstRow.address,
    },
    firstRow.id,
  );
  await result.resetAsync();
  return place;
};
