import { useEffect, useState } from "react";
import axios from "../utils/axios";

type Todo = {
  id: number;
  title: string;
  isComplete: boolean;
};

const axiosHeaders = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const TodoApp = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);
  const [searchParams, setSearchParams] = useState<{
    id?: number;
    title?: String;
    isComplete?: boolean;
    [key: string]: any;
  }>({});

  const getFormattedSearchParams = () =>
    Object.keys(searchParams).map((key) => {
      return searchParams[key] && `${key}=${searchParams[key]}`;
    });

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = async () => {
    // const response = await fetch(
    //   `https://localhost:7144/api/Todos?${getFormattedSearchParams().join("&")}`
    // );
    const response = await axios.get(
      `/Todos?${getFormattedSearchParams().join("&")}`,
      axiosHeaders
    );
    setAllTodos(response.data);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getAllTodos();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchParams.id, searchParams.title, searchParams.isComplete]);

  const deleteTodo = async (id: number) => {
    await axios.delete(`/Todos?id=${id}`, axiosHeaders);
    getAllTodos();
  };

  const editTodo = async (todo: Todo) => {
    await axios.put(`/Todos?id=${todo.id}`, todo, axiosHeaders);

    getAllTodos();
    setTodoToEdit(null);
  };

  return (
    <div className="flex flex-col  py-2">
      <h1 className="text-2xl font-bold text-gray-900 mb-10">Todo App</h1>
      <TodoFormComponent getAllTodos={getAllTodos} />

      <TodosListFiltersComponent
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        allTodos={allTodos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        setTodoToEdit={(todo: Todo) => setTodoToEdit(todo)}
        todoToEdit={todoToEdit}
      />

      <TodoListComponent
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        allTodos={allTodos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        setTodoToEdit={(todo: Todo) => setTodoToEdit(todo)}
        todoToEdit={todoToEdit}
      />
    </div>
  );
};

const TodosListFiltersComponent = ({
  allTodos,
  deleteTodo,
  editTodo,
  setTodoToEdit,
  todoToEdit,
  setSearchParams,
  searchParams,
}: {
  allTodos: Todo[];
  deleteTodo: (id: number) => void;
  editTodo: (todo: Todo) => void;
  setTodoToEdit: (todo: Todo) => void;
  todoToEdit: Todo | null;
  setSearchParams: (params: {
    id?: number;
    title?: String;
    isComplete?: boolean;
  }) => void;
  searchParams: { id?: number; title?: String; isComplete?: boolean };
}) => {
  return (
    <div>
      <h1>Filters</h1>
      <div className="flex space-x-6 items-center mb-4 mt-4">
        <div className="flex flex-col w-1/3">
          <label htmlFor="isComplete">Is Complete</label>
          <select
            name="isComplete"
            id="isComplete"
            className="border p-2 "
            onChange={(e) => {
              setSearchParams({
                ...searchParams,
                isComplete:
                  e.target.value === "true"
                    ? true
                    : e.target.value === "false"
                    ? false
                    : undefined,
              });
            }}
          >
            <option value="">All</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="flex flex-col w-1/3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="border p-2 "
            onChange={(e) => {
              setSearchParams({ ...searchParams, title: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col w-1/3">
          <label htmlFor="id">Id</label>
          <input
            type="text"
            name="id"
            id="id"
            className="border p-2 "
            onChange={(e) => {
              setSearchParams({
                ...searchParams,
                id: e.target.value && parseInt(e.target.value),
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

const TodoFormComponent = ({ getAllTodos }: { getAllTodos: () => void }) => {
  const [title, setTitle] = useState<string>("");

  const createTodo = async () => {
    await axios.post("/Todos", { title }, axiosHeaders);
    getAllTodos();
    setTitle("");
  };

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
  );
};

const TodoListComponent = ({
  allTodos,
  deleteTodo,
  editTodo,
  setTodoToEdit,
  todoToEdit,
  setSearchParams,
  searchParams,
}: {
  allTodos: Todo[];
  deleteTodo: (id: number) => void;
  editTodo: (todo: Todo) => void;
  setTodoToEdit: (todo: Todo) => void;
  todoToEdit: Todo | null;
  setSearchParams: (params: {
    id?: number;
    title?: String;
    isComplete?: boolean;
  }) => void;
  searchParams: { id?: number; title?: String; isComplete?: boolean };
}) => {
  // TODO : add sort functionality by id and title alph. order
  // TODO : add pagination
  return (
    <div className="w-full">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 w-1/4">Id</th>
            <th className="px-4 py-2 w-1/2">Title</th>
            <th className="px-4 py-2 w-1/4">IsComplete</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allTodos.map((todo) => (
            <tr
              key={todo.id}
              className={`border-b border-gray-200 hover:bg-gray-100 ${
                todoToEdit?.id === todo.id ? "bg-gray-200" : ""
              } todo-${todo.id}`}
            >
              <td className="border px-4 py-2">{todo.id}</td>
              <td className="border px-4 py-2">
                {todoToEdit?.id === todo.id ? (
                  <input
                    className={`border px-4 py-2 w-full ${
                      todoToEdit?.id === todo.id ? "bg-gray-200" : ""
                    }`}
                    type="text"
                    value={todoToEdit.title}
                    onChange={(e) =>
                      setTodoToEdit({ ...todoToEdit, title: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        editTodo(todoToEdit);
                      }
                    }}
                  />
                ) : (
                  <div
                    className={`border px-4 py-2 w-full ${
                      todo.isComplete ? "line-through" : ""
                    }`}
                    onClick={() => {
                      setTodoToEdit(todo);
                      // focus input
                      setTimeout(() => {
                        const input: HTMLInputElement | null =
                          document.querySelector(`.todo-${todo.id} input`);
                        if (input) {
                          input.focus();
                        }
                      }, 0);
                    }}
                  >
                    {todo.title}
                  </div>
                )}
              </td>
              <td className="border px-4 py-2">
                <label
                  htmlFor={`checked-toggle-${todo.id}`}
                  className="inline-flex relative items-center cursor-pointer"
                >
                  <input
                    className={`sr-only peer border px-4 py-2 w-full ${
                      todoToEdit?.id === todo.id ? "bg-gray-200" : ""
                    } `}
                    id={`checked-toggle-${todo.id}`}
                    type="checkbox"
                    checked={todo.isComplete}
                    onChange={(e) =>
                      editTodo({ ...todo, isComplete: !todo.isComplete })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        editTodo({ ...todo, isComplete: !todo.isComplete });
                      }
                    }}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </td>
              <td className="border px-4 py-2 flex space-x-2">
                <button
                  className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    if (todoToEdit?.id === todo.id) {
                      editTodo(todoToEdit);
                      setTodoToEdit(null);
                      return;
                    }
                    setTodoToEdit(todo);
                  }}
                >
                  {todoToEdit?.id === todo.id ? "Save" : "Edit"}
                </button>
                {todoToEdit?.id !== todo.id ? (
                  <button
                    className="w-1/2  bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    className="w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setTodoToEdit(null)}
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoApp;
