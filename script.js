console.log('Particles!')
const G = 0.1

function randomNumber (min, max) {
  return (Math.random() * (max-min) + min)
}

function randomColor () {
  return `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)})`
}

function Particle (x, y, color = "white") {
  this.initX = x
  this.initY = y
  this.reset()
  this.life = 100
}

Particle.prototype = {
  draw: function (context) {
    context.fillStyle = this.color
    context.beginPath()
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    context.fill()
  },
  reset: function () {
    this.x = this.initX
    this.y = this.initY
    this.r = randomNumber(10, 40)
    this.color = randomColor()
    this.vx = randomNumber(-10, 10)
    this.vy = randomNumber(-7, 0.5)
  },
  move: function () {
    this.x = this.x + this.vx
    this.y = this.y + this.vy
    this.vy = this.vy + G
  },
  changeColor: function (c) {
    this.color = c
  }
}

function Lab (width, height, color, numberOfParticles = 1) {
  this.width = width
  this.height = height
  this.color = color
  this.numberOfParticles = numberOfParticles

  this.createCanvas()
  this.generateParticles()
}

Lab.prototype = {
  generateParticles: function() {
    // const particles = new Array(this.numberOfParticles)
    // for (let i = 0; i < this.numberOfParticles; i++) {
    //   particles[i] = new Particle()
    // }
    const particles = []
    for (let i = 0; i < this.numberOfParticles; i++) {
      particles.push(new Particle(this.width / 2, 100))
    }
    this.particles = particles
    // this.particles
  },
  clearCanvas: function() {
    this.context.fillStyle = this.color
    this.context.fillRect(0, 0, this.width, this.height)
  },
  createCanvas: function () {
    const canvas = document.createElement('canvas')
    canvas.setAttribute('width', this.width)
    canvas.setAttribute('height', this.height)
    this.context = canvas.getContext('2d')
    const body = document.querySelector('body')
    body.append(canvas)
    this.clearCanvas()
  },
  simulate: function(time) {
    this.clearCanvas()
    this.particles.forEach(particle => {
      particle.move()
      particle.draw(this.context)
      if (this.isOutOfLab(particle)) {
        particle.reset()
      }
    })
    // this.particles[0].move()
    
    // this.particles[0].draw(this.context)
    // if (this.isOutOfLab(this.particles[0])) {
    //   this.particles[0].reset()
    // }
    requestAnimationFrame(this.simulate.bind(this))
  },
  isOutOfLab: function(particle) {
    return (particle.x - particle.r > this.width ||
      particle.x + particle.r < 0 ||
      particle.y + particle.r < 0 ||
      particle.y - particle.r > this.height
    )
  }
}

const lab = new Lab(600, 500, "#ddd", 100)
// console.log(lab.particles)
lab.simulate()

const lab2 = new Lab(300, 300, "#999", 1)
lab2.simulate()
