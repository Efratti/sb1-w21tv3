import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import axios from 'axios';
import { MapPin, Bed, Bath, Square } from 'lucide-react';

interface Listing {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
}

const fetchListings = async (): Promise<Listing[]> => {
  // This is a mock API call. Replace with your actual API endpoint.
  const response = await axios.get('https://api.example.com/listings');
  return response.data;
};

const Listings: React.FC = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    bathrooms: '',
  });

  const { data: listings, isLoading, error } = useQuery('listings', fetchListings);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredListings = listings?.filter(listing => {
    return (
      (!filters.priceMin || listing.price >= parseInt(filters.priceMin)) &&
      (!filters.priceMax || listing.price <= parseInt(filters.priceMax)) &&
      (!filters.bedrooms || listing.bedrooms >= parseInt(filters.bedrooms)) &&
      (!filters.bathrooms || listing.bathrooms >= parseInt(filters.bathrooms))
    );
  });

  if (isLoading) return <div className="text-center py-10">{t('loading')}</div>;
  if (error) return <div className="text-center py-10 text-red-500">{t('errorLoadingListings')}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('availableListings')}</h1>
      
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="number"
          name="priceMin"
          placeholder={t('minPrice')}
          value={filters.priceMin}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="priceMax"
          placeholder={t('maxPrice')}
          value={filters.priceMax}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="bedrooms"
          placeholder={t('minBedrooms')}
          value={filters.bedrooms}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="bathrooms"
          placeholder={t('minBathrooms')}
          value={filters.bathrooms}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings?.map(listing => (
          <div key={listing.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
              <p className="text-gray-600 mb-2 flex items-center">
                <MapPin size={16} className="mr-1" /> {listing.location}
              </p>
              <p className="text-2xl font-bold text-blue-600 mb-4">${listing.price.toLocaleString()}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span className="flex items-center"><Bed size={16} className="mr-1" /> {listing.bedrooms} {t('beds')}</span>
                <span className="flex items-center"><Bath size={16} className="mr-1" /> {listing.bathrooms} {t('baths')}</span>
                <span className="flex items-center"><Square size={16} className="mr-1" /> {listing.area} m²</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;