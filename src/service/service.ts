import { api } from "../api/api";
import { Details } from "../screens/DetailPage/detailType";
import { ParseDetails } from "../utils/parser";


export const tmdbService = {
    getDetailsData: async (id: number): Promise<Details> => {
        const response = await api.get(`/movie/${id}`);
        return ParseDetails(response.data);
    },
};
