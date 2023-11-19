import {
  IUserCreationParams,
  IUserCreationResponse,
} from "../interfaces/globalInterfaces";

const methodBasePath = "/api/user";

export const userCreator = {
  createUser: async (
    params: IUserCreationParams
  ): Promise<IUserCreationResponse> => {
    const serializedParams = new URLSearchParams(params as any);
    const response = await fetch(
      `${methodBasePath}/create?${serializedParams}`
    );
    const parsed = await response.json();

    return parsed;
  },
  editUser: async (
    params: IUserCreationParams
  ): Promise<IUserCreationResponse> => {
    const serializedParams = new URLSearchParams(params as any);
    const response = await fetch(`${methodBasePath}/edit?${serializedParams}`);
    const parsed = await response.json();

    return parsed;
  },
};
