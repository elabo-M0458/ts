"use client";

import { AppBar, Toolbar, Typography, Box, TextField, Button, Card, CardContent, Checkbox, CardActions, Dialog, DialogTitle, DialogContentText, DialogActions } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { useTasks } from "../hooks/useTasks";
import { AddComment } from "../Comments/components/components/AddComment";
import { Task } from "../types/task";

export const Task = () => {
    
    const {taskList,taskMassage,isEdit,dialogOpen,label,baseUrl,editingTaskId,setTaskMassage,setTaskList,handleChangeCheckBox
            ,handleCloseDaialog,handleOpenDaialog,confirmEditTask,addTask
            ,deleteTask,handleChangeTaskMassage,handleEditTask,backService} = useTasks();
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
            ) : (<AddComment taskMassage={taskMassage} baseUrl={baseUrl} editingTaskId={editingTaskId} taskList={taskList} 
                 setTaskList={setTaskList} setTaskMassage={setTaskMassage}></AddComment>
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
                onClick={backService}
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
                            {/* {task.comment?.map((comment, index) => (
                                <Typography key={index} variant="body2">
                                    コメント{index + 1}：{comment.commentText}
                                <Button size="small" onClick={() => deleteComment(task.id, comment.commentId)}>削除</Button>
                                </Typography>
                            ))} */}
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => handleEditTask(task)}>編集</Button>
                            <Button size="small" onClick={() => handleOpenDaialog(task)}>削除</Button>
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
                                    <Button onClick={() => deleteTask()} sx={{ fontSize: "18px" }}>削除</Button>
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
}