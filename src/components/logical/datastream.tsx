'use client';

import * as React from 'react'

interface DatasourceContextType {
    datasource: string | null;
    setDatasource: React.Dispatch<React.SetStateAction<null>>;
}

const datasourcecontext = React.createContext<DatasourceContextType | null>(null)

interface DatasourceProviderProps {
    children: React.ReactNode;
}

export const DatasourceProvider: React.FC<DatasourceProviderProps> = ({children}) => {
    const [datasource, setDatasource] = React.useState(null)
    return <datasourcecontext.Provider value={{datasource, setDatasource}}>{children}</datasourcecontext.Provider>
}