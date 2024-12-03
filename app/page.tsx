import { Suspense } from 'react';

interface City {
  id: number;
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
  population: string;
}

async function getCities() {
  try {
    const res = await fetch(new URL('cities.json', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'), {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
}

function CityList({ cities }: { cities: City[] }) {
  return (
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th>Name</th>
          <th>Country</th>
          <th>Population</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {cities.map((city) => (
          <tr key={city.id} className="hover:bg-gray-50">
            <td>{city.name}</td>
            <td>{city.country}</td>
            <td>{city.population}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default async function Page() {
  const cities = await getCities();

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Cities</h1>
      <Suspense fallback={<div>Loading cities...</div>}>
        <CityList cities={cities} />
      </Suspense>
    </>
  );
}
