function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    var symbolPriority = {
        '(': 0,
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        ')': 3,
      }
      var stack = [];
      var resStack = [];
      expr = expr.split(' ').join('');
      // debugger;
      for (var i = 0; i < expr.length; i++) {
        if (!isNaN(expr[i])) {
          var number = expr[i];
          while (!isNaN(expr[i+1])) {
            number += expr[i+1];
            i++;
          }
          resStack.push(number);
        }
        else {
          if (!stack.length) {
            if (expr[i] == ')') {
              throw new TypeError('ExpressionError: Brackets must be paired');
            }
            else {
              stack.push(expr[i]);
            }
          }
          else {
            if (expr[i] == ')') {
              if (stack.indexOf('(') != -1) {
                var symbol = stack.pop();
                while (symbol != '(') {
                  resStack.push(symbol);
                  symbol = stack.pop();
                }
              }
              else {
                throw new TypeError('ExpressionError: Brackets must be paired');
              }
            }
            else if (symbolPriority[expr[i]] > symbolPriority[stack[stack.length-1]] || expr[i] == '(') {
              stack.push(expr[i]);
            }
            else if (symbolPriority[expr[i]] <= symbolPriority[stack[stack.length-1]]){
              resStack.push(stack.pop());
              if (symbolPriority[stack[stack.length-1]] == symbolPriority[expr[i]]) {
                resStack.push(stack.pop());
              }
              stack.push(expr[i]);
            }
          }
        }
      }
      if (stack.indexOf('(') != -1) {
        throw new TypeError('ExpressionError: Brackets must be paired');
      }
      while (stack.length) {
        resStack.push(stack.pop());
      }
      var i = 0;
      while (resStack.length != 1) {
        if (isNaN(resStack[i])) {
          var op1 = resStack[i-2];
          var op2 = resStack[i-1];
          switch (resStack[i]) {
            case '+':
              resStack[i] = (parseFloat(op1) + parseFloat(op2));
              break;
            case '-':
              resStack[i] = (parseFloat(op1) - parseFloat(op2));
              break;
            case '*':
              resStack[i] = (parseFloat(op1) * parseFloat(op2));
              break;
            case '/':
              if (op2 == 0) {
                throw new TypeError('TypeError: Division by zero.');
              }
              resStack[i] = (parseFloat(op1) / parseFloat(op2));
              break;
          }
          resStack.splice(i-2, 2);
          i = i - 2;
        }
        i++;
      }
      return resStack.pop();
}

module.exports = {
    expressionCalculator
}