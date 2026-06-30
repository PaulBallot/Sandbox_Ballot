Qualtrics.SurveyEngine.addOnload(function()
{
  const chatBox = document.getElementById("chat-box");
  const input = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");
  const resetButton = document.getElementById("Reset-button");
  const submitButton = document.getElementById("submit-button");
  const start = Date.now();
 // itemNR needs to be adapted for every unique item, otherwise it will overwrite existing files!
 // Also: You need to setup a "x_Lead" and "x_ConversationHistory" variable in qualtrics for every item.
  var itemNr = 1; 
  var ResetCounter = 0;
  var canPlaySound = true;
  let historiesArray = [];
  var systemMessage = Qualtrics.SurveyEngine.getEmbeddedData('AI_Prompt');
  var conversationHistory = [
    {"role": "system", "content": systemMessage},
];
this.hideNextButton();
	
  function parseMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code style="background-color: #f1f1f1; padding: 2px 4px; border-radius: 3px; font-family: monospace;">$1</code>')
      .replace(/\n/g, '<br>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color: #1976d2; text-decoration: none;">$1</a>')
      .replace(/^### (.*$)/gm, '<h3 style="margin: 10px 0 5px 0; font-size: 16px;">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 style="margin: 10px 0 5px 0; font-size: 18px;">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 style="margin: 10px 0 5px 0; font-size: 20px;">$1</h1>')
      .replace(/^[\-\*] (.+)$/gm, '<li style="margin-left: 20px;">$1</li>')
      .replace(/(<li.*?<\/li>\s*)+/g, '<ul style="margin: 5px 0; padding-left: 0;">$&</ul>');
  }

  function appendMessage(sender, text) {
    const messageDiv = document.createElement("div");
    console.log("appendMessage called:", sender, text);
    messageDiv.style.margin = "5px 0";
    messageDiv.style.padding = "10px";
    messageDiv.style.borderRadius = "15px";
    messageDiv.style.maxWidth = "90%";
    messageDiv.style.wordWrap = "break-word";
    messageDiv.style.display = "inline-block";

    if (sender === "user") {
      messageDiv.style.backgroundColor = "#dcf8c6";
      messageDiv.style.alignSelf = "flex-end";
      messageDiv.style.marginLeft = "auto";
      conversationHistory.push({ role: "user", content: text });
      messageDiv.textContent = text;
    } else {
      messageDiv.style.backgroundColor = "#e4e6eb";
      messageDiv.style.marginRight = "auto";
      conversationHistory.push({ role: "assistant", content: text });
      RemoveResponseInProcess();
      const parsedText = parseMarkdown(text);
      messageDiv.innerHTML = parsedText;
    }

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

function ResponseInProcess() {
  disableSend();
	  const process = document.createElement("div");
	  process.className = "response-in-progress";
	  process.style.fontSize = "12px";
	  process.style.color = "#888";
	  process.style.marginTop = "2px";
	  process.style.display = "block";
	  process.textContent = "Waiting for Response";
	  process.style.marginRight = "auto";
	  chatBox.appendChild(process);
	  chatBox.scrollTop = chatBox.scrollHeight;
	  TypingAnimation(process);
}

	
function RemoveResponseInProcess() {
  const processMessages = chatBox.querySelectorAll(".response-in-progress");
  processMessages.forEach(msg => {
    if (msg.dataset.intervalId) {
      clearInterval(Number(msg.dataset.intervalId));
    }
    chatBox.removeChild(msg);
  });
  enableSend();
}
	
function disableSend() {
  input.disabled = true;
  sendButton.disabled = true;
  input.placeholder = "Chat disabled.";
}

function enableSend() {
  input.disabled = false;
  sendButton.disabled = false;
  input.placeholder = "Type your message...";
}	

	

	
function delaySubmit() {
	//submitButton.disabled = true;
	//setTimeout(() => {submitButton.disabled = false;}, 60000);
	setTimeout(() => {submitButton.style.background='#0B6DE0';}, 60000); //hover colour: #04AA6D
}
delaySubmit();


function TypingAnimation(process) {
const typingStates = ["Waiting for Response.", "Waiting for Response..", "Waiting for Response...", "Waiting for Response"];
    var index = 0;
    const animationInterval = 500; // in ms
    const typingInterval = setInterval(() => {
      process.textContent = typingStates[index];
      index = (index + 1) % typingStates.length;
    }, animationInterval);
	process.dataset.intervalId = typingInterval;
}

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    window.sendMessage();
  }
});
		
	
// Message Check Function
	
	function CheckMessage(LLMresponse, callback) {
  var apiKey = Qualtrics.SurveyEngine.getEmbeddedData('OpenRouterAPIKey');
  var OR_model = Qualtrics.SurveyEngine.getEmbeddedData('setModel');
  var EvaluationPrompt = Qualtrics.SurveyEngine.getEmbeddedData('EvaluationPrompt');
  var xhr = new XMLHttpRequest();
  var CheckPrompt = EvaluationPrompt.replace('{{message_text}}', LLMresponse);

  console.log("Check called; Prompt: " + CheckPrompt);
  xhr.open("POST", "https://openrouter.ai/api/v1/chat/completions");
  xhr.timeout = 300000;
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer " + apiKey);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        try {
          var response = JSON.parse(xhr.responseText);
          var CheckResult = response.choices[0].message.content.trim();
          callback(CheckResult); // use callback here
        } catch (e) {
          console.error("Error parsing response:", e);
        }
      } else {
        console.error("Check error:", xhr.responseText);
      }
    }
  };

  xhr.ontimeout = function () {
    console.error("Check request timed out");
  };

  var data = JSON.stringify({
    model: OR_model,
    messages: [
      { role: "user", content: CheckPrompt }
    ]
  });

  xhr.send(data);
}
	
	
// End Check Function
	

  // Costello et al. Function
function sendChatToOpenRouter(systemMessage, userMessage, onSuccess, onError) {
  console.log("sendChatToOpenRouter called");
  const apiKey = Qualtrics.SurveyEngine.getEmbeddedData('OpenRouterAPIKey');
  const OR_model = Qualtrics.SurveyEngine.getEmbeddedData('setModel');
  var attemptLimit = 5
  var currentAttempt = 0
  function attempt() {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://openrouter.ai/api/v1/chat/completions");
  xhr.timeout = 300000;
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer " + apiKey);

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      try {
        const gptResponse = JSON.parse(xhr.responseText).choices[0].message.content;
        CheckMessage(gptResponse, function (CheckResult) {
		console.error("Error:", CheckResult);
          if(CheckResult === "NO"){
			  onSuccess("bot", gptResponse)
		  } else {
			currentAttempt ++;
			if (currentAttempt < attemptLimit){   
		    attempt();}
		  }

        });
      } catch (e) {
        console.error("Error parsing response:", e);
        onError("Failed to parse response");
      }
    } else {
      console.error("Error from OpenAI:", xhr.responseText);
      Qualtrics.SurveyEngine.setEmbeddedData('GPTResponse', 'Error ' + xhr.status);
      onError("bot1", "Error: " + xhr.status);
    }
  };

  xhr.ontimeout = function () {
    console.error("Request timed out");
    onError("Request timed out");
    ['loadingSpinner', 'loadingMessage'].forEach(id =>
      document.getElementById(id).style.display = 'none'
    );
    document.getElementById('finishedMessage').style.display = 'block';
    document.querySelector('.NextButton').style.display = '';
  };

  xhr.send(JSON.stringify({ model: OR_model, messages: conversationHistory }));
  }
	attempt();
}

	
// Functions for Buttons
	
sendButton.addEventListener("click", function () {
  window.sendMessage();
});

resetButton.addEventListener("click", function () {
  window.Reset();
});

submitButton.addEventListener("click", function () {
  window.Submit();
});
	
window.Reset = function()	{	
 document.getElementById("chat-box").innerHTML = "";
 input.value = "";
 historiesArray.push({
    Conversation_number: ResetCounter,
    history: JSON.parse(JSON.stringify(conversationHistory))});
 conversationHistory = [{"role": "system", "content": systemMessage},];
 ResetCounter++; 
 console.log("HistorySaved:", JSON.stringify(conversationHistory));
 enableSend();
}	

window.Submit = function()	{
let ms = Date.now() - start;
if (ms < 60000) {
	alert("Please interact with the Chatbot for at least 60 seconds.")
}
else {
	
let confirmation = confirm("Do you really want to end the conversation and proceed?");
if (confirmation) {
historiesArray.push({Conversation_number: ResetCounter, history: JSON.parse(JSON.stringify(conversationHistory))});
Qualtrics.SurveyEngine.setEmbeddedData(itemNr + '_ConversationHistory', JSON.stringify(historiesArray));
var nextButton = document.querySelector('.NextButton');
nextButton.click();
}}}
	

  window.sendMessage = function () {
    let userText = input.value.trim();
    if (userText === "") return;
    input.value = "";
    appendMessage("user", userText);
	setTimeout(function (){
    ResponseInProcess();         
    }, 250);
    sendChatToOpenRouter(systemMessage, userText, appendMessage, function (error) {
  console.error("Chat error:", error);
}); 
  }; 

});

Qualtrics.SurveyEngine.addOnReady(function()
{

});

Qualtrics.SurveyEngine.addOnUnload(function()
{

});