import { isColorDark } from "../../utils";
import { TodoType, CategoryType, TodosFiltersType } from "../../types";

export const TodoListComponent = ({
  allTodos,
  deleteTodo,
  editTodo,
  setTodoToEdit,
  todoToEdit,
  allCategories,
}: {
  allTodos: TodoType[];
  deleteTodo: (id: number) => void;
  editTodo: (todo: TodoType) => void;
  setTodoToEdit: (todo: TodoType | null) => void;
  todoToEdit: TodoType | null;
  allCategories: CategoryType[];
}) => {
  return (
    <div className="w-full">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 w-1/4">Id</th>
            <th className="px-4 py-2 w-1/2">Title</th>
            <th className="px-4 py-2 w-1/4">Category</th>
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
