import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import axios from 'axios';
import { MapPin, Bed, Bath, Square, DollarSign, Calendar } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  latitude: number;
  longitude: number;
  dateAdded: string;
}

const fetchListing = async (id: string): Promise<Listing> => {
  // This is a mock API call. Replace with your actual API endpoint.
  const response = await axios.get(`https://api.example.com/listings/${id}`);
  return response.data;
};

const ListingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { data: listing, isLoading, error } = useQuery(['listing', id], () => fetchListing(id!));

  if (isLoading) return <div className="text-center py-10">{t('loading')}</div>;
  if (error) return <div className="text-center py-10 text-red-500">{t('errorLoadingListing')}</div>;
  if (!listing) return <div className="text-center py-10">{t('listingNotFound')}</div>;

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: listing.latitude,
    lng: listing.longitude
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{listing.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={listing.image} alt={listing.title} className="w-full h-auto rounded-lg shadow-lg mb-4" />
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">{t('propertyDetails')}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Bed className="mr-2 text-blue-600" />
                <span>{listing.bedrooms} {t('bedrooms')}</span>
              </div>
              <div className="flex items-center">
                <Bath className="mr-2 text-blue-600" />
                <span>{listing.bathrooms} {t('bathrooms')}</span>
              </div>
              <div className="flex items-center">
                <Square className="mr-2 text-blue-600" />
                <span>{listing.area} m²</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-2 text-blue-600" />
                <span>${listing.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 text-blue-600" />
                <span>{listing.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 text-blue-600" />
                <span>{new Date(listing.dateAdded).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-semibold mb-4">{t('description')}</h2>
            <p>{listing.description}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">{t('location')}</h2>
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={14}
              >
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;