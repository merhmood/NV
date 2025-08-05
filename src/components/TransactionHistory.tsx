"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/url";

interface Transaction {
  type: string;
  amount: number;
  description: string;
  date: string;
}

export default function TransactionHistory({
  userId,
  coinsBalance,
}: {
  userId?: number;
  coinsBalance: string;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);

    axios
      .get(`${API_URL}/transactions/${userId}`)
      .then((res) => {
        setTransactions(res.data.transactions || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [userId, coinsBalance]);

  if (loading) return <p className="mt-4">Loading transactions...</p>;

  if (!transactions.length) {
    return <p className="mt-4">No transactions yet</p>;
  }

  return (
    <div className="mt-4 bg-black/75 backdrop-blur-md p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-3">Transaction History</h2>
      <ul className="space-y-3 max-h-[13vh] overflow-y-auto">
        {transactions.map((tx, i) => (
          <li
            key={i}
            className="flex justify-between border-b border-gray-700 pb-2"
          >
            <div>
              <p className="font-medium">{tx.description}</p>
              <p className="text-xs text-gray-400">
                {new Date(tx.date).toLocaleString()}
              </p>
            </div>
            <p className={tx.amount > 0 ? "text-yellow-400" : "text-red-400"}>
              {tx.amount > 0 ? "+" : ""}
              {tx.amount} coins
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
