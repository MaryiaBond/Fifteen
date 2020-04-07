class Game {
    constructor() {
        this.level = 4
        this.arr = []
        this.target = this.level*this.level
        this.targetItem = document.querySelector('.target')
        this.randomArr = []
        this.score = 0
        this.steps = 0
    }
    createArr(){
        this.arr = []
        for (let i = 1; i < this.level*this.level; i++) {
            this.arr.push(i)
        }
    }
    createRandomArr() {
        this.randomArr = [...this.arr];
        this.randomArr = this.randomArr.sort(function(){
            return Math.random() - 0.5;
        });
        this.arr.push(0)
        this.randomArr.push(0)
        console.log(this.randomArr)
    }
    draw() {
        this.steps = 0
        this.createArr()
        this.createRandomArr()
        let body = document.getElementById('app')
        body.innerHTML = `<div class="grid-table" style="grid-template-columns: repeat(${this.level}, 1fr);\n' +
            'grid-template-rows: repeat(${this.level}, 1fr);"></div>`

        for(let i = 0; i< (this.level*this.level) - 1; i++) {
            body.children[0].insertAdjacentHTML('beforeend', `<div class="ceil" title="${this.arr[i]}" draggable = "true">${this.randomArr[i]}</div>`)
        }

        body.children[0].insertAdjacentHTML('beforeend', `<div class="target" draggable = "true" title="${this.target}"></div>`)
        body.children[0].insertAdjacentHTML('afterEnd', '<div class="btns"><div class="reset">RESET</div> <div class="btn-prev">prev LEVEL</div> <div class="btn-next">next LEVEL</div></div>')
        body.children[0].insertAdjacentHTML('afterEnd', '<div class="time"></div>')
        body.children[0].insertAdjacentHTML('beforeBegin', `<div class="score">your BEST score: <span>${this.score}</span> Total steps: <span class="steps"></span></div>`)
        this.setTargetItem();
        this.listenTarget();
        this.listenBtns()
        this.setTimer()
    }
    setTimer() {
        let time = document.querySelector('.time')
        let t = 0
        setInterval(() => {
            time.innerHTML = t++
        }, 1000)

    }
    getCurrentTarget() {
        return this.target
    }
    setCurrentArr(number, text, oldTarget) {
        this.randomArr[(number-1)] = 0;
        this.randomArr[(oldTarget-1)] = text;
    }
    isFinish() {
        let finish = this.randomArr.join()
        let arr = this.arr.join()
        return finish === arr
    }
    setTargetItem() {
        this.targetItem = document.querySelector('.target')
    }
    changeLevel() {
        if (this.level < 10) {
            this.level ++
            this.draw()
            this.target = this.level*this.level

        } else {
            alert('No, please, NO')
        }

    }
    prevLevel(){
        if(this.level>2) {
            this.level --
            this.target = this.level*this.level
            this.draw()
            this.targetItem = document.querySelector('.target')
        }
    }
    listenBtns() {
        let reset = document.querySelector('.reset')
        reset.addEventListener('click', () => {
            this.draw()
        })

        let next = document.querySelector('.btn-next')

        next.addEventListener('click', () => {
            this.changeLevel()
        })

        let prev = document.querySelector('.btn-prev')

        prev.addEventListener('click', () => {
            this.prevLevel()
        })
    }

    listenTarget() {
        let listen = (event) => {
            this.switchCeils(event.relatedTarget)
        }
        let ceil = document.querySelectorAll('.ceil')
        ceil.forEach(c => {
            c.addEventListener('click', (event) => {
                this.switchCeils(event.toElement)
            })
        })
        this.targetItem.removeEventListener('dragenter', listen)

        this.targetItem.addEventListener('dragenter', listen)
    }

    switchCeils(relTarget) {
        if(relTarget !== null && relTarget.classList[0] === 'ceil') {
            this.setTargetItem()
            let text = relTarget.innerHTML
            let num = Number(relTarget.title)
            let target = this.getCurrentTarget()
            let oldTarget = target
            if (target === (num + 1) || target === (num - 1) || (target - this.level) === num || num === (this.level - target) || num === (target - this.level) || target === (num - this.level) || target === num) {
                relTarget.innerHTML = ''
                relTarget.classList.toggle('ceil')
                relTarget.classList.toggle('target')
                this.target = Number(num)
                this.targetItem.classList.toggle('ceil')
                this.targetItem.classList.toggle('target')
                this.targetItem.innerHTML = text;
                this.setTargetItem()
                this.listenTarget()
                this.setCurrentArr(num, text, oldTarget)
                this.steps++
                document.querySelector('.steps').innerHTML = this.steps
                if(this.isFinish()) {
                    alert(`Great! You are WIN in ${this.steps} steps`)
                    let time = document.querySelector('.time')
                    this.score = time.innerHTML
                    this.steps = 0
                    this.changeLevel()
                }
            }
        }
    }

}

let fifteen = new Game()

fifteen.draw()


