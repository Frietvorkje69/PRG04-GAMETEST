class enemy {
    size = Math.random() * 10
    speed = Math.random() * 10
    health = 3
  
    constructor(){
      console.log('i am goom')
    }
  
    attack(){
      console.log('he attackin')
    }
      jump(){
      console.log('he jumpin')
    }
      hurt(){
      this.health--
      console.log(`Bozo took an ouchie`)
      this.showHealth()
  
    }
    showHealth(){
      console.log(`Remaining health: ${this.health}/3`)
    }
  }
  
  let bruhlord = new enemy
  let frank = new enemy
  
  frank.hurt()
  
  let list : enemy[] = []
  list = [bruhlord, frank]
  
  for(let g of list){
    console.log(g.health)
  }
  console.log(list)