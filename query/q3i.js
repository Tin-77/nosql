// Task 3i

db.credits.aggregate([
    // TODO: Write your query here
    {$unwind: "$cast"},
    {$match: {"cast.id": 7624}},
    {
        $lookup: {
            from: "movies_metadata",
            localField: "movieId",
            foreignField: "movieId",
            as: "movies"
        }
    },
    {
        $project: {
            _id: 0,
            release_date: {$first: "$movies.release_date"},
            title: {$first: "$movies.title"},
            character: "$cast.character"
        }
    },
    {$sort: {release_date: -1}}
]);