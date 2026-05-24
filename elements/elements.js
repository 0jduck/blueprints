console.log("File elements/elements.js loaded")

document.addEventListener('DOMContentLoaded', () => {
    ['header', 'fotter'].forEach(X => {
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

