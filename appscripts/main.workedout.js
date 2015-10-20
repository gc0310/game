//http://speckyboy.com/demo/windmill-demo/index.html
require(
    [],
    function () {
            
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("mySVGCanvas"));

        var counter = 0;    // counts clicks on target object   
        var maxCount = 10;  // game ends when this number is reached    
        var starttime;      // keeps track of when the game starts  
        var totaltime;      // computed when the game ends (Date.now() - starttime)
        var gametime;

        var duration = 10000;
        var startgametime = 0;

        // Start button with text on top
        var startButton = paper.circle(300, 200, 40);
        var startText = paper.text(300, 200, 'START');
        startButton.attr({
            stroke: "black",
            fill: "green"
        });

        // Hide for now, show it only when we are ready
        startButton.hide();
        startText.hide();

        // unhides the start button
        var ready = function(){
            startButton.show();
            startText.show();
        }



        // Called when the start button is clicked to hide the startButton and begin the game
        var start = function (){
            console.log("game is starting");
            startButton.hide();
            startText.hide();

            counter = 0;
            starttime = Date.now();

            startgametime = 0;
            var gametimer = function() {
            startgametime++;
            console.log(startgametime);
            }

            setInterval(gametimer,1000);


            console.log("time = " + starttime);

            moveSquare();
        }

        startButton.node.addEventListener('click', start);

        //-----------------------------------------
        // Create the target rect and put it "off screen" where it can't be seen until the game starts
        var rect1 = paper.rect(-100,-100,100, 100);
        rect1.attr({
            'fill': "hsl(240, 50, 50)",
            'stroke': '#3b4449',
            'stroke-width': 10,
            'stroke-linejoin': 'round',
            'opacity': .75
        });

        // Return a random integer between m and n inclusive
         var randInt = function( m, n ) {
            var range = n-m+1;
            var frand = Math.random()*range;
            return m+Math.floor(frand);
        }

        // If the game isn't over, move the square to a new random location
        var moveSquare = function(){
            var posX, posY;  // temp vars to hold the new square position indexes
            timenow = Date.now();
            console.log("time now is " + timenow);
            // Counts the number of moves we've made so far
            counter++;
            console.log("your square move count is now " + counter);

            if (timenow-starttime===duration) { // if true, then the game is over
                clearInterval(startgametime);

                // Compute the duration of the game and convert from ms to secs
                totaltime = (Date.now()-starttime)/1000;
                // Let the user know how they fared
                confirm("You completed the task in " + totaltime + " seconds");
                // move the square off screen
                rect1.attr({
                    x: -100,
                    y: -100
                });
                // Show the start button for another new session
                ready();

            } else {  // the game continues, so just move the square
                posX = randInt(0,5);  // get the (random) positions
                posY = randInt(0,3);
                // Use the positions to move the target square
                rect1.attr({
                    x: posX*100,    
                    y: posY*100
                });

                setInterval(moveSquare, 1000);
            }
        }

        rect1.node.addEventListener('click', moveSquare);

  
        // Put the start button on the screen as this module loads so we are ready to play
        ready(); 
    }
);