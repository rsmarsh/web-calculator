class Calculator {
    constructor(config) {
        this.addEventListeners(config.calcNode);
    }

    /**
     * This function sets up the event listeners for all the different buttons on the calc
     * 
     * @param {HTMLElement} calcNode - the entire calculator div belonging to this calc instance
     */
    addEventListeners(calcNode) {
        let btnContainer = calcNode.querySelector('.calc-buttons');
        // catch the click when it bubbles up to the parent div
        btnContainer.addEventListener('click', (evt) => {
            console.log(evt.target.value);
        })
        
    }

    /**
     * This function is invoked as a listener to all the buttons within the calculator UI
     * Within here, the intended action is inferred using the current state of the calculator
     * 
     * @param {HTMLElement} button - the button at the source of the click event
     */
    handleButtonClick(button) {
        console.log(button.value);
        console.log(button.dataset);
    }

};

module.exports = Calculator;