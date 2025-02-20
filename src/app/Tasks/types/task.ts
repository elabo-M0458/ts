export type Task = {
    id: string;
    taskName: string;
    isCompleted: boolean;
    comment: TaskComment[] | null;
};


export type TaskComment = {
    commentId : string,
    commentText : string
}