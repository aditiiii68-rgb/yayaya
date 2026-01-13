// Show a page with fade-in, hide all others
function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("show"));
  page.classList.add("show");
}

// GLOBAL PAGE ELEMENTS
let hugPage, memoriesPage;

document.addEventListener("DOMContentLoaded", () => {
  // ELEMENTS
  const intro = document.getElementById("intro");
  const namePage = document.getElementById("namePage");
  const q1Page = document.getElementById("q1Page");
  const q2Page = document.getElementById("q2Page");
  const q3Page = document.getElementById("q3Page");
  const bookPage = document.getElementById("bookPage");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const bfNameInput = document.getElementById("bfName");
  const nameContinueBtn = document.getElementById("nameContinueBtn");
  const q1NextBtn = document.getElementById("q1NextBtn");
  const q2NextBtn = document.getElementById("q2NextBtn");
  const q3NextBtn = document.getElementById("q3NextBtn");
  const hugBtn = document.getElementById("hugBtn");
  const memoriesBtn = document.getElementById("memoriesBtn");
  const restartBtn = document.getElementById("restartBtn");

  hugPage = document.getElementById("hugPage");
  memoriesPage = document.getElementById("memoriesPage");

  // SHOW INTRO
  showPage(intro);
  document.body.style.overflow = "hidden";

  // YES / NO BUTTONS
  yesBtn.addEventListener("click", () => showPage(namePage));
  noBtn.addEventListener("click", () => moveNoButton(yesBtn, noBtn));

  // NAME CHECK
  nameContinueBtn.addEventListener("click", checkName);
  bfNameInput.addEventListener("keydown", e => {
    if(e.key==="Enter"){ e.preventDefault(); checkName(); }
  });

  // QUESTIONS
  q1NextBtn.addEventListener("click", checkQ1);
  q2NextBtn.addEventListener("click", checkQ2);
  q3NextBtn.addEventListener("click", checkQ3);

  ['q1','q2','q3'].forEach(q=>{
    document.querySelectorAll(`input[name="${q}"]`).forEach(inp=>{
      inp.addEventListener("keydown", e=>{
        if(e.key==="Enter"){ e.preventDefault(); window['check'+q.toUpperCase()](); }
      });
    });
  });

  // BOOK NAVIGATION
  document.querySelectorAll(".book-next-btn").forEach(btn=>{
    btn.addEventListener("click", ()=> nextPage(btn.dataset.current));
  });
  document.querySelectorAll(".book-prev-btn").forEach(btn=>{
    btn.addEventListener("click", ()=> prevPage(btn.dataset.current));
  });

  hugBtn.addEventListener("click", ()=> showPage(hugPage));
  memoriesBtn.addEventListener("click", ()=> showPage(memoriesPage));
  restartBtn.addEventListener("click", ()=> showPage(intro));

  // FLOATING HEARTS
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "💗";
    heart.style.left = Math.random()*100+"vw";
    heart.style.fontSize = Math.random()*15+15+"px";
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),6000);
  },700);

});

// MOVE NO BUTTON
function moveNoButton(yesBtn, noBtn){
  noBtn.style.position = "absolute";
  const yesRect = yesBtn.getBoundingClientRect();
  let x,y,tries=0;
  const maxTries=100;
  do{
    x=Math.random()*(window.innerWidth-noBtn.offsetWidth);
    y=Math.random()*(window.innerHeight-noBtn.offsetHeight);
    const noRect={left:x,right:x+noBtn.offsetWidth,top:y,bottom:y+noBtn.offsetHeight};
    const overlapYes=noRect.left<yesRect.right && noRect.right>yesRect.left &&
                     noRect.top<yesRect.bottom && noRect.bottom>yesRect.top;
    if(!overlapYes) break;
    tries++;
  }while(tries<maxTries);
  noBtn.style.left = x+"px";
  noBtn.style.top = y+"px";
}

// NAME CHECK
function checkName(){
  const bfNameInput = document.getElementById("bfName");
  const name = bfNameInput.value.trim().toLowerCase();
  const error = document.getElementById("nameError");
  if(name==="yash"){ showPage(document.getElementById("q1Page")); error.innerText=""; }
  else error.innerText="Not for you 😏";
}

// QUESTION CHECKS
function checkQ1(){
  const ans = document.querySelector('input[name="q1"]:checked');
  if(ans && ans.value==="13/7/25") showPage(document.getElementById("q2Page"));
  else alert("Wrong 😭");
}
function checkQ2(){
  const ans = document.querySelector('input[name="q2"]:checked');
  if(ans && ans.value==="isnt it obvious?") showPage(document.getElementById("q3Page"));
  else alert("Wrong 😭");
}
function checkQ3(){
  const ans = document.querySelector('input[name="q3"]:checked');
  if(ans && ans.value==="Sunday"){ showPage(document.getElementById("bookPage")); document.body.style.overflow="auto"; }
  else alert("Wrong 😭");
}

// BOOK PAGE NAV
function nextPage(current){
  const c=parseInt(current);
  document.getElementById("page"+c).classList.remove("show");
  document.getElementById("page"+(c+1)).classList.add("show");
}
function prevPage(current){
  const c=parseInt(current);
  document.getElementById("page"+c).classList.remove("show");
  document.getElementById("page"+(c-1)).classList.add("show");
}
