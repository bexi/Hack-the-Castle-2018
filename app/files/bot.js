// The bot functionality

// A topic has some set values for the hints that the bot can give
function Topic (starter, question, answers) {
  this.starter = starter;
  this.question = question;
  this.answers = answers;
}

// The topics
var weather = new Topic("Ask about the weather", "How is the weather?", "It is sunny");
var age = new Topic("Ask about the age", "How old are you?", "I am xx years old");
var namn = new Topic("Ask about the name", "What is your name?", "My name is xx");
var topics = [weather, age, namn];

var activeTopic = null;

// Handles the different bot commands and returns an answer
function handleBotCall (message) {
  if (message == "/topic") {
    activeTopic = getNextTopic();
    if (activeTopic != null) {
      return activeTopic.starter;
    }
  } else if (message == "/hintq" && activeTopic != null) {
    return activeTopic.question;
  } else if (message == "/hinta" && activeTopic != null) {
    return activeTopic.answers;
  } else {
    return "";
  }
}

// Returns the next topics in the topic list
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
