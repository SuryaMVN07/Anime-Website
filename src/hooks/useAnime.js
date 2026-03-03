import { useState, useCallback } from 'react';
import { API_BASE } from '../utils/constants';

export const useAnime = (initialItems) => {
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchContent = useCallback(async (query = '', pageNum = 1, isLoadMore = false, currentFilters = {}) => {
    if (isLoadMore) setIsLoadingMore(true);
    else setLoading(true);

    try {
      let endpoint = `${API_BASE}/anime?page=${pageNum}&limit=24&sfw`;
      const hasFilters = currentFilters.genre || currentFilters.type || currentFilters.status;

      if (query) {
        endpoint += `&q=${query}&order_by=popularity`;
        if (currentFilters.type) endpoint += `&type=${currentFilters.type}`;
        if (currentFilters.status) endpoint += `&status=${currentFilters.status}`;
        if (currentFilters.genre) endpoint += `&genres=${currentFilters.genre}`;
      } else if (hasFilters) {
        endpoint += `&order_by=score&sort=desc`;
        if (currentFilters.genre) endpoint += `&genres=${currentFilters.genre}`;
        if (currentFilters.type) endpoint += `&type=${currentFilters.type}`;
        if (currentFilters.status) endpoint += `&status=${currentFilters.status}`;
      } else {
        endpoint = `${API_BASE}/top/anime?filter=bypopularity&limit=24&page=${pageNum}`;
      }

      const response = await fetch(endpoint);
      const data = await response.json();

      let newItems = (data.data || []).filter(item => {
        const rating = item.rating || '';
        return !rating.includes('Rx') && !rating.includes('Hentai') && !rating.includes('R+');
      });

      const uniqueItemsMap = new Map();
      newItems.forEach(item => { if (item.mal_id) uniqueItemsMap.set(item.mal_id, item); });
      newItems = Array.from(uniqueItemsMap.values());

      setHasNextPage(data.pagination?.has_next_page || false);

      if (isLoadMore) {
        setItems(prev => {
          const existingIds = new Set(prev.map(item => item.mal_id));
          return [...prev, ...newItems.filter(item => !existingIds.has(item.mal_id))];
        });
      } else {
        setItems(newItems);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  return { items, setItems, loading, isLoadingMore, hasNextPage, fetchContent };
};