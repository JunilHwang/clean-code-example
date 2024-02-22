document.querySelector('#app').innerHTML = `
  <main>
    <h1>할 일 목록</h1>
    <p><input type="text" placeholder="할 일을 입력하세요" size="40" id="todoInput" /></p>
    <ul id="todoItems">
      <li>
        <input type="checkbox" checked />
        <span style="text-decoration: line-through">대청소(설거지, 빨래, 물청소, 고양이 똥 치우기)</span>
        <button class="delete" type="button">🗑️</button>
      </li>
      <li>
        <input type="checkbox" />
        <span>산책</span>
        <button class="delete" type="button">🗑️</button>
      </li>
      <li>
        <input type="checkbox" />
        <span>10분 글쓰기 </span>
        <button class="delete" type="button">🗑️</button>
      </li>
    </ul>
    <button id="all" type="button">전체목록</button>
    <button id="complete" type="button">완료목록</button>
    <button id="incomplete" type="button">미완료목록</button>
  </main>
`;


// element 정의
const $all = document.querySelector('#all');
const $complete = document.querySelector('#complete');
const $incomplete = document.querySelector('#incomplete');
const $todoInput = document.querySelector('#todoInput');
const $todoItems = document.querySelector('#todoItems');

// 할 일 목록 추가
$todoInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const $li = document.createElement('li');
    $li.innerHTML = `
      <input type="checkbox" />
      <span>${$todoInput.value}</span>
      <button class="delete" type="button">🗑️</button>
    `;
    $todoItems.appendChild($li);
    $todoInput.value = '';
  }
});


$todoItems.addEventListener('click', function (e) {
  // 할 일 목록 삭제
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }

  // 체크박스 클릭시 완료 표시
  if (e.target.type === 'checkbox') {
    const span = e.target.nextElementSibling;
    if (e.target.checked) {
      span.style.textDecoration = 'line-through';
    } else {
      span.style.textDecoration = '';
    }
  }
});


// 전체목록, 완료목록, 미완료목록 필터링
$all.addEventListener('click', () => {
  $todoItems.querySelectorAll('li').forEach((item) => {
    item.style.display = '';
  });
});

$complete.addEventListener('click', () => {
  $todoItems.querySelectorAll('li').forEach((item) => {
    if (item.children[0].checked) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
});

$incomplete.addEventListener('click', () => {
  $todoItems.querySelectorAll('li').forEach((item) => {
    if (!item.children[0].checked) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
});
