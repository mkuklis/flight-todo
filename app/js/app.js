'use strict';

define(

  [
    "./data/todos",
    "./data/stats",
    "./ui/new_todo",
    "./ui/todo_list",
    "./ui/stats"
  ],
  
  function (
    TodosData,
    StatsData,
    NewTodoUI, 
    TodoListUI, 
    StatsUI) {

    var initialize = function () {
      StatsData.attachTo(document);
      TodosData.attachTo(document);
      NewTodoUI.attachTo('#new-todo');
      StatsUI.attachTo('#footer');
      TodoListUI.attachTo('#todo-list');
    }

    return {
      initialize: initialize
    };
  }
);
