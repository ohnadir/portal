import React, { useState } from 'react';
import Summary from '../../components/Paid/Summary';
import PaidTable from '../../components/Paid/PaidTable';

const Paid: React.FC = () => {
    const [page, setPage] = useState(0)
    return (
        <React.Fragment>
            <Summary/>
            <PaidTable page={page} setPage={setPage}/>
        </React.Fragment>
    );
};

export default Paid;