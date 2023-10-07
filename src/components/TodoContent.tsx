import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux";
import {deleteTodoThunk, getTodosThunk, changeStatusTodoThunk} from "../redux/slice/todoThunk";
import {Todos} from "../redux/slice/todoSlice";

const TodoContent = () => {
    const {todos} = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        dispatch(getTodosThunk())
    },[dispatch])

    const deleteTodoHandler = (id: string) => dispatch(deleteTodoThunk(id));

    const handleChangeStatus = (item: Todos) => {
        dispatch(
            changeStatusTodoThunk({
                title: item.title,
                date: item.date,
                complete: !item.complete,
                id: item.id,
            })
        );
    };


    return (
        <div className="flex w-full justify-center mt-20">
            <table className="table w-[900px]">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Complete</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {todos?.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td className={item.complete ? "text-red-400 font-bold" : ""}>{item.title}</td>
                            <td>{item.date}</td>
                            <input onChange={()=> handleChangeStatus(item)} type="checkbox" checked={item.complete} className="checkbox checkbox-primary mt-6 ml-8"/>
                            <td><button disabled={!item.complete} onClick={() => deleteTodoHandler(item.id)} className="btn btn-square bg-red-600">Del</button></td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default TodoContent;