import { useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getDetailsOptions } from "../queryOptions/getDetailOptions";


export const useDetails = (id?: string) => {
    // const navigate = useNavigate();
    // const { addToHistory } = useMovieHistory();

    const movieId = Number(id);
    if (!movieId) {
        throw new Error("Movie ID is missing");
    }

    const { data } = useSuspenseQuery(getDetailsOptions(movieId));


    // useEffect(() => {
    //     addToHistory({
    //         id: movieId,
    //         title: data.title,
    //         poster: data.posterUrl,
    //     });
    // }, [movieId, data, addToHistory]);

    // const handleCarouselClick = (id: number) => {
    //     navigate(RoutePath.DETAILS.replace(":id", String(id)));
    // };

    return {
        data,
        // handleCarouselClick,
    };
};
