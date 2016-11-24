var Reverb = function(context, parameters) {

	this.context = context;
	this.input = context.createGain();

	// create nodes
	this.convolver = context.createConvolver();
	this.wetGain = context.createGain(); 
	this.dryGain = context.createGain();

	// connect 
	this.input.connect(this.convolver);
	this.convolver.connect(this.wetGain);

	this.input.connect(this.dryGain);

	this.dryGain.connect(this.context.destination);
	this.wetGain.connect(this.context.destination);

	this.wetGain.gain.value = parameters.reverbWetDry;
	this.dryGain.gain.value = (1-parameters.reverbWetDry);

	this.parameters = parameters;
}


Reverb.prototype.loadIumpulseResponse = function() {
		var request = new XMLHttpRequest();
		var url = "sportscentre_cardioid.wav";
	  	request.open('GET', url, true);
	  	request.responseType = 'arraybuffer';
	  	request.onload = function() {
	    context.decodeAudioData(request.response, function(buffer) {
			this.convolver.buffer = buffer;
	    });
	  }
	  request.send();
	}	


Reverb.prototype.updateParams = function (params, value) {

	switch (params) {
		case 'reverb_dry_wet':
			this.parameters.reverbWetDry = value;
			this.wetGain.gain.value = value;
			this.dryGain.gain.value = 1 - value;
			break;		
	}
}

