import UnderMaintenance from '@/app/component/UnderMaintenance';
import React from 'react'

interface Props {
    name: string;
}

const Section: React.FC<Props> = ({ name }) => {
    return (
        <div>
            <UnderMaintenance />
        </div>

    )
}

export default Section