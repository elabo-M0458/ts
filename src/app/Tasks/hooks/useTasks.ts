import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RegisterTaskDto } from "../types/registerTaskDto";
import { UpdatedTaskDto } from "../types/updatedTaskDto";
import { Task } from "../types/task";

export const useTasks = () => {

    const [taskMassage, setTaskMassage] = useState<string>('');
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editingTaskId, setEditingTaskId] = useState<string>('');
    const [deletingTask, setDeletingTask] = useState<Task>();
    const [editingTaskCompleted,setEditingTaskCompleted] = useState<boolean>(false);
    const [dialogOpen , setDialogOpen] = useState(false);
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId') as string;    
    const baseUrl = `http://localhost:5000/users/${userId}/tasks`;
    const router = useRouter();

    useEffect(() => {
        const getTask = async (): Promise<Task[]> => {
            const response = await axios.get<Task[]>(baseUrl)
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

        const response = await axios.patch(
            baseUrl + `/${task.id}`,
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
            baseUrl
            ,registerTaskDto
            ,{headers:{'Content-Type': 'application/json',}}
        ) 

        const task: Task = {...response.data , comment: null};

        toast.success(taskMassage + 'を登録しました。');
        setTaskList([...taskList, task]);
        setTaskMassage('');

    };

    const deleteTask = async () => {

        const response = await axios.delete(
            baseUrl + `/${deletingTask?.id}`
        )

        toast.success(deletingTask?.taskName + 'を、削除しました。')

        setTaskList(taskList.filter((task) =>{
            return task.id !== deletingTask?.id
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
            baseUrl + `/${editingTaskId}`,
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

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleOpenDaialog = (task : Task) => {
        setDialogOpen(true);
        setDeletingTask(task);
    };

    const handleCloseDaialog = () => {
        setDialogOpen(false);
        setDeletingTask(undefined);
    };

    const backService = () => {
        router.push("/");
    };

    return {taskList,taskMassage,isEdit,dialogOpen,label,deletingTask,baseUrl,editingTaskId,setTaskMassage,setTaskList,handleChangeCheckBox
        ,handleCloseDaialog,handleOpenDaialog,confirmEditTask,addTask,deleteTask,handleChangeTaskMassage,handleEditTask,backService};

}