'use strict';

define(

  [
    "./data/add_todo",
    "./data/stats",
    "./ui/new_todo",
    "./ui/todo_list",
    "./ui/stats"
  ],
  
  function (
    AddTodoData,
    StatsData,
    NewTodoUI, 
    TodoListUI, 
    StatsUI) {

    var initialize = function () {
      AddTodoData.attachTo(document);
      StatsData.attachTo(document);
      NewTodoUI.attachTo('#new-todo');
      TodoListUI.attachTo('#todo-list');
      StatsUI.attachTo('#footer');
    }

    return {
      initialize: initialize
    };
  }
);
