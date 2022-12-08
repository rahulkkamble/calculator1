class Calculator {
    constructor(prevCurrentOperandText) {
        this.prevCurrentOperandText = prevCurrentOperandText;
        this.clear();
    }

    clear() {
        // this.prevCurrentOperandText = '';
        this.currentOperand = "";
        this.previousOperand = "";
        this.result = undefined;
        this.operation = undefined;
        document.querySelector("[data-display]").classList.remove("pulse");
        document.getElementById("error").style.display = "none";
    }

    delete() {
        document.querySelector("[data-display]").classList.remove("pulse");
        document.getElementById("error").style.display = "none";
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    getUpdatedNumber(number) {
        const stringNum = number.toString();
        const integerDigit = parseFloat(stringNum.split('.')[0])
        const decimalDigit = stringNum.split('.')[1]
        let displayIntNumber

        if (isNaN(integerDigit)) {
            // console.log("1111111 integer digit is NaN if satisfied")
            displayIntNumber = " ";
            // console.log(displayIntNumber)
        } else {
            // console.log("0000000 integer digit is a Number")
            displayIntNumber = integerDigit.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigit != null) {
            // console.log(displayIntNumber)
            return `${displayIntNumber}.${decimalDigit}`
        } else {
            return displayIntNumber
        }

    }
    
    appendNumber(number) {
        // console.log("append call by button")
        if (number === "." && this.currentOperand.includes(".")){ 
            // console.log("includes'.' ...inside first if of append")
            return 
        }
        
        if(this.currentOperand.toString().length <= 14){
        this.currentOperand = this.currentOperand.toString() + number.toString();
        }else{
            var error = document.getElementById("error")
            document.getElementById("error").style.display = "flex";
            error.textContent = "Limit Reached..."
            error.style.color = "red"
            document.querySelector("[data-display]").classList.add("pulse");
        }
    }

    chooseOperation(operation) {
        document.querySelector("[data-display]").classList.remove("pulse");
        document.getElementById("error").style.display = "none";
        if (this.currentOperand === "")return
        if (this.currentOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
        // this.appendNumber(operation);
    }

    compute() {
        document.querySelector("[data-display]").classList.remove("pulse");
        document.getElementById("error").style.display = "none";
        let computation;
        let curr = parseFloat(this.currentOperand);
        let prev = parseFloat(this.previousOperand);
        if (isNaN(curr) && isNaN(prev)) return;
        switch (this.operation) {
            case "+":
                computation = prev + curr;
                break
            case "-":
                computation = prev - curr;
                break
            case "*":
                computation = prev * curr;
                break
            case "/":
                computation = prev / curr;
                break
            case "%":
                computation=prev*(curr/100);
                break
            default: return
        }
        this.currentOperand = computation;
        this.result = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }
    updateDisplay() {
        if (this.operation != null) {
            this.prevCurrentOperandText.innerText = `${this.getUpdatedNumber(this.previousOperand)} ${this.operation} ${this.getUpdatedNumber(this.currentOperand)}`;
            // console.log("inside operation not null updateDisplay")
        } else {
            this.prevCurrentOperandText.innerText = this.getUpdatedNumber(this.previousOperand).toString() + this.getUpdatedNumber(this.currentOperand).toString();
            // console.log("operation is null")
        }
    }

}



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-clear-all]');
const prevCurrentOperandText = document.querySelector('[data-display]');
const callEqual = null;

const calculator = new Calculator(prevCurrentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        // console.log("button selected")
        calculator.appendNumber(button.innerText);
        // console.log("calling update display")
        calculator.updateDisplay();
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // console.log('operation selected');
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})
equalButton.addEventListener('click', button => {
    // console.log('equal clicked');
    calculator.compute();
    calculator.updateDisplay();
})
allClearButton.addEventListener('click', button => {
    // console.log('allclear clicked');
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click', button => {
    // console.log('delete clicked');
    calculator.delete();
    calculator.updateDisplay();
})

// Keyboard Events
// document.addEventListener('keyup', (e) => {
//     if (e.key == 'Enter' || e.key == 'Numenter') {
        // console.log(e.key);
//         calculator.compute();
//         calculator.updateDisplay();
//     }
// })

