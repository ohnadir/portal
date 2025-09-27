import React, { useState } from 'react';
import Summary from '../../components/Credit/Summary';
import CreditTable from '../../components/Credit/CreditTable';

const Credits: React.FC = () => {
    const [page, setPage] = useState(0)
    return (
        <React.Fragment>
            <Summary/>
            <CreditTable page={page} setPage={setPage}/>
        </React.Fragment>
    );
};

export default Credits;