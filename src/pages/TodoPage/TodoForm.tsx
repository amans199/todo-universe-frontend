import axios from "../../utils/axios";
import { useState } from "react";
import { TodoType, CategoryType, TodosFiltersType } from "../../types";
import { axiosHeaders } from "../../utils";

export const TodoFormComponent = ({
  getAllTodos,
  allCategories,
}: {
  getAllTodos: () => void;
  allCategories: CategoryType[];
}) => {
  const [title, setTitle] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [remindAt, setRemindAt] = useState<string>("");

  const createTodo = async () => {
    await axios.post("/Todos", { title, categoryId, remindAt }, axiosHeaders);
    getAllTodos();
    setTitle("");
    setCategoryId(undefined);
    setRemindAt("");
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
      <select
        name="CategoryId"
        className="w-full border p-2 "
        onChange={(e) => setCategoryId(e.target.value as any)}
      >
        <option value="">UnCategorized</option>
        {allCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <input
        className="w-full px-4 py-2 border rounded-lg"
        type="datetime-local"
        placeholder="Remind At"
        value={remindAt}
        onChange={(e) => setRemindAt(e.target.value)}
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
