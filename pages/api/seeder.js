import mongodb from "../../utils/mongodb"
import jsondb from "../../jsondb/places"
import Places from "../../models/Place";


export default async function handler(req, res) {

    try {
        // Connect to the database
        await mongodb.dbConnect();

        // Delete existing data (optional)
        await Places.deleteMany();

        // Insert the JSON data into the database
        await Places.insertMany(jsondb.places);

        // Retrieve the places data from the database
        const places = await Places.find({});

        // Disconnect from the database
        await mongodb.dbDisconnect();

        // Send the places data as a response
        res.status(200).json(places);

        // res.send(jsondb)
    } catch (error) {
        // Handle errors gracefully
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
