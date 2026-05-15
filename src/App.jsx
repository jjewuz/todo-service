import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { STORAGE_KEY } from './constants';

const createId = () =>
    typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const createTask = (title) => ({
    id: createId(),
    title,
    date: new Date().toISOString(),
    done: false,
});

const normalizeTask = (task) => {
    if (typeof task === 'string') {
        return createTask(task);
    }

    return {
        id: task?.id ?? createId(),
        title: task?.title ?? String(task),
        date: task?.date ?? new Date().toISOString(),
        done: Boolean(task?.done),
    };
};

const defaultItems = [
    createTask('Сделать проектную работу'),
    createTask('Полить цветы'),
    createTask('Пройти туториал по Реакту'),
    createTask('Сделать фронт для своего проекта'),
    createTask('Прогуляться по улице в солнечный день'),
    createTask('Помыть посуду'),
];

function App() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState('');

    useEffect(() => {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            setTasks(defaultItems);
            return;
        }

        try {
            const parsed = JSON.parse(data);
            const loadedTasks = Array.isArray(parsed)
                ? parsed.map(normalizeTask)
                : defaultItems;
            setTasks(loadedTasks);
        } catch {
            setTasks(defaultItems);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = (e) => {
        e.preventDefault();
        const value = inputValue.trim();
        if (value) {
            setTasks((current) => [createTask(value), ...current]);
            setInputValue('');
        }
    };

    const handleDeleteTask = (index) => {
        setTasks((current) => current.filter((_, i) => i !== index));
    };

    const handleDuplicateTask = (index) => {
        setTasks((current) => {
            const target = current[index];
            if (!target) return current;
            return [{ ...target, id: createId() }, ...current];
        });
    };

    const handleEditStart = (index, text) => {
        setEditingId(index);
        setEditingText(text);
    };

    const handleEditSave = (index) => {
        if (editingText.trim()) {
            setTasks((current) =>
                current.map((task, i) =>
                    i === index ? { ...task, title: editingText.trim() } : task
                )
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
