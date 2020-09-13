import React, { useEffect, useState } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const request = async () => {
      const response = await api.get('repositories');

      setRepositories(response.data);
    };

    request();
  }, []);

  async function handleAddRepository() {
    const request = await api.post('repositories', {
      url: 'https://github.com/josepholiveira',
      title: 'Desafio ReactJS',
      techs: ['React', 'Node.js'],
    });

    setRepositories([...repositories, request.data]);
  }

  async function handleRemoveRepository(id) {
    const request = await api.delete(`repositories/${id}`);

    if (request.status === 204) {
      const repositoriesFilter = repositories.filter((repo) => {
        return repo.id !== id;
      });

      setRepositories(repositoriesFilter);
    }
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
