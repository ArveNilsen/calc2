class CalcModel {
	constructor() {
		this.view = null;
		this.operand1 = 0;
		this.operand2 = 0;
		this.operator = null;
		this.currentOperand = 1;
	}

	registerView(view) {
		this.view = view;
	}

	toggleSign() {
		if (this.currentOperand === 1)
			this.operand1 *= -1;
		else
			this.operand2 *= -1;
		this.notifyDisplay();
	}

	percent() {
		if (this.currentOperand == 1)
			this.operand1 /= 100;
		else
			this.operand2 /= 100;
		this.notifyDisplay();
	}

	buildOperand(c) {
		if (this.currentOperand === 1) {
			this.operand1 = this.operand1 * 10 + Number(c);
		}

		if (this.currentOperand === 2) {
			this.operand2 = this.operand2 * 10 + Number(c);
		}
		
		this.notifyDisplay();
	}

	notifyDisplay() {
		if (this.view === null) return;
		if (this.currentOperand === 1)
			this.view.setDisplay(this.operand1);
		else
			this.view.setDisplay(this.operand2);
	}

	setDisplay(result) {
		if (this.view === null) return;
		this.view.setDisplay(result);
	}

	setOperator(op) {
		if (op === "+")
			this.operator = "+";
		if (op === "-")
			this.operator = "-";
		if (op === "*")
			this.operator = "*";
		if (op === "/")
			this.operator = "/";
		this.notifyOperatorSet(op);
	}

	notifyOperatorSet(op) {
		if (this.currentOperand === 1) {
			this.currentOperand = 2;
		} else {
			const result = this.calculate();
			this.operator = op;
		}
	}

	reset() {
		this.operand1 = 0;
		this.operand2 = 0;
		this.operator = null;
		this.currentOperand = 1;

		this.notifyDisplay();
	}

	calculate() {
		let result;
		if (this.operator === null) {
			result = this.operand1;
		}
		if (this.operator === "+") {
			result = this.operand1 + this.operand2
		}
		if (this.operator === "-") {
			result = this.operand1 - this.operand2
		}
		if (this.operator === "*") {
			result = this.operand1 * this.operand2
		}
		if (this.operator === "/") {
			if (this.operand2 === 0 || this.operand1 === 0)
				result = 0;
			else {
				result = this.operand1 / this.operand2
			}
		}
		this.reset();
		this.operand1 = result;
		this.currentOperand = 2;
		this.setDisplay(result);
	}
}

class CalcController {
	constructor(model, view) {
		this.model = model;
		
		const buttons = document.querySelectorAll(".div-btn");
		buttons.forEach((button) => 
			button.addEventListener("click", this.handleClick.bind(this)));
	}

	handleClick(event) {
		this.processInput(event.target.innerText);
	}

	processInput(action) {
		switch(action) {
			case "AC":
				this.model.reset();
				break;
			case "+/-":
				this.model.toggleSign();
				break;
			case "%":
				this.model.percent();
				break;
			case "=":
				this.model.calculate();
				break;
			case "+":
				this.model.setOperator("+");
				break;
			case "-":
				this.model.setOperator("-");
				break;
			case "*":
				this.model.setOperator("*");
				break;
			case "/":
				this.model.setOperator("/");
				break;
			case ",":
				alert("Support for floating point maths is for PRO subscribers only!");
				break; // TODO: Implement support for floating points.
			default:
				this.model.buildOperand(action);
				break;
		}
	}
}

class CalcView {
	constructor() {
		this.displayRef = document.querySelector(".display");
	}

	setDisplay(result) {
		this.displayRef.innerText = result;
	}
}

export { CalcModel, CalcController, CalcView };
