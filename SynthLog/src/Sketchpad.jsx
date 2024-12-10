import React from 'react';

const MyNotebook = () => {
    const openNewWindow = () => {
        const newWindow = window.open('', '_blank', 'width=800,height=600');
        newWindow.document.title = 'Drawing Application';

        newWindow.document.body.innerHTML = `
            <div id="toolbar">
                <input type="color" id="stroke" value="#000000">
                <input type="range" id="lineWidth" min="1" max="20" value="5">
                <input type="text" id="fileName" placeholder="File name" value="drawing">
                <button id="clear">Clear</button>
                <button id="save">Save</button>
            </div>
            <canvas id="drawing-board"></canvas>
        `;

        const style = newWindow.document.createElement('style');
        style.innerHTML = `
            body { margin: 0; display: flex; flex-direction: column; height: 100vh; }
            #toolbar { display: flex; gap: 10px; padding: 10px; background-color: #f0f0f0; }
            canvas { flex-grow: 1; display: block; }
        `;
        newWindow.document.head.appendChild(style);

        const script = newWindow.document.createElement('script');
        script.innerHTML = `
            const canvas = document.getElementById('drawing-board');
            const toolbar = document.getElementById('toolbar');
            const ctx = canvas.getContext('2d');

            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight - toolbar.offsetHeight;
            }
            resizeCanvas();

            window.addEventListener('resize', resizeCanvas);

            let isPainting = false;
            let lineWidth = 5;

            toolbar.addEventListener('click', e => {
                if (e.target.id === 'clear') {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
                if (e.target.id === 'save') {
                    const fileNameInput = document.getElementById('fileName');
                    const fileName = fileNameInput.value || 'drawing';
                    const tempCanvas = document.createElement('canvas');
                    const tempCtx = tempCanvas.getContext('2d');

                    tempCanvas.width = canvas.width;
                    tempCanvas.height = canvas.height;

                    tempCtx.fillStyle = 'white';
                    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

                    tempCtx.drawImage(canvas, 0, 0);

                    const link = document.createElement('a');
                    link.download = fileName + '.png';
                    link.href = tempCanvas.toDataURL('image/png');
                    link.click();
                }
            });

            toolbar.addEventListener('change', e => {
                if (e.target.id === 'stroke') {
                    ctx.strokeStyle = e.target.value;
                }
                if (e.target.id === 'lineWidth') {
                    lineWidth = e.target.value;
                }
            });

            const draw = (e) => {
                if (!isPainting) return;

                ctx.lineWidth = lineWidth;
                ctx.lineCap = 'round';
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            };

            canvas.addEventListener('mousedown', (e) => {
                isPainting = true;
                ctx.beginPath(); 
                ctx.moveTo(e.offsetX, e.offsetY); 
            });

            canvas.addEventListener('mouseup', () => {
                isPainting = false;
                ctx.beginPath(); 
            });

            canvas.addEventListener('mousemove', draw);
        `;
        newWindow.document.body.appendChild(script);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={openNewWindow} style={{ padding: '10px 20px', marginTop: '20px' }}>
                Open Drawing Application
            </button>
        </div>
    );
};

export default MyNotebook;
