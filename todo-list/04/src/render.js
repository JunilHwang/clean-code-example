import { addItem, completeItem, deleteItem, filterTodoItems, FilterTypes, setFilterType, isFilter } from './todoService';
import { getElementIndex } from './utils';

const Ids = {
  TODO_ITEMS: 'todoItems',
  TODO_INPUT: 'todoInput',
}

const ClassNames = {
  DELETE: 'delete',
}

const FilterLabels = {
  [FilterTypes.ALL]: '전체목록',
  [FilterTypes.COMPLETED]: '완료목록',
  [FilterTypes.INCOMPLETE]: '미완료목록',
}

const render = () => {
  document.querySelector('#app').innerHTML = `
    <main>
      <h1>할 일 목록</h1>
      <p><input type="text" placeholder="할 일을 입력하세요" size="40" id="${Ids.TODO_INPUT}" /></p>
      <ul id="${Ids.TODO_ITEMS}">
        ${filterTodoItems().map((todoItem) => `
          <li>
            <input type="checkbox" ${todoItem.completed ? 'checked' : ''} />
            <span ${todoItem.completed ? 'style="text-decoration: line-through"' : ''}>${todoItem.content}</span>
            <button class="${ClassNames.DELETE}" type="button">🗑️</button>
          </li>
        `.trim()).join('')}
      </ul>
      
      ${Object.values(FilterTypes).map(value => `
        <button id="${value}" type="button" ${isFilter(value) ? `style="font-weight: bold"` : ''}>
          ${FilterLabels[value]}
        </button>
      `).join('')}
    </main>
  `;

  // 할 일 목록 추가
  const $todoInput = document.querySelector(`#${Ids.TODO_INPUT}`);
  const $todoItems = document.querySelector(`#${Ids.TODO_ITEMS}`);

  // 포커싱
  $todoInput.focus();

  // 할 일 목록 추가
  $todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addItem($todoInput.value);
      $todoInput.value = '';
      render();
    }
  });

  $todoItems.addEventListener('click', (e) => {

    // 할 일 목록 삭제
    if (e.target.closest(`.${ClassNames.DELETE}`)) {
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
  Object.values(FilterTypes).forEach(filterType => {
    document.querySelector(`#${filterType}`).addEventListener('click', () => {
      setFilterType(filterType);
      render();
    })
  })
}

export default render;
