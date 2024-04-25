import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, TextField } from '@mui/material';
/* import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import SaveAsIcon from '@mui/icons-material/SaveAs'; */
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

//import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';

export default function RelatoEntrevista() {
    const [transcripcionTotal, setTranscripcionTotal] = useState('');

    const iniciarTranscripcion = () => {
        setTranscripcionTotal("");
        let finalTranscript = '';
        let recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'es-CO';

        recognition.onresult = function (event) {
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                const transcript = event.results[i][0].transcript.toLowerCase();

                if (/\bfinalizar\s+entrevista\b/.test(transcript)) {
                    console.log("Se dio la orden de terminar la entrevista");
                    recognition.stop();                    
                }

                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }

            setTranscripcionTotal(finalTranscript + interimTranscript + ' ');
        };

        recognition.start();

        return () => {
            recognition.stop();            
        };
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
                color={iniciarTranscripcion ? 'error' : 'success'}
                onClick={iniciarTranscripcion}
            >
               {/*  <RecordVoiceOverIcon/> */}
                {'Relatar por voz'}
            </Button>

            <Button
                variant="contained"
                color='success'
                onClick={() => guardarTranscripcion(transcripcionTotal)} // Llama guardarTranscripcion al hacer clic en el botón
            >
                {/* <SaveAsIcon/> */}
                {'Guardar'}
            </Button>

            <ReactQuill
                style={{ backgroundColor: 'white', color:'black', minHeight: '300px', width: '100%' }}
                theme="snow"
                value={transcripcionTotal}
                onChange={setTranscripcionTotal}                
            />
        </Box>
    );
}
