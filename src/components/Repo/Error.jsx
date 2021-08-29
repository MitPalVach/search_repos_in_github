import React from 'react';


const Error = (props) => {
    return (
        <div style={{textAlign: center}}>
            <button onClick={() => props.history.push('/')}>Перейти на главную</button>
            ERROR
        </div>
    );
};

export default Error;