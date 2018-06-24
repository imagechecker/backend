/* USAGE:
 * curl -d '{"link":"http://example.com/image.jpg"}' -H "Content-Type: applicaion/json" -X POST http://thisservername:port/link
 * this listener will listen for clients sending url and append the url to a worklist file
 */
var fs = require("fs"); 
var app = require('express')();
var parser = require('body-parser');

class listener{
    constructor(port){
        this.port = port;
       // this.r = new ;
        this.setup();
    }

    setup(){
        app.use(parser.json());
        app.use(parser.urlencoded({
            extended: true
        }));
    }
    start(){
        app.post('/link', function (req, res){            
            if(RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?").test(req.body.link)){
                fs.appendFile('../worklist.txt', req.body.link + "\n", (err) => {
                    if (err) throw err;
                    console.log(req.body.link + ' has been appended to worklist.txt');
                });
            } else {
                res.send(req.body.link + " is not a valid url\n");
            }
            res.end();
        });

    app.listen(this.port);
    }
}

let x = new listener(8080);
x.start();