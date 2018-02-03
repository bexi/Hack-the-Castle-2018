function Topic (starter, question, answers) {
  this.starter = starter;
  this.question = question;
  this.answers = answers;
}

var weather = new Topic("Ask about the weather", "How is the weather?", "It is sunny");
var age = new Topic("Ask about the age", "How old are you?", "I am xx years old");
var namn = new Topic("Ask about the name", "What is your name?", "My name is xx");

var topics = [weather, age, namn];

var activeTopic = null;

function handleBotCall (message) {
  if (message == "/topic") {
    activeTopic = getNextTopic();
    return activeTopic.starter;
  } else if (message == "/hint") {
    return activeTopic.question;
  } else {
    return "";
  }
}

function getNextTopic () {
  if (activeTopic == null) {
    return topics[0];
  } else {
    var index = topics.indexOf(activeTopic);
    if (index == topics.length - 1) {
      return topics[0];
    } else {
      return topics[index+1];
    }
  }
}
