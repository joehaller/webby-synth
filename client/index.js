
$(document).ready(function() {
  // create the audio context - this is the object that gives us access to all of the objects and constuctors we need to create audio
  // IMPORTANT NOTE - still not supported by all browsers, but almost all
  // for legacy broswers use: new (window.webkitAudioContext || window.AudioContext)();
  const audioContext = new AudioContext();

  // Connect all of our audio nodes to this gain node so their volume is lower.
  const gainDial = audioContext.createGain();
  gainDial.gain.setValueAtTime(0.3, 0);
  gainDial.connect(audioContext.destination);

  const notes = [
    { name: "C", frequency: 261.63, key: 65}, //a
    { name: "C#", frequency: 277.18, key: 87}, //w
    { name: "D", frequency: 293.66, key: 83}, //s
    { name: "D#", frequency: 311.13, key: 69}, //e
    { name: "E", frequency: 329.63, key: 68}, //d
    { name: "F", frequency: 349.23, key: 70}, //f
    { name: "F#", frequency: 369.99, key: 84}, //t
    { name: "G", frequency: 392.0, key: 71}, //g
    { name: "G#", frequency: 415.3, key: 89}, //y
    { name: "A", frequency: 440.0, key: 72}, //h
    { name: "A#", frequency: 466.16, key: 85}, //u
    { name: "B", frequency: 493.88, key: 74}, //j
    { name: "C", frequency: 523.25, key: 75}, //k
    { name: "C#", frequency: 554.37, key: 79}, //k
    { name: "D", frequency: 587.33, key: 76} //l
  ];

  // Iterate over the notes array and create buttons/attach event listeners
  notes.forEach(({ name, frequency, key }) => {
    let noteButton = $('<button></button>');
    let className;
    if (name[1] === '#') {
      className = name[0] + 'sharp';
      noteButton.addClass(className);
      noteButton.addClass('sharp');
    } else {
      className = name;
      noteButton.addClass(className);
    }
    noteButton.text(name);
    $('#app').append(noteButton);
    $(`body`).keydown( async (e) => {
      if (e.keyCode === key) {
        noteButton.addClass('press');
        // determines our start and stop times
        const start = audioContext.currentTime;
        // create oscillator - this is our source
        const noteOscillator = audioContext.createOscillator();
        // sine, square, triangle and sawtooth waves are available - can define our own custom waveforms too!
        noteOscillator.type = "triangle";
        // setting our frequency to the note values defined above
        noteOscillator.frequency.setValueAtTime(frequency, start);
        const compressor = audioContext.createDynamicsCompressor();

        // create vibrato node
        const vibrato = audioContext.createOscillator();
        vibrato.frequency.value = 10;
        const vibratoGain = audioContext.createGain();
        vibratoGain.gain.value = 1.5;
        vibrato.connect(vibratoGain);
        vibratoGain.connect(noteOscillator.frequency);
        vibrato.start();

        // attack, decay, sustain values
        const attack = 0.1;
        const decay = 0.3;
        const sustain = 0.6;
        const release = 0.2;
        const duration = 1;
        const noteGain = audioContext.createGain();
        noteGain.gain.setValueAtTime(0, 0);
        // set attack and sustain
        noteGain.gain.linearRampToValueAtTime(1, start + attack);
        noteGain.gain.linearRampToValueAtTime(sustain, start + attack + decay);
        // set release
        noteGain.gain.setValueAtTime(sustain, start + duration - release);
        noteGain.gain.linearRampToValueAtTime(0, start + duration);

        // this is how we start the sound
        noteOscillator.start();
        // this is how we stop it
        noteOscillator.stop(start + 1);
        noteOscillator.connect(noteGain);
        noteOscillator.connect(compressor);
        noteGain.connect(gainDial);
      }
      $('body').keyup(() => noteButton.removeClass('press'));
    });
  });
})
