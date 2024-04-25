import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function RelatoEntrevista2() {

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();

    const [transcripcionTotal, setTranscripcionTotal] = useState('');
    const [grabando, setGrabando] = useState(false);

    const iniciarTranscripcion = () => {
        setTranscripcionTotal("");
        let recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false; 
        recognition.lang = 'es-CO';

        recognition.onresult = function (event) {
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                finalTranscript += event.results[i][0].transcript;
            }

            setTranscripcionTotal(prevTranscripcion => prevTranscripcion + ' ' + finalTranscript);
        };

        recognition.onstart = function() {
            setGrabando(true);
        };

        recognition.onend = function() {
            setGrabando(false);
        };

        recognition.start();

        return () => {
            recognition.stop();            
        };
    };

    const iniciarTranscripcion2 = ()=>{
        //SpeechRecognition.startListening;
        setTranscripcionTotal(transcript);
    };

    const guardarTranscripcion = async (transcripcion) => {
        try {
            const fileHandle = await window.showSaveFilePicker();
            const writable = await fileHandle.createWritable();
            await writable.write(transcripcion);
            await writable.close();
            console.log("Transcripción guardada correctamente");
        } catch (error) {
            console.error("Error al guardar la transcripción:", error);
        }
    };

    return (
        <Box sx={{ borderRadius: 3, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark', }, }}>
            <Button
                variant="contained"
                color={grabando ? 'error' : 'success'}
                onClick={grabando ? null : iniciarTranscripcion}
            >
                {'Relatar por voz'}
            </Button>

            <Button
                variant="contained"
                color={grabando ? 'error' : 'success'}
               // onClick={grabando ? null : iniciarTranscripcion} // Evitar iniciar si ya está grabando
               onClick={SpeechRecognition.startListening}
            >
                {'Relatar por voz 2'}
            </Button>

            <Button
                variant="contained"
                color='success'
                onClick={() => guardarTranscripcion(transcripcionTotal)}
            >
                {'Guardar'}
            </Button>

            <ReactQuill
                style={{ backgroundColor: 'white', color:'black', minHeight: '300px', width: '100%' }}
                theme="snow"
                value={transcript}
                //onChange={setTranscripcionTotal}                
            />
        </Box>
    );
}
