//Block Definition

Blockly.Blocks['slidesquare'] = {
  init: function() {
    this.appendDummyInput()
		.appendField("Slide")
        .appendField(new Blockly.FieldDropdown([["Left","L"], ["Right","R"], ["Up","U"], ["Down","D"]]), "Slide")
		.appendField("one space");
	this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("Move black square to an adjacent space");
 this.setHelpUrl("https://www.google.com");
  }
};

Blockly.Blocks['driveRobot'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Drive")
			.appendField(new Blockly.FieldDropdown([["Forwards", "1"], ["Backwards", "-1"]]), "Drive")
			.appendField(new Blockly.FieldDropdown([["One", "1"], ["Two", "2"],["Three", "3"], ["Four", "4"], ["Five", "5"]]), "driveSpaces")
			.appendField("spaces");
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(270);
	this.setTooltip("Move black square to an adjacent space");
	this.setHelpUrl("https://www.google.com");
	}
}

Blockly.Blocks['rotate'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Rotate")
			.appendField(new Blockly.FieldDropdown([["Counter-clockwise", "L"], ["Clockwise", "R"]]), "Rotate")
			.appendField("90 degrees");
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(0);
	this.setTooltip("Select a direction to rotate the robot");
	this.setHelpUrl("https://www.google.com");
	}
};

var victorySound = new Audio('resources/media/victorySound.mp3');
var collision = new Audio('resources/media/collision.mp3');
var movement = new Audio('resources/media/movement.mp3');
var facing = ["robotUp", "robotRight", "robotDown", "robotLeft"]
var facingNum = 1;
var currentLocation = 0;
var i;
//hard-coded values for the size of the maze and the maze wall blocks
var mazeWidth = 7;
var mazeHeight = 6;
var squaresList = [0, 1, 2, 3, 4, 5, 6,
							7, 8, 9, 10, 11, 12, 13,
							14, 15, 16, 17, 18, 19, 20,
							21, 22, 23, 24, 25, 26, 27,
							28, 29, 30, 31, 32, 33, 34,
							35, 36, 37, 38, 39, 40, 41];
var wallSquares = [];
//


//Generator stub
Blockly.JavaScript['rotate'] = function(block) {
	var code = "";
	var turnDirection = block.getFieldValue('Rotate');
	
	if (turnDirection === "R") {
		facingNum += 1;
	}
	else if (turnDirection === "L") {
		facingNum -= 1;
	}
	
	if (facingNum === -1 || facingNum === 3) {
		facingNum = 3; //facingNum can only be 0-3
		code += "document.getElementById('s" + squaresList[currentLocation] + "').style.backgroundImage='url(images/robotLeft.png)';";
	}
	else if (facingNum === 4 || facingNum === 0) {
		facingNum = 0; //facingNum can only be 1-4
		code += "document.getElementById('s" + squaresList[currentLocation] + "').style.backgroundImage='url(images/robotUp.png)';";
	}
	else if (facingNum === 1) {
		code += "document.getElementById('s" + squaresList[currentLocation] + "').style.backgroundImage='url(images/robotRight.png)';";
	}
	else if (facingNum === 2) {
		code += "document.getElementById('s" + squaresList[currentLocation] + "').style.backgroundImage='url(images/robotDown.png)';";
	}
	return code;
}


Blockly.JavaScript['driveRobot'] = function(block) {
	var code = "";
	var driveDirection = block.getFieldValue('Drive');
	driveDirection = parseInt(driveDirection);
	var driveSpaces = block.getFieldValue('driveSpaces');
	driveSpaces = parseInt(driveSpaces);
	for (i=0; i< driveSpaces;i++)
	{
		if (facingNum === 3) {
			if ((currentLocation % mazeWidth != 0 || (driveDirection == -1)) && !wallSquares.includes(currentLocation - (1 * driveDirection))) 
			{
				if (!(currentLocation % mazeWidth == (mazeWidth-1) && driveDirection == -1)){
				code += "document.getElementById('s" + squaresList[currentLocation] + "').style.backgroundImage='url(images/background.png)';";
				code += "document.getElementById('s" + squaresList[currentLocation-driveDirection] + "').style.backgroundImage='url(images/robotLeft.png)';";
				currentLocation -= driveDirection;
				movement.play();
				}
				else{
				code += "document.getElementById('s" + squaresList[currentLocation] + "').style.backgroundImage='url(images/" + facing[facingNum] + ".png)';";
				collision.play();
				window.alert("Oops, looks like there is a wall there!");
				break;
			}
			}
			else{
				code += "document.getElementById('s" + squaresList[currentLocation] + "').style.backgroundImage='url(images/" + facing[facingNum] + ".png)';";
				collision.play();
				window.alert("Oops, looks like there is a wall there!");
				break;
			}
		}
		else if (facingNum === 0) {
			if (currentLocation > (driveDirection)*(mazeWidth-1) && !wallSquares.includes(currentLocation - (driveDirection)*mazeWidth)) 
			{ 
				if (squaresList.includes(currentLocation - ((driveDirection) * mazeWidth)))
				{
					
				code += "document.getElementById('s" + squaresList[currentLocation] + "').style.backgroundImage='url(images/background.png)';";
				code += "document.getElementById('s" + squaresList[currentLocation-(driveDirection)*mazeWidth] + "').style.backgroundImage='url(images/robotUp.png)';";
				currentLocation -= (driveDirection) * mazeWidth;
				movement.play();
				}
				else{
				code += "document.getElementById('s" + squaresList[currentLocation] + "').style.backgroundImage='url(images/" + facing[facingNum] + ".png)';";
				collision.play();
				window.alert("Oops, looks like there is a wall there!");
				break;
			}
			}
			else {
				code += "document.getElementById('s" + squaresList[currentLocation] + "').style.backgroundImage='url(images/" + facing[facingNum] + ".png)';";
				collision.play();
				window.alert("Oops, looks like there is a wall there!");
				break;
			}
		}
		else if (facingNum === 1) {
		if ((currentLocation % mazeWidth != (mazeWidth-1) || (driveDirection == -1)) && !wallSquares.includes(currentLocation + (1 * driveDirection))) 
			{
				if (!(currentLocation % mazeWidth == 0 && driveDirection == -1)){
				code += "document.getElementById('s" + squaresList[currentLocation] + "').style.backgroundImage='url(images/background.png)';";
				code += "document.getElementById('s" + squaresList[currentLocation+driveDirection] + "').style.backgroundImage='url(images/robotRight.png)';";
				currentLocation += driveDirection;
				movement.play();
				}
				else{
				code += "document.getElementById('s" + squaresList[currentLocation] + "').style.backgroundImage='url(images/" + facing[facingNum] + ".png)';";
				collision.play();
				window.alert("Oops, looks like there is a wall there!");
				break;
			}
			}
		else{
				code += "document.getElementById('s" + squaresList[currentLocation] + "').style.backgroundImage='url(images/" + facing[facingNum] + ".png)';";
				collision.play();
				window.alert("Oops, looks like there is a wall there!");
				break;
			}
		}
		else if (facingNum === 2) {
			if ((currentLocation < (driveDirection)*(mazeHeight * (mazeWidth-1)) || (driveDirection == -1)) && !wallSquares.includes(currentLocation + (driveDirection)*mazeWidth) ){
				if (squaresList.includes(currentLocation + ((driveDirection) * mazeWidth)))
				{
					code += "document.getElementById('s" + squaresList[currentLocation] + "').style.backgroundImage='url(images/background.png)';";
					code += "document.getElementById('s" + squaresList[currentLocation+(driveDirection)*mazeWidth] + "').style.backgroundImage='url(images/robotDown.png)';";
					currentLocation += (driveDirection) * mazeWidth;
					movement.play();
				}
				else{
				code += "document.getElementById('s" + squaresList[currentLocation] + "').style.backgroundImage='url(images/" + facing[facingNum] + ".png)';";
				collision.play();
				window.alert("Oops, looks like there is a wall there!");
				break;
			}
			}
			else { //invalid move. Do not change current location
				code += "document.getElementById('s" + squaresList[currentLocation] + "').style.backgroundImage='url(images/" + facing[facingNum] + ".png)';";
				collision.play();
				window.alert("Oops, looks like there is a wall there!");
				break;
			}
		}
	}
	return code;
	
}

Blockly.JavaScript['slidesquare'] = function(block) {
	//create code variable
	var code = "";
	
	//set all squares to blank image
	for (i=0; i<squaresList.length; i++) {
		code += "document.getElementById('s" + squaresList[i] + "').style.backgroundImage='url(images/background.png)';";
	}
	//set all wall squares to wall image
	for (i=0; i<wallSquares.length; i++) {
		code += "document.getElementById('s" + wallSquares[i] + "').style.backgroundImage='url(images/wall.png)';";
	}
	//get selected direction
    var selectedDirection = block.getFieldValue('Slide');
  
////////// DOWN //////////
	if (selectedDirection === "D") {
		if (currentLocation < (mazeHeight * (mazeWidth-1))&& !wallSquares.includes(currentLocation + mazeWidth) )
		{ //if there is room to go down, and not trying to enter a wall space
			code += "document.getElementById('s" + squaresList[currentLocation + mazeWidth] + "').style.backgroundImage='url(images/" + facing[facingNum] + ".png)';";
			currentLocation += mazeWidth;
			movement.play();
		}
		else { //invalid move. Do not change current location
			code += "document.getElementById('s" + squaresList[currentLocation] + "').style.backgroundImage='url(images/" + facing[facingNum] + ".png)';";
			collision.play();
			window.alert("Oops, looks like there is a wall there!");
		}
	}
	
////////// UP //////////	
	else if (selectedDirection === "U") {
		if (currentLocation > (mazeWidth-1) && !wallSquares.includes(currentLocation - mazeWidth)) 
		{ //if there is room to go up
			code += "document.getElementById('s" + squaresList[currentLocation - mazeWidth] + "').style.backgroundImage='url(images/" + facing[facingNum] + ".png)';";
			currentLocation -= mazeWidth;
			movement.play();
		}
		else {
			code += "document.getElementById('s" + squaresList[currentLocation] + "').style.backgroundImage='url(images/" + facing[facingNum] + ".png)';";
			collision.play();
			window.alert("Oops, looks like there is a wall there!");
		}
	}
	
////////// RIGHT //////////
	else if (selectedDirection === "R") {
		if (currentLocation % mazeWidth != (mazeWidth-1) && !wallSquares.includes(currentLocation + 1)) 
		{
			code += "document.getElementById('s" + squaresList[currentLocation+1] + "').style.backgroundImage='url(images/" + facing[facingNum] + ".png)';";
			currentLocation += 1;
			movement.play();
		}
		else{
			code += "document.getElementById('s" + squaresList[currentLocation] + "').style.backgroundImage='url(images/" + facing[facingNum] + ".png)';";
			collision.play();
			window.alert("Oops, looks like there is a wall there!");
		}
	}
	
////////// LEFT //////////	
	else if (selectedDirection === "L") {
		if (currentLocation % mazeWidth != 0 && !wallSquares.includes(currentLocation - 1)) 
		{
			code += "document.getElementById('s" + squaresList[currentLocation-1] + "').style.backgroundImage='url(images/" + facing[facingNum] + ".png)';";
			currentLocation -= 1;
			movement.play();
		}
		else{
			code += "document.getElementById('s" + squaresList[currentLocation] + "').style.backgroundImage='url(images/" + facing[facingNum] + ".png)';";
			collision.play();
			window.alert("Oops, looks like there is a wall there!");
		}
	}
	
    return code;
};
