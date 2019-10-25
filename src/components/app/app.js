import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter/';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: '', 
    status: 'all'
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++ 
    }
  }

  deleteItem = (id) => {
    this.setState( ({ todoData }) => {
      const indx = todoData.findIndex( (el) => el.id === id );
      const modifiedTodoData = [...todoData.slice(0, indx), ...todoData.slice(indx + 1)];

      return { 
        todoData: modifiedTodoData 
      };
    } );
  }

  addItem = (label) => {
    if (!label) return;
    this.setState( ({ todoData }) => {
      const newTodoItem = this.createTodoItem(label);
      const modifiedTodoData = [...todoData, newTodoItem];

      return {
        todoData: modifiedTodoData
      };
    });
  }

  toggleProperty(arr, id, propName) {
    const indx = arr.findIndex( (el) => el.id === id );
     
      const oldItem = arr[indx]; 
      const newItem = { ...oldItem, 
                        [propName]: !oldItem[propName] };
      const modifiedTodoData = [...arr.slice(0, indx), 
                                newItem,
                                ...arr.slice(indx + 1)];
      return modifiedTodoData;
  }

  toggleImportant = (id) => {
    this.setState(( { todoData } ) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
  }

  toggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });
  }

  setSearchText = (term) => {
    this.setState({ term });
  }

  filterTodoListBySearch = (todoData, { term }) => {
    return todoData.filter(({ label }) => label.toLowerCase().includes(term.toLowerCase()));
  }
  
  setStatusFilter = (status) => {
    this.setState({ status });
  }

  filterTodoListByStatus = (todoList) => {
    const { status } = this.state;
    if (status === 'all') return todoList;
    if (status === 'active') {
      return todoList.filter(({ done }) => !done)
    }
    if (status === 'done') {
      return todoList.filter(({ done }) => done);
    }
  }

    render() {
      const { todoData } = this.state;
      const doneCount = todoData
                                .filter((item) => item.done === true)
                                .length;
      const todoCount = todoData.length - doneCount;
      
      const searchFilteredTodoList = this.filterTodoListBySearch(this.filterTodoListByStatus(todoData), 
      this.state);
      
      
      return (
        <div className="todo-app">
          <AppHeader toDo = { todoCount } done = { doneCount } />
          <div className="top-panel d-flex">
            <SearchPanel setSearchText = { this.setSearchText } />
            <ItemStatusFilter setStatusFilter = { this.setStatusFilter } />
          </div>
    
          <TodoList 
            todos = { searchFilteredTodoList }
            onDeleted = { this.deleteItem }
            onToggleImportant = { this.toggleImportant }
            onToggleDone = { this.toggleDone } />
            
          <ItemAddForm onItemAdded = { this.addItem } />
        </div>
      );
    }
  }
   