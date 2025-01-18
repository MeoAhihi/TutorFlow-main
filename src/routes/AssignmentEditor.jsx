import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

const AssignmentEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const onRightClick = (e) => {
        e.preventDefault();
        const newState = RichUtils.toggleBlockType(editorState, 'header-one');
        setEditorState(newState);
    };

    const onDragStart = (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    };

    const onDrop = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text');
        const node = document.getElementById(data);
        e.target.appendChild(node);
    };

    return (
        <div
            onContextMenu={onRightClick}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            style={{ border: '1px solid #ddd', padding: '10px', minHeight: '400px' }}
        >
            <Editor
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={setEditorState}
                placeholder="Write something..."
            />
            <div
                id="draggable"
                draggable
                onDragStart={onDragStart}
                style={{ marginTop: '20px', padding: '10px', border: '1px solid #000' }}
            >
                Drag me!
            </div>
        </div>
    );
};

export default AssignmentEditor;