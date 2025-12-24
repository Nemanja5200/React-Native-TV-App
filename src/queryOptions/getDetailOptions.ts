import { queryOptions } from "@tanstack/react-query";
import { getTime } from "../utils/getTime";
import { tmdbService } from "../service/service";


export const getDetailsOptions = (id: number) =>
    queryOptions({
        queryKey: ["details", id],
        queryFn: () => tmdbService.getDetailsData(id),
        staleTime: getTime(5),
    });