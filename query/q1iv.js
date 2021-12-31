// Task 1iv

db.ratings.aggregate([
    // TODO: Write your query here
    {$match: {userId: {$eq: 186}}},
    {$sort: {timestamp: -1}},
    {$limit: 5},
    {
        $group: {
            _id: null,
            movieIds: {$push:  "$movieId"},
            ratings: {$push:  "$rating"},
            timestamps: {$push:  "$timestamp"}
        }
    },
    {$project: {movieIds: 1, ratings: 1, timestamps: 1, _id: 0}}
]);