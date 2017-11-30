import React from 'react';

export default function FunctionError(props) {
    if (!props.error) return null
    return (
        <div className='test-border failed'>
            <div className='FunctionError Test'>
                <div className='open-test'>
                    <div className='test-title'>
                        There was something wrong with your function
                </div>
                    <div className='parameter-box'>
                        <div className='input-line'>
                            {props.error}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
