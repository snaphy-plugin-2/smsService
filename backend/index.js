'use strict';
module.exports = function(server, databaseObj, helper, packageObj) {
    var https = require("https");
    /**
     * Here server is the main app object
     * databaseObj is the mapped database from the package.json file
     * helper object contains all the helpers methods.
     * packegeObj contains the packageObj file of your plugin.
     */

    /**
     * Initialize the plugin at time of server start.
     * init method should never have any argument
     * It is a constructor and is populated once the server starts.
     * @return {[type]} [description]
     */
    var init = function() {};


    var send = function(message, number, callback) {
        //matching the number..
        var patt = /\+\d{12,12}/;
        //remove 0 from the number
        number = number.replace(/^0/, "");
        var match = number.match(patt);
        if (!match) {
            number = "+91" + number;
        }
        

        var apiKey = "xxxxx";
        var apiSecret = "xxxxxxx";
        var data = 'https://rest.nexmo.com' +
            '/sms/json?api_key=' + apiKey + '&api_secret=' + apiSecret +
            '&from=Mapstrack&to=' + number +
            '&text=' + message;
        https.get(
            data,
            function(res) {
                res.on('data', function(data) {
                    // all done! handle the data as you need to
                    console.log("Message sent");
                    //console.log(data);
                    callback(null, data);
                });
            }
        ).on('error', function(err) {
            console.log("Error sending push message to the server.");
            //console.error(err);
            // handle errors somewhow
            callback(err, null);
        });
    };


    //return all the methods that you wish to provide user to extend this plugin.
    return {
        init: init,
        send: send
    };
}; //module.exports