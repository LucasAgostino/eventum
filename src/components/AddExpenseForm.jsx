// components/AddExpenseForm.js
export default function AddExpenseForm() {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold">Add New Expense</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input type="number" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select className="w-full p-2 border rounded">
              <option>Venue</option>
              <option>Food</option>
              <option>Decor</option>
              <option>Entertainment</option>
              <option>Photography</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-800 text-white p-2 rounded">Add Expense</button>
        </form>
      </div>
    );
  }
  