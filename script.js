document.addEventListener('DOMContentLoaded', function() {
    
    let prompt = document.querySelector("#prompt");
    let Container = document.querySelector(".container");
    let btn = document.querySelector("#btn");
    let chatContainer = document.querySelector(".chat-container");
    let userMessage = null;
    let Api_Url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCRCFSB6NMrcZMWmL_NMivkOIyoE5Jl0x8";
  
    function createChatbox(html, className) {
      let div = document.createElement("div");
      div.classList.add(className);
      div.innerHTML = html;
      return div;
    }
    async function getApiResponse(aiChatbox) {
        try{
            let response=await fetch(Api_Url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
            body: JSON.stringify({ 
                contents: [{
                    "role": "user",
                    parts: [{ text: userMessage }]
                }]
            })
        });
        let data = await response.json();
        let apiResponse = data ? data.candidates[0].content.parts[0].text : "";
        aiChatbox.querySelector(".text").innerText = apiResponse;
        console.log(apiResponse);
    
        
    }catch(error){
            console.log(error);

        }
        finally{
            aiChatbox.querySelector(".loading").style.display = "none";
        }
    }
    
    function showLoading() {
      let html = ` <div class="img"> 
            <img src="ai.png" alt="" width="50"height="70">
        </div>
            <p class="text"></p>
                <img class="loading" src="loading.gif" alt="loading"height="50">`
                let aiChatbox = createChatbox(html, "ai-chat-box");
                chatContainer.appendChild(aiChatbox);
                getApiResponse(aiChatbox);
    }
  
    btn.addEventListener('click', () => {
      userMessage = prompt.value;
      if(userMessage==""){
        Container.style.display="flex";
      }{
        Container.style.display="none";

      }     
       if (!userMessage) return;
        let html = `<div class="img">
         <img src="image.png.png" alt="" width="50"> 
        </div>
        <p class="text"></p>`;
        let userChatbox = createChatbox(html, "user-chatbox");
        // ... rest of your code
        userChatbox.querySelector(".text").innerText = userMessage;
        chatContainer.appendChild(userChatbox);
        prompt.value = ""; // Clear the input field after sending the message
        setTimeout(showLoading,500)
      }
    );
})
  ;