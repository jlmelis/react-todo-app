import React, { useState, useEffect } from 'react';
import Header from './Header';
import TodoList from './TodoList';
import InputTodo from './InputTodo';
import { v4 as uuidv4 } from 'uuid';

const TodoContainer = () => {
    function getInitialTodos() {
        const temp = localStorage.getItem('todos');
        const savedTodos = JSON.parse(temp);

        return savedTodos || [];
    }

    const [todos, setTodos] = useState(getInitialTodos());

    // componend did mount
    // useEffect(() => {
    //     console.log('test run');

    //     const temp = localStorage.getItem('todos');
    //     const loadedTodos = JSON.parse(temp);

    //     if (loadedTodos) {
    //         setTodos(loadedTodos);
    //     }

    // }, [setTodos]);

    useEffect(() => {
        const temp = JSON.stringify(todos);
        localStorage.setItem('todos', temp);
    },[todos]);

    const handleChange = id => {
        setTodos(prevState => 
            prevState.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    }
                }
                return todo;
            })
        );
    };

    const deleteTodo = id => {
        setTodos([
            ...todos.filter(todo => {
                return todo.id !== id;
            })
        ]);
    };

    const addTodoItem = title => {
        const newTodo = {
            id: uuidv4(),
            title: title,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    const updateTodo = (updateTitle, id) => {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    todo.title = updateTitle;
                }
                return todo;
            })
        );
    }

    return (
        <div className="container">
            <div className="inner">
                <Header />
                <InputTodo addTodoProps={addTodoItem} />
                <TodoList 
                    todos={todos} 
                    handleChangeProps={handleChange}
                    deleteTodoProps={deleteTodo} 
                    updateTodo={updateTodo}
                />
            </div>
        </div>
    );
};

export default TodoContainer;