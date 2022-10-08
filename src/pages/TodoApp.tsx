import { useEffect, useState } from "react";


type Todo = {
    id: number;
    title: string;
}

export const TodoApp = () => {
    const [allTodos , setAllTodos] = useState<Todo[]>([]);
    const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);
    
    useEffect(() => {
        getAllTodos();
    }, []);

    const getAllTodos = async () => {
        const response = await fetch("https://localhost:7144/api/Todos");
        const data = await response.json();
        setAllTodos(data);
    }


    const deleteTodo = async (id: number) => {
        await fetch(`https://localhost:7144/api/Todos?id=${id}`, {
            method: "DELETE"
        });
        getAllTodos();
    }

    const editTodo = async (id: number, title: string) => {
        await fetch(`https://localhost:7144/api/Todos?id=${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id, title })
        });
        getAllTodos();
        setTodoToEdit(null);

    }

    return (
        <div className="flex flex-col  py-2">
                <h1 className="text-2xl font-bold text-gray-900 mb-10">Todo App</h1>
                <TodoFormComponent getAllTodos={getAllTodos} allTodos={allTodos} setAllTodos={(todos:Todo[])=>setAllTodos(todos)} />
            <div className="w-full">
                {/* columns with fixed width  */}
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 w-1/4">Id</th>
                                <th className="px-4 py-2 w-1/2">Title</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTodos.map((todo) => (
                                <tr key={todo.id} className={`border-b border-gray-200 hover:bg-gray-100 ${todoToEdit?.id === todo.id ? "bg-gray-200" : ""} todo-${todo.id}`}>
                                    <td className="border px-4 py-2">{todo.id}</td>
                                    <td className="border px-4 py-2">
                                        {todoToEdit?.id === todo.id ? (
                                            <input
                                                className={`border px-4 py-2 w-full ${todoToEdit?.id === todo.id ? "bg-gray-200" : ""}`}
                                                type="text" 
                                                value={todoToEdit.title}
                                                onChange={(e) => setTodoToEdit({ ...todoToEdit, title: e.target.value })}   
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        editTodo(
                                                            todoToEdit.id,
                                                            todoToEdit.title
                                                        );
                                                    }
                                                }}
                                            />
                                        ) : (
                                                <div
                                                 className="border px-4 py-2 w-full"
                                                    onClick={
                                                        () => {
                                                            setTodoToEdit(todo) 
                                                            // focus input 
                                                            setTimeout(() => {
                                                                const input: HTMLInputElement | null = document.querySelector(`.todo-${todo.id} input`);
                                                                if (input) {
                                                                    input.focus();
                                                                }
                                                            }, 0);  
                                                        }
                                                }>{ todo.title}</div>
                                        )}
                                    
                                    </td>
                                    <td className="border px-4 py-2 flex space-x-2">
                                        <button className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                                            if(todoToEdit?.id === todo.id) {
                                                editTodo(todoToEdit.id, todoToEdit.title);
                                                setTodoToEdit(null);
                                                return;
                                            }
                                            setTodoToEdit(todo)
                                        }}>
                                            {todoToEdit?.id === todo.id ? "Save" : "Edit"}
                                        </button>
                                        {todoToEdit?.id !== todo.id ? (
                                            <button className="w-1/2  bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteTodo(todo.id)}>Delete</button>
                                        ) : (
                                            <button className="w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => setTodoToEdit(null)}>Cancel</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    )
}

const TodoFormComponent = ({allTodos,getAllTodos,setAllTodos}: {allTodos:Todo[],getAllTodos:()=>void,setAllTodos:(todos:Todo[])=>void}) => {
    const [title, setTitle] = useState<string>("");

    const createTodo = async () => {
         await fetch("https://localhost:7144/api/Todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title
            })
         });
        getAllTodos()
        setTitle("");
    }


    return (
        <div className="flex flex-row items-center justify-between p-3 w-full border rounded space-x-4">
            <input
                className="w-full px-4 py-2 border rounded-lg"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        createTodo();
                    }
                }}
            />

            <div className="flex space-x-4">
                <button
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg disabled:opacity-50"
                    onClick={() => createTodo()}
                    disabled={!title}
                >
                    Create
                </button>
                <button
                    className="px-4 py-2 text-white bg-red-500 rounded-lg disabled:opacity-50"
                    onClick={() => {
                        setTitle("");
                    }}
                    disabled={!title}

                >
                    Cancel
                </button>
            </div>

        </div>
    )
}



export default TodoApp;