import render from "./render";
import TodoService from "./TodoService";
import Storage from "./Storage";

const ServiceTypes = {
  LOCAL: 'LOCAL',
  SESSION: 'SESSION',
}

const ServiceTypeMap = {
  [ServiceTypes.LOCAL]: new TodoService(new Storage('todoItems', sessionStorage)),
  [ServiceTypes.SESSION]: new TodoService(new Storage('todoItems', localStorage)),
}


render({
  getTodoService(type) {
    return ServiceTypeMap[type];
  },
  filterTypes: TodoService.FilterTypes,
  filterLabels: TodoService.FilterLabels,
  serviceTypes: ServiceTypes,
});
