import React from 'react'


function WeatherSearch() {
    const [city, setCity] = React.useState('');
    const handlesearch = (e) => {
        e.preventDefault();
    };
  return (
    <div>
        <form onSubmit={handlesearch} className="flex items-center justify-center mt-4">
            <input
            type='text'
            placeholder='Search for a city...'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            />
            <button type='submit' className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
                Search</button>
            </form>
    </div>
  )
}

export default WeatherSearch