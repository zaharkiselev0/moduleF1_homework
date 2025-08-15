import React, { useContext, useState, useEffect } from 'react';
import { UnitsContext, SetUnitsContext, CityContext, SetCityContext } from './AppSettingProvider';
import { Units, Unit } from '@typesLocal/units';
import { City } from '@typesLocal/location';
import { getCitySuggestion} from '@api/getCitySuggestion';
import { getCityLocation } from '@api/getCityLocation';


export function Test() {
    return (
        <>
            <UnitsTest />
            <CityTest />
        </>
    );
}

function UnitsTest() {
    const units = useContext(UnitsContext);
    const setUnits = useContext(SetUnitsContext);

    const [tempUnit, setTempUnit] = useState<Unit>(units.temperature);
    const [windUnit, setWindUnit] = useState<Unit>(units.windSpeed);

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setUnits({ temperature: tempUnit, windSpeed: windUnit });
    }

    return (
        <form onSubmit={handleSubmit}>

            <fieldset>
                <legend>Температура</legend>
                {Unit.options.map((u) => (
                    <label key={`temp-${u}`}>
                        <input
                            type="radio"
                            name="TempUnits"
                            value={u}
                            checked={tempUnit === u}
                            onChange={() => setTempUnit(u)}
                        />
                        {u}
                    </label>
                ))}
            </fieldset>

            <fieldset>
                <legend>Скорость ветра</legend>
                {Unit.options.map((u) => (
                    <label key={`wind-${u}`}>
                        <input
                            type="radio"
                            name="WindUnits"
                            value={u}
                            checked={windUnit === u}
                            onChange={() => setWindUnit(u)}
                        />
                        {u}
                    </label>
                ))}
            </fieldset>

            <button type="submit">Применить единицы</button>
        </form>
    );
}


function CityTest() {
    const city = useContext(CityContext);
    const setCity = useContext(SetCityContext);

    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (query.trim().length < 2) {
            setSuggestions([]);
            return;
        }

        const timeout = setTimeout(() => {
            setLoading(true);
            getCitySuggestion(query)
                .then(setSuggestions)
                .catch(() => setSuggestions([]))
                .finally(() => setLoading(false));
        }, 300); // debounce

        return () => clearTimeout(timeout);
    }, [query]);

    async function handleCitySelect(selectedCity: City) {
        try {
            const fullCity = await getCityLocation(selectedCity.id);
            setCity(fullCity);
            setQuery(""); // Очистим ввод
            setSuggestions([]);
            setError(null);
        } catch (e) {
            setError(`Ошибка загрузки города, ${e}`);
        }
    }

    return (
        <div>
            <label htmlFor="cityInput">Выберите город:</label>
            <input
                id="cityInput"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Введите название города"
            />
            {loading && <div>Загрузка...</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}

            {suggestions.length > 0 && (
                <ul style={{ border: "1px solid #ccc", padding: 0, listStyle: "none" }}>
                    {suggestions.map((sug) => (
                        <li
                            key={sug.id}
                            style={{ cursor: "pointer", padding: "4px 8px" }}
                            onClick={() => handleCitySelect(sug)}
                        >
                            {sug.name}, {sug.state ? `${sug.state}, ` : ""}{sug.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}