import React, { Component } from 'react';
import 'md-gum-polyfill';

const dataURItoBlob = (dataURI) => {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}

export default class BeerPhoto extends Component {
  state = {
    showControls: true
  }

  componentDidMount() {
    let mediaConfig =  { video: { width: 640, height: 480, facingMode: "environment" } };

    navigator.mediaDevices.getUserMedia(mediaConfig).then(stream => {
      this.stream = stream;
      this.video.src = window.URL.createObjectURL(stream);
      this.video.play();
    });
  }

  componentWillUnmount() {
    this.stream.getTracks()[0].stop();
  }

  takeSnapshot = () => {
    const context = this.canvas.getContext('2d');
    context.drawImage(this.video, 0, 0, 640, 480);
    this.setState({showControls: false})
  }

  sendSnapshot = () => {
    const dataUrl = this.canvas.toDataURL("image/jpeg");
    const blobData = dataURItoBlob(dataUrl);
    this.props.upload(this.props.location.state.uploadURL, blobData)
  }

  render() {
    return (
      <div>
        { this.state.showControls ?
          <div>
            <button onClick={this.takeSnapshot}>Snap Photo</button><br/>
            <video ref={(e) => this.video = e} width={640} height={480} autoPlay></video>
          </div>
          :
          <div>
            <button onClick={this.sendSnapshot}>Submit Photo</button>
          </div>
        }
        <canvas ref={(e) => this.canvas = e} width={640} height={480}></canvas>
      </div>
    );
  }
}
