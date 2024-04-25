import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechRecognitionExample = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'es-CO' });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const handleReset = () => {
    resetTranscript();
  };

  return (
    <div>
      <h1>Reconocimiento de Voz</h1>
      <p>Transcripción: {transcript}</p>
      <button onClick={startListening} disabled={listening}>
        Comenzar a Escuchar
      </button>
      <button onClick={stopListening} disabled={!listening}>
        Detener
      </button>
      <button onClick={handleReset}>Borrar Transcripción</button>
      {listening && <div>Escuchando...</div>}
    </div>
  );
};

export default SpeechRecognitionExample;
