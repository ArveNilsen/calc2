import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import { CalcModel, CalcController, CalcView } from "./CalcMVC.mjs";

describe("a model", () => {
	let model;

	beforeEach(() => {
		model = new CalcModel();
	})

	it("starts empty", () => {
		assert(model.operand1 === 0 && model.operand2 === 0 && 
			model.operator === null && model.currentOperand === 1);
	})

	it("can reset", () => {
		model.operand1 = 2;
		model.operand2 = 2;
		model.operator = "+";
		model.currentOperand = 2;

		model.reset();

		assert(model.operand1 === 0 && model.operand2 === 0 && 
			model.operator === null && model.currentOperand === 1);
	})

	it("can toogle the signage of operand 1 from pos to neg", () => {
		model.operand1 = 10;
		model.currentOperand = 1;

		model.toggleSign();

		assert(model.operand1 === -10);
	})

	it("can toogle the signage of operand 1 from neg to pos", () => {
		model.operand1 = -10;
		model.currentOperand = 1;

		model.toggleSign();

		assert(model.operand1 === 10);
	})

	it("can toogle the signage of operand 2 from pos to neg", () => {
		model.operand2 = 10;
		model.currentOperand = 2;

		model.toggleSign();

		assert(model.operand2 === -10);
	})

	it("can toogle the signage of operand 2 from neg to pos", () => {
		model.operand2 = -10;
		model.currentOperand = 2;

		model.toggleSign();

		assert(model.operand2 === 10);
	})

	it("can transform operand1 with percent", () => {
		model.operand1 = 15;
		model.currentOperand = 1;

		model.percent();

		assert(model.operand1 === 0.15);
	})
	
	it("can transform operand2 with percent", () => {
		model.operand2 = 25;
		model.currentOperand = 2;

		model.percent();

		assert(model.operand2 === 0.25);
	})

	it("can build operand1 from 0 with 1 digit", () => {
		model.buildOperand("4");
		assert(model.operand1 === 4);
	})

	it("can build operand1 from 0 with multiple digits", () => {
		model.buildOperand("2");
		model.buildOperand("4");
		model.buildOperand("6");
		assert(model.operand1 === 246);
	})
	
	it("can build operand2 from 0 with 1 digit", () => {
		model.currentOperand = 2;
		model.buildOperand("4");
		assert(model.operand2 === 4);
	})

	it("can build operand2 from 0 with multiple digits", () => {
		model.currentOperand = 2;
		model.buildOperand("2");
		model.buildOperand("4");
		model.buildOperand("6");
		assert(model.operand2 === 246);
	})
})

describe("a controller", () => {
	let model;
	let controller;

	beforeEach(() => {
		model = new CalcModel();
		controller = new CalcController(model);
	})

	it("can reset the model", () => {
		model.operand1 = 2;
		model.operand2 = 2;
		model.operator = "+";
		model.currentOperand = 2;

		controller.processInput("AC");

		assert(model.operand1 === 0 && model.operand2 === 0 && 
			model.operator === null && model.currentOperand === 1);
	})
})

