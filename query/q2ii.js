// Task 2ii

db.movies_metadata.aggregate([
    // TODO: Write your query here
    {$project: {"_id": 0, "tagline": 1}},
    {
        $project: {
            words: {$split: ["$tagline", " "]}
        }
    },
    {
        $unwind: { path: "$words" }
    },
    {
        $project: {
            words: {$trim: {input: {$toLower: "$words"}, chars: " .,?!"}},
            _id: "$words",
        }
    },
    {
        $group: {
            _id: "$words",
            count: {$sum: 1}
        }
    },
    {$project: {_id: 1, count: 1, letters: {$strLenCP: "$_id"}}},
    {$match: {letters: {$gt: 3}}},
    {$project: {letters: 0}},
    {$sort: {count: -1}},
    {$limit: 20}
]);