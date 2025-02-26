import axios from "axios";
import { useState } from "react";
import { CreatedCommentDto } from "../types/createCommentDto";
import { Task, TaskComment } from "@/app/Tasks/types/task";

type Props = {
    taskMassage : string 
    , baseUrl : string 
    , editingTaskId : string 
    , taskList : Task[] 
    , setTaskList : (tasks : Task[]) => void;
    setTaskMassage : (taskMassage : string) => void;
};

export const useComments = (props : Props) => {

    const [isComment,setIsCommnet] = useState<boolean>(false);

    const addComment = async () => {

        if(props.taskMassage === ""){
            setIsCommnet(false);
            return;
        }

        const createdCommentDto : CreatedCommentDto = {
            commentText : props.taskMassage
        }

        const response = await axios.post(
            props.baseUrl + `/${props.editingTaskId}/comments`
            ,createdCommentDto
            ,{headers:{'Content-Type': 'application/json',}}
        )

        const newComment : TaskComment = {
            commentId : response.data.id,
            commentText : response.data.commentText
        }

        const updatedTaskList = props.taskList.map((task) => { 
            if(task.id === props.editingTaskId){
                return {
                    ...task,
                    comment : task.comment ? [...task.comment , newComment] : [newComment]
                };
            }
            return task;        
        });

        props.setTaskList(updatedTaskList);
        setIsCommnet(false);
        props.setTaskMassage("");

    };
    
    return {isComment,addComment}
}

    // const deleteComment = async (taskId: string, commentId: string) => {
    //     const responce = await axios.delete(
    //          baseUrl + `/${taskId}/comments/${commentId}`
    //     )

    //     const updatedTaskList = taskList.map((task) => {
    //         if (task.id === taskId && task.comment) {
    //             const updatedComments = task.comment.filter((com) => com.commentId !== commentId);
    //             return { ...task, comment: updatedComments };
    //         }
    //         return task;
    //     });
    //     setTaskList(updatedTaskList);
    // };
     