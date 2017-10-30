function transformer(ast) {
  var svg_ast = {
    tag: 'svg',
    attr: {
      width: 100,
      height: 100,
      viewBox: '0 0 100 100',
      xmlns: 'http://www.w3.org/2000/svg',
      version: '1.1'
    },
    body: []
  };
  var pen_color = 100; // 笔的颜色默认为黑色
  // 循环调用ast表达式
  while (ast.body.length > 0) {
    // 依次取出数组的第一个元素，然后在数组中删除该元素
    var node = ast.body.shift();
    switch (node.name) {
      case 'Paper' :
        var paper_color = 100 - node.arguments[0].value;
        // 在svg_ast的body内加入rect元素信息
        svg_ast.body.push({
          tag: 'rest',
          attr: {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            fill: 'rgb(' + paper_color + '%,' + paper_color + '%,' + paper_color + '%)'
          }
        })
        break;

      case 'Pen' :
        pen_color = 100 - node.arguments[0].value;
        break;

      case 'Line' : 
        svg_ast.body.push({
          tag: 'line',
          attr: {
            x1: node.arguments[0].value,
            y1: node.arguments[1].value,
            x2: node.arguments[2].value,
            y2: node.arguments[3].value,
            'stroke-linecap': 'round',
            stroke: 'rgb(' + pen_color + '%,' + pen_color + '%,' + pen_color + '%)'
          }
        });
        break;
    }
  }
  return svg_ast;
}