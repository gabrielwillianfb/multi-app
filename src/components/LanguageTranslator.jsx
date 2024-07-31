import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const API_KEY = import.meta.env.VITE_DEEPL_API_KEY;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  margin: 50px auto;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
`;

const Label = styled.label`
  color: #555;
  font-size: 16px;
  margin-right: 10px;
`;

const Select = styled.select`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-bottom: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const TranslatedText = styled.p`
  color: #333;
  font-size: 18px;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: center;
`;

const LanguageTranslator = () => {
  const [text, setText] = useState(""); // Define o estado para o texto a ser traduzido
  const [translatedText, setTranslatedText] = useState(""); // Define o estado para o texto traduzido
  const [sourceLang, setSourceLang] = useState("en"); // Define o estado para a língua de origem
  const [targetLang, setTargetLang] = useState("es"); // Define o estado para a língua de destino

  const translateText = async () => {
    try {
      const response = await axios.post("https://api-free.deepl.com/v2/translate", null, {
        params: {
          auth_key: API_KEY,
          text: text,
          source_lang: sourceLang.toUpperCase(),
          target_lang: targetLang.toUpperCase(),
        },
      });
      setTranslatedText(response.data.translations[0].text);
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  return (
    <Container>
      <Title>Language Translator</Title>
      <div>
        <Label>Source Language:</Label>
        <Select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
        </Select>
      </div>
      <div>
        <Label>Target Language:</Label>
        <Select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
        </Select>
      </div>
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <Button onClick={translateText}>Translate</Button>
      {translatedText && <TranslatedText>{translatedText}</TranslatedText>}
      {/* Condicional que exibe o texto traduzido se translatedText não for vazio */}
    </Container>
  );
};

export default LanguageTranslator;
