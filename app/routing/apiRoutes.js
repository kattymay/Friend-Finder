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
    //---------------------------------------------------------------------------

    app.post('/api/new', function (req, res) {
        // variables: 
        // score difference, friendScore, userScore, newUser
        var scoreDifference;
        var friendScore;
        var userScore;
        var newUser = req.body;
        // newUser is in the req.body

        // bestMatch obj with empty name + photo strings
        var bestMatch = {
            name: "",
            photo: "",
        };

        // establish for loop for friends array
        // using i
        for (var i = 0; i < friends.length; i++) {
            var currentFriend = friends[i];
            scoreDifference = 0;
// establish for loop for newUser score array
// using j
//
            for (var j = 0; j < newUser.scores.length; j++) {
                friendScore = currentFriend.scores[j];
                userScore = newUser.scores[j];
                scoreDifference += Math.abs(parseInt(userScore) - parseInt(friendScore));
            }
// scoreDiff is less than or equal to bestMatch.friendDiff
            if (scoreDifference <= bestMatch.friendDiff) {
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDiff = scoreDifference;
            }


        }
        res.json(bestMatch);
    });
};