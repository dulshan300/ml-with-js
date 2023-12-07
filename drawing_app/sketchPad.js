class SketchPad {
    constructor(container, size = 400) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
            background-color:white;
            box-shadow: 0px 0px 10px 2px black;
        `;
        container.appendChild(this.canvas)

        container.appendChild(document.createElement('br'))

        this.undoBtn = document.createElement('button');
        this.undoBtn.innerHTML = "UNDO";
        this.undoBtn.classList.add('btn');        
        container.appendChild(this.undoBtn)

        this.ctx = this.canvas.getContext("2d")      

        this.reset()
        this.#addEventListners();
        
        

    }

    reset(){
        this.paths = []
        this.isDrawing = false
        this.#redraw()
    }

    #getMouse = (evt) => {
        const rect = this.canvas.getBoundingClientRect();
        const mouse = [
            Math.round(evt.clientX - rect.left),
            Math.round(evt.clientY - rect.top)
        ]

        return mouse;
    }

    #addEventListners() {
        this.canvas.onmousedown = (evt) => {
            const mouse = this.#getMouse(evt);

            this.paths.push([mouse])
            this.isDrawing = true
        }

        this.canvas.onmousemove = (evt) => {
            if (this.isDrawing) {
                const mouse = this.#getMouse(evt);
                const lastPath = this.paths[this.paths.length - 1]
                lastPath.push(mouse)
                this.#redraw()

            }

        }

        this.canvas.onmouseup = (evt) => {
            this.isDrawing = false
        }

        // for touch
        this.canvas.ontouchstart = (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmousedown(loc)
        }

        this.canvas.ontouchmove = (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmousemove(loc)
        }

        this.canvas.ontouchend = (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmouseup(loc)
        }

        this.undoBtn.onclick = (evt) => {
            this.paths.pop();
            this.#redraw()
        }


    }

    #redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        draw.paths(this.ctx, this.paths)

        if (this.paths.length == 0) {
            this.undoBtn.disabled = true
        } else {
            this.undoBtn.disabled = false

        }
    }
}