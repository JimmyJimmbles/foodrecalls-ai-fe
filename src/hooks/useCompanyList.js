import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_COMPANIES } from 'queries/company';

const useCompanyList = ({ limit, offset, sortBy, sortDirection }) => {
  const { loading, error, data } = useQuery(GET_ALL_COMPANIES, {
    variables: { limit, offset, sortBy, sortDirection },
  });

  const [companyData, setCompanyData] = useState(data);

  useEffect(() => {
    setCompanyData(data);
  }, [loading, error, data]);

  return {
    loading,
    error,
    sortDirection,
    companyData,
  };
};

export default useCompanyList;
