import React, { useState } from 'react';
import Summary from '../../components/Credit/Summary';
import FilterOptions from '../../components/Credit/FilterOptions';
import CreditTable from '../../components/Credit/CreditTable';

const Ledger: React.FC = () => {
    const [page, setPage] = useState(0)
    return (
        <React.Fragment>
            <Summary/>
            <FilterOptions setPage={setPage}/>
            <CreditTable page={page} setPage={setPage}/>
        </React.Fragment>
    );
};

export default Ledger;