import React, { useState } from 'react';

const InputTodo = (props) => {
    const [inputText, setInputText] = useState({
        title: '',
    });

    const onChange = e => {
        setInputText({
            ...inputText,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (inputText.title.trim()) {
            props.addTodoProps(inputText.title);
            setInputText({
                ...inputText,
                title: '',
            });
        } else {
            alert ('Please write item');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-contaier">
            <input
                type="text"
                className="input-text"
                placeholder="Add todo..."
                value={inputText.title}
                name="title"
                onChange={onChange}
            />
            <button className="input-submit">Submit</button>
        </form>
    );
}

export default InputTodo;