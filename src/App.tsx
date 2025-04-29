import React, { useState } from 'react';
import './App.css';
import users from './users'; 
import Tools from './tools/tools';


interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const initialTodos: Todo[] = users.map(user => ({
    userId: user.id,
    id: user.id, 
    title: user.name, 
    completed: false,
  }));

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [text, setText] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');

  const handleAdd = () => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      userId: 0, 
      id: Math.floor(Math.random() * 10000),
      title: text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setText('');
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.title);
  };

  const saveEdit = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, title: editText } : todo
    ));
    setEditingId(null);
  };

  const remove = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <section className='todo-app'>
      <Tools editingId ={editingId} todos={todos} text={text} setText={setText} editText={editText}
       remove={remove}
       saveEdit={saveEdit}
       startEditing={startEditing}
       toggleComplete={toggleComplete}
       handleAdd = {handleAdd}
       />
    </section>
  );
}

export default App;
