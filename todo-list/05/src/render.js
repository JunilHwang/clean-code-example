import { getElementIndex } from './utils';

const Ids = {
  TODO_ITEMS: 'todoItems',
  TODO_INPUT: 'todoInput',
}

const ClassNames = {
  DELETE: 'delete',
}

let serviceType = null;

const render = ({ getTodoService, filterTypes, filterLabels, serviceTypes }) => {
  const currentServiceType = serviceType ?? serviceTypes.LOCAL;
  const todoService = getTodoService(currentServiceType);

  document.querySelector('#app').innerHTML = `
    <main>
      <h1>할 일 목록</h1>
      <p><input type="text" placeholder="할 일을 입력하세요" size="40" id="${Ids.TODO_INPUT}" /></p>
      <ul id="${Ids.TODO_ITEMS}">
        ${todoService.filterTodoItems().map((todoItem) => `
          <li>
            <input type="checkbox" ${todoItem.completed ? 'checked' : ''} />
            <span ${todoItem.completed ? 'style="text-decoration: line-through"' : ''}>${todoItem.content}</span>
            <button class="${ClassNames.DELETE}" type="button">🗑️</button>
          </li>
        `.trim()).join('')}
      </ul>
      
      <p>
        ${Object.values(filterTypes).map(value => `
          <button id="${value}" type="button" ${todoService.isFilter(value) ? `style="font-weight: bold"` : ''}>
            ${filterLabels[value]}
          </button>
        `).join('')}
      </p>
      
      <p>
        ${Object.values(serviceTypes).map(value => `
          <button id="${value}" type="button" ${currentServiceType === value ? `style="font-weight: bold"` : ''}>
            ${serviceTypes[value]}
          </button>
        `).join('')}
      </p>
    </main>
  `;

  const rerender = () => render({ getTodoService, filterTypes, filterLabels, serviceTypes });

  // 할 일 목록 추가
  const $todoInput = document.querySelector(`#${Ids.TODO_INPUT}`);
  const $todoItems = document.querySelector(`#${Ids.TODO_ITEMS}`);

  // 포커싱
  $todoInput.focus();

  // 할 일 목록 추가
  $todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      todoService.addItem($todoInput.value);
      $todoInput.value = '';
      rerender();
    }
  });

  $todoItems.addEventListener('click', (e) => {

    // 할 일 목록 삭제
    if (e.target.closest(`.${ClassNames.DELETE}`)) {
      todoService.deleteItem(getElementIndex(e.target.closest('li')));
      rerender();
    }

    // 체크박스 클릭시 완료 표시
    if (e.target.type === 'checkbox') {
      todoService.completeItem(getElementIndex(e.target.closest('li')));
      rerender();
    }
  });

  // 필터링
  Object.values(filterTypes).forEach(value => {
    document.querySelector(`#${value}`).addEventListener('click', () => {
      todoService.setFilterType(value);
      rerender();
    })
  })

  // 서비스 타입 선택
  Object.values(serviceTypes).forEach(value => {
    document.querySelector(`#${value}`).addEventListener('click', () => {
      serviceType = value;
      rerender();
    })
  })
}

export default render;
