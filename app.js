const canvasDIV = document.querySelector('.canvas');
const ctx = canvasDIV.getContext('2d');

class Canvas {
    width = 1300;
    height = 800;

    bgColor = "#fff";
    
}

class Map {
    color = "#000";

    initMap = () => {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, canvas.width, 128);
        ctx.fillRect(canvas.width - 128, 0, 128, canvas.height);
        ctx.fillRect(0, 0, 128, canvas.height);
        ctx.fillRect(0, canvas.height - 128, canvas.width, 128);

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 250, canvas.width - 350, canvas.height - 850);
        ctx.fillRect(275, 400, canvas.width - 200, canvas.height - 850);
        ctx.fillRect(0, 550, canvas.width - 350, canvas.height - 850);

        // ctx.fillStyle = "#000";
        // ctx.beginPath();
        // ctx.arc(canvas.width - 135, 130, 32, 0, 2 * Math.PI, true);
        // ctx.arc(135, 250, 32, 0, 2 * Math.PI, true);
        // ctx.fill();

        // ctx.fillStyle = "#000";
        // ctx.beginPath();
        // ctx.arc(canvas.width - 135, 350, 32, 0, 2 * Math.PI, true);
        // ctx.arc(135, 500, 32, 0, 2 * Math.PI, true);
        // ctx.fill();

    }
}

// cos(a+b) = cosa.cosb - sina.sinb
function sumOfDegsForCos(deg1, deg2) {
    deg1 = deg1 * Math.PI / 180;
    deg2 = deg2 * Math.PI / 180;

    let cosOfSumOfDegs = Math.cos(deg1) * Math.cos(deg2) - Math.sin(deg1) * Math.sin(deg2);

    return cosOfSumOfDegs;
}

// sin(a+b) = sina.cosb + sinb.cosa 
function sumOfDegsForSin(deg1, deg2) {
    deg1 = deg1 * Math.PI / 180;
    deg2 = deg2 * Math.PI / 180;

    let sinOfSumOfDegs = Math.sin(deg1) * Math.cos(deg2) + Math.sin(deg2) * Math.cos(deg1);

    return sinOfSumOfDegs;
}

const canvas = new Canvas();
const map = new Map();


// set canvas from js
canvasDIV.style.backgroundColor = canvas.bgColor;
canvasDIV.width = canvas.width;
canvasDIV.height = canvas.height;
canvasDIV.style.width = `${canvas.width}px`;
canvasDIV.style.height = `${canvas.height}px`;

class Car {
    width = 64;
    height = 32;
    color = "#aaa";
    positionX = 160;
    positionY = 160;
    positions = {
        frontLeft: {x: this.positionX + this.width, y: this.positionY},
        frontRight: {x: this.positionX + this.width, y: this.positionY + this.height},
        backLeft: {x: this.positionX, y: this.positionY},
        backRight: {x: this.positionX, y: this.positionY}
    };
    movement = 1;
    mouseX;
    mouseY;
    angleInDeg = 0;
    x = 4;
    angleDif = 4;
    difX = 10;
    difY = 0;

    cornerSensorLength = 4;

    sensor = {
        width: 200,
        height: 1,
        ucPosX: this.positionX + this.width + 36,
        ucPosY: this.positionY + this.height / 2 - 4,
        ortaX: 0,
        ortaY: 0,
        color: "#f00",
    }

    frontLeftSensor = {
        width: 180,
        height: 1,
    };

    frontRightSensor = {
        width: 180,
        height: 1,
    };


    initCar = () => {
        // ctx.arc(car.positionX + car.width / 2, car.positionY + car.height / 2, car.width / 2 + car.sensor.width, 0, 2 * Math.PI, false);
        // ctx.strokeStyle = "#232323";
        // ctx.stroke();

        ctx.fillStyle = this.color;
        ctx.fillRect(this.positionX, this.positionY, this.width, this.height);

        ctx.fillStyle = this.sensor.color;
        ctx.fillRect(this.positionX + this.width / 2, this.positionY + this.height / 2 - this.sensor.height / 2, this.sensor.width, this.sensor.height);
    }

    movement = (e) => {
        if(e.key == "a") {
            this.angleInDeg += this.angleDif;

            this.rotateCar(this.angleInDeg);

            this.difX = this.x * Math.cos(this.angleInDeg * Math.PI / 180);
            this.difY = this.x * Math.sin(this.angleInDeg * Math.PI / 180);
        }

        else if(e.key == "d") {
            this.angleInDeg -= this.angleDif;

            this.rotateCar(this.angleInDeg);

            this.difX = this.x * Math.cos(this.angleInDeg * Math.PI / 180);
            this.difY = this.x * Math.sin(this.angleInDeg * Math.PI / 180);
        }

        else if(e.key == "w") {
            this.positionX += this.difX;
            this.positionY -= this.difY;

            this.rotateCar(this.angleInDeg);
        }

        else if(e.key == "s") {
            this.positionX -= this.difX;
            this.positionY += this.difY;

            this.rotateCar(this.angleInDeg);
        }
    }

    rotateCar = (deg) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);


        // ctx.arc(car.positionX + car.width / 2, car.positionY + car.height / 2, car.width / 2 + car.sensor.width, 0, 2 * Math.PI, false);
        // ctx.strokeStyle = "#232323";
        // ctx.stroke();

        let yeniSensorUcuX = (this.positionX + this.width / 2) + ((this.sensor.width) * Math.cos(deg * Math.PI / 180)); //
        let yeniSensorUcuY = (this.positionY + this.height / 2) - ((this.sensor.width) * Math.sin(deg * Math.PI / 180)); //
        // let yeniSensorUcuX = (this.positionX + this.width / 2) + ((this.width / 2) + this.sensor.width) * Math.cos(deg * Math.PI / 180) - this.sensor.width * Math.cos(deg * Math.PI / 180);
        // let yeniSensorUcuY = (this.positionY + this.height / 2) - (((this.height) + this.sensor.width) * Math.sin(deg * Math.PI / 180)) - this.sensor.width * Math.sin(deg * Math.PI / 180); //

        let halfKosegenLength = Math.sqrt(Math.pow(this.width / 2, 2) + Math.pow(this.height / 2, 2));

        let tanOfKosegenInDeg = Math.atan((this.height / 2) / (this.width / 2)) * 180 / Math.PI;
        let cosOfSum = sumOfDegsForCos(deg, tanOfKosegenInDeg);
        let sinOfSum = sumOfDegsForSin(deg, tanOfKosegenInDeg);

        let xDifference = halfKosegenLength * cosOfSum;
        let yDifference = halfKosegenLength * sinOfSum;

        let midX = this.positionX + this.width / 2;
        let midY = this.positionY + this.height / 2;

        car.positions.frontLeft = {x: midX + xDifference, y: midY - yDifference};
        car.positions.backRight = {x: midX - xDifference, y: midY + yDifference};

        let topXDifference = this.width * Math.cos(deg * Math.PI / 180); // needed differences for find the positions of top left corner
        let topYDifference = this.width * Math.sin(deg * Math.PI / 180); // 

        let rightXDifference = this.height * Math.sin(deg * Math.PI / 180) // needed differences for find the positions of bottom right corner
        let rightYDifference = this.height * Math.cos(deg * Math.PI / 180)

        // init front left and front right sensors
        let frontLeftUcuX = (this.positionX + this.width / 2) + ((this.sensor.width) * sumOfDegsForCos(deg, tanOfKosegenInDeg)); //
        let frontLeftUcuY = (this.positionY + this.height / 2) - ((this.sensor.width) * sumOfDegsForSin(deg, tanOfKosegenInDeg)); //

        this.frontLeftSensor.ucPosX = frontLeftUcuX;
        this.frontLeftSensor.ucPosY = frontLeftUcuY;
        this.frontLeftSensor.midX = (this.positionX + this.width / 2 + frontLeftUcuX) / 2;
        this.frontLeftSensor.midY = (this.positionY + this.height / 2 + frontLeftUcuY) / 2;

        let frontRightUcuX = (this.positionX + this.width / 2) + ((this.sensor.width) * Math.cos((tanOfKosegenInDeg - deg) * Math.PI / 180)); //
        let frontRightUcuY = (this.positionY + this.height / 2) + ((this.sensor.width) * Math.sin((tanOfKosegenInDeg - deg) * Math.PI / 180)); //

        this.frontRightSensor.ucPosX = frontRightUcuX;
        this.frontRightSensor.ucPosY = frontRightUcuY;
        this.frontRightSensor.midX = (this.positionX + this.width / 2 + frontRightUcuX) / 2;
        this.frontRightSensor.midY = (this.positionY + this.height / 2 + frontRightUcuY) / 2;

        car.positions.backLeft = {x: car.positions.frontLeft.x - topXDifference, y: car.positions.frontLeft.y + topYDifference};
        car.positions.frontRight = {x: car.positions.frontLeft.x + rightXDifference, y: car.positions.frontLeft.y + rightYDifference};

        ctx.fillStyle = this.sensor.color;
        ctx.fillRect(car.positions.backLeft.x - this.cornerSensorLength / 2, car.positions.backLeft.y - this.cornerSensorLength / 2, this.cornerSensorLength, this.cornerSensorLength);
        ctx.fillRect(car.positions.frontLeft.x - this.cornerSensorLength / 2, car.positions.frontLeft.y - this.cornerSensorLength / 2, this.cornerSensorLength, this.cornerSensorLength);
        ctx.fillRect(car.positions.backRight.x - this.cornerSensorLength / 2, car.positions.backRight.y - this.cornerSensorLength / 2, this.cornerSensorLength, this.cornerSensorLength);
        ctx.fillRect(car.positions.frontRight.x - this.cornerSensorLength / 2, car.positions.frontRight.y - this.cornerSensorLength / 2, this.cornerSensorLength, this.cornerSensorLength);

        map.initMap();

        ctx.save();

        // set pivot point to center of car
        ctx.translate(this.positionX + this.width / 2, this.positionY + this.height / 2);
        ctx.rotate((180 - deg) * Math.PI / 180);

        ctx.fillStyle = this.color;
        ctx.fillRect(-1 * this.width / 2, -1 * this.height / 2, this.width, this.height);

        // init sensor
        ctx.fillStyle = this.sensor.color;
        ctx.fillRect(-1 * (this.sensor.width), -1 * this.sensor.height / 2, this.sensor.width, this.sensor.height);

        // init front left sensor
        ctx.rotate((180 - tanOfKosegenInDeg) * Math.PI / 180);
        ctx.fillRect(0, 0, this.frontLeftSensor.width, this.frontLeftSensor.height);

        ctx.rotate((2 *tanOfKosegenInDeg) * Math.PI / 180);
        ctx.fillRect(0, 0, this.frontRightSensor.width, this.frontRightSensor.height);


        this.sensor.ucPosX = yeniSensorUcuX;
        this.sensor.ucPosY = yeniSensorUcuY;

        this.sensor.ortaX = (this.positionX + this.width / 2 + yeniSensorUcuX) / 2
        this.sensor.ortaY = (this.positionY + this.height / 2 + yeniSensorUcuY) / 2

        ctx.restore();

        ai.checkSensors();
    }
}

const car = new Car();

car.initCar();
map.initMap();

// movement
document.addEventListener('keydown', (e) => {
    car.movement(e);
});

class AI {
    frontLeftColorData;
    frontRightColorData;
    frontColorData;
    frontLeftUcColorData;
    frontRightUcColorData;
    canTurnLeft;
    canTurnRight;
    canGoStraight;

    /*

    move = () => {
        // if(car.angleInDeg < 0) {
        //     car.angleInDeg += 360;
        // }

        // if(car.angleInDeg > 0 && car.angleInDeg < 90) {
        //     this.colorData = ctx.getImageData(car.sensor.ucPosX + 1, car.sensor.ucPosY + 1, 1, 1);
        // } else if (car.angleInDeg > 90 && car.angleInDeg <= 180) {
        //     this.colorData = ctx.getImageData(car.sensor.ucPosX - 1, car.sensor.ucPosY + 1, 1, 1);
        // } else if (car.angleInDeg > 180 && car.angleInDeg < 270) {
        //     this.colorData = ctx.getImageData(car.sensor.ucPosX - 1, car.sensor.ucPosY + 1, 1, 1);
        // } else if (car.angleInDeg > 270) {
        //     this.colorData = ctx.getImageData(car.sensor.ucPosX + 1, car.sensor.ucPosY + 1, 1, 1);
        // }

        // // console.log(car.angleInDeg);

        // if(car.angleInDeg == 0) {
        //     this.colorData = ctx.getImageData(car.sensor.ucPosX + 1, car.sensor.ucPosY, 1, 1);
        // } else if (car.angleInDeg == 90) {
        //     this.colorData = ctx.getImageData(car.sensor.ucPosX, car.sensor.ucPosY - 1, 1, 1);
        // } else if (car.angleInDeg == 180) {
        //     this.colorData = ctx.getImageData(car.sensor.ucPosX - 1, car.sensor.ucPosY, 1, 1);
        // } else if (car.angleInDeg == 270) {
        //     this.colorData = ctx.getImageData(car.sensor.ucPosX, car.sensor.ucPosY + 1, 1, 1);
        // }


        // if(this.colorData.data[3] == 255) {
        //     clearInterval(interval);

        //     let keys = ["d"];

        //     let randomKey = keys[Math.floor(Math.random() * keys.length)];

        //     car.movement({key: randomKey});

        //     interval = setInterval(this.move, 1000 / 30);
        //  } else if(this.colorData.data[3] != 255) {
        //     car.movement({key: "w"});
        // }
    }

    */

    checkSensors = () => {
        this.frontLeftColorData = ctx.getImageData(car.frontLeftSensor.midX, car.frontLeftSensor.midY, 1, 1);
        this.frontRightColorData = ctx.getImageData(car.frontRightSensor.midX, car.frontRightSensor.midY, 1, 1);
        this.frontColorData = ctx.getImageData(car.sensor.ortaX, car.sensor.ortaY, 1, 1);

        this.frontLeftUcColorData =ctx.getImageData(car.frontLeftSensor.ucPosX, car.frontLeftSensor.ucPosY, 1, 1);
        this.frontRightUcColorData =ctx.getImageData(car.frontRightSensor.ucPosX, car.frontRightSensor.ucPosY, 1, 1);

        this.canTurnLeft = this.frontLeftColorData.data[0] == 255;
        this.canTurnRight = this.frontRightColorData.data[0] == 255;
        this.canGoStraight = this.frontColorData.data[0] == 255;

        if(this.canTurnLeft && this.canTurnRight) {
            this.canTurnLeft = this.frontLeftUcColorData.data[0] == 255;
            this.canTurnRight = this.frontRightUcColorData.data[0] == 255;
        }

        // console.log(this.canTurnLeft, this.canTurnRight);

        // console.log(this.frontLeftColorData.data[0], this.frontColorData.data[0], this.frontRightColorData.data[0]);
    }

    makeDecision = () => {
        if(this.canTurnLeft) {
            car.movement({key: "a"});
        }

        if (this.canTurnRight) {
            car.movement({key: "d"});
        } 

        // if(this.canTurnLeft && this.canTurnRight) {
        //     // let keys = ["a", "d"];
        //     // let randomKey = keys[Math.floor((Math.random() * keys.length))];
        //     // car.movement({key: randomKey});
        // } 

        if(this.canGoStraight){
            car.movement({key: "w"});
        }

        if(!this.canGoStraight && !this.canTurnLeft && !this.canTurnRight) {
            let keys = ["a", "d", "s"];
            let randomKey = keys[Math.floor((Math.random() * keys.length))];
            car.movement({key: randomKey});
       }

    }
}

// setInterval(() => {
//     car.movement({key: "w"});
// }, 1000);

const ai = new AI();

// ai.move();

let interval = setInterval(ai.makeDecision, 1000 / 30);

// ROTATE BY MOUSE POSITIONS
// document.addEventListener('mousemove', (e) => {
//     let mouseX = e.offsetX;
//     let mouseY = e.offsetY;

//     car.mouseX = mouseX;
//     car.mouseY = mouseY;

//     let m = -1 * (mouseY - car.sensor.ucPosY) / (mouseX - car.sensor.ucPosX);

//     let angleInDeg = Math.atan(m) * 180 / Math.PI;
//     car.angleInDeg = angleInDeg;

//     if(mouseX < car.sensor.ucPosX && mouseY < car.sensor.ucPosY) {
//         angleInDeg += 180;
//     } else if (mouseX < car.sensor.ucPosX && mouseY > car.sensor.ucPosY) {
//         angleInDeg += 180;
//     } else if (mouseX > car.sensor.ucPosX && mouseY > car.sensor.ucPosY) {
//         angleInDeg += 360;
//     }

//     car.rotateCar(angleInDeg);
// });