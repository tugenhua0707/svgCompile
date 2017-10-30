
function svgCompile(code) {
  return generator(transformer(parser(lexical(code))));
}



