import { formatDate, isColorDark } from "../../utils";
import {
  TodoType,
  CategoryType,
  TodosFiltersType,
  SorterType,
} from "../../types";

export const TodoListComponent = ({
  allTodos,
  deleteTodo,
  editTodo,
  setTodoToEdit,
  todoToEdit,
  allCategories,
  setSearchParams,
  searchParams,
}: {
  allTodos: TodoType[];
  deleteTodo: (id: number) => void;
  editTodo: (todo: TodoType) => void;
  setTodoToEdit: (todo: TodoType | null) => void;
  todoToEdit: TodoType | null;
  allCategories: CategoryType[];
  setSearchParams: (params: TodosFiltersType) => void;
  searchParams: TodosFiltersType;
}) => {
  // param === 0 ? 1 : param === 1 ? 2 : 0;
  const getSortValue = (param?: SorterType) => {
    if (param === SorterType.NONE) return SorterType.ASC;
    if (param === SorterType.ASC) return SorterType.DESC;
    if (param === SorterType.DESC) return SorterType.NONE;
    return SorterType.ASC;
  };

  return (
    <div className="w-full">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 w-1/4">Id</th>
            <th
              className="px-4 py-2 w-1/2 "
              onClick={() => {
                setSearchParams({
                  ...searchParams,
                  orderByTitle: getSortValue(searchParams?.orderByTitle),
                });
              }}
            >
              <div className="flex items-center">
                <span className="cursor-pointer">Title</span>
                <span
                  className={`ml-2 text-gray-500 ${
                    !searchParams?.orderByTitle && "hidden"
                  }  ${
                    searchParams?.orderByTitle === SorterType.NONE
                      ? "hidden"
                      : ""
                  }`}
                >
                  <SortIcon
                    classNames={
                      searchParams?.orderByTitle === SorterType.ASC
                        ? "transform rotate-180"
                        : ""
                    }
                  />
                </span>
              </div>
            </th>
            <th className="px-4 py-2 w-1/4">Category</th>
            <th className="px-4 py-2 w-1/4">IsComplete</th>
            <th
              className="px-4 py-2 w-1/4"
              onClick={() => {
                setSearchParams({
                  ...searchParams,
                  orderByCreatedAt: getSortValue(
                    searchParams?.orderByCreatedAt
                  ),
                });
              }}
            >
              <div className="flex items-center">
                <span className="cursor-pointer">Created at</span>
                <span
                  className={`ml-2 text-gray-500  ${
                    !searchParams?.orderByCreatedAt && "hidden"
                  } ${
                    searchParams?.orderByCreatedAt === SorterType.NONE
                      ? "hidden"
                      : ""
                  }`}
                >
                  <SortIcon
                    classNames={
                      searchParams?.orderByCreatedAt === SorterType.ASC
                        ? "transform rotate-180"
                        : ""
                    }
                  />
                </span>
              </div>
            </th>
            <th
              className="px-4 py-2 w-1/4"
              onClick={() => {
                setSearchParams({
                  ...searchParams,
                  orderByUpdatedAt: getSortValue(
                    searchParams?.orderByUpdatedAt
                  ),
                });
              }}
            >
              <div className="flex items-center">
                <span className="cursor-pointer">Updated at</span>
                <span
                  className={`ml-2 text-gray-500  ${
                    !searchParams?.orderByUpdatedAt && "hidden"
                  }  ${
                    searchParams?.orderByUpdatedAt === SorterType.NONE
                      ? "hidden"
                      : ""
                  }`}
                >
                  <SortIcon
                    classNames={
                      searchParams?.orderByUpdatedAt === SorterType.ASC
                        ? "transform rotate-180"
                        : ""
                    }
                  />
                </span>
              </div>
            </th>
            <th
              className="px-4 py-2 w-1/4"
              onClick={() => {
                setSearchParams({
                  ...searchParams,
                  orderByRemindAt: getSortValue(searchParams?.orderByRemindAt),
                });
              }}
            >
              <div className="flex items-center">
                <span className="cursor-pointer">Remind at</span>
                <span
                  className={`ml-2 text-gray-500   ${
                    !searchParams?.orderByRemindAt && "hidden"
                  }  ${
                    searchParams?.orderByRemindAt === SorterType.NONE
                      ? "hidden"
                      : ""
                  }`}
                >
                  <SortIcon
                    classNames={
                      searchParams?.orderByRemindAt === SorterType.ASC
                        ? "transform rotate-180"
                        : ""
                    }
                  />
                </span>
              </div>
            </th>
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
                {todoToEdit?.id === todo.id ? (
                  <select
                    name="CategoryId"
                    id="CategoryId"
                    className="w-full border p-2 "
                    value={todoToEdit.categoryId || todo.category?.id}
                    onChange={(e) =>
                      setTodoToEdit({
                        ...todoToEdit,
                        categoryId: e.target.value as any,
                      })
                    }
                  >
                    <option value="">All</option>
                    {allCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <>
                    <div
                      className="w-full h-full p-1 rounded"
                      style={
                        todo.category
                          ? {
                              backgroundColor: todo.category.color,
                              color: isColorDark(todo.category.color)
                                ? "white"
                                : "black",
                            }
                          : {}
                      }
                    >
                      {todo.category?.name}
                    </div>
                  </>
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
              <td className="border px-4 py-2">
                {formatDate(new Date(todo.createdAt))}
              </td>
              <td className="border px-4 py-2">
                {formatDate(new Date(todo.updatedAt))}
              </td>

              <td className="border px-4 py-2">
                {todoToEdit?.id === todo.id ? (
                  <input
                    className={`border px-4 py-2 w-full ${
                      todoToEdit?.id === todo.id ? "bg-gray-200" : ""
                    }`}
                    type="datetime-local"
                    value={todoToEdit.remindAt as any}
                    onChange={(e: any) =>
                      setTodoToEdit({ ...todoToEdit, remindAt: e.target.value })
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
                    {todo.remindAt ? formatDate(todo.remindAt) : "No reminder"}
                  </div>
                )}
              </td>

              <td className="border  px-4 py-2">
                <div className="w-100 h-100  flex flex-col justify-center  space-y-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
                      className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setTodoToEdit(null)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SortIcon = ({ classNames }: { classNames?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 ${classNames}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
};
