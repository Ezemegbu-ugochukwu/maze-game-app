 /*const { Engine, Render, Runner, World, Bodies,} = Matter;
const cells = 10;
const width = 600;
const height = 600;
const unit = width / cells ;

const engine = Engine.create();
const {world} = engine;
const render = Render.create({
    element : document.body,
    engine : engine,
    options: {
        wireframes : true,
        width,
        height,
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);

//walls
const walls = [
    Bodies.rectangle(width / 2,0, width,2, {isStatic : true}),
    Bodies.rectangle(width / 2, height, width,2, {isStatic : true}),
    Bodies.rectangle(0,height/2,2,height, {isStatic : true}),
    Bodies.rectangle(width,height/2,2,height, {isStatic: true})
];
World.add(world,walls);

const grid = Array(cells).fill(null).map(() => Array(cells).fill(false))
/*const grid = [];
for (let i = 0; i < 3; i++){
    grid.push([]);
    for (let j = 0; j < 3; j++){
        grid[i].push(false);
    }
} */

 /* const shuffle = (arr) => {
    let counter = arr.length;

    while (counter > 0){
        const index = Math.floor(Math.random() * counter);
        counter--;
        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }
    return arr;
}
const verticals = Array(cells).fill(null).map(() => Array(cells - 1).fill(false))
const horizontal = Array(cells - 1).fill(null).map(() => Array(cells).fill(false))
 const startRows = Math.floor(Math.random() * 3);
 const startColumns = Math.floor(Math.random() * 3);

 const stepThroughCells = (row,column) => {
     // if i have visited this cell at (row,column) then return
     if (grid[row][column]){
         return;
     }
     //mark this cell as being visited
     grid[row][column] = true;
     //Assemble randomly ordered list of neighbours
     const neighbours = shuffle([
      [row - 1, column, 'up'],
      [row, column + 1, 'right'],
      [row + 1, column, 'down'], 
      [row, column - 1, 'left']
     ])
     //for each neighbour...
     for (let neighbour of neighbours){
         const [nextRow, nextColumn, direction] = neighbour;
     
     //see if that neighbour is out of bound
     if (nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= 3){
         continue;
     }
     //if we have visited that neighbour,continue to next neighbour
     if (grid[nextRow][nextColumn]){
         continue;
     }
     // remove a wall from either horizontals or verticals
     if (direction === 'left'){
         verticals[row][column - 1] = true;
     }else if (direction === 'right'){
         verticals[row][column] = true;
     } else if (direction === 'up') {
         horizontal[row - 1][column] = true;
    }else if (direction === 'down'){
        horizontal[row][column] = true;
    }
    stepThroughCells(nextRow,nextColumn)
   }
    //visit that next cell
 };
 stepThroughCells(startRows,startColumns)

 horizontal.forEach((row, rowIndex) => {
     row.forEach((open, columnIndex) =>{
         if (open){
             return;
         }
        const wall = Bodies.rectangle(
            columnIndex * unit + unit/2,
            rowIndex * unit + unit,
            unit,
            5,
            {
                isStatic : true
            }
     );
     World.add(world,wall);
     }) 
 })
 verticals.forEach((row,rowIndex) => {
     row.forEach((open, columnIndex) => {
         if (open){
             return;
         }
         const wall = Bodies.rectangle(
             columnIndex * unit + unit,
             rowIndex * unit + unit/2,
             5,
             unit,
             {
                 isStatic : true
             }
         )
         World.add(world,wall);
     })
 })
 const goal = Bodies.rectangle(
   width - unit/2,
   height - unit/2,
   unit * 0.7,
   unit * 0.7,{
       isStatic : true
   }
 )
 World.add(world,goal); */

 const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const cellsHorizontal = 10;
const cellsVertical = 6;
const width = window.innerWidth;
const height = window.innerHeight;
const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

const engine = Engine.create();
engine.world.gravity.y = 0;
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width,
    height
  }
});
Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 2, height, { isStatic: true })
];
World.add(world, walls);

// Maze generation

const shuffle = arr => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter--;

    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }

  return arr;
};

const grid = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const verticals = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal - 1).fill(false));

const horizontals = Array(cellsVertical - 1)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

const stepThroughCell = (row, column) => {
  // If i have visted the cell at [row, column], then return
  if (grid[row][column]) {
    return;
  } 

  // Mark this cell as being visited
  grid[row][column] = true;

  // Assemble randomly-ordered list of neighbors
  const neighbors = shuffle([
    [row - 1, column, 'up'],
    [row, column + 1, 'right'],
    [row + 1, column, 'down'],
    [row, column - 1, 'left']
  ]);
  // For each neighbor....
  for (let neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor;

    // See if that neighbor is out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cellsVertical ||
      nextColumn < 0 ||
      nextColumn >= cellsHorizontal
    ) {
      continue;
    }

    // If we have visited that neighbor, continue to next neighbor
    if (grid[nextRow][nextColumn]) {
      continue;
    }

    // Remove a wall from either horizontals or verticals
    if (direction === 'left') {
      verticals[row][column - 1] = true;
    } else if (direction === 'right') {
      verticals[row][column] = true;
    } else if (direction === 'up') {
      horizontals[row - 1][column] = true;
    } else if (direction === 'down') {
      horizontals[row][column] = true;
    }

    stepThroughCell(nextRow, nextColumn);
  }
};

stepThroughCell(startRow, startColumn);

horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }

    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX / 2,
      rowIndex * unitLengthY + unitLengthY,
      unitLengthX,
      5,
      {
        label: 'wall',
        isStatic: true,
        render: {
          fillStyle: 'red'
        }
      }
    );
    World.add(world, wall);
  });
});

verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }

    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX,
      rowIndex * unitLengthY + unitLengthY / 2,
      5,
      unitLengthY,
      {
        label: 'wall',
        isStatic: true,
        render : {
          fillStyle: 'red'
        }
      }
    );
    World.add(world, wall);
  });
});
//goal
const goal = Bodies.rectangle(
  width - unitLengthX / 2,
  height - unitLengthY / 2,
  unitLengthX * 0.7,
  unitLengthY * 0.7,
  {
    label: 'goal',
    isStatic: true,
    render: {
      fillStyle: 'green'
    }
  }
);
World.add(world, goal);
//ball
const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
const ball = Bodies.circle(
    unitLengthX/2,
    unitLengthY/2,
    ballRadius,
    {
      label: 'ball',
      render: {
        fillStyle: 'blue'
      }
    }
)
World.add(world,ball);

document.addEventListener('keydown', (e)=>{
  const {x,y} = ball.velocity;

  if (e.key === 'w'){
    Body.setVelocity(ball,{x, y:y-5})
  };
  if (e.key === 'd'){
    Body.setVelocity(ball,{x:x+5,y})
  };
  if (e.key === 's'){
    Body.setVelocity(ball,{x,y:y+5})
  };
  if (e.key === 'a'){
    Body.setVelocity(ball,{x:x-5,y})
  };
})
// win condition
Events.on(engine, 'collisionStart', (e)=>{
  e.pairs.forEach((collision)=>{
    const labels = ['ball','goal']
    if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)){
      document.querySelector('.winner').classList.remove('hidden')
      world.gravity.y = 1;
      world.bodies.forEach((body) =>{
        if (body.label === 'wall'){
          Body.setStatic(body, false)
        }
      })
    }
  })
})


