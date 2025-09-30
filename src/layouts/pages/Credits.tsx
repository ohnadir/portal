import React from 'react';
import Summary from '../../components/Credit/Summary';
import CreditTable from '../../components/Credit/CreditTable';

const Credits: React.FC = () => {
    return (
        <React.Fragment>
            <Summary/>
            <CreditTable/>
        </React.Fragment>
    );
};

export default Credits;