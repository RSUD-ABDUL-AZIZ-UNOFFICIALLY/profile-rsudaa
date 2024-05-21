import React from 'react'


interface Props {
    name: string;
}

const Section: React.FC<Props> = ({ name }) => {
    return (
        <div>{name}</div>

    )
}

export default Section