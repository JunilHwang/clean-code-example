const FilterTypes = {
  ALL: 'ALL',
  COMPLETED: 'COMPLETED',
  INCOMPLETE: 'INCOMPLETE',
}

const data = {
  todoItems: [
    { completed: true, content: '대청소(설거지, 빨래, 물청소, 고양이 똥 치우기)' },
    { completed: false, content: '산책' },
    { completed: false, content: '10분 글쓰기' },
  ],
  filterType: FilterTypes.ALL,
};

const filterTodoItems = () => {
  if (data.filterType === FilterTypes.ALL) {
    return data.todoItems;
  }

  return data.todoItems.filter((todoItem) => data.filterType === FilterTypes.COMPLETED ? todoItem.completed : !todoItem.completed);
}

const addItem = (content) => data.todoItems.push({ completed: false, content });

const deleteItem = (index) => data.todoItems.splice(index, 1);

const completeItem = (index) => data.todoItems[index].completed = !data.todoItems[index].completed;

const getElementIndex = (element) => [...element.parentElement.children].indexOf(element);

const render = () => {
  document.querySelector('#app').innerHTML = `
    <main>
      <h1>할 일 목록</h1>
      <p><input type="text" placeholder="할 일을 입력하세요" size="40" id="todoInput" /></p>
      <ul id="todoItems">
        ${filterTodoItems().map((todoItem) => `
          <li>
            <input type="checkbox" ${todoItem.completed ? 'checked' : ''} />
            <span ${todoItem.completed ? 'style="text-decoration: line-through"' : ''}>${todoItem.content}</span>
            <button class="delete" type="button">🗑️</button>
          </li>
        `.trim()).join('')}
      </ul>
      <button id="all" type="button">전체목록</button>
      <button id="completed" type="button">완료목록</button>
      <button id="incomplete" type="button">미완료목록</button>
    </main>
  `;

  const $todoInput = document.querySelector('#todoInput');
  const $todoItems = document.querySelector('#todoItems');
  const $all = document.querySelector('#all');
  const $completed = document.querySelector('#completed');
  const $incomplete = document.querySelector('#incomplete');

  // 할 일 목록 추가
  $todoInput.focus();
  $todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addItem($todoInput.value);
      $todoInput.value = '';
      render();
    }
  });

  $todoItems.addEventListener('click', (e) => {

    // 할 일 목록 삭제
    if (e.target.classList.contains('delete')) {
      deleteItem(getElementIndex(e.target.closest('li')));
      render();
    }

    // 체크박스 클릭시 완료 표시
    if (e.target.type === 'checkbox') {
      completeItem(getElementIndex(e.target.closest('li')));
      render();
    }
  });

  // 필터링
  $all.addEventListener('click', () => {
    data.filterType = FilterTypes.ALL
    render();
  });

  $completed.addEventListener('click', () => {
    data.filterType = FilterTypes.COMPLETED
    render();
  });

  $incomplete.addEventListener('click', () => {
    data.filterType = FilterTypes.INCOMPLETE
    render();
  });
}

render();
