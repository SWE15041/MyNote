db.alerts.aggregate([
    {
        $match: {
            //       "resolution": null,
            "date": {
                $gt: new Date("2021-01-07T00:00:00.00Z")
            },
            "severity": "ERROR"
        }
    },
    {
        $group: {
            _id: {
                app: "$app",a
                action: "$action",
                error_code: "$error_code"
            },
            log: {
                $last: "$url"
            },
            count: {
                $sum: 1
            }
        }
    },
    {
        $sort: {
            count: - 1
        }
    }
]);
