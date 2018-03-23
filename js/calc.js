// final draft
$(document).ready(function () {

	//intialise variables
	var entry = ''; //value of button click
	var current = '';
	var answer = " ";
	var decimal = '';
	var equation = ""; //new variable to store current after replace
	var reg = /x/g; //regexp to swap x with * for eval
	var error = "ERROR";
	var box = $("#entry"); //save typing
	$("#made").text("Made by Jamie");
	//set box to default value
	box.text("0");

	//when user clicks ANY button move value to entry and append to current
	$('button').click(function () {
		entry = $(this).attr('value');
		if (entry !== "c" && entry !== "=" && entry !== "ce" && current.length < 16) {
			current += entry;
			box.text(current);
		}
		//if C or CE call reset
		else if (entry === "c" || entry === "ce") {
			reset();
		}
		//if = call equater
		else if (entry === "=") {
			equater();
		}
		else {
			reset();
			box.text(error);
		}
	});
	
function reset() { //reset all variables and entry box
		entry = '';
		current = '';
		box.text("0");
	}

	function decimals() { //function to loop through current and search for decimals
		for (var i = 0; i < current.length; i++) {
			if (current[i] === ".") { //sets true or false if found
				decimal = true;
			} else {
				decimal = false;
			}
		}
	}

	function equater() { //trys to call deicmals and replacer and set answer, if any error ERROR shown
		try {
			decimals();
			replacer();
			box.text(answer);
			current = answer; //incase they want to continue after answer displayed
		} catch (Error) {
			box.text(error);
		}
	}

	function replacer() { //use regex to replace x with * for equater
		if (decimal === true) {
			equation = current.replace(reg, "*");
			answer = eval(equation).toFixed(12);
		} else {
			equation = current.replace(reg, "*");
			answer = eval(equation);
		}
	}
}); // end doc ready function