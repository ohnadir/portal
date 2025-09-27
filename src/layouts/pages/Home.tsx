import React from 'react';
import Statistic from '../../components/Home/Statistic';
import EarningStatistic from '../../components/Home/EarningStatistic';
import ClientStatistic from '../../components/Home/ClientStatistic';
import ActiveClientTable from '../../components/Home/ActiveClientTable';

const Home: React.FC = () => {
    return (
        <div>
            <Statistic/>
            <EarningStatistic/>
            <div className='grid grid-cols-2 gap-3'>
                <ClientStatistic/>
                <ActiveClientTable/>
            </div>

        </div>
    )
}

export default Home