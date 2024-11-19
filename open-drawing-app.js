document.getElementById('open-new-window').addEventListener('click', () => {
    const newWindow = window.open('', '_blank', 'width=800,height=600');
    newWindow.document.title = 'Drawing Application';

    // Add the HTML structure to the new window
    newWindow.document.body.innerHTML = `
        <div id="toolbar">
            <input type="color" id="stroke" value="#000000">
            <input type="range" id="lineWidth" min="1" max="20" value="5">
            <button id="clear">Clear</button>
            <button id="save">Save</button>
        </div>
        <canvas id="drawing-board"></canvas>
    `;

    // Add CSS styles to the new window
    const style = newWindow.document.createElement('style');
    style.innerHTML = `
        body { margin: 0; display: flex; flex-direction: column; height: 100vh; }
        #toolbar { display: flex; gap: 10px; padding: 10px; background-color: #f0f0f0; }
        canvas { flex-grow: 1; display: block; }
    `;
    newWindow.document.head.appendChild(style);

    // Add JavaScript for drawing functionality
    const script = newWindow.document.createElement('script');
    script.innerHTML = `
        const canvas = document.getElementById('drawing-board');
        const toolbar = document.getElementById('toolbar');
        const ctx = canvas.getContext('2d');

        // Set up the canvas size to fill the window (excluding toolbar)
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight - toolbar.offsetHeight;
        }
        resizeCanvas();

        // Resize canvas if the window is resized
        window.addEventListener('resize', resizeCanvas);

        let isPainting = false;
        let lineWidth = 5;

        // Toolbar event listeners
        toolbar.addEventListener('click', e => {
            if (e.target.id === 'clear') {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            if (e.target.id === 'save') {
                // Create a temporary canvas to include the white background
                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');

                // Match the size of the original canvas
                tempCanvas.width = canvas.width;
                tempCanvas.height = canvas.height;

                // Fill the background with white
                tempCtx.fillStyle = 'white';
                tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

                // Draw the original canvas content on top of the white background
                tempCtx.drawImage(canvas, 0, 0);

                // Create a downloadable image from the temporary canvas
                const link = document.createElement('a');
                link.download = 'drawing_with_background.png';
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

        // Drawing logic
        const draw = (e) => {
            if (!isPainting) return;

            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        };

        canvas.addEventListener('mousedown', (e) => {
            isPainting = true;
            ctx.beginPath(); // Start a new path
            ctx.moveTo(e.offsetX, e.offsetY); // Move to the starting point
        });

        canvas.addEventListener('mouseup', () => {
            isPainting = false;
            ctx.beginPath(); // Reset the path
        });

        canvas.addEventListener('mousemove', draw);
    `;
    newWindow.document.body.appendChild(script);
});
