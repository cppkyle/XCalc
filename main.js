function appendToOperationArea(string, id) {
	document.getElementById("operationArea" + id).innerHTML = string + `<div id="operationArea${id+1}"></div>`;
}

function newOperationArea(string) {
	document.getElementById("operationArea0").innerHTML = string + `<div id="operationArea1"></div>`;
}

function autoResizeResultTextArea() {
	document.getElementById("resultTextArea").style.height = (document.getElementById("resultTextArea").scrollHeight)+"px";
	document.getElementById("resultTextArea").style.width = (document.getElementById("resultTextArea").scrollWidth)+"px";
}

function addLinearRegressionInputField() {
	document.getElementById("operationArea0").innerHTML.replace(/\<div id\=\"operationArea1\"\>\<\/div\>/g, "");
	document.getElementById("operationArea0").innerHTML += `X: <input type="number" id="textInput" class="xInput"><br>
			Y: <input type="number" id="textInput" class="yInput"><br><hr><br><div id="operationArea1"></div>`;
}

function calculateLinearRegression() {
	pointsX = document.getElementsByClassName("xInput");
	pointsY = document.getElementsByClassName("yInput");
	points = [];
	for (var i = 0; i < pointsX.length; i++) {
		point = [pointsX[i].value, pointsY[i].value];
		points.push(point);
	}
	
	numerator = 0;
	denominator = 0;
	xSum = 0;
	ySum = 0;
	
	for (var i = 0; i < points.length; i++) {
		xSum += points[i][0]; 
		ySum += points[i][1]; 
	}
	
	xAverage = xSum/points.length;
	yAverage = ySum/points.length;
	
	for (var i = 0; i < points.length; i++) {
		x = points[i][0];	
		y = points[i][1];	
		numerator += (x - xAverage) * (y - yAverage);
		denominator += (x - xAverage) * (x - xAverage);
	}
	
	m = numerator/denominator;
	b = yAverage - (m * xAverage);
	
	appendToOperationArea(
			`
			<p>Rule is: y = ${m} * x + ${b}</p>
			`
	,1);
	autoResizeResultTextArea();
}

function calculatePythagore(mode) {
	/*
		0: Hypotenuse
		1: Missing Side
	*/
	switch (mode) {
		case 0:
			side1 = document.getElementsByName("side1")[0].value;
			side2 = document.getElementsByName("side2")[0].value;
			hypotenuse = Math.sqrt(((side1*side1)+(side2*side2)));
			appendToOperationArea(
			`
			<p>Hypotenuse is ${hypotenuse}</p>
			<textarea id="resultTextArea" readonly>
c² = a² + b²
c² = ${side1}² + ${side2}²
c² = ${hypotenuse}
			</textarea>
			`
			,2);
			autoResizeResultTextArea();
			break;
			
		case 1:
			hypotenuse = document.getElementsByName("hypotenuse")[0].value;
			side = document.getElementsByName("side")[0].value;
			if (hypotenuse > side) {
				hypotenuseSquared = hypotenuse*hypotenuse;
				sideSquared = side * side;
				missingSide = Math.sqrt((hypotenuseSquared-sideSquared));
				appendToOperationArea(
				`
				<p>Missing Side is ${missingSide}</p>
				<textarea id="resultTextArea" readonly>
c² = a² + b²\n
${hypotenuse}² = ${side}² + b²
${hypotenuseSquared} = ${sideSquared} + b²
${missingSide}² = b²
${missingSide} = b
				</textarea>
				`
				,2);
				autoResizeResultTextArea();
			} else {
				appendToOperationArea(
				`
				<p id="error">Error: Hypotenuse must be greater than known side</p>
				`
				,2);
			}
			break;
		
		default:
			console.error("On switch(mode) in main.js: " + mode + " is not a valid mode!");
	}
}

function calculateAngles(mode) {
	/*
		0: Triangle Sides
	*/
	switch (mode) {
		case 0:
			side1 = document.getElementsByName("side1")[0].value;
			side2 = document.getElementsByName("side2")[0].value;
			side3 = document.getElementsByName("side3")[0].value;
			if (side3 < side1 + side2 && side1 < side2 + side3 && side2 < side3 + side1) {
				angleA = Math.acos((((side3*side3) + (side2*side2) - (side1*side1))/(2*side3*side2)))*180/Math.PI
				angleB = Math.acos((((side3*side3) + (side1*side1) - (side2*side2))/(2*side3*side1)))*180/Math.PI
				angleC = Math.acos((((side1*side1) + (side2*side2) - (side3*side3))/(2*side1*side2)))*180/Math.PI
			appendToOperationArea(
			`
			<p>Angle A is ${angleA}</p>
			<p>Angle B is ${angleB}</p>
			<p>Angle C is ${angleC}</p>
			<textarea id="resultTextArea" readonly>
- ANGLE A -
cos(A) = b² + c² - a²/2bc
cos(A) = ${side2}² + ${side3}² - ${side1}²/2*${side2}*${side3}
A = cos-1(${side2}² + ${side3}² - ${side1}²/2*${side2}*${side3})
A = ${angleA}

- ANGLE B -
cos(B) = c² + a² - b²/2ca
cos(B) = ${side3}² + ${side1}² - ${side2}²/2*${side3}*${side1}
B = cos-1(${side3}² + ${side1}² - ${side2}²/2*${side3}*${side1})
B = ${angleB}

- ANGLE C -
cos(C) = a² + b² - c²/2ab
cos(C) = ${side1}² + ${side2}² - ${side3}²/2*${side1}*${side2}
C = cos-1(${side1}² + ${side2}² - ${side3}²/2*${side1}*${side2})
C = ${angleC}
			</textarea>
			`
			,1);
			autoResizeResultTextArea();
			} else {
				appendToOperationArea(
				`
				<p id="error">Error: Triangle invalid</p>
				`
				,1);
			}
			break;
			
		case 1:
			hypotenuse = document.getElementsByName("hypotenuse")[0].value;
			side = document.getElementsByName("side")[0].value;
			if (hypotenuse > side) {
				hypotenuseSquared = hypotenuse*hypotenuse;
				sideSquared = side * side;
				missingSide = Math.sqrt((hypotenuseSquared-sideSquared));
				appendToOperationArea(
				`
				<p>Missing Side is ${missingSide}</p>
				<textarea id="resultTextArea" readonly>
c² = a² + b²\n
${hypotenuse}² = ${side}² + b²
${hypotenuseSquared} = ${sideSquared} + b²
${missingSide}² = b²
${missingSide} = b
				</textarea>
				`
				,2);
				autoResizeResultTextArea();
			} else {
				appendToOperationArea(
				`
				<p id="error">Error: Hypotenuse must be greater than known side</p>
				`
				,2);
			}
			break;
		
		default:
			console.error("On switch(mode) in main.js: " + mode + " is not a valid mode!");
	}
}

function calculatePolygon(mode) {
	/*
		0: Pyramid
		1: Prism
		2: Polygon
	*/
	switch (mode) {
		case 0:
			sideCount = document.getElementsByName("sideCount")[0].value;
			sideLength = document.getElementsByName("sideLength")[0].value;
			baseApothem = document.getElementsByName("baseApothem")[0].value;
			sideApothem = document.getElementsByName("sideApothem")[0].value;
			baseArea = (sideCount*sideLength*baseApothem)/2;
			sideArea = ((sideCount*sideLength)*sideApothem)/2;
			totalArea = baseArea + sideArea;
			appendToOperationArea(
			`
			<p>Area is ${totalArea}</p>
			<textarea id="resultTextArea" readonly>
A = (can/2) + ((Pb * h)/2)
A = ((${sideLength} * ${baseApothem} * ${sideCount})/2) + (((${sideLength} * ${sideCount}) * ${sideApothem})/2)
A = ${totalArea}
			</textarea>
			`
			,3);
			autoResizeResultTextArea();
			break;
			
		case 1:
			sideCount = document.getElementsByName("sideCount")[0].value;
			sideLength = document.getElementsByName("sideLength")[0].value;
			baseApothem = document.getElementsByName("baseApothem")[0].value;
			height = document.getElementsByName("height")[0].value;
			baseArea = (sideCount*sideLength*baseApothem);
			sideArea = (sideCount*sideLength)*height;
			totalArea = baseArea + sideArea;
			appendToOperationArea(
			`
			<p>Area is ${totalArea}</p>
			<textarea id="resultTextArea" readonly>
A = (can) + (Pb * h)
A = (${sideLength} * ${baseApothem} * ${sideCount}) + ((${sideLength} * ${sideCount}) * ${height})
A = ${totalArea}
			</textarea>
			`
			,3);
			autoResizeResultTextArea();
			break;
			
		case 2:
			sideCount = document.getElementsByName("sideCount")[0].value;
			sideLength = document.getElementsByName("sideLength")[0].value;
			baseApothem = document.getElementsByName("baseApothem")[0].value;
			area = (sideCount*sideLength*baseApothem)/2;
			appendToOperationArea(
			`
			<p>Area is ${area}</p>
			<textarea id="resultTextArea" readonly>
A = (can)/2
A = (${sideLength} * ${baseApothem} * ${sideCount})*2
A = ${area}
			</textarea>
			`
			,3);
			break;
		
		default:
			console.error("On switch(mode) in main.js: " + mode + " is not a valid mode!");
	}
}

function calculateCircle(mode) {
	/*
		0: Radius
		1: Area
		2: Cone
	*/
	switch (mode) {
		case 0:
			area = document.getElementsByName("area")[0].value;
			radius = Math.sqrt((area/Math.PI));
			appendToOperationArea(
			`
			<p>Radius is ${radius}</p>
			<textarea id="resultTextArea" readonly>
r = sqrt(A/pi)
r = ${radius}
			</textarea>
			`
			,3);
			autoResizeResultTextArea();
			break;
			
		case 1:
			radius = document.getElementsByName("radius")[0].value;
			area = Math.PI * (area*area);
			appendToOperationArea(
			`
			<p>Area is ${area}</p>
			<textarea id="resultTextArea" readonly>
A = pi * r²
A = pi * ${radius}²
A = ${area}
			</textarea>
			`
			,3);
			autoResizeResultTextArea();
			break;
			
		case 2:
			radius = document.getElementsByName("radius")[0].value;
			apothem = document.getElementsByName("apothem")[0].value;
			area = (Math.PI * (area*area)) + (Math.PI * radius * apothem);
			appendToOperationArea(
			`
			<p>Area is ${area}</p>
			<textarea id="resultTextArea" readonly>
A = (pi * r²) + (pi * a * r)
A = (pi * ${radius}²) + (pi * ${apothem} * ${radius})
A = ${area}
			</textarea>
			`
			,3);
			autoResizeResultTextArea();
			break;
		
		default:
			console.error("On switch(mode) in main.js: " + mode + " is not a valid mode!");
	}
}

function update(mode) {
	
	/*
		0: Area from main
		1: Pythagore from main
		2: Triangles from main
		3: CAN/2 from Area
		4: Circle from Area
		5: Pyramid from CAN/2
		6: Prism from CAN/2
		7: Polygon from CAN/2
		8: Radius from Circle
		9: Area from Circle
		10: Hypotenuse from Pythagore
		11: Missing Side from Pythagore
		12: Cone from Circle
		13: Linear Regression from main
	*/
	
	switch (mode) {
		case 0:
			newOperationArea( 
			`
			<input type="radio" id="radioInput" name="area" onClick="update(3)">Shapes</input>
			<input type="radio" id="radioInput" name="area" onClick="update(4)">Circle</input>
			<hr>
			`);
			break;
		
		case 1:
			newOperationArea(
			`
			<input type="radio" id="radioInput" name="pythagore" onClick="update(10)">Hypotenuse</input>
			<input type="radio" id="radioInput" name="pythagore" onClick="update(11)">Missing Side</input>
			<hr>
			`
			);
			break;
		
		case 2:
			newOperationArea(
			`
			Side A: <input type="number" id="textInput" name="side1"><br>
			Side B: <input type="number" id="textInput" name="side2"><br>
			Side C: <input type="number" id="textInput" name="side3"><br>
			<br><button id="calculateButton" onclick="calculateAngles(0)">Calculate</button>
			`
			);
			break;
			
		case 3:
			appendToOperationArea(
			`
			<input type="radio" id="radioInput" name="shapes" onClick="update(5)">Pyramid</input>
			<input type="radio" id="radioInput" name="shapes" onClick="update(6)">Prism</input>
			<input type="radio" id="radioInput" name="shapes" onClick="update(7)">Regular Polygon</input>
			<hr>
			`
			,1);
			break;
		
		case 4:
			appendToOperationArea(
			`
			<input type="radio" id="radioInput" name="circle" onClick="update(8)">Radius</input>
			<input type="radio" id="radioInput" name="circle" onClick="update(9)">Area</input>
			<input type="radio" id="radioInput" name="circle" onClick="update(12)">Cone</input>
			<hr>
			`
			,1);
			break;
		
		case 5:
			appendToOperationArea(
			`
			Number of Sides: <input type="number" id="textInput" name="sideCount"><br>
			Length of One Side: <input type="number" id="textInput" name="sideLength"><br>
			Base's Apothem: <input type="number" id="textInput" name="baseApothem"><br>
			Pyramid's Apothem: <input type="number" id="textInput" name="sideApothem"><br>
			<br><button id="calculateButton" onclick="calculatePolygon(0)">Calculate</button>
			`
			,2);
			break;
		
		case 6:
			appendToOperationArea(
			`
			Number of Sides: <input type="number" id="textInput" name="sideCount"><br>
			Length of One Side: <input type="number" id="textInput" name="sideLength"><br>
			Base's Apothem: <input type="number" id="textInput" name="baseApothem"><br>
			Height: <input type="number" id="textInput" name="height"><br>
			<br><button id="calculateButton" onclick="calculatePolygon(1)">Calculate</button>
			`
			,2);
			break;
		
		case 7:
			appendToOperationArea(
			`
			Number of Sides: <input type="number" id="textInput" name="sideCount"><br>
			Length of One Side: <input type="number" id="textInput" name="sideLength"><br>
			Apothem: <input type="number" id="textInput" name="baseApothem"><br>
			<br><button id="calculateButton" onclick="calculatePolygon(2)">Calculate</button>
			`
			,2);
			break;
			
		case 8:
			appendToOperationArea(
			`
			Area: <input type="number" id="textInput" name="area"><br>
			<br><button id="calculateButton" onclick="calculateCircle(0)">Calculate</button>
			`
			,2);
			break;
			
		case 9:
			appendToOperationArea(
			`
			Radius: <input type="number" id="textInput" name="radius"><br>
			<br><button id="calculateButton" onclick="calculateCircle(1)">Calculate</button>
			`
			,2);
			break;
			
		case 10:
			appendToOperationArea(
			`
			Side A: <input type="number" id="textInput" name="side1"><br>
			Side B: <input type="number" id="textInput" name="side2"><br>
			<br><button id="calculateButton" onclick="calculatePythagore(0)">Calculate</button>
			`
			,1);
			break;
		
		case 11:
			appendToOperationArea(
			`
			Hypotenuse: <input type="number" id="textInput" name="hypotenuse"><br>
			Side: <input type="number" id="textInput" name="side"><br>
			<br><button id="calculateButton" onclick="calculatePythagore(1)">Calculate</button>
			`
			,1);
			break;
			
		case 12:
			appendToOperationArea(
			`
			Radius: <input type="number" id="textInput" name="radius"><br>
			Apothem: <input type="number" id="textInput" name="apothem"><br>
			<br><button id="calculateButton" onclick="calculateCircle(2)">Calculate</button>
			`
			,2);
			break;
			
		case 13:
			newOperationArea(
			`
			<button id="calculateButton" onclick="addLinearRegressionInputField()">Add Point</button><br>
			<button id="calculateButton" onclick="calculateLinearRegression()">Calculate</button><hr>
			X: <input type="number" id="textInput" class="xInput"><br>
			Y: <input type="number" id="textInput" class="yInput"><br>
			`
			);
			break;
		
		default:
			console.error("On switch(mode) in main.js: " + mode + " is not a valid mode!");
	}
}
