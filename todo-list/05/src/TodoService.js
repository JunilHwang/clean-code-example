export default class TodoService {
  #repository;

  static FilterTypes = {
    ALL: 'ALL',
    COMPLETED: 'COMPLETED',
    INCOMPLETE: 'INCOMPLETE',
  }

  static FilterLabels = {
    [TodoService.FilterTypes.ALL]: '전체목록',
    [TodoService.FilterTypes.COMPLETED]: '완료목록',
    [TodoService.FilterTypes.INCOMPLETE]: '미완료목록',
  }

  static #initData = {
    todoItems: [
      { completed: true, content: '대청소(설거지, 빨래, 물청소, 고양이 똥 치우기)' },
      { completed: false, content: '산책' },
      { completed: false, content: '10분 글쓰기' },
    ],
    filterType: TodoService.FilterTypes.ALL,
  };

  constructor(repository) {
    this.#repository = repository;
  }

  get #data() {
    return this.#repository.getData() ?? TodoService.#initData;
  }

  set #data(newData) {
    return this.#repository.setData(newData);
  }

  filterTodoItems() {
    const data = this.#data;
    const { ALL, COMPLETED } = TodoService.FilterTypes;
    if (data.filterType === ALL) {
      return data.todoItems;
    }

    return data.todoItems.filter((todoItem) => data.filterType === COMPLETED ? todoItem.completed : !todoItem.completed);
  }

  addItem(content) {
    const data = this.#data;
    data.todoItems.push({ completed: false, content });
    this.#data = data;
  };

  deleteItem(index) {
    const data = this.#data;
    data.todoItems.splice(index, 1);
    this.#data = data;
  }

  completeItem(index) {
    const data = this.#data;
    data.todoItems[index].completed = !data.todoItems[index].completed;
    this.#data = data;
  }

  setFilterType(filterType) {
    const data = this.#data;
    data.filterType = filterType;
    this.#data = data;
  }

  isFilter(filterType){
    return this.#data.filterType === filterType;
  }

}

