import React, { useEffect, useState } from 'react';

const Fib = () => {
    const [seenIndexes, setSeenIndexes] = useState([]);
    const [values, setValues] = useState({});
    const [index, setIndex] = useState('');

    const getValuesRequest = async () => {
        try {
            const response = await fetch('/api/values/current', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const json = await response.json();
                setValues(json)
            }
        } catch (error) {
            throw error
        }
    }

    const getIndexesRequest = async () => {
        try {
            const response = await fetch('/api/values/all', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const json = await response.json();
                setSeenIndexes(json)
            }
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        getValuesRequest();
        getIndexesRequest();
    }, []);

    const renderSeenIndexes = () => {
        return seenIndexes.map(({ number }) => number).join(', ')
    }

    const renderValues = () => {
        return Object.entries(values).map(([key, value]) => (
            <div key={key}>
                For index {key} I calculated {value}
            </div>
        ))
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            const response = await fetch('/api/values', {
                method: 'POST', body: JSON.stringify({ index }), headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setIndex('')
            }
        } catch (error) {

        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter you index:</label>
                <input
                    value={index}
                    onChange={event => setIndex(event.target.value)}
                />
                <button>Submit</button>
            </form>
            <h3>Indexes I have seen:</h3>
            {renderSeenIndexes()}

            <h3>Calculated values:</h3>
            {renderValues()}
        </div>
    )
}

export default Fib;