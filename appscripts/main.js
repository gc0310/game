//http://speckyboy.com/demo/windmill-demo/index.html
require(
    [],
    function () {
            
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("mySVGCanvas"));
        var pWidth = paper.canvas.offsetWidth;
        var pHeight = paper.canvas.offsetHeight;

        var counter = 0; // counts clicks on target object   
        var starttime;
        var endtime;
        var starttimer = 0; // counts no. of sec game runs for
    

        var startButton = paper.circle(300, 200, 40);
        var startText = paper.text(300, 200, 'START');
        startButton.attr({
        	'stroke': "white",
            'stroke-width': "5px",
        	fill: "#FF4040"
        });

        // Hide for now, show it only when we are ready
        startButton.hide();
        startText.hide();
  
        // unhides the start button
        var ready = function(){
        	startButton.show();
        	startText.show();
        };

        var dot = paper.circle(-200, -200, 50);
            dot.attr({
                'fill' : "#FFEB20",
                'stroke' : "white",
                'stroke-width' : "5px"
            });

        // Naming the function will allow me to call it every time a new game starts 
        var setDifficulty = function() {
            var difficultyLevel = prompt("Welcome to Grace's minigame!\nThe objective of the game is to click on the circle as many times as you can in 10 seconds!\n\nPlease select from the 3 difficulty levels:\n 1 - Easy, 2 - Medium, 3 - Hard.\n\nGood luck!", "1");
                    
                    //C reates a string for 'dot' so we can change its radius to the difficulty levels accordingly
                    var makeCircleString = function(ir) {
                        var CircleString = "-200, -200, " + ir;
                    };

                    // Depending on what the user selects 1/2/3, the radius of the circle will become larger or smaller

                    if (difficultyLevel==="1") { // Easiest level, thus radius is the largest here
                        dot.paper.path(makeCircleString);
                        ir = 50;
                    };

                    if (difficultyLevel==="2") { // Medium difficulty, thus radius is reduced by 15
                        dot.paper.path(makeCircleString);
                        ir = 35;
                    };

                    if (difficultyLevel==="3") { // Hardest difficulty, thus radius is set to 25
                        dot.paper.path(makeCircleString);
                        ir = 25;
                    };

                    //if the user types in any other value (e.g. 4/5/6), the game difficulty will be set to 1 by default
                    if ((difficultyLevel !=="1") && (difficultyLevel !=="2") && (difficultyLevel !=="3")) {
                        confirm('You have keyed in an invalid level. The game will be set to the default level - Level 1.');
                        dot.paper.path(makeCircleString);
                        ir = 50;
                    };
        };

        // Calls the function when the user loads the page
        setDifficulty();

        // Called when the start button is clicked to hide the startButton and begin the game
        var start = function (){
        	console.log("Game is starting...");
        	startButton.hide();
        	startText.hide();
 
            starttimer = 0; // Starts the game timer at 0 seconds
            counter = 0; // Starts the no. of clicks at 0 

            //  This will make the dot start from the center every time, instead of continuing from the 
            // last point it stopped at if placed outside the start function
            dot.xpos = pWidth/2;
            dot.ypos = pHeight/2;

            dot.xrate = 20;
            dot.yrate = 20;

            //function that will be called every 1 second
            var gameClock = setInterval( function(){
                    starttimer++; //Counts to 10, which ends the game 

                    console.log("Game timer = " + starttimer)

                    if (starttimer===10) { //when it is called 10 times (10 seconds), the game will end 
                        
                        //Hides the dot
                        dot.attr({
                            cx: -200,
                            cy: -200
                        });

                        // Places the ready button back after the game ends
                        ready();

                        // Shows the users no. of click on the square.
                        confirm("Time's up!\n\nYou clicked a number of " + counter + " times!\n\nGood job!")
                        
                        //P rompts the user to input the difficulty level again
                        setDifficulty();
                        
                        // Clears the timer and movingcircle functions, so that it starts from 0 when the player starts a new game
                        clearInterval(movingCircle); 
                        clearInterval(gameClock);
                        
                    } 
                    }
                , 1000);

            // Function that moves the square every 1/10th of a second. 
            // By naming the function, we can clear the interval when the timer reaches 10 seconds
            var movingCircle = setInterval(moveCircle, 100);  

        };


        startButton.node.addEventListener('click', start);

        //-----------------------------------------

        // Code taken from Tutorial 6
        var moveCircle = function(){
            dot.xpos = dot.xpos + dot.xrate;
            dot.ypos = dot.ypos + dot.yrate; 
            
            dot.attr({
                cx: dot.xpos, 
                cy: dot.ypos, 
                r: ir,
            });

            if (dot.xpos < 0) {
                dot.xrate = -1*dot.xrate; ballBounce.play()};

            if (dot.xpos > pWidth) {
                dot.xrate = -1*dot.xrate; ballBounce.play()};

            if (dot.ypos < 0) {
                dot.yrate = -1*dot.yrate; ballBounce.play()};

            if (dot.ypos > pHeight){
                dot.yrate = -1*dot.yrate; ballBounce.play()};
        };
                
    
        var countClicks = function(){  // Counts the number of clicks the user makes on the rectangle 
            counter++;
            console.log("no. of clicks = " + counter);
            clickSound.play();
        };
    

        dot.node.addEventListener('click', countClicks);
        

        ready(); // Put the start button on the screen 


        var clickSound = new Audio("resources/Click.ogg");      
        clickSound.pause();
        clickSound.volume=0.1;

        var ballBounce = new Audio("resources/Bounce.wav");      
        ballBounce.pause();
        ballBounce.volume=0.7;

        clickSound.playAudio = function(){
            setTimeout(clickSound.play(), 20);
        };

        var gameBG = new Audio("resources/GameBG.wav");
        gameBG.play();
        gameBG.loop=true;





    }
);