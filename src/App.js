import React from 'react';
import './index.css';

// unique id for each todo
let id = 0

const Todos = (props) => (
  <li className='li'>
    <input className='checkbox' type="checkbox" checked={props.todos.checked} onChange={props.onToggle}/>
    <button  className='delete-btn' onClick={props.onDelete}>delete</button>
    <span className='text'>{props.todos.text}</span>
  </li>
)

class App extends React.Component {

  // state 
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
    }
  }

  // lifecycle method
  addTodos() {
    const text = prompt("add todo!");
    this.setState({
      todos: [...this.state.todos, {id: id++, text: text, checked: false}]
    })
  }

  // lifecycle method -- Unmounting method
  removeTodos(id) {
    this.setState({
      todos: this.state.todos.filter(todos => todos.id !== id)
    })
  }

  // lifecycle method
  toggleTodos(id) {
    this.setState({
      todos: this.state.todos.map(todos => {
        if(todos.id !== id) return todos
        return {
          id: todos.id,
          text: todos.text,
          checked: !todos.checked,
        }
      })
    })
  }

  render() {
    return (
      <div>
        <div className='title'>My TODO App</div>
        <div className='count'>
          <p>Total todos: {this.state.todos.length}</p>
          <p>Unchecked Todos: {this.state.todos.filter(todos => todos.checked !== true).length}</p>
          <p>Checked Todos: {this.state.todos.filter(todos => todos.checked !== false).length}</p>
        </div>
        <button className='add-button' onClick={() => this.addTodos()}>add todo</button>
        <ul className='ul'>
          {this.state.todos.map(todos => (<Todos onToggle={() => this.toggleTodos(todos.id)} onDelete={() => this.removeTodos(todos.id)} todos={todos}/>))}
        </ul>
      </div>
    )
  }
}

export default App;
