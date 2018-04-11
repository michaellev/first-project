/* global WaveSurfer:false */

const recorderRecordElm = document.querySelector('[data-recorder-record]')
const recorderPauseElm = document.querySelector('[data-recorder-pause]')
const recorderResumeElm = document.querySelector('[data-recorder-resume]')
const recorderStopElm = document.querySelector('[data-recorder-stop]')
const playerPlayElm = document.querySelector('[data-player-play]')
const playerPauseElm = document.querySelector('[data-player-pause]')
const playerStopElm = document.querySelector('[data-player-stop]')
const player = WaveSurfer.create({
  container: '[data-waveform]'
})

const disableAndHide = (element) => {
  element.disabled = true
  element.style.display = 'none'
}

const enableAndShow = (element) => {
  element.disabled = false
  element.style.display = 'inline-block'
}

navigator.mediaDevices.getUserMedia({audio: true})
  .then((stream) => {
    const mimeType = 'audio/webm'
    const recorder = new window.MediaRecorder(stream, {mimeType})
    const chunks = []
    recorder.ondataavailable = (e) => chunks.push(e.data)
    recorder.onstart = () => {
      player.empty()
      disableAndHide(recorderRecordElm)
      enableAndShow(recorderPauseElm)
      disableAndHide(recorderResumeElm)
      enableAndShow(recorderStopElm)
      disableAndHide(playerPlayElm)
      disableAndHide(playerPauseElm)
      disableAndHide(playerStopElm)
    }
    recorder.onpause = () => {
      disableAndHide(recorderRecordElm)
      disableAndHide(recorderPauseElm)
      enableAndShow(recorderResumeElm)
      enableAndShow(recorderStopElm)
      disableAndHide(playerPlayElm)
      disableAndHide(playerPauseElm)
      disableAndHide(playerStopElm)
    }
    recorder.onstop = () => {
      enableAndShow(recorderRecordElm)
      disableAndHide(recorderPauseElm)
      enableAndShow(recorderResumeElm)
      disableAndHide(recorderStopElm)
      enableAndShow(playerPlayElm)
      disableAndHide(playerPauseElm)
      disableAndHide(playerStopElm)
      player.load(window.URL.createObjectURL(new window.Blob(chunks, {type: mimeType})))
    }
    player.on('play', () => {
      disableAndHide(recorderRecordElm)
      disableAndHide(recorderPauseElm)
      disableAndHide(recorderResumeElm)
      disableAndHide(recorderStopElm)
      disableAndHide(playerPlayElm)
      enableAndShow(playerPauseElm)
      enableAndShow(playerStopElm)
    })
    player.on('pause', () => {
      enableAndShow(recorderRecordElm)
      disableAndHide(recorderPauseElm)
      disableAndHide(recorderResumeElm)
      disableAndHide(recorderStopElm)
      enableAndShow(playerPlayElm)
      disableAndHide(playerPauseElm)
      enableAndShow(playerStopElm)
    })
    recorderRecordElm.addEventListener('click', () => { recorder.start() })
    recorderPauseElm.addEventListener('click', () => { recorder.pause() })
    recorderResumeElm.addEventListener('click', () => { recorder.resume() })
    recorderStopElm.addEventListener('click', () => { recorder.stop() })
    playerPlayElm.addEventListener('click', () => { player.play() })
    playerPauseElm.addEventListener('click', () => { player.pause() })
    playerStopElm.addEventListener('click', () => {
      player.stop()
      disableAndHide(playerStopElm)
    })
  })
