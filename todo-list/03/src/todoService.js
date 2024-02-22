export const FilterTypes = {
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
export const filterTodoItems = () => {
  if (data.filterType === FilterTypes.ALL) {
    return data.todoItems;
  }

  return data.todoItems.filter((todoItem) => data.filterType === FilterTypes.COMPLETED ? todoItem.completed : !todoItem.completed);
}

export const addItem = (content) => {
  data.todoItems.push({ completed: false, content });
};

export const deleteItem = (index) => {
  data.todoItems.splice(index, 1);
}

export const completeItem = (index) => {
  data.todoItems[index].completed = !data.todoItems[index].completed;
}

export const setFilterType = (filterType) => {
  data.filterType = filterType;
}

export const isFilter = (filterType) => data.filterType === filterType;

