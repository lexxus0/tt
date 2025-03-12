import { useState } from "react";
import { IPokemon } from "../../interfaces/interfaces";
import { AiOutlineClose, AiOutlineDown } from "react-icons/ai";

interface SelectProps {
  options: IPokemon[];
  onChange: (selected: IPokemon[]) => void;
}

const Select: React.FC<SelectProps> = ({ options, onChange }) => {
  const [selectedPokemons, setSelectedPokemons] = useState<IPokemon[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const togglePokemon = (pokemon: IPokemon) => {
    const isSelected = selectedPokemons.some((p) => p.id === pokemon.id);

    let newSelection;
    if (isSelected) {
      newSelection = selectedPokemons.filter((p) => p.id !== pokemon.id);
    } else {
      if (selectedPokemons.length < 4) {
        newSelection = [...selectedPokemons, pokemon];
      } else {
        return;
      }
    }

    setSelectedPokemons(newSelection);
    onChange(newSelection);
  };

  const removePokemon = (pokemon: IPokemon) => {
    const newSelection = selectedPokemons.filter((p) => p.id !== pokemon.id);
    setSelectedPokemons(newSelection);
    onChange(newSelection);
  };

  const toggleSelect = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredOptions = options.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="relative w-86">
      <div
        className="border border-gray-300 rounded-2xl p-2 bg-inherit cursor-pointer "
        onClick={toggleSelect}
      >
        <div className="flex justify-between items-center">
          {selectedPokemons.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedPokemons.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className="flex justify-center items-center bg-gray-100 rounded px-2 py-1"
                >
                  <img
                    src={pokemon.sprite}
                    alt={pokemon.name}
                    className="mr-2 w-9 h-9 object-cover"
                  />
                  <span className="mr-5 text-black">
                    {pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)}
                  </span>
                  <AiOutlineClose
                    onClick={() => removePokemon(pokemon)}
                    className="!ml-2 cursor-pointer text-blue-300"
                  />
                </div>
              ))}
            </div>
          ) : (
            <span className="text-blue-400">Select Pokémon...</span>
          )}
          <AiOutlineDown
            onClick={toggleSelect}
            className={`transform transition-transform duration-300 text-blue-400 size-4 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto shadow-lg text-black">
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 border-b border-gray-300 outline-none"
          />

          {filteredOptions.length > 0 ? (
            filteredOptions.map((pokemon) => (
              <div
                key={pokemon.id}
                onClick={() => togglePokemon(pokemon)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  className="mr-2 w-18 h-18"
                />
                <span>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </span>
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No Pokémon found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
