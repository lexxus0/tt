import { IModalProps } from "../interfaces/interfaces";
import Modal from "./Modal";
import { motion } from "framer-motion";
import { IPokemon } from "../interfaces/interfaces";

interface TeamModalProps extends IModalProps {
  selectedPokemons: IPokemon[];
}

const TeamModal: React.FC<TeamModalProps> = ({
  isOpen,
  onClose,
  selectedPokemons,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[400px] h-[550px] bg-white text-black p-6 rounded-lg shadow-lg ">
        <h2 className="text-2xl font-bold !mb-20 text-center">
          Your Pokémon Team
        </h2>

        <div className="mt-3 grid grid-cols-2 gap-4">
          {selectedPokemons.map((pokemon, index) => (
            <motion.div
              key={pokemon.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="w-24 h-24 object-cover"
              />
              <h3 className="text-lg font-semibold mt-2">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default TeamModal;
