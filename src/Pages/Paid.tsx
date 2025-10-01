import React from 'react';

import PaidTable from '../components/Paid/PaidTable';
import { useSummaryQuery } from '../redux/apiSlices/clientSlice';
import Summary from '../components/Credit/Summary';

const Paid: React.FC = () => {
    const { data: summary, refetch: summaryRefetch } = useSummaryQuery(undefined);
    return (
        <React.Fragment>
            <Summary summary={summary} />
            <PaidTable summaryRefetch={summaryRefetch} />
        </React.Fragment>
    );
};

export default Paid;