export const FilterTypes = {
  ALL: 'ALL',
  COMPLETED: 'COMPLETED',
  INCOMPLETE: 'INCOMPLETE',
}

const initData = {
  todoItems: [
    { completed: true, content: '대청소(설거지, 빨래, 물청소, 고양이 똥 치우기)' },
    { completed: false, content: '산책' },
    { completed: false, content: '10분 글쓰기' },
  ],
  filterType: FilterTypes.ALL,
};
const getData = () => {
  return JSON.parse(sessionStorage.getItem('todoItem')) ?? initData;
}
const setData = (newData) => {
  sessionStorage.setItem('todoItem', JSON.stringify(newData));
}

export const filterTodoItems = () => {
  const data = getData();
  if (data.filterType === FilterTypes.ALL) {
    return data.todoItems;
  }

  return data.todoItems.filter((todoItem) => data.filterType === FilterTypes.COMPLETED ? todoItem.completed : !todoItem.completed);
}

export const addItem = (content) => {
  const data = getData();
  data.todoItems.push({ completed: false, content });
  setData(data);
};

export const deleteItem = (index) => {
  const data = getData();
  data.todoItems.splice(index, 1);
  setData(data);
}

export const completeItem = (index) => {
  const data = getData();
  data.todoItems[index].completed = !data.todoItems[index].completed;
  setData(data);
}

export const setFilterType = (filterType) => {
  const data = getData();
  data.filterType = filterType;
  setData(data);
}

export const isFilter = (filterType) => getData().filterType === filterType;
