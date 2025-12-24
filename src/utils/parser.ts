
import { EXPO_PUBLIC_URL_API } from "@env";
import { Details, RawDetails } from "../screens/DetailPage/detailType";

export const ParseDetails = (rawDetails: RawDetails): Details=> {
    const {
        title,
        original_title,
        overview,
        tagline,
        release_date,
        runtime,
        genres,
        original_language,
        spoken_languages,
        production_countries,
        production_companies,
        budget,
        revenue,
        vote_average,
        vote_count,
        poster_path,
        backdrop_path,
        homepage,
        status,
        imdb_id,
    } = rawDetails;

    return {
        title,
        originalTitle: original_title,
        overview,
        tagline,
        releaseDate: release_date,
        runtime,
        genres: genres.map(({ name }) => name),
        language: original_language,
        spokenLanguages: spoken_languages.map(
            ({ english_name }) => english_name
        ),
        countries: production_countries.map(({ name }) => name),
        productionCompanies: production_companies.map(({ name }) => name),
        budget,
        revenue,
        voteAverage: vote_average,
        voteCount: vote_count,
        posterUrl: poster_path ? `${EXPO_PUBLIC_URL_API}${poster_path}` : null,
        backdropUrl: backdrop_path
            ? `${EXPO_PUBLIC_URL_API}${backdrop_path}`
            : null,
        homepage,
        status,
        imdbId: imdb_id,
    };
};
