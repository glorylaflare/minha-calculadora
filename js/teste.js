const display = document.querySelector('.numbers-operation')
const result = document.querySelector('.numbers-results')

keys.addEventListener('click', e => {
    if(e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType

        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const secondValue = displayedNum

        if(!action) {
            if(displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
        }

        if(action === 'decimal') {
            if(!displayedNum.includes('.')){
                display.textContent = displayedNum + '.'
            } else if(previousKeyType === 'operator') {
                display.textContent = '0.'
            }
        
            calculator.dataset.previousKeyType = 'decimal'
        }



        if(action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            if(firstValue && operator) {
                result.textContent = calculate(firstValue, operator, secondValue)
            }

            // key.classList.add('is-depressed') //transformar o botão em inativo até que aperte um outro número
            // display.textContent = displayedNum + keyContent
            
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = display
            calculator.dataset.operator = action
        }

        // Array.from(key.parentNode.children)
        //   .forEach(k => k.classList.remove('is-depressed'))

        if(firstValue && operator && previousKeyType !== 'operator') {
            result.textContent = calculate(firstValue, operator, secondValue)
        }

        if(action === 'calculate') {
            result.textContent = calculate(firstValue, operator, secondValue)
        }

        const calculate = (n1, operator, n2) => {
            const firstNum = parseFloat(n1)
            const secondNum = parseFloat(n2)
            if(operator === 'add') return firstNum + secondNum
            if(operator === 'subtract') return firstNum - secondNum
            if(operator === 'multiply') return firstNum * secondNum
            if(operator === 'divide') return firstNum / secondNum
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