function handleBotCall (message) {
  if (message == "/topic") {
    return "Ask about the weather";
  } else if (message == "/hint") {
    return "How is the weather?"
  }
}
