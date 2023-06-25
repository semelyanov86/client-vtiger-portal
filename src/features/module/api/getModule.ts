import ms from 'ms';
import { useQuery } from 'react-query';

import { axios, DataResponse } from '../../../lib/axios';
import { CustomModule } from '../../custom-module/types';
import { Module } from '../types';

type ModuleName = 'HelpDesk' | 'Project' | 'ProjectTask' | keyof CustomModule;

export const getModule = (name: ModuleName): Promise<Module> => {
  return axios.get<DataResponse<Module>>('/modules/' + name).then((res) => res.data.data);
};

export const useModule = (name: ModuleName) => {
  return useQuery<Module, Error>({
    queryKey: ['module', name],
    queryFn: () => getModule(name),
    retry: 7,
    cacheTime: ms('10 days'),
    staleTime: ms('7 days'),
    useErrorBoundary: false,
  });
};
