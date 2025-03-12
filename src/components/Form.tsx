import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../validation/schema";
import Select from "./select/Select";
import { fetchPokemons } from "../api/api";
import cloud from "../assets/pokemons/comic.png";
import green from "../assets/pokemons/green.png";
import pink from "../assets/pokemons/pink.png";
import TeamModal from "./TeamModal";
import { IPokemon } from "../interfaces/interfaces";

const Form = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    "Hello, chef!<br /> Enter your credentials<br /> and start building a team,<br /> waiting for you there!"
  );
  const [loc, setLoc] = useState("right-32");

  const toggleModal = () => setIsOpen(!isOpen);

  const [pokemonOptions, setPokemonOptions] = useState<
    { id: number; name: string; sprite: string }[]
  >([]);

  useEffect(() => {
    const loadPokemons = async () => {
      const pokemons = await fetchPokemons();
      const options = pokemons.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprite,
      }));
      setPokemonOptions(options);
    };

    loadPokemons();
  }, []);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      list: [],
    },
  });

  const onSubmit = (data: {
    firstName: string;
    lastName: string;
    list: IPokemon[];
  }) => {
    toggleModal();
    setSuccessMessage(
      "Nice one, boss!<br/> Your team is ready!<br/> I believe in you!<br/> Have a great fight!<br/>"
    );
    setLoc("right-48");
  };

  return (
    <div className="container min-h-screen flex items-center justify-center p-10 mx-auto relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-[400px] p-6 rounded-3xl flex flex-col gap-5 items-center 
             bg-white/5 shadow-2xl border border-white/20"
      >
        <div>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="border w-86 font-medium text-sm text-gray-200 pl-3 py-2 rounded-3xl border-gray-300 md:h-[52px]"
                placeholder="Enter your first name"
              />
            )}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 pt-2">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="border w-86 font-medium text-sm text-gray-200 pl-3 py-2 rounded-3xl border-gray-300 md:h-[52px]"
                placeholder="Enter your last name"
              />
            )}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 pt-2">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div>
          <Controller
            name="list"
            control={control}
            render={({ field }) => (
              <Select {...field} options={pokemonOptions} />
            )}
          />
          {errors.list && (
            <p className="text-sm text-red-500 pt-2">{errors.list.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          className="block px-4 py-3 bg-pink-600 text-white rounded-3xl disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
        >
          Show my team
        </button>
      </form>

      <img
        src={green}
        alt="Picture of green Pokemon"
        width={320}
        height={320}
        className="absolute right-0"
      />
      <img
        src={pink}
        alt="Picture of pink Pokemon"
        width={320}
        height={320}
        className="absolute left-0 top-20"
      />

      <div>
        <img
          src={cloud}
          alt="Speech bubble image"
          className="absolute right-28 top-[50px]"
          width={330}
          height={120}
        />
        <p
          className={`font-bold text-black text-2xl absolute top-[120px] ${loc}`}
          dangerouslySetInnerHTML={{ __html: successMessage }}
        />
      </div>

      <TeamModal
        isOpen={isOpen}
        onClose={toggleModal}
        selectedPokemons={watch("list")}
      />
    </div>
  );
};

export default Form;
