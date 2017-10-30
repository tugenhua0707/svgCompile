function generator(svg_ast) {
  /*
   从attr 对象中创建属性字符串
   {"width": 100, "height": 100} => 'width="100"  height="100"'
  */
  function createAttrString(attr) {
    return Object.keys(attr).map(function(key) {
      return key + '="'+attr[key]+'"'
    }).join(' ');
  }
  // 为svg标签创建属性字符串
  var svg_attr = createAttrString(svg_ast.attr);

  // width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1"
  // console.log(svg_attr);  

  // 为每个 svg_ast body中的元素，生成svg标签
  var elements = svg_ast.body.map(function(node) {
    return '<' + node.tag + ' ' + createAttrString(node.attr) + '></' + node.tag + '>'
  }).join('\n\t');
  // 使用开和关的svg标签包装来完成svg代码
  return '<svg '+ svg_attr +'>\n' + elements + '\n</svg>'
}