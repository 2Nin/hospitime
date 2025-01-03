import React, { useState } from 'react';
import './Home.css';
import logo from '../../assets/images/logo.png';

const Home = () => {
    const [search, setSearch] = useState('');
    const [bairro, setBairro] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [hospitals, setHospitals] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false); // Controla a exibição do filtro

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleBairroChange = (e) => {
        setBairro(e.target.value);
    };

    const handleEspecialidadeChange = (e) => {
        setEspecialidade(e.target.value);
    };

    // Função para realizar a pesquisa ao clicar no botão
    const handleSearchSubmit = async () => {
        console.log('Pesquisando por hospital:', search, 'no bairro:', bairro, 'com especialidade:', especialidade);

        try {
            const response = await fetch(`http://localhost:8000/api/hospitals?name=${search}&bairro=${bairro}&especialidade=${especialidade}`);
            const data = await response.json();
            setHospitals(data);  // Atualiza os hospitais encontrados
        } catch (error) {
            console.error('Erro ao buscar hospitais:', error);
        }
    };

    // Função para alternar a exibição do menu de filtros
    const toggleFilterMenu = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    return (
        <div className="home-container">
            {/* Barra de Pesquisa */}
            <div className="search-bar">
                <form className="search-form">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        className="search-input"
                        placeholder="Pesquise por hospitais"
                    />

                    {/* Botão de Filtro */}
                    <button type="button" onClick={toggleFilterMenu} className="filter-button">
                        Filtrar
                    </button>

                    {/* Dropdown de Filtros */}
                    {isFilterOpen && (
                        <div className="filter-dropdown">
                            {/* Filtro de Bairro */}
                            <select value={bairro} onChange={handleBairroChange} className="bairro-select">
                                <option value="">Bairro</option>
                                <option value="bairro1">Bairro 1</option>
                                <option value="bairro2">Bairro 2</option>
                                <option value="bairro3">Bairro 3</option>
                            </select>

                            {/* Filtro de Especialidade */}
                            <select value={especialidade} onChange={handleEspecialidadeChange} className="especialidade-select">
                                <option value="">Especialidade</option>
                                <option value="cardiologia">Cardiologia</option>
                                <option value="ortopedia">Ortopedia</option>
                                <option value="pediatria">Pediatria</option>
                                <option value="neurologia">Neurologia</option>
                            </select>

                            {/* Botão de Filtrar dentro do Dropdown */}
                            <button type="button" onClick={handleSearchSubmit} className="search-button">Filtrar</button>
                        </div>
                    )}
                </form>
            </div>

            {/* Conteúdo Principal - Título */}
            <div className="home-content">
                <h1 className="home-title">Hospitime</h1>
            </div>

            {/* Exibição dos Hospitais Encontrados */}
            <div className="hospital-list">
                {hospitals.length > 0 ? (
                    hospitals.map((hospital) => (
                        <div key={hospital.id} className="hospital-card">
                            <h3>{hospital.name}</h3>
                            <p>{hospital.address}</p>
                        </div>
                    ))
                ) : (
                    <p>Nenhum hospital encontrado.</p>
                )}
            </div>

            {/* Logo */}
            <div className="home-logo-container">
                <img src={logo} alt="Hospitime Logo" className="home-logo" />
            </div>
        </div>
    );
};

export default Home;
