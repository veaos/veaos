import _ from 'lodash';
import { useInfiniteQuery } from 'react-query';
import { Request } from '../utils/request';

const searchQueryKey = 'search';

export const useGetInfiniteSearch = ({ perPage, query }) =>
  useInfiniteQuery(
    [searchQueryKey],
    ({ pageParam = 1 }) =>
      Request('/search', {
        query: {
          query,
          skip: (pageParam - 1) * perPage,
          limit: perPage,
        },
      }),
    {
      getNextPageParam: (lastPage, allPages) =>
        _.flatten(allPages).length / perPage + 1,
      getPreviousPageParam: (firstPage, allPages) =>
        _.flatten(allPages).length / perPage - 1,
    }
  );
