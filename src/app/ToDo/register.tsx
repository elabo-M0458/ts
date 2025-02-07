"use client";

import { useRouter } from 'next/navigation';
import { useState } from "react";

export const Register = () => {
    
    type Comment ={
        commentId : string,
        commentText : string
    }

    type Task = {
        id: string;
        task: string;
        isComplete: boolean;
        comment: Comment[] | null;
    };

    const router = useRouter();
    const [taskMassage, setTaskMassage] = useState<string>('');
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editingTaskId, setEditingTaskId] = useState<string>('');
    const [isComment,setIsCommnet] = useState<boolean>(false);

    const handleChangeTaskMassage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskMassage(event.target.value);
    };

    const handleChangeCheckBox = (task: Task) => {
        task.isComplete = !task.isComplete;
        setTaskList([...taskList]);
    };

    const addTask = () => {
        if (taskMassage === "") {
            return;
        }

        const task: Task = {
            id: taskList.length.toString(),
            task: taskMassage,
            isComplete: false,
            comment: null
        };

        setTaskList([...taskList, task]);
        setTaskMassage('');
    };

    const deleteTask = (id: string) => {
        setTaskList(taskList.filter((element) => element.id !== id));
    };

    const handleEditTask = (task: Task) => {
        setTaskMassage(task.task);
        setIsEdit(true);
        setEditingTaskId(task.id);
    };

    const confirmEditTask = () => {
        if (editingTaskId === '') {
            return;
        }

        const updatedTaskList = taskList.map((task) => {
            if (task.id === editingTaskId) {
                return { ...task, task: taskMassage };
            }
            return task;
        });

        setTaskList(updatedTaskList);
        setTaskMassage('');
        setIsEdit(false);
        setEditingTaskId('');
    };

    const handleAddComment = (task : Task) => {
        setIsCommnet(true);
        setEditingTaskId(task.id);
    }

    const addComment = () => {

        if(taskMassage === ""){
            setIsCommnet(false);
            return;
        }

        const newComment : Comment = {
            commentId : Date.now().toString(),
            commentText : taskMassage
        }

        const updatedTaskList = taskList.map((task) => { 
            if(task.id === editingTaskId){
                return {
                    ...task,
                    comment : task.comment ? [...task.comment , newComment] : [newComment]
                };
            }
            return task;        
        });

        setTaskList(updatedTaskList);
        setIsCommnet(false);
        setTaskMassage("");
    };

    const deleteComment = (taskId: string, commentId: string) => {
        const updatedTaskList = taskList.map((task) => {
            if (task.id === taskId && task.comment) {
                const updatedComments = task.comment.filter((com) => com.commentId !== commentId);
                return { ...task, comment: updatedComments };
            }
            return task;
        });

        setTaskList(updatedTaskList);
    };

    const back = () => {
        router.push('/');
    };

    return (
        <>
            <ul>
                {taskList.map((task) => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.isComplete}
                            onChange={() => handleChangeCheckBox(task)}
                        />
                        {!task.isComplete ? task.task : task.task + "：完了！"}
                        <button onClick={() => handleEditTask(task)}>編集</button>
                        <button onClick={() => handleAddComment(task)}>コメント</button>
                        <button onClick={() => deleteTask(task.id)}>削除</button>

                        {task.comment ? (
                            <>
                                <div>
                                    {task.comment.map((com) => (
                                        <div key={com.commentId}>
                                            ┗ {com.commentText}
                                            <button onClick={() => deleteComment(task.id, com.commentId)}>削除</button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : null}
                    </li>
                ))}
            </ul>

            <input type="text" value={taskMassage} onChange={handleChangeTaskMassage} />

            {isEdit ? (
                <button onClick={confirmEditTask}>編集確定</button>
            ) : isComment ? (
                <button onClick={addComment}>コメント追加</button>
            ) : (
                <button onClick={addTask}>登録</button>
            )}

            <button onClick={back}>戻る</button>
        </>
    );
};