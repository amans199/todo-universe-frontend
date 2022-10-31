import { TodoType, CategoryType, TodosFiltersType } from "../../types";

export const TodosListFiltersComponent = ({
  setSearchParams,
  searchParams,
  allCategories,
}: {
  setSearchParams: (params: TodosFiltersType) => void;
  searchParams: TodosFiltersType;
  allCategories: CategoryType[];
}) => {
  return (
    <div>
      <h1>Filters</h1>
      <div className="flex space-x-6 items-center mb-4 mt-4">
        <div className="flex flex-col w-1/4">
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
        <div className="flex flex-col w-1/4">
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
        <div className="flex flex-col w-1/4">
          <label htmlFor="CategoryId">Category</label>
          <select
            name="CategoryId"
            id="CategoryId"
            className="border p-2 "
            onChange={(e) => {
              setSearchParams({
                ...searchParams,
                categoryId:
                  e.target.value === "" ? undefined : (e.target.value as any),
              });
            }}
          >
            <option value="">All</option>
            {allCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-1/4">
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
