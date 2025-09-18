import { api } from "@/lib/api";
import { InvoiceDto } from "@/types";

export default async function InvoicesPage() {
  const invoices = await api.get<InvoiceDto[]>(`/Invoices?take=50&skip=0`);

  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold">Invoices</h2>
      <ul className="grid gap-2">
        {invoices.map((i) => (
          <li key={i.id} className="bg-white border rounded p-3">
            <div className="font-medium">Invoice {i.number ?? i.id}</div>
            <div className="text-sm text-gray-600">Issued {new Date(i.issuedAtUtc).toLocaleString()}</div>
            <div className="font-semibold mt-1">
              {i.currency ?? ""} {i.total.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">Status: {i.status ?? "Unknown"}</div>
            <a
              className="text-blue-600 underline"
              href={`/api/proxy/Invoices/${i.id}/pdf`}
              target="_blank"
              rel="noreferrer"
            >
              Download PDF
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}