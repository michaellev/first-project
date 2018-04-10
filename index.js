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

navigator.mediaDevices.getUserMedia({audio: true})
  .then((stream) => {
    const mimeType = 'audio/webm'
    const recorder = new window.MediaRecorder(stream, {mimeType})
    const chunks = []
    recorder.ondataavailable = (e) => chunks.push(e.data)
    recorder.onstart = () => {
      player.empty()
      recorderRecordElm.disabled = true
      recorderPauseElm.disabled = false
      recorderResumeElm.disabled = true
      recorderStopElm.disabled = false
      playerPlayElm.disabled = true
      playerPauseElm.disabled = true
      playerStopElm.disabled = true
    }
    recorder.onpause = () => {
      recorderRecordElm.disabled = true
      recorderPauseElm.disabled = true
      recorderResumeElm.disabled = false
      recorderStopElm.disabled = false
      playerPlayElm.disabled = true
      playerPauseElm.disabled = true
      playerStopElm.disabled = true
    }
    recorder.onstop = () => {
      recorderRecordElm.disabled = false
      recorderPauseElm.disabled = true
      recorderResumeElm.disabled = false
      recorderStopElm.disabled = true
      playerPlayElm.disabled = false
      playerPauseElm.disabled = true
      playerStopElm.disabled = true
      player.load(window.URL.createObjectURL(new window.Blob(chunks, {type: mimeType})))
    }
    player.on('play', () => {
      recorderRecordElm.disabled = true
      recorderPauseElm.disabled = true
      recorderResumeElm.disabled = true
      recorderStopElm.disabled = true
      playerPlayElm.disabled = true
      playerPauseElm.disabled = false
      playerStopElm.disabled = false
    })
    player.on('pause', () => {
      recorderRecordElm.disabled = false
      recorderPauseElm.disabled = true
      recorderResumeElm.disabled = true
      recorderStopElm.disabled = true
      playerPlayElm.disabled = false
      playerPauseElm.disabled = true
      playerStopElm.disabled = false
    })
    recorderRecordElm.addEventListener('click', () => { recorder.start() })
    recorderPauseElm.addEventListener('click', () => { recorder.pause() })
    recorderResumeElm.addEventListener('click', () => { recorder.resume() })
    recorderStopElm.addEventListener('click', () => { recorder.stop() })
    playerPlayElm.addEventListener('click', () => { player.play() })
    playerPauseElm.addEventListener('click', () => { player.pause() })
    playerStopElm.addEventListener('click', () => {
      player.stop()
      playerStopElm.disabled = true
    })
  })
