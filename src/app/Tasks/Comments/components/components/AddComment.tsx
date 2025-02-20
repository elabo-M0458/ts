import { Task } from "@/app/Tasks/types/task";
import { useComments } from "../hooks/useComments"
import { Button } from "@mui/material";

type Props = {
    taskMassage : string 
    , baseUrl : string 
    , editingTaskId : string 
    , taskList : Task[] 
    , setTaskList : (tasks : Task[]) => void;
    setTaskMassage : (taskMassage : string) => void;
};

export const AddComment = (props : Props) => {
    const {isComment,addComment} = useComments(props);

    return (
        isComment ? (
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
        ) : null
    )
}