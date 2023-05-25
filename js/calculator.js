const calculator = document.querySelector('.container-calculator')
const display = document.querySelector('.numbers-results')
const keys = document.querySelector('.keys')

keys.addEventListener('click', e => {
    if(e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType

        if(!action) {
            calculator.dataset.previousKeyType = 'number'

            if(displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
        }

        if(action === 'decimal') {
            calculator.dataset.previousKeyType = 'decimal'

            if(!displayedNum.includes('.')){
                display.textContent = displayedNum + '.'
            } else if(previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0.'
            }
        }
        
        const calculate = (n1, operator, n2) => {
            const firstNum = parseFloat(n1)
            const secondNum = parseFloat(n2)
            if(operator === 'add') return firstNum + secondNum
            if(operator === 'subtract') return firstNum - secondNum
            if(operator === 'multiply') return firstNum * secondNum
            if(operator === 'divide') return firstNum / secondNum
        }

        if(action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            calculator.dataset.previousKeyType = 'operator'

            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
            
            if(firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue

                calculator.dataset.firstValue = calcValue
            } else {
                calculator.dataset.firstValue = displayedNum
            }
            
            // key.classList.add('is-depressed') //transformar o botão em inativo até que aperte um outro número
            // Array.from(key.parentNode.children)
            //   .forEach(k => k.classList.remove('is-depressed'))
        }

        if(action === 'calculate') {
            calculator.dataset.previousKeyType = 'calculate'

            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayedNum

            if(firstValue) {
                if(previousKeyType === 'calculate'){
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }
                display.textContent = calculate(firstValue, operator, secondValue)
            }
            calculator.dataset.modValue = secondValue
        }

        if(action === 'clear') {
            calculator.dataset.previousKeyType = 'clear'

            if(key.textContent === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
            }
            display.textContent = 0
        }

        if(action === 'signal') {
            calculator.dataset.previousKeyType = 'signal'
            
            if(!displayedNum.includes('-')){
                display.textContent = '-' + displayedNum
            } else {
                display.textContent = displayedNum * (-1)
            }
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