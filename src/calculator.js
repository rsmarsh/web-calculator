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
        this.operatorActive = false;
        this.operator = '';

        this.updateSumDisplay('');
        this.updateAnswerDisplay('')
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
                // TODO: add operator handler
                break;
            case 'action':
                this.handleAction(buttonValue);
                break;
            default: 
                break;

        }
    };

    numberPressed(value) {
        if (!this.operatorActive) {
            this.preOperatorDigits += value;
        } else {
            this.postOperatorDigits += value;
        }

        this.updateSumDisplay(this.preOperatorDigits + this.operator + this.postOperatorDigits);
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
                // TODO: equals support
                break;
            case 'save':
                // TODO: save support
                break;
            default:
                break;
        }
    };

    /**
     * Updates the sum segment of the calculator screen with the value passed to this function
     * @param {String} newValue - the string to display as the current sum
     */
    updateSumDisplay(newValue) {
        const sumDisplay = this.calcNode.querySelector('.sum-value');
        sumDisplay.textContent = newValue;
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