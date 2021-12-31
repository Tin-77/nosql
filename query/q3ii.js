// Task 3ii

db.credits.aggregate([
    // TODO: Write your query here
    {$match: {crew: {$elemMatch: {id: 5655, job:"Director"}}}},
    {$project: {cast: {name: 1, id: 1}}},
    {$unwind: "$cast"},
    {
        $group: {
            _id: {val1: "$cast.name", val2: "$cast.id"},
            count: {$sum: 1}
        }
    },
    {$project: {name: "$_id.val1", id: "$_id.val2", count: 1, _id: 0}},
    {$sort: {count: -1, id: 1}},
    {$limit: 5}
]);