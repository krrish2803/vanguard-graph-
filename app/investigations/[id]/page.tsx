"use client";
import { useState } from "react";
import { mockMerchants, mockMemo } from "@/lib/mock-data";
import { use } from "react";

export default function InvestigationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const merchant = mockMerchants.find((m) => m.id === id);
  const [action, setAction] = useState<string | null>(null);

  if (!merchant) return <div className="p-8">Merchant not found.</div>;

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">{merchant.name} — {merchant.id}</h1>

      <div className="p-4 border rounded">
        <p className="font-semibold">Risk Score: {merchant.riskScore} ({merchant.riskLevel})</p>
      </div>

      <div className="p-4 border rounded bg-gray-50">
        <h2 className="font-semibold mb-2">AI Risk Memo</h2>
        <p>{mockMemo[merchant.id] ?? "No suspicious connections found."}</p>
      </div>

      <div className="p-4 border rounded">
        <h2 className="font-semibold mb-2">Linked Entities</h2>
        <p>Shared Device: {merchant.sharedDevice ?? "None"}</p>
        <p>Shared Bank Account: {merchant.sharedBankAccount ?? "None"}</p>
      </div>

      {(merchant.sharedDevice || merchant.sharedBankAccount) && (
        <div className="p-6 border rounded bg-white">
          <h2 className="font-semibold mb-4">Relationship Graph</h2>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="px-4 py-3 bg-red-100 border border-red-400 rounded text-center">
              {merchant.name}
              <div className="text-xs text-gray-500">{merchant.id}</div>
            </div>

            {merchant.sharedDevice && (
              <>
                <div className="text-gray-400">──connected via device──&gt;</div>
                <div className="px-4 py-3 bg-yellow-100 border border-yellow-400 rounded text-center">
                  Device {merchant.sharedDevice}
                </div>
              </>
            )}

            {merchant.sharedBankAccount && (
              <>
                <div className="text-gray-400">──shares payout──&gt;</div>
                <div className="px-4 py-3 bg-orange-100 border border-orange-400 rounded text-center">
                  Bank Account {merchant.sharedBankAccount}
                  <div className="text-xs text-gray-500">Linked to flagged case</div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {action ? (
        <div className="p-4 border rounded bg-green-50 text-green-700 font-semibold">
          Status updated: {action}
        </div>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={() => setAction("Blocked")}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Block
          </button>
          <button
            onClick={() => setAction("Sent to Review")}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Send to Review
          </button>
        </div>
      )}
    </main>
  );
}