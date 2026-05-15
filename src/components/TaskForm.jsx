import React from 'react';

const TaskForm = ({ inputValue, setInputValue, handleAddTask }) => {
    return (
        <form className="to-do__form" onSubmit={handleAddTask}>
            <input
                className="to-do__input"
                type="text"
                placeholder="Что нужно сделать?"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="to-do__submit" type="submit">
                Добавить
            </button>
        </form>
    );
};

export default TaskForm;