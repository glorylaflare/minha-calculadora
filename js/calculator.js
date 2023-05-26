/*
Lista de funções a serem adicionadas:
- modo noturno funcional
- melhorar paleta de cores do hover e do active no CSS
*/


const calculator = document.querySelector('.container-calculator')
const display = document.querySelector('.numbers-results')
const keys = document.querySelector('.keys')
const operation = document.querySelector('.numbers-operation')

keys.addEventListener('click', e => {
    if(e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const showOperation = operation.textContent
        const previousKeyType = calculator.dataset.previousKeyType

        if(!action) {
            calculator.dataset.previousKeyType = 'number'

            if(displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }

            if(showOperation === '0' || previousKeyType === 'calculate') {
                operation.textContent = keyContent
            } else {
                operation.textContent = showOperation + keyContent
            }
        }

        if(action === 'decimal') {
            calculator.dataset.previousKeyType = 'decimal'

            if(!displayedNum.includes('.')){
                display.textContent = displayedNum + '.'
                operation.textContent = showOperation + '.'

            } else if(previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0.'
                operation.textContent = '0.'
            }
        }
        
        const calculate = (n1, operator, n2) => {
            const firstNum = parseFloat(n1)
            const secondNum = parseFloat(n2)

            const add = firstNum + secondNum
            const sub = firstNum - secondNum
            const mult = firstNum * secondNum
            const divd = firstNum / secondNum

            if(operator === 'add') {
                if(!Number.isInteger(add)){
                    return add.toFixed(2)
                } else {
                    return add
                }
            }
            if(operator === 'subtract') {
                if(!Number.isInteger(sub)){
                    return sub.toFixed(2)
                } else {
                    return sub
                }
            }
            if(operator === 'multiply') {
                if(!Number.isInteger(mult)){
                    return mult.toFixed(2)
                } else {
                    return mult
                }
            }
            if(operator === 'divide') {
                if(!Number.isInteger(divd)){
                    return divd.toFixed(2)
                } else {
                    return divd
                }
            }
        }

        if(action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            calculator.dataset.previousKeyType = 'operator'

            
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            
            if(previousKeyType === 'operator') {
                operation.textContent = showOperation.replace(/.$/, keyContent)
            } else {
                operation.textContent = showOperation + keyContent
            }

            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
            
            if(firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue

                calculator.dataset.firstValue = calcValue
            } else {
                calculator.dataset.firstValue = displayedNum
            }
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

                operation.textContent = calculate(firstValue, operator, secondValue)
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
            operation.textContent = 0
        }

        if(action === 'signal') {
            calculator.dataset.previousKeyType = 'signal'
            
            if(displayedNum !== '0') {
                if(!displayedNum.includes('-')){
                    display.textContent = '-' + displayedNum
                } else {
                    display.textContent = displayedNum * (-1)
                }
            }

            if(showOperation !== '0') {
                if(!showOperation.includes('-')){
                    operation.textContent = '-' + showOperation
                } else {
                    operation.textContent = showOperation * (-1)
                }
            }
        }

        if(action === 'percent') {
            calculator.dataset.previousKeyType = 'percent'

            display.textContent = displayedNum / 100
            operation.textContent = showOperation + "%"
        }
        
        if(action === 'delete'){
            calculator.dataset.previousKeyType = 'delete'

            if(displayedNum !== '0' && displayedNum.length > 1) {
               display.textContent = displayedNum.slice(0, -1)
            } else if (displayedNum.length == 1) {
                display.textContent = 0
            }

            if(showOperation !== '0' && showOperation.length > 1) {
                operation.textContent = showOperation.slice(0, -1)
             } else if (showOperation.length == 1) {
                 operation.textContent = 0
             }
        }
    }
})


/*
clear
signal
percent
delete
decimal
calculate

divide
multiply
subtract
add
*/