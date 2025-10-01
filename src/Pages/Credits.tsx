import React from 'react';
import { useSummaryQuery } from '../redux/apiSlices/clientSlice';
import Summary from '../components/Credit/Summary';
import CreditTable from '../components/Credit/CreditTable';

const Credits: React.FC = () => {
    const { data: summary, refetch: summaryRefetch } = useSummaryQuery(undefined);
    return (
        <React.Fragment>
            <Summary summary={summary} />
            <CreditTable summaryRefetch={summaryRefetch} />
        </React.Fragment>
    );
};

export default Credits;