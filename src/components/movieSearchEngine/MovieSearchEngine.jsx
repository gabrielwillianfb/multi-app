import { useState } from "react";
import axios from "axios";
import Title from "../title/Title";
import Button from "../button/Button";
import Container from "../container/Container";
import Input from "../input/Input";
import MovieCard from "./MovieCard";
import styled from "styled-components";

/*
Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2U3YWI3ZWZiM2JmYjZmYWEyZjEzZTI5ZWIxMWU2NSIsIm5iZiI6MTcyMTY5NjU0Ny40ODMyMTksInN1YiI6IjY2OWVmZGQ4NWU3NjMyMTI2NDBhNTI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IdK5A3Mt0d3wSa759SOeGloWhNi9qcoWoizoIR-QDTY",
    },
*/

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

function MovieSearchEngine() {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2U3YWI3ZWZiM2JmYjZmYWEyZjEzZTI5ZWIxMWU2NSIsIm5iZiI6MTcyMTY5NjU0Ny40ODMyMTksInN1YiI6IjY2OWVmZGQ4NWU3NjMyMTI2NDBhNTI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IdK5A3Mt0d3wSa759SOeGloWhNi9qcoWoizoIR-QDTY";

  const [movie, setMovie] = useState([]);
  const [error, setError] = useState();
  const [query, setQuery] = useState("");

  const searchMovies = async () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/search/movie`,
      params: {
        include_adult: "false",
        language: "pt-br",
        page: "1",
        query: `${query}`,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMovie(response.data.results);
      })
      .catch(function (error) {
        setError(error);
        console.error("Erro:" + error);
      });
  };

  return (
    <Container>
      <Title title="Movies" />
      <Input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Informe um filme para pesquisar"
      />
      <Button
        onClick={searchMovies}
        description="Buscar"
        border="1px solid"
        borderRadius="0.5rem"
        textColor="white"
        width="8rem"
        height="2.5rem"
        fontSize="1.1rem"
      />
      <Movies>
        {movie &&
          movie.map((m) => (
            <MovieCard
              key={m.id}
              title={m.original_title}
              date={m.release_date}
              poster={`https://image.tmdb.org/t/p/original${m.backdrop_path}`}
            />
          ))}
      </Movies>
      <div className="error" style={{ color: "red" }}>
        {error}
      </div>
    </Container>
  );
}

export default MovieSearchEngine;
