const itemElements = document.querySelectorAll('.item');
const winNumElement = document.getElementById('winNum');
const nextRoundButton = document.getElementById('nextRound');
const page1Element = document.getElementById('page1');
const page2Element = document.getElementById('page2');
const resultsElement = document.getElementById('results');

let winCount = 0; // 勝場次數

// 監聽事件函式
function checkWin(j) {
  // 取得顯示結果區域的元素物件
  const resultElement = document.createElement('p');
  resultElement.classList.add('result');

  // 產生電腦隨機出拳結果
  const computerChoice = Math.floor(Math.random() * 3);

  // 判斷玩家得出拳和電腦的出拳
  let result;
  if (j === computerChoice) {
    result = '平手';
  } else if (
    (j === 0 && computerChoice === 1) ||
    (j === 1 && computerChoice === 2) ||
    (j === 2 && computerChoice === 0)
  ) {
    result = '你贏了';
    winCount++;
  } else {
    result = '你輸了';
  }

  // 顯示結果在顯示區域
  resultElement.innerText = `你出拳: ${j}, 電腦出拳: ${computerChoice}, 結果: ${result}`;
  resultsElement.appendChild(resultElement);

  // 更新勝場次數
  winNumElement.innerText = winCount;

  // 如果達到五輪，顯示最終結果並禁用選項
  if (winCount === 5) {
    resultElement.innerText += `，總勝場次數: ${winCount}`;
    itemElements.forEach((itemElement) => {
      itemElement.removeEventListener('click', handleItemClick);
      itemElement.style.cursor = 'not-allowed';
    });
  }
}

// 監聽玩家出拳選擇
function handleItemClick() {
  const choice = parseInt(this.getAttribute('name'));

  page1Element.style.display = 'none';
  page2Element.style.display = 'block';

  checkWin(choice);
}

function startNextRound() {
  const resultElements = document.querySelectorAll('.result');
  resultElements.forEach((element) => element.remove());

  page1Element.style.display = 'block';
  page2Element.style.display = 'none';

  itemElements.forEach((itemElement) => {
    itemElement.addEventListener('click', handleItemClick);
    itemElement.style.cursor = 'pointer';
  });
}

itemElements.forEach((itemElement) => {
  itemElement.addEventListener('click', handleItemClick);
});

nextRoundButton.addEventListener('click', startNextRound);
