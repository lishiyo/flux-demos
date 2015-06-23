// polyfill promises
import React from 'react';
import "babel-core/polyfill";


import TodoApp from './components/TodoApp.react';

React.render(
  <TodoApp />,
  document.getElementById('todoapp')
);
