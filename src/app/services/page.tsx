import { api } from '@/lib/api';
import { ServiceCategoryDto } from '@/types';

export default async function ServicesPage() {
  const categories = await api.get<ServiceCategoryDto[]>(`/Service/categories`);
  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-semibold">Services</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((c) => (
          <li key={c.id} className="border rounded p-4 bg-white">
            <h3 className="font-medium">{c.name}</h3>
            <p className="text-sm text-gray-600">{c.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
