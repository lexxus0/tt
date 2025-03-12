export interface IPokemon {
  id: number;
  type?: string[];
  sprite: string;
  name: string;
  url?: string;
}

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  selectedPokemons?: IPokemon[];
}
