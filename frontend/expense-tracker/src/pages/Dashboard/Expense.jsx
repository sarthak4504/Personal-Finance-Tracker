import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import Modal from "../../components/Modal";
import { toast } from "react-toastify"; // ✅ Import toast

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Get All Expense Details
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    // Validation Checks
    if (!category.trim()) {
      toast.error("Category is required.");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }
    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully"); // ✅ Show toast
      fetchExpenseDetails(); // ✅ Refresh UI
    } catch (error) {
      console.error("Error adding expense:", error.response?.data?.message || error.message);
      toast.error("Failed to add expense.");
    }
  };

  // Handle Delete Expense
  const handleDeleteExpense = async (id) => {
    try {
      await axiosInstance.delete(`${API_PATHS.EXPENSE.DELETE_EXPENSE}/${id}`);
      toast.success("Expense deleted successfully"); // ✅ Show toast
      fetchExpenseDetails(); // ✅ Refresh UI
    } catch (error) {
      console.error("Error deleting expense:", error.response?.data?.message || error.message);
      toast.error("Failed to delete expense.");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
              onDelete={handleDeleteExpense} // ✅ Pass delete function down
            />
          </div>
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
