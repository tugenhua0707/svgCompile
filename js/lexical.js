function lexical (code) {
  return code.split(/\s+/)
          .filter(function(t) {
            return t.length > 0
          }).map(function(t) {
            console.log(t);
            return isNaN(t) ? {type: 'word', value: t} : {type: 'number', value: t}
          });
}