const display=document.getElementById("display");

function appendToDisplay(input){
     display.value+=input;
}
function deleteChar(){
    // Remove the last character by slicing the string
    display.value = display.value.slice(0, -1);
}
function clearDisplay(){
    display.value="";
}

function calculate(){
    try{
        //display.value=eval(display.value);  // eval() is in itself a calculator and it can ve very risky as potential thereat 
        display.value=evaluateExpression(display.value);
    }
    catch(error){
        display.value="Error";
    }
}



function evaluateExpression(expression) {
    // Function to get precedence of operators
    function precedence(op) {
        if (op === '+' || op === '-') return 1;
        if (op === '*' || op === '/') return 2;
        return 0;
    }

    // Function to perform the arithmetic operations
    function applyOperation(operand1, operand2, operator) {
        switch (operator) {
            case '+': return operand1 + operand2;
            case '-': return operand1 - operand2;
            case '*': return operand1 * operand2;
            case '/': return operand1 / operand2;
        }
    }

    // Function to convert infix to postfix
    function infixToPostfix(expression) {
        let output = [];
        let operators = [];
        
        for (let i = 0; i < expression.length; i++) {
            let char = expression[i];
            
            // Skip spaces
            if (char === ' ') continue;

            // If the current character is a number (multi-digit numbers are considered)
            if (!isNaN(char)) {
                let num = '';
                while (i < expression.length && !isNaN(expression[i])) {
                    num += expression[i];
                    i++;
                }
                output.push(num);
                i--;
            }
            // If the current character is '(', push it to operators stack
            else if (char === '(') {
                operators.push(char);
            }
            // If the current character is ')', pop from operators stack to output until '(' is found
            else if (char === ')') {
                while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                    output.push(operators.pop());
                }
                operators.pop(); // Remove '('
            }
            // If the current character is an operator
            else {
                while (operators.length > 0 && precedence(operators[operators.length - 1]) >= precedence(char)) {
                    output.push(operators.pop());
                }
                operators.push(char);
            }
        }

        // Pop all remaining operators in the stack
        while (operators.length > 0) {
            output.push(operators.pop());
        }

        return output;
    }

    // Function to evaluate the postfix expression
    function evaluatePostfix(postfix) {
        let stack = [];

        postfix.forEach(token => {
            if (!isNaN(token)) {
                // If the token is a number, push it to the stack
                stack.push(parseInt(token));
            } else {
                // If the token is an operator, pop two numbers from the stack and apply the operator
                let operand2 = stack.pop();
                let operand1 = stack.pop();
                let result = applyOperation(operand1, operand2, token);
                stack.push(result);
            }
        });

        return stack[0];
    }

    //  Convert the infix expression to postfix
    let postfixExpression = infixToPostfix(expression);

    //  Evaluate the postfix expression
    return evaluatePostfix(postfixExpression);
}


//let input = "(3 + 5) * 2 - 8 / 4";
//console.log(evaluateExpression(input));  // Output: 14



