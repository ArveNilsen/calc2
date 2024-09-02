import { CalcModel, CalcController, CalcView } from "./CalcMVC.mjs";

const calcView = new CalcView();
const calcModel = new CalcModel();
calcModel.registerView(calcView);
const calcController = new CalcController(calcModel);

function testCalcModelInit() {
	const results = [];
	const testObj = new CalcModel();
	results.push(testObj.operand1 === 0);	
	results.push(testObj.operand2 === 0);	
	results.push(testObj.operator === null);	
	results.push(testObj.currentOperand === 1);	

	return results.every(e => e === true);
}

function testReset() {
	const testObj = new CalcModel();
	testObj.operand1 = 1;
	testObj.operand2 = 1;
	testObj.operator = "+";
	testObj.currentOperand = 2;
	testObj.reset();

	return testCalcModelInit();
}

function testInsertFirstNumber() {
	const testObj = new CalcModel();
	testObj.processInput("1");
	return testObj.operand1 === 1;
}

//console.log(testCalcModelInit());
//console.log(testReset());
//console.log(testInsertFirstNumber());

