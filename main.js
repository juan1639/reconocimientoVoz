const colores =
{
    redRecording: '#f20',
    blackNoRecording: '#111'
};

const btnStartRecord = document.getElementById('btnStartRecord');
const btnStopRecord = document.getElementById('btnStopRecord');
const btnPlay = document.getElementById('play');
const btnClear = document.getElementById('clear');
const recording = document.getElementById('recording');
const texto = document.getElementById('texto');

let recog = new webkitSpeechRecognition();

recog.lang = 'es-ES';
recog.continuous = true;
recog.interimResults = false;

console.log(recog);

recog.onresult = (ev) =>
{
    const results = ev.results;
    const frase = results[results.length - 1][0].transcript;
    // const frase = results[0].transcript;
    console.log(results);
    console.log(frase);
    console.log(texto);
    texto.value += frase;
}

recog.onend = (ev) =>
{
    console.log('El microfono dejo de escuchar/grabar');
}

recog.onerror = (ev) =>
{
    console.log(ev.error);
}

btnStartRecord.addEventListener('click', () =>
{
    console.log('grabando...');
    recog.start();
    recording.style.backgroundColor = colores.redRecording;
});

btnStopRecord.addEventListener('click', () =>
{
    console.log('abort');
    recog.abort();
    recording.style.backgroundColor = colores.blackNoRecording;
});

btnPlay.addEventListener('click', () =>
{
    readTxt(texto.value);
});

btnClear.addEventListener('click', () =>
{
    texto.value = '';
});

function readTxt(texto)
{
    const speech = new SpeechSynthesisUtterance();
    speech.text = texto;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}
