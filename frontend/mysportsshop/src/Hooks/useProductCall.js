import axios from 'axios'
import { useQuery } from "@tanstack/react-query";
import useFilters from './useFilters';

const useProductCall = () => {
    const { search, priceMin, priceMax, Collection, categories, sport, brandname, page, limit, sortOrder, sortBy, gender } = useFilters();

    const buildQueryParam = (param, value) => value ? `${param}=${value}` : '';
    const fecthProducts = async () => {
        try {
            const queryParams = [
                `page=${page}`,
                `limit=${limit}`,
                buildQueryParam('search', search),
                buildQueryParam('sortBy', sortBy),
                buildQueryParam('sortOrder', sortOrder),
                buildQueryParam('priceMin', priceMin),
                buildQueryParam('priceMax', priceMax),
                buildQueryParam('Collection', Collection),
                buildQueryParam('categories', categories),
                buildQueryParam('sport', sport),
                buildQueryParam('brandname', brandname),
                buildQueryParam('gender', gender),
            ].filter(Boolean).join('&');

            const response = await axios.get(`http://localhost:3001/supplier?${queryParams}`);
            console.log(response)
            return response.data;
        } catch (err) {
            return err.response
        }
    }

    return useQuery({
        queryKey: ['getallProducts', search, priceMin, priceMax, Collection, categories, sport, brandname, page, limit, sortOrder, sortBy, gender],
        queryFn: fecthProducts
    })

}

export default useProductCall;

///api/products?page=1&limit=10&search=example&sortBy=price&sortOrder=asc&priceMin=50&priceMax=100&collectionName=Spring2023&category=Apparel&sport=Soccer