// Task 2iii

db.movies_metadata.aggregate([
    // TODO: Write your query here
    {
        $project: {
            budget: {
                $cond: {
                    if: {$isNumber: "$budget"},
                    then: "$budget",
                    else: {
                        $cond: {
                            if: {$and: [{$ne: ["$budget", false]}, {$ne: ["$budget", null]}, {$ne: ["$budget", ""]}, {$ne: ["$budget", undefined]}]},
                            then: {$toInt: {$trim: {input: "$budget", chars: " USD$"}}},
                            else: "unknown"
                        }
                    }
                }
            }
        }
    },
    {
        $group: {
            _id: {$cond: {if: {$ne: ["$budget", "unknown"]}, then: {$round: ["$budget", -7]}, else: "unknown"}},
            count: {$sum: 1}
        }
    },
    {$project: {budget: "$_id", count: 1, _id: 0}},
    {$sort: {budget: 1}}
]);