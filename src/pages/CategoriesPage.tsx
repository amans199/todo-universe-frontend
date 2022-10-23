import { useEffect, useState } from "react";
import axios from "../utils/axios";

type Category = {
  id: number;
  name: string;
  description: string;
  color: string;
};

type CategorySearchParams = {
  id?: number;
  name?: string;
  description?: string;
  color?: string;
  [key: string]: any;
};
const axiosHeaders = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const CategoryApp = () => {
  const [allCategorys, setAllCategorys] = useState<Category[]>([]);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [searchParams, setSearchParams] = useState<CategorySearchParams>({});

  const getFormattedSearchParams = () =>
    Object.keys(searchParams).map((key) => {
      return searchParams[key] && `${key}=${searchParams[key]}`;
    });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }

    getAllCategorys();
  }, []);

  const getAllCategorys = async () => {
    const response = await axios.get(
      `/Category?${getFormattedSearchParams().join("&")}`,
      axiosHeaders
    );
    setAllCategorys(response.data);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getAllCategorys();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    searchParams.id,
    searchParams.name,
    searchParams.description,
    searchParams.color,
  ]);

  const deleteCategory = async (id: number) => {
    await axios.delete(`/Category?id=${id}`, axiosHeaders);
    getAllCategorys();
  };

  const editCategory = async (category: Category) => {
    await axios.put(`/Category?id=${category.id}`, category, axiosHeaders);

    getAllCategorys();
    setCategoryToEdit(null);
  };

  return (
    <div className="flex flex-col  py-2">
      <h1 className="text-2xl font-bold text-gray-900 mb-10">Category App</h1>
      <CategoryFormComponent getAllCategorys={getAllCategorys} />

      <CategorysListFiltersComponent
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />

      <CategoryListComponent
        allCategorys={allCategorys}
        deleteCategory={deleteCategory}
        editCategory={editCategory}
        setCategoryToEdit={(category: Category | null) =>
          setCategoryToEdit(category)
        }
        categoryToEdit={categoryToEdit}
      />
    </div>
  );
};

const CategorysListFiltersComponent = ({
  setSearchParams,
  searchParams,
}: {
  setSearchParams: (params: CategorySearchParams) => void;
  searchParams: CategorySearchParams;
}) => {
  return (
    <div>
      <h1>Filters</h1>
      <div className="flex space-x-6 items-center mb-4 mt-4">
        <div className="flex flex-col w-1/3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="border p-2 "
            onChange={(e) => {
              setSearchParams({ ...searchParams, name: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col w-1/3">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            className="border p-2 "
            onChange={(e) => {
              setSearchParams({ ...searchParams, description: e.target.value });
            }}
          />
        </div>
        {/* this should be a select box of colors options fetched from the backend  */}
        {/* <div className="flex flex-col w-1/3">
          <label htmlFor="color">Color</label>
          <input
            type="color"
            name="color"
            id="color"
            className="border p-2 w-full h-[40px]"
            onChange={(e) => {
              setSearchParams({ ...searchParams, color: e.target.value });
            }}
          />
        </div> */}
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
                id: e.target.value ? parseInt(e.target.value) : undefined,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

const CategoryFormComponent = ({
  getAllCategorys,
}: {
  getAllCategorys: () => void;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");

  const createCategory = async () => {
    try {
      await axios.post("/Category", { name, description, color }, axiosHeaders);
      getAllCategorys();
      setName("");
      setDescription("");
      setColor("");
    } catch (error) {
      console.log(
        "🚀 ~ file: CategoriesPage.tsx ~ line 183 ~ createCategory ~ error",
        error
      );
    }
  };

  return (
    <div className="flex flex-row items-center justify-between p-3 w-full border rounded space-x-4">
      <input
        className="w-full px-4 py-2 border rounded-lg"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full px-4 py-2 border rounded-lg"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="color"
        placeholder="Color"
        className="w-full px-4 py-2 border rounded-lg h-[40px]"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createCategory();
          }
        }}
      />

      <div className="flex space-x-4">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-lg disabled:opacity-50"
          onClick={() => createCategory()}
          disabled={!name || !description || !color}
        >
          Create
        </button>
        <button
          className="px-4 py-2 text-white bg-red-500 rounded-lg disabled:opacity-50"
          onClick={() => {
            setName("");
            setDescription("");
            setColor("");
          }}
          disabled={!name || !description || !color}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const CategoryListComponent = ({
  allCategorys,
  deleteCategory,
  editCategory,
  setCategoryToEdit,
  categoryToEdit,
}: {
  allCategorys: Category[];
  deleteCategory: (id: number) => void;
  editCategory: (category: Category) => void;
  setCategoryToEdit: (category: Category | null) => void;
  categoryToEdit: Category | null;
}) => {
  return (
    <div className="w-full">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 w-1/5">Id</th>
            <th className="px-4 py-2 w-1/5">Name</th>
            <th className="px-4 py-2 w-2/5">Description</th>
            <th className="px-4 py-2 w-1/5">Color</th>
          </tr>
        </thead>
        <tbody>
          {allCategorys.map((category) => (
            <tr
              key={category.id}
              className={`border-b border-gray-200 hover:bg-gray-100 ${
                categoryToEdit?.id === category.id ? "bg-gray-200" : ""
              } category-${category.id}`}
            >
              <td className="border px-4 py-2">{category.id}</td>
              <td className="border px-4 py-2">
                {categoryToEdit?.id === category.id ? (
                  <input
                    className={`border px-4 py-2 w-full ${
                      categoryToEdit?.id === category.id ? "bg-gray-200" : ""
                    }`}
                    type="text"
                    value={categoryToEdit.name}
                    onChange={(e) =>
                      setCategoryToEdit({
                        ...categoryToEdit,
                        name: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        editCategory(categoryToEdit);
                      }
                    }}
                  />
                ) : (
                  <div
                    className={`border px-4 py-2 w-full `}
                    onClick={() => {
                      setCategoryToEdit(category);
                      // focus input
                      setTimeout(() => {
                        const input: HTMLInputElement | null =
                          document.querySelector(
                            `.category-${category.id} input`
                          );
                        if (input) {
                          input.focus();
                        }
                      }, 0);
                    }}
                  >
                    {category.name}
                  </div>
                )}
              </td>
              <td>
                {categoryToEdit?.id === category.id ? (
                  <input
                    className={`border px-4 py-2 w-full ${
                      categoryToEdit?.id === category.id ? "bg-gray-200" : ""
                    }`}
                    type="text"
                    value={categoryToEdit.description}
                    onChange={(e) =>
                      setCategoryToEdit({
                        ...categoryToEdit,
                        description: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        editCategory(categoryToEdit);
                      }
                    }}
                  />
                ) : (
                  <div
                    className={`border px-4 py-2 w-full `}
                    onClick={() => {
                      setCategoryToEdit(category);
                      // focus input
                      setTimeout(() => {
                        const input: HTMLInputElement | null =
                          document.querySelector(
                            `.category-${category.id} input`
                          );
                        if (input) {
                          input.focus();
                        }
                      }, 0);
                    }}
                  >
                    {category.description}
                  </div>
                )}
              </td>
              <td>
                <input
                  className={`border px-4 py-2 w-full ${
                    categoryToEdit?.id === category.id ? "bg-gray-200" : ""
                  } h-[40px]`}
                  type="color"
                  value={
                    categoryToEdit?.id === category.id
                      ? categoryToEdit.color
                      : category.color
                  }
                  onChange={(e) => {
                    if (!categoryToEdit) return;
                    setCategoryToEdit({
                      ...categoryToEdit,
                      color: e.target.value,
                    });
                  }}
                  onKeyDown={(e) => {
                    if (!categoryToEdit) return;
                    if (e.key === "Enter") {
                      editCategory(categoryToEdit);
                    }
                  }}
                  disabled={categoryToEdit?.id !== category.id}
                />
              </td>
              <td className="border px-4 py-2 flex space-x-2">
                <button
                  className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    if (categoryToEdit?.id === category.id) {
                      editCategory(categoryToEdit);
                      setCategoryToEdit(null);
                      return;
                    }
                    setCategoryToEdit(category);
                  }}
                >
                  {categoryToEdit?.id === category.id ? "Save" : "Edit"}
                </button>
                {categoryToEdit?.id !== category.id ? (
                  <button
                    className="w-1/2  bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => deleteCategory(category.id)}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    className="w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setCategoryToEdit(null)}
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

export default CategoryApp;
