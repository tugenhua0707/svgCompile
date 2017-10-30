function parser(tokens) {
  var AST = {
    type: 'Drawing',
    body: []
  };
  // 循环依次取出第一个元素，然后删除第一个元素
  while (tokens.length > 0) {
    var currentItem = tokens.shift();
    // 判断类型，如果是单词的话，我们就分析它的语法
    if (currentItem.type === 'word') {
      switch(currentItem.value) {
        case 'Paper' :
          var expression = {
            type: 'CallExpression',
            name: 'Paper',
            arguments: []
          }; 
          // 继续数组中字段的类型
          var nextItem = tokens.shift();
          if (nextItem.type === 'number') {
            // 在expression对象内部加入参数信息
            expression.arguments.push({
              type: 'NumberLiteral',
              value: nextItem.value
            })
            // 将expression对象放入我们的AST的body内
            AST.body.push(expression);
          } else {
            throw 'Paper command must be followed by a number.'
          }
          break;
        case 'Pen' : 
          var expression = {
            type: 'CallExpression',
            name: 'Pen',
            arguments: []
          };
          var nextItem = tokens.shift();
          if (nextItem.type === 'number') {
            expression.arguments.push({
              type: 'NumberLiteral',
              value: nextItem.value 
            })
            // 将expression对象放入我们的AST的body内
            AST.body.push(expression);
          } else {
            throw 'Pen command muse be followed by a number.'
          }
          break;
        case 'Line': 
          var expression = {
            type: 'CallExpression',
            name: 'Line',
            arguments: []
          };
          // 如果当前的token的类型是line
          for (var i = 0; i < 4; i++) {
            var nextItem = tokens.shift();
            if (nextItem.type === 'number') {
              expression.arguments.push({
                type: 'NumberLiteral',
                value: nextItem.value 
              })
            } else {
              throw 'Line command must be followed by 4 numbers.';
            }
          }
          // 将expression对象放入我们的AST的body内
          AST.body.push(expression);
          break;
      }
    }
  }
  return AST;
}