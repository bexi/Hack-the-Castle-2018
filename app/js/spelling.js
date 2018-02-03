
var dict = new nodehun(affbuf,dictbuf);
function checkSpelling(msg){
  var suggestions = {};
  var splits = msg.split(" ");
  
  //splits.forEach(x => dict.spellSuggestions(x,function(err, correct, sug, origWord){
  //  suggestions.push(sug);
  //}));
 
  return dict;
} 