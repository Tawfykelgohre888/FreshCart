import useCategories from "../../Hooks/useCategories";

export default function Categories() {
  const { allCategories, isLoading } = useCategories();

  return (
    <div className="container mx-auto min-h-screen py-10 px-5 mt-20 ">
      <h2 className="text-center text-3xl font-bold mb-10 text-gray-800">
        Categories
      </h2>
      <div className="grid grid-cols-1 mx-auto sm:grid-cols-2 md:grid-cols-3 gap-8">
        {allCategories?.map((cat) => (
          <div
            key={cat._id}
            className="group bg-white p-5 rounded-2xl shadow-md border border-gray-200 transition-all duration-300"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-52 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="text-center mt-4 text-xl font-semibold text-gray-700">
              {cat.name}
            </div>
            <div className="absolute inset-0 rounded-2xl shadow-lg shadow-green-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

