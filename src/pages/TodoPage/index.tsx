import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { TodoType, CategoryType, TodosFiltersType } from "../../types";
import { TodoFormComponent } from "./TodoForm";
import { TodosListFiltersComponent } from "./TodosFilters";
import { TodoListComponent } from "./TodoList";

const axiosHeaders = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const TodoApp = () => {
  const [allTodos, setAllTodos] = useState<TodoType[]>([]);
  const [allCategories, setAllCategories] = useState<CategoryType[]>([]);
  const [todoToEdit, setTodoToEdit] = useState<TodoType | null>(null);
  const [searchParams, setSearchParams] = useState<TodosFiltersType>({});

  const getFormattedSearchParams = () =>
    Object.keys(searchParams).map((key) => {
      return searchParams[key] && `${key}=${searchParams[key]}`;
    });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }

    getAllTodos();

    getAllCategories();
  }, []);

  const getAllTodos = async () => {
    const response = await axios.get(
      `/Todos?${getFormattedSearchParams().join("&")}`,
      axiosHeaders
    );
    setAllTodos(response.data);
  };

  const getAllCategories = async () => {
    const response = await axios.get("/Category", axiosHeaders);
    setAllCategories(response.data);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getAllTodos();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    searchParams.id,
    searchParams.title,
    searchParams.isComplete,
    searchParams.categoryId,
  ]);

  const deleteTodo = async (id: number) => {
    await axios.delete(`/Todos?id=${id}`, axiosHeaders);
    getAllTodos();
  };

  const editTodo = async (todo: TodoType) => {
    await axios.put(`/Todos?id=${todo.id}`, todo, axiosHeaders);

    getAllTodos();
    setTodoToEdit(null);
  };

  return (
    <div className="flex flex-col  py-2">
      <h1 className="text-2xl font-bold text-gray-900 mb-10">Todo App</h1>
      <TodoFormComponent
        getAllTodos={getAllTodos}
        allCategories={allCategories}
      />

      <TodosListFiltersComponent
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        allCategories={allCategories}
      />

      <TodoListComponent
        allTodos={allTodos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        setTodoToEdit={(todo: TodoType | null) => setTodoToEdit(todo)}
        todoToEdit={todoToEdit}
        allCategories={allCategories}
      />
    </div>
  );
};

export default TodoApp;
