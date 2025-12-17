import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

const STORAGE_KEY = 'travelverse_budget_planner';

const defaultCategories = [
    { id: 1, name: 'Flights', icon: 'ri-plane-line' },
    { id: 2, name: 'Accommodation', icon: 'ri-hotel-line' },
    { id: 3, name: 'Food & Dining', icon: 'ri-restaurant-line' },
    { id: 4, name: 'Transport', icon: 'ri-bus-line' },
    { id: 5, name: 'Activities', icon: 'ri-map-pin-line' },
    { id: 6, name: 'Shopping', icon: 'ri-shopping-bag-line' },
    { id: 7, name: 'Miscellaneous', icon: 'ri-more-line' },
];

const BudgetPlanner = () => {
    const [budget, setBudget] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ name: '', amount: '', category: 'Miscellaneous' });
    const [isEditingBudget, setIsEditingBudget] = useState(false);
    const [tempBudget, setTempBudget] = useState('');

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            setBudget(parsed.budget || 0);
            setExpenses(parsed.expenses || []);
        }
    }, []);

    // Save to localStorage whenever budget or expenses change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ budget, expenses }));
    }, [budget, expenses]);

    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const remaining = budget - totalSpent;
    const progressPercent = budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0;

    const handleAddExpense = (e) => {
        e.preventDefault();
        if (!newExpense.name.trim() || !newExpense.amount) return;
        
        const expense = {
            id: Date.now(),
            name: newExpense.name.trim(),
            amount: parseFloat(newExpense.amount),
            category: newExpense.category,
            createdAt: new Date().toISOString(),
        };
        setExpenses([...expenses, expense]);
        setNewExpense({ name: '', amount: '', category: 'Miscellaneous' });
    };

    const handleDeleteExpense = (id) => {
        setExpenses(expenses.filter(exp => exp.id !== id));
    };

    const handleSetBudget = () => {
        const val = parseFloat(tempBudget);
        if (!isNaN(val) && val >= 0) {
            setBudget(val);
        }
        setIsEditingBudget(false);
        setTempBudget('');
    };

    const getCategoryIcon = (categoryName) => {
        const cat = defaultCategories.find(c => c.name === categoryName);
        return cat ? cat.icon : 'ri-more-line';
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-sky-400 to-blue-500 py-16 text-center">
                <h1 className="text-4xl font-bold text-white mb-2">Budget Planner</h1>
                <p className="text-sky-100 text-lg">Plan and track your travel expenses</p>
            </div>

            <Container className="mt-8">
                <Row>
                    {/* Summary Cards */}
                    <Col lg="12" className="mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Total Budget Card */}
                            <div className="soft-card p-6 text-center relative">
                                <i className="ri-wallet-3-line text-4xl text-sky-400 mb-2"></i>
                                <h3 className="text-sm font-bold uppercase text-gray-400 mb-1">Total Budget</h3>
                                {isEditingBudget ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-xl font-bold text-gray-700">₹</span>
                                        <input
                                            type="number"
                                            value={tempBudget}
                                            onChange={(e) => setTempBudget(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSetBudget()}
                                            className="w-32 text-2xl font-bold text-gray-800 border-b-2 border-sky-400 outline-none text-center bg-transparent"
                                            autoFocus
                                        />
                                        <button onClick={handleSetBudget} className="text-sky-500 hover:text-sky-600">
                                            <i className="ri-check-line text-xl"></i>
                                        </button>
                                    </div>
                                ) : (
                                    <div 
                                        className="cursor-pointer group"
                                        onClick={() => { setIsEditingBudget(true); setTempBudget(budget.toString()); }}
                                    >
                                        <p className="text-3xl font-bold text-gray-800">₹{budget.toLocaleString('en-IN')}</p>
                                        <span className="text-xs text-gray-400 group-hover:text-sky-500 transition-colors">
                                            <i className="ri-pencil-line"></i> Click to edit
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Total Spent Card */}
                            <div className="soft-card p-6 text-center">
                                <i className="ri-money-dollar-circle-line text-4xl text-orange-400 mb-2"></i>
                                <h3 className="text-sm font-bold uppercase text-gray-400 mb-1">Total Spent</h3>
                                <p className="text-3xl font-bold text-gray-800">₹{totalSpent.toLocaleString('en-IN')}</p>
                            </div>

                            {/* Remaining Card */}
                            <div className="soft-card p-6 text-center">
                                <i className={`ri-funds-line text-4xl ${remaining >= 0 ? 'text-green-500' : 'text-red-500'} mb-2`}></i>
                                <h3 className="text-sm font-bold uppercase text-gray-400 mb-1">Remaining</h3>
                                <p className={`text-3xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    ₹{remaining.toLocaleString('en-IN')}
                                </p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-6 soft-card p-4">
                            <div className="flex justify-between text-sm font-semibold text-gray-600 mb-2">
                                <span>Spending Progress</span>
                                <span>{progressPercent.toFixed(0)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-500 ${progressPercent > 100 ? 'bg-red-500' : progressPercent > 75 ? 'bg-orange-400' : 'bg-sky-400'}`}
                                    style={{ width: `${Math.min(progressPercent, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    </Col>

                    {/* Add Expense Form */}
                    <Col lg="4" className="mb-6">
                        <div className="soft-card p-6 h-full">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <i className="ri-add-circle-line text-sky-500"></i> Add Expense
                            </h3>
                            <form onSubmit={handleAddExpense} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-1">Description</label>
                                    <input
                                        type="text"
                                        value={newExpense.name}
                                        onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                                        placeholder="e.g., Train tickets to Manali"
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-300 focus:border-sky-400 outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-1">Amount (₹)</label>
                                    <input
                                        type="number"
                                        value={newExpense.amount}
                                        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                                        placeholder="0"
                                        min="0"
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-300 focus:border-sky-400 outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-1">Category</label>
                                    <select
                                        value={newExpense.category}
                                        onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-300 focus:border-sky-400 outline-none transition-all bg-white"
                                    >
                                        {defaultCategories.map(cat => (
                                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-sky-400 hover:bg-sky-500 text-white font-bold py-3 rounded-full shadow-md transition-all transform hover:-translate-y-0.5"
                                >
                                    Add Expense
                                </button>
                            </form>
                        </div>
                    </Col>

                    {/* Expenses List */}
                    <Col lg="8">
                        <div className="soft-card p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <i className="ri-list-check-2 text-sky-500"></i> Expenses ({expenses.length})
                            </h3>
                            
                            {expenses.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-5xl mb-4">💸</div>
                                    <p className="text-gray-500">No expenses added yet. Start tracking your spending!</p>
                                </div>
                            ) : (
                                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                                    {expenses.map(expense => (
                                        <div 
                                            key={expense.id} 
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                                                    <i className={`${getCategoryIcon(expense.category)} text-sky-500`}></i>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">{expense.name}</p>
                                                    <p className="text-xs text-gray-400">{expense.category}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="font-bold text-gray-700">₹{expense.amount.toLocaleString('en-IN')}</span>
                                                <button 
                                                    onClick={() => handleDeleteExpense(expense.id)}
                                                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                                                    title="Delete"
                                                >
                                                    <i className="ri-delete-bin-line text-lg"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default BudgetPlanner;
