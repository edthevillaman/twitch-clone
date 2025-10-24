// Basic frontend behaviours: populate live cards and fake chat flow
const liveCards = document.getElementById('liveCards');
const chatWindow = document.getElementById('chatWindow');
const sendChat = document.getElementById('sendChat');
const chatInput = document.getElementById('chatInput');
const followingList = document.getElementById('followingList');
const streamTitle = document.getElementById('streamTitle');
const streamerName = document.getElementById('streamerName');

const channels = [
  {name:'GamerOne', title:'Speedrun chaos', viewers: '4.2K'},
  {name:'CoderLive', title:'Building a web app', viewers: '1.1K'},
  {name:'ChillBeats', title:'Lo-fi beats to code/relax', viewers: '900'},
  {name:'ProPlays', title:'Ranked matches', viewers: '2.7K'},
  {name:'IRL_Alex', title:'City walk & chill', viewers: '600'}
];

function populateCards(){
  liveCards.innerHTML = '';
  channels.forEach(ch => {
    const div = document.createElement('div'); div.className='card';
    div.innerHTML = `<div class="thumb">${ch.viewers} viewers</div><div style="margin-top:6px"><strong>${ch.name}</strong><div class="small">${ch.title}</div></div>`;
    div.addEventListener('click', ()=>{ openChannel(ch); });
    liveCards.appendChild(div);
  });
}
function openChannel(ch){
  streamTitle.textContent = ch.title;
  streamerName.textContent = ch.name;
  addSystemMessage('Switched to ' + ch.name);
  chatWindow.innerHTML = '';
}
function addSystemMessage(text){
  const el = document.createElement('div'); el.className='chatMessage'; el.style.color='#9aa7b2';
  el.textContent = text; chatWindow.appendChild(el); chatWindow.scrollTop = chatWindow.scrollHeight;
}
function addChat(who, text){
  const el = document.createElement('div'); el.className='chatMessage';
  el.innerHTML = `<span class="who">${who}:</span> <span class="txt">${text}</span>`;
  chatWindow.appendChild(el); chatWindow.scrollTop = chatWindow.scrollHeight;
}
function startFakeChat(){
  setInterval(()=>{
    const sample = ['Nice play!','Where are you from?','This music is fire','Clutch!','lol','pog'];
    const who = channels[Math.floor(Math.random()*channels.length)].name;
    const text = sample[Math.floor(Math.random()*sample.length)];
    addChat(who, text);
  }, 3000 + Math.random()*4000);
}
sendChat.addEventListener('click', ()=>{
  const t = chatInput.value.trim(); if(!t) return;
  addChat('You', t); chatInput.value='';
});
chatInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter') sendChat.click(); });
populateCards();
startFakeChat();