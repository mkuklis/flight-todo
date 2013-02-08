'use strict';

define(

  [
    "./data/todos",
    "./data/stats",
    "./ui/new_todo",
    "./ui/todo_list",
    "./ui/stats",
    "./ui/toggle_all"
  ],
  
  function (
    TodosData,
    StatsData,
    NewTodoUI, 
    TodoListUI,
    StatsUI,
    ToggleAllUI) {

    var initialize = function () {
      StatsData.attachTo(document);
      TodosData.attachTo(document);
      NewTodoUI.attachTo('#new-todo');
      StatsUI.attachTo('#footer');
      ToggleAllUI.attachTo('#toggle-all');
      TodoListUI.attachTo('#todo-list');
    }

    return {
      initialize: initialize
    };
  }
);
