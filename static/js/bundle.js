class CustomMPCElement extends HTMLElement {
  constructor() {
    super();
    this.onInputStart = this.onInputStart.bind(this);
    this.onInputStop = this.onInputStop.bind(this);
  }

  connectedCallback() {
    window.addEventListener('keydown', this.onInputStart);
    window.addEventListener('keyup', this.onInputStop);
  }

  disconnectedCallback() {
    window.addEventListener('keydown', this.onInputStart);
    window.addEventListener('keyup', this.onInputStop);
  }

  onInputStart(event) {
    const node = [...this.children].find(child =>  child.key === event.key);
    if (node) node.onInputStart();
  }

  onInputStop() {
    const node = [...this.children].find(child =>  child.key === event.key);
    if (node) node.onInputStop();
  }
}

const audioContext = new AudioContext();

class CustomPadElement extends HTMLElement {
  constructor() {
    super();
    this.onInputStart = this.onInputStart.bind(this);
    this.onInputStop = this.onInputStop.bind(this);
  }

  set active(bool) {
    this.classList.toggle('mpc__pad--active', bool);
  }

  get key() {
    return this.getAttribute('key');
  }

  connectedCallback() {
    this.loadSample();
    this.addEventListener('mousedown', this.onInputStart);
    this.addEventListener('mouseup', this.onInputStop);
    this.addEventListener('touchstart', this.onInputStart);
    this.addEventListener('touchend', this.onInputStop);
  }

  disconnectedCallback() {
    this.removeEventListener('mousedown', this.onInputStart);
    this.removeEventListener('mouseup', this.onInputStop);
    this.removeEventListener('touchstart', this.onInputStart);
    this.removeEventListener('touchend', this.onInputStop);
  }

  onInputStart() {
    const source = audioContext.createBufferSource();
    source.connect(audioContext.destination);
    source.buffer = this.sample;
    this.active = true;
    source.start();
  }

  onInputStop() {
    this.active = false;

  }

  loadSample() {
    const sample = this.getAttribute('sample');
    const url = `../audio/${sample}.wav`;
    fetch(url).then(response => {
      return response.arrayBuffer();
    }).then(buffer => {
      return audioContext.decodeAudioData(buffer);
    }).then(sample => {
      this.sample = sample;
    });
  }
}

customElements.define('x-mpc', CustomMPCElement);
customElements.define('x-pad', CustomPadElement);