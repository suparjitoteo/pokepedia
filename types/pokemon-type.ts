export interface INamedResponse {
  name: string;
  url: string;
}

export interface IPokemon {
  abilities: {
    ability: INamedResponse;
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  height: number;
  id: number;
  moves: {
    move: INamedResponse;
    version_group_details?: {
      level_learned_at: number;
      move_learn_method: INamedResponse;
      version_group: INamedResponse;
    }[];
  }[];
  name: string;
  order: number;
  species: INamedResponse;
  stats: {
    base_stat: number;
    effort: number;
    stat: INamedResponse;
  }[];
  types: {
    slot: number;
    type: INamedResponse;
  }[];
  weight: number;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };

  nickname: string;
  _rev: string; //needed for pouchDB
}
