// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
//===============================================================================

var friends = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post('/api/new', function (req, res) {

        var scoreDifference;
        var friendScore;
        var userScore;
        var newUser = req.body;

        var bestMatch = {
            name: "",
            photo: "",
            friendDiff: Infinity
        };

        for (var i = 0; i < friends.length; i++) {
            var currentFriend = friends[i];
            scoreDifference = 0;

            for (var j = 0; j < newUser.scores.length; j++) {
                friendScore = currentFriend.scores[j];

                userScore = newUser.scores[j];
                scoreDifference += Math.abs(parseInt(userScore) - parseInt(friendScore));
            }

            if (scoreDifference <= bestMatch.friendDiff) {
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDiff = scoreDifference;
            }


        }
        res.json(bestMatch);
    });
};