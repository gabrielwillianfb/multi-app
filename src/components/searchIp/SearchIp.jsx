import { useState } from "react";
import axios from "axios";
import Title from "../title/Title";
import Input from "../input/Input";
import Button from "../button/Button";
import Container from "../container/Container";
import styled from "styled-components";

const ResultSearchIp = styled.div`
  font-size: 0.9rem;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-top: 1rem;
`;

const P = styled.div`
  padding: 1rem;
`;

const SearchIp = () => {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState("");

  const searchIp = async () => {
    axios
      .get(`https://ipinfo.io/${ip}/json`)
      .then((response) => {
        setResult(response.data);
        setIp("");
      })
      .catch((error) => {
        console.error("Error: " + error);
        setIp("");
        setResult();
      });
  };

  return (
    <Container>
      <Title title="Consulta de IP" />
      <Input
        type="text"
        value={ip}
        onChange={(event) => setIp(event.target.value)}
        placeholder="Informe um IP para pesquisar"
      />
      <Button
        onClick={searchIp}
        description="Buscar"
        border="1px solid"
        borderRadius="0.5rem"
        textColor="white"
        width="8rem"
        height="2.5rem"
        fontSize="1.1rem"
      />
      <ResultSearchIp>
        {result && (
          <P>
            <p>IP: {result.ip}</p>
            <p>Cidade: {result.city}</p>
            <p>País: {result.country}</p>
            <p>CEP: {result.postal}</p>
            <p>Localização: {result.loc}</p>
          </P>
        )}
      </ResultSearchIp>
    </Container>
  );
};

export default SearchIp;
