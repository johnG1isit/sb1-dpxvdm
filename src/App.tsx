import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TotalUnpaid } from './components/TotalUnpaid';
import { PaymentForm } from './components/PaymentForm';
import { PaymentItem } from './components/PaymentItem';
import { Calendar } from './components/Calendar';
import { EditPaymentModal } from './components/EditPaymentModal';

interface Payment {
  id: string;
  weekEnding: string;
  amount: number;
  paid: boolean;
}

function App() {
  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem('payments');
    return saved ? JSON.parse(saved) : [];
  });
  const [defaultAmount, setDefaultAmount] = useState(() => {
    const saved = localStorage.getItem('defaultAmount');
    return saved || '';
  });
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);

  useEffect(() => {
    localStorage.setItem('payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('defaultAmount', defaultAmount);
  }, [defaultAmount]);

  useEffect(() => {
    localStorage.setItem('darkMode', isDark.toString());
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const addPayment = () => {
    if (!defaultAmount) return;

    const today = new Date();
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

    const newPayment: Payment = {
      id: crypto.randomUUID(),
      weekEnding: endOfWeek.toISOString().split('T')[0],
      amount: parseFloat(defaultAmount),
      paid: false,
    };

    setPayments([...payments, newPayment]);
  };

  const togglePaid = (id: string) => {
    setPayments(payments.map(payment =>
      payment.id === id ? { ...payment, paid: !payment.paid } : payment
    ));
  };

  const deletePayment = (id: string) => {
    setPayments(payments.filter(payment => payment.id !== id));
  };

  const deletePaidPayments = () => {
    setPayments(payments.filter(payment => !payment.paid));
  };

  const handleDayClick = (date: string) => {
    const payment = payments.find(p => p.weekEnding === date);
    if (payment) {
      setEditingPayment(payment);
    }
  };

  const handleEditSave = (updatedData: { weekEnding: string; amount: number }) => {
    if (!editingPayment) return;

    setPayments(payments.map(payment =>
      payment.id === editingPayment.id
        ? { ...payment, ...updatedData }
        : payment
    ));
    setEditingPayment(null);
  };

  const totalUnpaid = payments
    .filter(p => !p.paid)
    .reduce((sum, p) => sum + p.amount, 0);

  const hasPaidPayments = payments.some(p => p.paid);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 
                    dark:from-gray-900 dark:to-indigo-950 p-6 transition-colors duration-200`}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
          <Header isDark={isDark} toggleDarkMode={() => setIsDark(!isDark)} />
          <TotalUnpaid total={totalUnpaid} />
          <Calendar
            currentDate={currentDate}
            onMonthChange={setCurrentDate}
            payments={payments}
            onDayClick={handleDayClick}
          />
          <PaymentForm 
            defaultAmount={defaultAmount}
            setDefaultAmount={setDefaultAmount}
            onAdd={addPayment}
            onDeletePaid={deletePaidPayments}
            hasPaidPayments={hasPaidPayments}
          />

          <div className="space-y-4">
            {payments.map((payment) => (
              <PaymentItem
                key={payment.id}
                payment={payment}
                onToggle={togglePaid}
                onDelete={deletePayment}
              />
            ))}
            {payments.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No payments added yet. Add your first payment above.
              </div>
            )}
          </div>
        </div>
      </div>

      {editingPayment && (
        <EditPaymentModal
          payment={editingPayment}
          onClose={() => setEditingPayment(null)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
}

export default App;