import React, { FC } from 'react'

interface Props {
    id: string;
}

const Section: React.FC<Props> = ({ id }) => {
    return (
        <div>{id}</div>
    )
}

export default Section