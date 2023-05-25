const calculatorResults = document.querySelector('.results')
const keysEvent = document.querySelector('.keys')

keysEvent.addEventListener('click', e => {
    if(e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action

        if(!action) {
            console.log('number key!')
            calculatorResults.dataset.previousKey = 'number'
        } 

        if(action === 'add' || action === 'subtract' || action === 'divide' || action === "multiply") {
            console.log('operation key!')
            calculatorResults.dataset.previousKey = 'operator'
        }

        if(action === 'clear') {
            console.log('clear key!')
            calculatorResults.dataset.previousKey = 'clear'
        }

        if(action === 'signal') {
            console.log('change signal key!')
            calculatorResults.dataset.previousKey = 'signal'
        }

        if(action === 'percent') {
            console.log ('percentage key!')
            calculatorResults.dataset.previousKey = 'percent'
        }

        if(action === 'return') {
            console.log('return key!')
            calculatorResults.dataset.previousKey = 'return'
        }

        if(action === 'decimal') {
            console.log('decimal key!')
            calculatorResults.dataset.previousKey = 'decimal'
        }

        if(action === 'calculate') {
            console.log('equal key!')
            calculatorResults.dataset.previousKey = 'calculate'
        }
    }
})


/*
clear
signal
percent
return
decimal
calculate

divide
multiply
subtract
add
*/