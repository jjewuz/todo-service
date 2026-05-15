import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const STORAGE_KEY = 'tasks';

const defaultItems = [
    "Сделать проектную работу",
    "Полить цветы",
    "Пройти туториал по Реакту",
    "Сделать фронт для своего проекта",
    "Прогуляться по улице в солнечный день",
    "Помыть посуду",
];

function App() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState('');

    useEffect(() => {
        const data = localStorage.getItem(STORAGE_KEY);
        const loadedTasks = data ? JSON.parse(data) : defaultItems;
        setTasks(loadedTasks);
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        }
    }, [tasks]);

    const handleAddTask = (e) => {
        e.preventDefault();
        const value = inputValue.trim();
        if (value) {
            setTasks((current) => [value, ...current]);
            setInputValue('');
        }
    };

    const handleDeleteTask = (index) => {
        setTasks((current) => current.filter((_, i) => i !== index));
    };

    const handleDuplicateTask = (index) => {
        setTasks((current) => [current[index], ...current]);
    };

    const handleEditStart = (index, text) => {
        setEditingId(index);
        setEditingText(text);
    };

    const handleEditSave = (index) => {
        if (editingText.trim()) {
            setTasks((current) =>
                current.map((task, i) => (i === index ? editingText.trim() : task))
            );
        }
        setEditingId(null);
        setEditingText('');
    };

    const handleEditCancel = () => {
        setEditingId(null);
        setEditingText('');
    };

    return (
        <div className="body">
            <main className="main">
                <div className="to-do">
                    <h1 className="to-do__title">Мои задачи</h1>

                    <TaskForm
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        handleAddTask={handleAddTask}
                    />

                    <TaskList
                        tasks={tasks}
                        editingId={editingId}
                        editingText={editingText}
                        setEditingText={setEditingText}
                        handleEditStart={handleEditStart}
                        handleEditSave={handleEditSave}
                        handleEditCancel={handleEditCancel}
                        handleDuplicateTask={handleDuplicateTask}
                        handleDeleteTask={handleDeleteTask}
                    />
                </div>
            </main>
        </div>
    );
}

export default App;
