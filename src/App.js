import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataRequest } from './redux/actions';

function App() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]);

  const handleDownloadAllPhotos = async () => {
    if (data.length > 0) {
      for (const photo of data) {
        const link = document.createElement('a');
        link.href = photo.url;
        link.download = photo.title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // Добавляем задержку для предотвращения перегрузки браузера
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <button disabled={loading} onClick={handleDownloadAllPhotos}>
        Download all photos
      </button>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <div>{item.title}</div>
            <img src={item.url}/>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
