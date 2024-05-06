import React, { FC } from 'react'

interface Props {
    slug: string;
}

const Section: React.FC<Props> = ({ slug }) => {
    return (
        <div>{slug}</div>
    )
}

export default Section