'use strict';

define(

  [
    "./data/todos",
    "./data/stats",
    "./ui/new_item",
    "./ui/todo_list",
    "./ui/stats",
    "./ui/toggle_all"
  ],
  
  function (
    TodosData,
    StatsData,
    NewItemUI, 
    TodoListUI,
    StatsUI,
    ToggleAllUI) {

    var initialize = function () {
      StatsData.attachTo(document);
      TodosData.attachTo(document);
      NewItemUI.attachTo('#new-todo');
      StatsUI.attachTo('#footer');
      ToggleAllUI.attachTo('#toggle-all');
      TodoListUI.attachTo('#todo-list');
    }

    return {
      initialize: initialize
    };
  }
);
