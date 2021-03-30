 // const getImpulseBuffer = (audioCtx, impulseUrl) => {
  //   return fetch(impulseUrl)
  //   .then(response => response.arrayBuffer())
  //   .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
  // }

  function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 50,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
    for ( ; i < n_samples; ++i ) {
      x = i * 2 / n_samples - 1;
      curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
  };

  let impulseResponse = ( duration, decay, reverse ) => {
    var sampleRate = audioContext.sampleRate;
    var length = sampleRate * duration;
    var impulse = audioContext.createBuffer(2, length, sampleRate);
    var impulseL = impulse.getChannelData(0);
    var impulseR = impulse.getChannelData(1);

    if (!decay)
        decay = 2.0;
    for (var i = 0; i < length; i++){
      var n = reverse ? length - i : i;
      impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
      impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
    }
    return impulse;
}

   // create reverb node
   const convolver = audioContext.createConvolver();
   convolver.buffer = impulseResponse(1, 1000);
   const convGain =  audioContext.createGain();
   convGain.gain.value = 1.2;
   convolver.connect(convGain);
   // noteOscillator.connect(convolver);