import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabaseSync('places.db');

// ______________________________________________________________________
export function init() {
    // return database.runAsync(
    //     // `DROP TABLE IF EXISTS places`
    //     `CREATE TABLE IF NOT EXISTS  places (
    //       id INTEGER PRIMARY KEY NOT NULL, 
    //       title TEXT NOT NULL,
    //       imageUri TEXT NOT NULL, 
    //       address TEXT NOT NULL, 
    //       lat REAL NOT NULL, 
    //       lng REAL NOT NULL
    //     )
    //     `
    // );
    return database.withTransactionSync(() => {
        database.runSync(
            `CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL, 
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL, 
                address TEXT NOT NULL, 
                lat REAL NOT NULL, 
                lng REAL NOT NULL
              )
              `
        );
    });
}

// ______________________________________________________________________
export async function insertPlace(place) {
    // await database.withTransactionAsync(async () => {
    //     try {
    //         console.log("🪚 place: ", place);
    //         const result = await database.execAsync(
    //             `INSERT INTO places(title, imageUri, address, lat, lng) VALUES(?, ?, ?, ?, ?)`,
    //             [
    //                 place.title,
    //                 place.imageUri,
    //                 place.address,
    //                 place.lat,
    //                 place.lng,
    //             ],
    //         )
    //         console.log(result);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // })
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
