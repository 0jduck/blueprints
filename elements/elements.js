console.log("File elements/elements.js loaded")

document.addEventListener('DOMContentLoaded', () => {
    ['header', 'fotter', 'sidebar'].forEach(X => {
        const el = document.getElementById(X);
        if (el) {
            console.log(`Found #${X}`);
            const saved = localStorage.getItem(`${X}-saved`);
            if (saved) {
                requestAnimationFrame(() => {
                    el.innerHTML = saved;
                });
            }
            fetch(`/elements/${X}.html`)
                .then(res => {
                    if (!res.ok) throw new Error(`${X} file not found`);
                    return res.text();
                })
                .then(fetched => {
                    if (fetched !== saved) {
                        console.log(`New ${X} found`);
                        requestAnimationFrame(() => {
                            el.innerHTML = fetched;
                        });
                        console.log(`${X} replaced`);
                        localStorage.setItem(`${X}-saved`, fetched);
                    } else {
                        console.log(`${X} is up to date`);
                    }
                })
                .catch(err => console.error(`elements/elements.js [${X}]:`, err));
        } else {
            console.error(`Cannot find #${X}`);
        }
    });
});

// background sound
const backgroundAudio = new Audio('/elements/storm.mp3');
backgroundAudio.loop = true;

function backgroundAudioToggle() {
  if (backgroundAudio.paused) backgroundAudio.play();
  else backgroundAudio.pause();
  document.getElementById('backgroundAudioStatus').textContent = `Paused: ${backgroundAudio.paused}`;
  console.log(`Background paused ${backgroundAudio.paused}`);
}

// click sound
const clickAudio = new Audio('/elements/click.mp3');
let clickAudioBool = true;

function clickAudioCallback(event) {
  if (clickAudioBool) {
    clickAudio.currentTime = 0;
    clickAudio.play();
  }
}
function clickAudioToggle() {
  clickAudioBool = !clickAudioBool;
  document.getElementById('clickAudioStatus').textContent = `Click noise: ${clickAudioBool}`;
  console.log(`Click audio ${clickAudioBool}`);
}

document.addEventListener("mousedown", clickAudioCallback);
