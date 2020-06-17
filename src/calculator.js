class Calculator {
    constructor(config) {
       
        this.calcNode = config.calcNode;

        this.resetCalculator();
        this.addEventListeners();

    }

    /**
     * This function both resets and initlaises the calculator vars, back to their inital state
     */
    resetCalculator() {
        this.preOperatorDigits = '';
        this.postOperatorDigits = '';
        this.answerDigits = '';
        this.operatorName = '';
        this.operatorActive = false;
        this.inAnswerState = false; //the state after pressing equals, further presses will begin the next sum

        this.updateSumDisplay('');
        this.updateAnswerDisplay('');
    }

    /**
     * This function sets up the event listeners for all the different buttons on the calc
     */
    addEventListeners() {
        let btnContainer = this.calcNode.querySelector('.calc-buttons');
        // catch the click when it bubbles up to the parent div
        btnContainer.addEventListener('click', (evt) => {
            this.handleButtonClick(evt.target);
        })
        
    }

    /**
     * This function is invoked as a listener to all the buttons within the calculator UI
     * Within here, the intended action is inferred using the current state of the calculator
     * 
     * @param {HTMLElement} button - the button at the source of the click event
     */
    handleButtonClick(button) {
        const buttonType = button.dataset.btnType;
        const buttonValue = button.value;

        switch(buttonType) {
            case 'number':
                this.numberPressed(buttonValue);
                break;
            case 'operator': 
                this.handleOperator(buttonValue);
                break;
            case 'action':
                this.handleAction(buttonValue);
                break;
            default: 
                break;

        }
    };

    /**
     * As each number is pressed, a string of numbers is built up until the desired sum is written
     * 
     * @param {String} value - the button's value as taken from the DOM element 
     */
    numberPressed(value) {

        if (!this.operatorActive) {
            this.preOperatorDigits += value;
        } else {
            this.postOperatorDigits += value;
        }

        this.updateSumDisplay();
    };

    /**
     * Convert a word-based operator into the mathmatical symbol
     */
    getOperatorSymbol() {
        switch(this.operatorName) {
            case 'add':
                return '+'
            case 'divide':
                return '÷';
            case 'multiply':
                return 'x';
            case 'subtract':
                return '-';
            default: 
                return '';
        }
    };

    /**
     * This function is invoked when any of the 4 operators are pressed
     * The calculators state is updated to start entering any subsequent numbers into the second half of the sum
     * @param {String} operator - word representation of the operator which was selected
     */
    handleOperator(operator) {

        // is the user creating a new sum from the answer of the previous one
        if (this.inAnswerState) {
            let retainValue = '';
            // if the previous answer was an error, it will not retain any of the old values
            if (!isNaN(this.answerDigits)) {
                retainValue = String(this.answerDigits); 
            }
            
            this.resetCalculator();

            // the previous answer becomes the new pre-digits
            this.preOperatorDigits = retainValue;
            this.inAnswerState = false;

        }

        this.operatorName = operator;
        this.operatorActive = true;

        this.updateSumDisplay();
    };

    /**
     * Once established that an action button was pressed, this function determines and initiates the action
     * 
     * @param {String} action - the action name as stored within the DOM "value" 
     */
    handleAction(action) {

        switch(action) {
            case 'clear':
                this.resetCalculator();
                break;
            case 'equals':
                this.inAnswerState = true;
                this.answerDigits = this.evaluateSum();
                this.updateAnswerDisplay(this.answerDigits);
                break;
            case 'save':
                // TODO: save support
                break;
            default:
                break;
        }
    };

    /**
     * Attempt to run the calculation which was input by the user
     * @returns {Number|String} This will either return a valid number, or an error message
     */
    evaluateSum() {
        let answer;
        const errorMessage = 'Invalid Entry';
                
        // if an operator was not selected, display the same value as the answer
        if (!this.operatorActive) {
            answer = Number(this.preOperatorDigits);
            return isNaN(answer) ? errorMessage : answer;
        }

        // catch blank string values before they are coerced to 0's
        if (this.preOperatorDigits === '' || this.postOperatorDigits === '') {
            return errorMessage;

        }

        // check that each side of the operator contains a valid number
        let firstNumber = Number(this.preOperatorDigits);
        let secondNumber = Number(this.postOperatorDigits);
        if (isNaN(firstNumber) || isNaN(secondNumber)) {
            return errorMessage;
        }
        
        // convert operator string into real math operations
        switch(this.operatorName) {
            case 'add':
                answer = firstNumber + secondNumber;
                break;
            case 'subtract':
                answer = firstNumber - secondNumber;
                break;
            case 'multiply':
                answer = firstNumber * secondNumber;
                break;
            case 'divide':
                answer = firstNumber / secondNumber;
                break
            default:
                return errorMessage;
        }

        // final sanity check for an invalid number result before continuing
        if (isNaN(answer)) {
            return errorMessage;
        }

        return answer;
    };

    /**
     * Updates the sum segment of the calculator screen with the current sum or custom message
     * @param {String} overrideValue - the string to display instead of the current sum, for errors and messages
     */
    updateSumDisplay(overrideValue) {
        const sumDisplay = this.calcNode.querySelector('.sum-value');
        let displayValue;

        // prioritise a custom message if one is provided
        if (typeof overrideValue !== 'undefined') {
            displayValue = overrideValue;
        } else {
            displayValue = this.preOperatorDigits + this.getOperatorSymbol() + this.postOperatorDigits;
        }
        
        sumDisplay.textContent = displayValue;
    };

     /**
     * Updates the answer/result segment of the calculator screen with the value passed to this function
     * @param {String} newValue - the string to display on the screen as the answer
     */
    updateAnswerDisplay(newValue) {
        const answerDisplay = this.calcNode.querySelector('.answer-value');
        answerDisplay.textContent = newValue;

    };

};

module.exports = Calculator;