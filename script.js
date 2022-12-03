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
            displayIntNumber = ''
        } else {
            displayIntNumber = integerDigit.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigit != null) {
            return `${integerDigit}.${decimalDigit}`
        } else {
            return displayIntNumber
        }

    }
    updateDisplay() {
        // if(isNaN(this.result)){
        //     this.prevCurrentOperandText.innerText = this.currentOperand.toString() + this.previousOperand.toString();
        // }else{
        //     this.prevCurrentOperandText.innerText = this.result;
        //     this.result = undefined;
        // }
        if (this.operation != null) {
            this.prevCurrentOperandText.innerText = `${this.getUpdatedNumber(this.previousOperand)} ${this.operation} ${this.getUpdatedNumber(this.currentOperand)}`;
            console.log("inside operation not null updateDisplay")
        } else {
            this.prevCurrentOperandText.innerText = this.getUpdatedNumber(this.previousOperand) + this.getUpdatedNumber(this.currentOperand);
            console.log("inside updateDisplay")
        }



    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        if(this.currentOperand.toString().length < 15){
        this.currentOperand = this.currentOperand.toString() + number.toString();
        }else{
            // console.log(this.prevCurrentOperandText.classList)
            var error = document.getElementById("error")
            document.getElementById("error").style.display = "flex";
            error.textContent = "Limit Reached..."
            error.style.color = "red"
            document.querySelector("[data-display]").classList.add("pulse");
            // alert("Limit Reached");

        }
    }

    chooseOperation(operation) {
        document.querySelector("[data-display]").classList.remove("pulse");
        document.getElementById("error").style.display = "none";
        if (this.currentOperand === "") return;
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
                computation = prev % curr;
                break
            default: return
        }
        this.currentOperand = computation;
        this.result = computation;
        this.operation = undefined;
        this.previousOperand = "";
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
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('operation selected');
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})
equalButton.addEventListener('click', button => {
    console.log('equal clicked');
    calculator.compute();
    calculator.updateDisplay();
})
allClearButton.addEventListener('click', button => {
    console.log('allclear clicked');
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click', button => {
    console.log('delete clicked');
    calculator.delete();
    calculator.updateDisplay();
})

// Keyboard Events
document.addEventListener('keyup', (e) => {
    if (e.key == 'Enter' || e.key == 'Numenter') {
        console.log(e.key);
        calculator.compute();
        calculator.updateDisplay();
    }
})

