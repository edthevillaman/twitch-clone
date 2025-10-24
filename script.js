// Shared script for StreamHub prototype (multi-page)
// Helper DOM shortcuts
const $ = (sel)=>document.querySelector(sel);
const $$ = (sel)=>document.querySelectorAll(sel);

// --- Index page logic ---
if (typeof document !== 'undefined' && document.body) {
  // Populate channels on index.html
  const channelsEl = $('#channels');
  const nowPlaying = $('#nowPlaying');
  const openDonateBtn = $('#openDonate');
  const donateModal = $('#donateModal');
  const closeDonate = $('#closeDonate');
  const cancelDonate = $('#cancelDonate');
  const confirmDonate = $('#confirmDonate');
  const donateTarget = $('#donateTarget');
  const donationAmount = $('#donationAmount');
  const donationMessage = $('#donationMessage');

  const sampleChannels = [
    {name:'GamerOne', title:'Speedrun chaos', viewers:'4.2K'},
    {name:'CoderLive', title:'Building a web app', viewers:'1.1K'},
    {name:'ChillBeats', title:'Lo-fi beats', viewers:'900'},
    {name:'ProPlays', title:'Ranked matches', viewers:'2.7K'},
    {name:'IRL_Alex', title:'City walk & chill', viewers:'600'}
  ];

  function renderChannels(){
    if(!channelsEl) return;
    channelsEl.innerHTML = '';
    sampleChannels.forEach((c, idx)=>{
      const el = document.createElement('div'); el.className='channel';
      el.innerHTML = `<div class="thumb">${c.viewers} viewers</div>
        <div class="ch-meta"><div><strong>${c.name}</strong><div class="muted">${c.title}</div></div>
        <div class="ch-actions"><button class="btn" data-watch="${idx}">Watch</button><button class="btn primary" data-donate="${idx}">Donate</button></div></div>`;
      channelsEl.appendChild(el);
    });
  }

  function attachChannelHandlers(){
    channelsEl.addEventListener('click', (e)=>{
      const watch = e.target.closest('[data-watch]');
      const donate = e.target.closest('[data-donate]');
      if(watch){ const i = parseInt(watch.getAttribute('data-watch'),10); openChannel(sampleChannels[i]); }
      if(donate){ const i = parseInt(donate.getAttribute('data-donate'),10); openDonate(sampleChannels[i]); }
    });
  }

  function openChannel(channel){
    if(nowPlaying) nowPlaying.textContent = channel.name + ' — ' + channel.title;
    if(openDonateBtn) { openDonateBtn.disabled = false; openDonateBtn.textContent = 'Donate to ' + channel.name; openDonateBtn.dataset.target = channel.name; }
    addSystemMessage('Now watching ' + channel.name);
  }

  function addSystemMessage(text){
    const el = document.createElement('div'); el.style.color='#9aa7b2'; el.style.marginTop='8px'; el.textContent = text;
    if(nowPlaying) nowPlaying.appendChild(el);
  }

  function openDonate(channel){
    if(!donateModal) return;
    donateModal.setAttribute('aria-hidden','false');
    donateTarget.textContent = channel.name;
    donationAmount.value = 5;
    donationMessage.value = '';
  }

  function closeDonateModal(){ donateModal.setAttribute('aria-hidden','true'); }

  function confirmDonation(){
    const amount = Number(donationAmount.value) || 0;
    const msg = donationMessage.value.trim();
    closeDonateModal();
    alert('Thank you! (demo) — donated $' + amount + ' to ' + donateTarget.textContent + (msg?(' — "'+msg+'"') : ''));
  }

  renderChannels();
  attachChannelHandlers();

  // global donate modal buttons
  if(closeDonate) closeDonate.addEventListener('click', closeDonateModal);
  if(cancelDonate) cancelDonate.addEventListener('click', closeDonateModal);
  if(confirmDonate) confirmDonate.addEventListener('click', confirmDonation);
  if(openDonateBtn) openDonateBtn.addEventListener('click', ()=>{
    const target = openDonateBtn.dataset.target || 'Streamer';
    openDonate({name: target});
  });
}

// --- Go Live page logic ---
if (typeof document !== 'undefined') {
  const startBtn = $('#startStream');
  const endBtn = $('#endStream');
  const preview = $('#streamPreview');
  const status = $('#streamStatus');
  const titleInput = $('#streamTitleInput');
  const categoryInput = $('#streamCategory');

  if(startBtn){
    startBtn.addEventListener('click', ()=>{
      const title = titleInput.value || 'Untitled stream';
      const cat = categoryInput.value || 'General';
      // Simulate going live
      startBtn.disabled = true;
      endBtn.disabled = false;
      status.textContent = 'Live — ' + title + ' · ' + cat;
      preview.textContent = 'LIVE: ' + title;
      // notify user (local only)
      localStorage.setItem('lastStream', JSON.stringify({title, category:cat, ts: Date.now()}));
      alert('You are now live (simulated). This demo does not broadcast video.');
    });
  }
  if(endBtn){
    endBtn.addEventListener('click', ()=>{
      startBtn.disabled = false;
      endBtn.disabled = true;
      status.textContent = 'Stream is offline.';
      preview.textContent = 'Preview (simulated)';
      alert('Stream ended (simulated).');
    });
  }

  // If page loaded and there is a stored last stream, show it
  const last = localStorage.getItem('lastStream');
  if(last && preview) {
    try{
      const o = JSON.parse(last);
      preview.textContent = 'Last stream: ' + o.title;
    }catch(e){}
  }
}