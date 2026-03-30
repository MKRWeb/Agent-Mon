// Freeze logic map to prevent runtime tampering
const monadLogic = Object.freeze({
  keywordMap: {
    // --- MONAD CORE LORE & TECH ---
    "what is monad": "Monad is a highly optimized, EVM-compatible Layer 1 blockchain designed to process 10,000 transactions per second (TPS) with 1-second block times and single-slot finality.",
    "tps": "Monad achieves a blistering 10,000 TPS (Transactions Per Second). We do this by fundamentally optimizing the execution layer while maintaining full EVM compatibility.",
    "parallel evm": "Parallel EVM is our secret weapon. Instead of processing transactions one by one, Monad identifies independent transactions and executes them simultaneously, maximizing throughput without breaking Ethereum compatibility.",
    "founders": "The architects of the Monad network are Keone Hon, James Hunsaker, and Eunice Giarta. They bring deep expertise from high-frequency trading and scalable systems.",
    "founder": "Monad was founded by Keone Hon, James Hunsaker, and Eunice Giarta, combining traditional finance engineering with decentralized architecture.",
    "keone": "Keone Hon is the CEO and co-founder of Monad Labs. Before Monad, he spent 8 years at Jump Trading leading a high-frequency trading team.",
    "james": "James Hunsaker is the CTO and co-founder of Monad Labs. He previously built ultra-low-latency trading systems at Jump Trading.",
    "eunice": "Eunice Giarta is the COO and co-founder of Monad Labs. She brings extensive experience from traditional tech and finance, previously working at Broadway Technology and Shutterstock.",
    "gmonad": "gmonad! 💜 Welcome to the fastest ecosystem in Web3.",
    "token": "The native utility and governance token of the network is MONAD.",
    "monadbft": "MonadBFT is our high-performance consensus mechanism. It's a pipelined HotStuff derivative that achieves agreement across the network in just 1 second.",
    // 👇 THESE TWO LINES ARE UPDATED 👇
    "mainnet": "Monad is officially live on Mainnet! The network is actively processing 10,000 TPS with single-slot finality, powering the next generation of decentralized applications.",
    "testnet": "While our testnet served as the ultimate proving ground for Parallel EVM and MonadBFT, Monad has successfully graduated to full Mainnet deployment.",
    // --- CULTURE & GREETINGS ---
    "hello": "gmonad! 💜 How can I assist you with the Monad ecosystem today?",
    "hi": "gmonad! 💜 Ready to explore 10,000 TPS?",
    "hey": "gmonad! 💜 State your query.",
    "gm": "gmonad! 💜 The sun is shining and the blocks are processing at 1-second intervals.",
    "who are you": "I am the Monad Agent Hub construct, designed to provide ultra-fast, optimized answers for the ecosystem. I use the 💜 emoji because parallel execution fills me with love.",
    "who created you": "I am a digital native of the Monad Hub, designed by the architect @mkr_web.",
    "nads": "The Nads are the heart of our community! A passionate group of builders and believers pushing the boundaries of what EVM can do."
  }
});

// --- API KEYS (Obfuscated in Base64) ---
// Pollinations API Key
const _0x1a = "c2tfZ3lKdTJIWjlpUjRLZlpYZTNJbjc1Z3M1ZmhHeTBPRjU="; 

// CoinGecko API Key (Placeholder: "YOUR_COINGECKO_API_KEY_HERE")
// You MUST replace the string below with your own Base64 encoded CoinGecko key!
const _cg = "WU9VUl9DT0lOR0VDS09fQVBJX0tFWV9IRVJF"; 


let isTyping = false; 

function saveState() {
  if (isTyping) return;
  try { localStorage.setItem('monadChatHistory', document.getElementById('monad-chat-box').innerHTML); } catch(e) {}
}

function loadState() {
  try {
    const history = localStorage.getItem('monadChatHistory');
    const chatBox = document.getElementById('monad-chat-box');
    if (history && history.trim() !== '') {
      chatBox.innerHTML = history;
      setTimeout(() => { chatBox.scrollTop = chatBox.scrollHeight; }, 100);
    } else { startGreeting(); }
  } catch(e) { startGreeting(); }
}

function startGreeting() {
  const gBubble = document.getElementById('greeting-bubble');
  if (gBubble && gBubble.textContent === '') {
     isTyping = true;
     document.getElementById('monad-input-text').readOnly = true;
     document.getElementById('monad-send-btn').disabled = true;
     typeWriterEffect(gBubble, "gmonad! 💜 Welcome to the Monad Agent Hub. Terminal sequence initiated. What do you need to know about 10,000 TPS, or what crypto prices do you want to check?", 0, () => { 
        isTyping = false; 
        document.getElementById('monad-input-text').readOnly = false;
        document.getElementById('monad-send-btn').disabled = false;
        saveState(); 
     });
  }
}

function clearChat() {
  if (isTyping) return;
  document.getElementById('monad-chat-box').innerHTML = '<div class="monad-msg-row"><span class="monad-bot-bubble" id="cleared-bubble"></span></div>';
  try { localStorage.removeItem('monadChatHistory'); } catch(e) {}
  isTyping = true;
  document.getElementById('monad-input-text').readOnly = true;
  document.getElementById('monad-send-btn').disabled = true;
  typeWriterEffect(document.getElementById('cleared-bubble'), "EVM state reset... Terminal cleared. Ready for new input.", 0, () => {
     isTyping = false;
     document.getElementById('monad-input-text').readOnly = false;
     document.getElementById('monad-send-btn').disabled = false;
     saveState();
  });
}

function typeWriterEffect(element, text, index, callback) {
  if (document.hidden) {
    element.textContent = text;
    const chatBox = document.getElementById('monad-chat-box');
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    if (callback) callback();
    return;
  }
  if (index < text.length) {
    element.textContent += text.charAt(index);
    const chatBox = document.getElementById('monad-chat-box');
    chatBox.scrollTop = chatBox.scrollHeight;
    setTimeout(() => typeWriterEffect(element, text, index + 1, callback), 10);
  } else if (callback) { callback(); }
}

// --- SECURE COINGECKO FETCH ---
async function fetchCryptoPrice(query) {
  const keywords = query.replace(/price|of|what|is|the|current/gi, '').trim().split(' ');
  let coin = keywords[0].toLowerCase();
  
  const coinMap = { "btc": "bitcoin", "eth": "ethereum", "sol": "solana", "bnb": "binancecoin" };
  if (coinMap[coin]) coin = coinMap[coin];

  if (!coin) return null;

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        // Injecting the decoded CoinGecko API key here:
        'x-cg-demo-api-key': atob(_cg) 
      }
    });
    
    const data = await res.json();
    
    if (data[coin] && data[coin].usd) {
      return `The current price of ${coin.toUpperCase()} is $${data[coin].usd.toLocaleString()} USD. (Data via CoinGecko) 📈`;
    }
    return null; 
  } catch (err) {
    return null;
  }
}

async function handleChat() {
  if (isTyping) return; 
  
  const inputField = document.getElementById('monad-input-text');
  const chatBox = document.getElementById('monad-chat-box');
  const sendBtn = document.getElementById('monad-send-btn');
  
  let rawUserVal = inputField.value.trim().substring(0, 500);
  const userVal = rawUserVal.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  if (!userVal) return;

  const uRow = document.createElement('div');
  uRow.className = 'monad-msg-row';
  const uBubble = document.createElement('span');
  uBubble.className = 'monad-user-bubble';
  uBubble.textContent = userVal; 
  uRow.appendChild(uBubble);
  chatBox.appendChild(uRow);
  
  saveState();

  inputField.value = '';
  inputField.readOnly = true; 
  sendBtn.disabled = true;
  inputField.blur(); 
  chatBox.scrollTop = chatBox.scrollHeight;
  isTyping = true;

  const typingDiv = document.createElement("div");
  typingDiv.className = "monad-msg-row";
  typingDiv.innerHTML = '<span class="monad-bot-bubble typing-indicator">> processing...</span>';
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  let reply = "";
  const searchVal = userVal.toLowerCase();
  let foundStatic = false;

  // 1. Check Hardcoded Lore
  const keys = Object.keys(monadLogic.keywordMap).sort((a, b) => b.length - a.length);
  for (let i = 0; i < keys.length; i++) {
    if (searchVal.includes(keys[i])) {
      reply = monadLogic.keywordMap[keys[i]];
      foundStatic = true;
      break;
    }
  }

  // 2. Check Crypto Prices
  if (!foundStatic && searchVal.includes("price")) {
    const cryptoData = await fetchCryptoPrice(searchVal);
    if (cryptoData) {
      reply = cryptoData;
      foundStatic = true;
    }
  }

  // 3. Fallback to Pollinations AI
  if (!foundStatic) {
    try {
      const systemPrompt = "You are the Monad Agent Hub construct, a specialized AI assistant running on the hyper-optimized Monad network. You know about Parallel EVM, James Hunsaker, Keone Hon, and Eunice Giarta. You are extremely concise, technical-focused, professional, and confident. You are powered by 10,000 TPS. Keep answers under 3 sentences.";
      
      const response = await fetch('https://gen.pollinations.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Injecting the decoded Pollinations AI key here:
          'Authorization': 'Bearer ' + atob(_0x1a) 
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userVal }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        reply = data.choices[0].message.content;
      } else {
        reply = "Error: Sequence reversion. Block execution failure. Pollinations API rejected the connection.";
      }
     } catch (error) {
       reply = "Sequence error. Verify node sync. (Network Error).";
    }
  }

  if (chatBox.contains(typingDiv)) chatBox.removeChild(typingDiv);
  const bRow = document.createElement('div');
  bRow.className = 'monad-msg-row';
  const botBubble = document.createElement('span');
  botBubble.className = 'monad-bot-bubble';
  bRow.appendChild(botBubble);
  chatBox.appendChild(bRow);
  
  typeWriterEffect(botBubble, reply, 0, () => {
      isTyping = false;
      inputField.readOnly = false; 
      sendBtn.disabled = false;
      saveState(); 
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("%c MONAD AGENT HUB ", "background: #8D6BFF; color: white; font-size: 20px; font-weight: bold; border-radius: 4px; padding: 4px;");

  const splashScreen = document.getElementById('monad-splash-screen');
  const chatWindow = document.getElementById('monad-chat-window');
  const initiateBtn = document.getElementById('initiate-btn');

  initiateBtn.addEventListener('click', () => {
    splashScreen.classList.add('fade-out');
    chatWindow.classList.add('active-chat');
    chatWindow.classList.remove('hidden-chat');
    setTimeout(() => { loadState(); }, 600);
  });

  const sendBtn = document.getElementById('monad-send-btn');
  if(sendBtn) sendBtn.addEventListener('click', handleChat);
  
  const inputField = document.getElementById('monad-input-text');
  if(inputField) {
    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.keyCode === 13) { e.preventDefault(); inputField.blur(); handleChat(); }
    });
  }
  
  const clearBtn = document.getElementById('clear-chat-btn');
  if(clearBtn) clearBtn.addEventListener('click', clearChat);
});
    
