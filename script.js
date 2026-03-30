// Freeze logic map to prevent runtime tampering
const monadLogic = Object.freeze({
  keywordMap: {
    // --- MONAD CORE LORE & TECH ---
    "what is monad": "Monad is a highly optimized, EVM-compatible Layer 1 blockchain designed to process 10,000 transactions per second (TPS) with 1-second block times and single-slot finality.",
    "tps": "Monad achieves a blistering 10,000 TPS (Transactions Per Second). We do this by fundamentally optimizing the execution layer while maintaining full EVM compatibility.",
    "parallel evm": "Parallel EVM is our secret weapon. Instead of processing transactions one by one, Monad identifies independent transactions and executes them simultaneously.",
    "founders": "The architects of the Monad network are Keone Hon, James Hunsaker, and Eunice Giarta. They bring deep expertise from high-frequency trading and scalable systems.",
    "founder": "Monad was founded by Keone Hon, James Hunsaker, and Eunice Giarta.",
    "keone": "Keone Hon is the CEO and co-founder of Monad Labs. Before Monad, he spent 8 years at Jump Trading.",
    "james": "James Hunsaker is the CTO and co-founder of Monad Labs. He previously built ultra-low-latency trading systems at Jump Trading.",
    "eunice": "Eunice Giarta is the COO and co-founder of Monad Labs.",
    "token": "The native utility and governance token of the network is MONAD.",
    "monadbft": "MonadBFT is our high-performance consensus mechanism. It achieves agreement across the network in just 1 second.",
    "mainnet": "Monad is officially live on Mainnet! The network is actively processing 10,000 TPS with single-slot finality, powering the next generation of decentralized applications.",
    "testnet": "While our testnet served as the ultimate proving ground for Parallel EVM and MonadBFT, Monad has successfully graduated to full Mainnet deployment.",

    // --- CULTURE & GREETINGS ---
    "gmonad": "gmonad! 💜 Welcome to the fastest ecosystem in Web3.",
    "hello": "gmonad! 💜 How can I assist you with the Monad ecosystem today?",
    "hi": "gmonad! 💜 Ready to explore 10,000 TPS?",
    "hey": "gmonad! 💜 State your query.",
    "gm": "gmonad! 💜 The sun is shining and the blocks are processing at 1-second intervals.",
    "who are you": "I am the Monad Agent Hub construct, designed to provide ultra-fast, optimized answers for the ecosystem. I use the 💜 emoji because parallel execution fills me with love.",
    "who created you": "I am a digital native of the Monad Hub, designed by the architects of the network.",
    "nads": "The Nads are the heart of our community! A passionate group of builders and believers pushing the boundaries of what EVM can do."
  }
});

// --- API KEYS (Obfuscated in Base64) ---
const _0x1a = "c2tfZ3lKdTJIWjlpUjRLZlpYZTNJbjc1Z3M1ZmhHeTBPRjU="; 
const _cg = "WU9VUl9DT0lOR0VDS09fQVBJX0tFWV9IRVJF"; 

let isTyping = false; 

// Smooth Scroll Algorithm
function scrollToBottom() {
  const chatBox = document.getElementById('monad-chat-box');
  requestAnimationFrame(() => {
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

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
      setTimeout(scrollToBottom, 100);
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
    scrollToBottom();
    if (callback) callback();
    return;
  }
  if (index < text.length) {
    element.textContent += text.charAt(index);
    scrollToBottom();
    setTimeout(() => typeWriterEffect(element, text, index + 1, callback), 10);
  } else if (callback) { callback(); }
}

// --- SECURE COINGECKO FETCH ---
async function fetchCryptoPrice(query) {
  const keywords = query.replace(/price|of|what|is|the|current/gi, '').trim().split(' ');
  let coin = keywords[0].toLowerCase();
  
  const coinMap = { "btc": "bitcoin", "eth": "ethereum", "sol": "solana", "bnb": "binancecoin", "monad": "monad" };
  if (coinMap[coin]) coin = coinMap[coin];

  if (!coin) return null;

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
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
  
  scrollToBottom();
  saveState();

  inputField.value = '';
  inputField.readOnly = true; 
  sendBtn.disabled = true;
  inputField.blur(); 
  isTyping = true;

  const typingDiv = document.createElement("div");
  typingDiv.className = "monad-msg-row";
  typingDiv.innerHTML = '<span class="monad-bot-bubble typing-indicator">> processing...</span>';
  chatBox.appendChild(typingDiv);
  scrollToBottom();

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

  // 3. Fallback to AI API
  if (!foundStatic) {
    try {
      const systemPrompt = "You are the Monad Agent Hub construct, a specialized AI assistant running on the hyper-optimized Monad network. You know about Parallel EVM, James Hunsaker, Keone Hon, and Eunice Giarta. You are extremely concise, technical-focused, professional, and confident. You are powered by 10,000 TPS. Keep answers under 3 sentences.";
      
      const response = await fetch('https://gen.pollinations.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      // Auto-focus logic for desktop only (prevents mobile keyboard jump)
      if (window.innerWidth > 768) {
        inputField.focus();
      }
      saveState(); 
  });
}

// --- DOM READY & SPA ROUTING LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
  console.log("%c MONAD AGENT HUB ", "background: #8D6BFF; color: white; font-size: 20px; font-weight: bold; border-radius: 4px; padding: 4px;");

  const splashScreen = document.getElementById('monad-splash-screen');
  const chatWindow = document.getElementById('monad-chat-window');
  const initiateBtn = document.getElementById('initiate-btn');
  const backBtn = document.getElementById('back-to-splash-btn');
  const inputField = document.getElementById('monad-input-text');

  function openChatUI() {
    splashScreen.classList.add('fade-out');
    chatWindow.classList.add('active-chat');
    chatWindow.classList.remove('hidden-chat');
    setTimeout(() => { 
      loadState(); 
      // Auto-focus input on desktop after transition
      if (window.innerWidth > 768) {
        inputField.focus();
      }
    }, 500);
  }

  function closeChatUI() {
    chatWindow.classList.remove('active-chat');
    chatWindow.classList.add('hidden-chat');
    splashScreen.classList.remove('fade-out');
  }

  initiateBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    history.pushState({ page: 'chat' }, 'Chat', '#chat'); 
    openChatUI();
  });

  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault(); 
      history.back(); 
    });
  }

  window.addEventListener('popstate', () => {
    if (window.location.hash !== '#chat') {
      closeChatUI();
    } else {
      openChatUI();
    }
  });

  const sendBtn = document.getElementById('monad-send-btn');
  if(sendBtn) sendBtn.addEventListener('click', handleChat);
  
  if(inputField) {
    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.keyCode === 13) { 
        e.preventDefault(); 
        handleChat(); 
      }
    });
  }
  
  const clearBtn = document.getElementById('clear-chat-btn');
  if(clearBtn) clearBtn.addEventListener('click', clearChat);
});
                                
