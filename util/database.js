import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabaseSync('places.db');

// ______________________________________________________________________
export function init() {
    return database.runAsync(
        `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL, 
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL, 
        address TEXT NOT NULL, 
        lat REAL NOT NULL, 
        lng REAL NOT NULL
      )
  `);
}

// ______________________________________________________________________
export function insertPlace(place) {
    const promise = new Promise((resolve, reject) => {
        const { title, imageUri, address, lat, lng } = place;
        database.runAsync(
            `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
            [title, imageUri, address, lat, lng],
            function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(this.lastID);
            }
        );
    });

    return promise;
}
