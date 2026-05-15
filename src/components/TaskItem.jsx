import React from 'react';

const TaskItem = ({
    task,
    index,
    editingId,
    editingText,
    setEditingText,
    handleEditStart,
    handleEditSave,
    handleEditCancel,
    handleDuplicateTask,
    handleDeleteTask
}) => {
    const title = typeof task === 'string' ? task : task.title;

    return (
        <div className="to-do__item">
            {editingId === index ? (
                <>
                    <input
                        type="text"
                        className="to-do__item-edit-input"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleEditSave(index);
                            if (e.key === 'Escape') handleEditCancel();
                        }}
                        autoFocus
                    />
                    <button
                        className="to-do__item-button to-do__item-button_type_save"
                        onClick={() => handleEditSave(index)}
                        type="button"
                    >
                        ✓
                    </button>
                    <button
                        className="to-do__item-button to-do__item-button_type_cancel"
                        onClick={handleEditCancel}
                        type="button"
                    >
                        ✕
                    </button>
                </>
            ) : (
                <>
                    <span className="to-do__item-text">{title}</span>
                    <button
                        className="to-do__item-button to-do__item-button_type_edit"
                        onClick={() => handleEditStart(index, title)}
                        type="button"
                    >
                        ✎
                    </button>
                    <button
                        className="to-do__item-button to-do__item-button_type_duplicate"
                        onClick={() => handleDuplicateTask(index)}
                        type="button"
                    >
                        ⧉
                    </button>
                    <button
                        className="to-do__item-button to-do__item-button_type_delete"
                        onClick={() => handleDeleteTask(index)}
                        type="button"
                    >
                        ✕
                    </button>
                </>
            )}
        </div>
    );
};

export default TaskItem;