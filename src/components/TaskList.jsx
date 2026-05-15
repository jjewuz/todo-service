import React from 'react';

import TaskItem from './TaskItem';

const TaskList = ({
    tasks,
    editingId,
    editingText,
    setEditingText,
    handleEditStart,
    handleEditSave,
    handleEditCancel,
    handleDuplicateTask,
    handleDeleteTask
}) => {
    return (
        <div className="to-do__list">
            {tasks.map((task, index) => (
                <TaskItem
                    key={index}
                    task={task}
                    index={index}
                    editingId={editingId}
                    editingText={editingText}
                    setEditingText={setEditingText}
                    handleEditStart={handleEditStart}
                    handleEditSave={handleEditSave}
                    handleEditCancel={handleEditCancel}
                    handleDuplicateTask={handleDuplicateTask}
                    handleDeleteTask={handleDeleteTask}
                />
            ))}
        </div>
    );
};

export default TaskList;