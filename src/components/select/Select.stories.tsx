import React, { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import Select from "./Select";
import { IPokemon } from "../../interfaces/interfaces";

const samplePokemons: IPokemon[] = [
  {
    id: 1,
    name: "bulbasaur",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    url: "",
  },
  {
    id: 2,
    name: "ivysaur",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    url: "",
  },
  {
    id: 3,
    name: "venusaur",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
    url: "",
  },
  {
    id: 4,
    name: "charmander",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    url: "",
  },
  {
    id: 5,
    name: "charmeleon",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
    url: "",
  },
];

export default {
  title: "Components/Select",
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = (args) => {
  const [selected, setSelected] = useState<IPokemon[]>([]);
  return <Select {...args} onChange={setSelected} />;
};

export const Default = Template.bind({});
Default.args = {
  options: samplePokemons,
};
