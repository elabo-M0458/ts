"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { AppBar, Box, Checkbox, Dialog, DialogActions, DialogContentText, DialogTitle, TextField, Toolbar } from "@mui/material";
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios';
import { RegisterTaskDto } from './registerTaskDto';
import { UpdatedTaskDto } from './updatedTaskDto';
import { CreatedCommentDto } from './createCommentDto';

export const Register = () => {
    
    type Comment ={
        commentId : string,
        commentText : string
    }

    type Task = {
        id: string;
        taskName: string;
        isCompleted: boolean;
        comment: Comment[] | null;
    };

    const router = useRouter();
    const [taskMassage, setTaskMassage] = useState<string>('');
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editingTaskId, setEditingTaskId] = useState<string>('');
    const [editingTaskCompleted,setEditingTaskCompleted] = useState<boolean>(false);
    const [isComment,setIsCommnet] = useState<boolean>(false);
    const [dialogOpen , setDialogOpen] = useState(false);
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId') as string;
    const apiUrl = "http://localhost:5000/users/" + userId + "/tasks";

    useEffect(() => {
        const getTask = async (): Promise<Task[]> => {
            const response = await axios.get<Task[]>(apiUrl)
            return response.data;
        }
        getTask().then(setTaskList);
    },[])

    const handleChangeTaskMassage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskMassage(event.target.value);
    };

    const handleChangeCheckBox = async (task: Task) => {

        const updatedTaskDto : UpdatedTaskDto = {
            taskName: task.taskName,
            isCompleted : !task.isCompleted
        }

        const responce = await axios.patch(
            apiUrl + "/" + task.id,
            updatedTaskDto
        )
        task.isCompleted = updatedTaskDto.isCompleted;
        setTaskList([...taskList]);
    };

    const addTask = async () => {
        
        if (taskMassage === "") {
            return;
        }

        const registerTaskDto : RegisterTaskDto = {
            taskName: taskMassage,
            createdBy: userId,
            updatedBy: userId,
            userId: userId
        }

        const response = await axios.post(
            apiUrl
            ,registerTaskDto
            ,{headers:{'Content-Type': 'application/json',}}
        ) 

        const task: Task = {
            id: response.data.id,
            taskName: response.data.taskName,
            isCompleted: response.data.isCompleted,
            comment: null
        };

        toast.success(taskMassage + 'を登録しました。');
        setTaskList([...taskList, task]);
        setTaskMassage('');

    };

    const deleteTask = async (taskId: string , taskName : string) => {

        const response = await axios.delete(
            apiUrl + "/" + taskId
        )

        toast.success(taskName + 'を、削除しました。')

        setTaskList(taskList.filter((task) =>{
            return task.id !== taskId
        }))
        setDialogOpen(false)
    };

    const handleEditTask = (task: Task) => {
        setTaskMassage(task.taskName);
        setIsEdit(true);
        setEditingTaskId(task.id);
        setEditingTaskCompleted(task.isCompleted);
    };

    const confirmEditTask = async () => {
        if (editingTaskId === '') {
            return;
        }

        const updatedTaskDto : UpdatedTaskDto = {
            taskName: taskMassage,
            isCompleted : editingTaskCompleted
        }

        const responce  = await axios.patch(
            apiUrl + "/" + editingTaskId,
            updatedTaskDto
        )

        const updatedTaskList = taskList.map((task) => {
            if (task.id === editingTaskId) {
                return { ...task, taskName: responce.data.taskName };
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

    const addComment = async () => {

        if(taskMassage === ""){
            setIsCommnet(false);
            return;
        }

        const createdCommentDto : CreatedCommentDto = {
            commentText : taskMassage
        }

        const responce = await axios.post(
            apiUrl + "/" + editingTaskId + "/comments"
            ,createdCommentDto
            ,{headers:{'Content-Type': 'application/json',}}
        )

        const newComment : Comment = {
            commentId : responce.data.id,
            commentText : responce.data.commentText
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

    const deleteComment = async (taskId: string, commentId: string) => {

        console.log(commentId)
        const responce = await axios.delete(
             apiUrl + "/" + taskId + "/comments/" + commentId
        )

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

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleOpenDaialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDaialog = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <Toaster />
             <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h2">
                    TODOリストタスク一覧
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 0.5},
                    display: 'flex',
                    flexDirection: 'row', // 要素を縦に並べる
                    alignItems: 'cneter-start', // 左揃え
                }}
                noValidate
                autoComplete="off"
            >
            {/* TextField調整 */}
            
            <TextField
                id="outlined-basic"
                label="タスク名"
                value={taskMassage}
                variant="outlined"
                onChange={handleChangeTaskMassage}
                sx={{
                    marginTop: 'px',
                    '& .MuiInputBase-root': {
                        fontSize: '1rem', // フォントサイズを調整
                        borderRadius: '8px', // 角丸を追加
                        height: '50px',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#b0bec5', // ボーダー色を変更
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1976d2', // ホバー時のボーダー色
                    },
                }}
                
            />

            {/* ボタン調整 */}
            
            {isEdit ? (
                <Button 
                    variant="contained" 
                    onClick={confirmEditTask}
                    sx={{
                        backgroundColor: '#1976d2', // ボタンの背景色
                        '&:hover': {
                            backgroundColor: '#1565c0', // ホバー時の背景色
                        },
                        borderRadius: '8px', // ボタンの角丸
                        padding: '10px 20px', // ボタンの内側の余白調整
                        fontSize: '1rem', // ボタンのフォントサイズ
                        textTransform: 'none', // ボタン文字の大文字化を防ぐ
                        boxShadow: 'none', // ボタンのシャドウを無効化
                        width: '110px'
                        }}
                    >編集確定</Button>
            ) : isComment ? (
                <Button 
                    variant="contained" 
                    onClick={addComment}
                    sx={{
                        backgroundColor: '#1976d2', // ボタンの背景色
                        '&:hover': {
                            backgroundColor: '#1565c0', // ホバー時の背景色
                        },
                        borderRadius: '8px', // ボタンの角丸
                        padding: '10px 20px', // ボタンの内側の余白調整
                        fontSize: '1rem', // ボタンのフォントサイズ
                        textTransform: 'none', // ボタン文字の大文字化を防ぐ
                        boxShadow: 'none', // ボタンのシャドウを無効化
                        width: '140px'
                        }}
                >
                    コメント追加
                </Button>
            ) : (
                <Button 
                    variant="contained" 
                    onClick={addTask}
                    sx={{
                        backgroundColor: '#1976d2', // ボタンの背景色
                        '&:hover': {
                            backgroundColor: '#1565c0', // ホバー時の背景色
                        },
                        borderRadius: '8px', // ボタンの角丸
                        padding: '10px 20px', // ボタンの内側の余白調整
                        fontSize: '1rem', // ボタンのフォントサイズ
                        textTransform: 'none', // ボタン文字の大文字化を防ぐ
                        boxShadow: 'none', // ボタンのシャドウを無効化
                        width: '80px'
                        }}
                >
                    登録
                </Button>
            )}

            <Button
                variant="contained"
                onClick={back}
                sx={{
                    backgroundColor: '#B0BEC5', // ボタンの背景色
                    '&:hover': {
                        backgroundColor: '#90A4AE', // ホバー時の背景色
                    },
                    borderRadius: '8px', // ボタンの角丸
                    padding: '10px 20px', // ボタンの内側の余白調整
                    fontSize: '1rem', // ボタンのフォントサイズ
                    textTransform: 'none', // ボタン文字の大文字化を防ぐ
                    boxShadow: 'none', // ボタンのシャドウを無効化
                    width: '80px'
                }}
            >
                戻る
            </Button>
            
            </Box>

                {taskList.map((task) => {
                    return (
                    <Card key={task.id}>
                        <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Checkbox
                                {...label}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }}
                                onChange={() => handleChangeCheckBox(task)}
                            />

                            <Typography variant="h4"
                                sx={{ 
                                    textDecoration: task.isCompleted ? 'line-through' : 'none',
                                    color: task.isCompleted ? 'text.disabled' : 'inherit', 
                                  }}
                            >
                                {task.taskName}
                            </Typography>
                            
                        </Box>
                            {task.comment?.map((comment, index) => (
                                <Typography key={index} variant="body2">
                                    コメント{index + 1}：{comment.commentText}
                                <Button size="small" onClick={() => deleteComment(task.id, comment.commentId)}>削除</Button>
                                </Typography>
                            ))}
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => handleEditTask(task)}>編集</Button>
                            <Button size="small" onClick={() => handleOpenDaialog()}>削除</Button>
                            <Dialog
                                open={dialogOpen}
                                onClose={() => handleCloseDaialog()}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                PaperProps={{
                                    sx: {
                                        borderRadius: "8px",  // ダイアログの角を丸くする
                                    },
                                }}
                                sx={{
                                    top: "-20%",
                                    left: "0%",
                                    padding: "20px", 
                                  }}
                            >
                                <DialogTitle id="alert-dialog-title"sx={{ fontSize: "25px", textAlign: "left" ,paddingBottom: "30px",}}>
                                    {"タスクを削除しますか？"}
                                </DialogTitle>
                                <DialogContentText id="alert-dialog-description"
                                    sx={{ fontSize: "18px", 
                                          textAlign: "center", 
                                          paddingBottom: "16px",
                                          paddingLeft: "30px", 
                                          paddingRight: "30px",
                                          }} >
                                    もう元に戻すことはできません。本当によろしいですか？
                                </DialogContentText>
                                <DialogActions>
                                    <Button onClick={() => deleteTask(task.id,task.taskName)} sx={{ fontSize: "18px" }}>削除</Button>
                                    <Button onClick={() =>handleCloseDaialog()} sx={{ fontSize: "18px" }} autoFocus>キャンセル</Button>
                                </DialogActions>
                            </Dialog>
                            <Button size="small" onClick={() => handleAddComment(task)}>コメント追加</Button>
                        </CardActions>
                    </Card>
                );
            })}
        </>
    );
};