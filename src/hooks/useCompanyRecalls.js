import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_COMPANY_RECALLS } from 'queries/recall';

const useCompanyRecalls = ({
  companyName,
  limit,
  offset,
  sortBy,
  sortDirection,
}) => {
  const { loading, error, data } = useQuery(GET_ALL_COMPANY_RECALLS, {
    variables: { companyName, limit, offset, sortBy, sortDirection },
  });

  const [recallData, setRecallData] = useState({ loading, error, data });

  useEffect(() => {
    if (!loading || !error || !data || !data.me) {
      setRecallData(data);
    }
  }, [loading, error, data]);

  return {
    loading,
    error,
    sortDirection,
    recallData,
  };
};

export default useCompanyRecalls;
