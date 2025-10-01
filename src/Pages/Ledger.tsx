import React, { useState } from 'react';
import Summary from '../components/Ledger/Summary';
import FilterOptions from '../components/Ledger/FilterOptions';
import CreditTable from '../components/Ledger/CreditTable';
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