import { Tool } from "../components/Canvas";
import { getExistingShapes,deleteShapeFromDB, chatId } from "./http";

type Shape = {
    id:number;
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
    color:string;
} | {
    id:number;
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
    color:string;
} | {
    id:number;
    type: "line";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    color:string;
} | {
    id:number;
    type: "pencil";
    path: { startX: number, startY: number, endX: number, endY: number }[]; 
    color:string;
} | {
    type: "eraser";
    x: number;
    y: number;
    size: number;
    color?:string
  };

export class Game {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId: string;
    private clicked: boolean;
    private startX = 0;
    private startY = 0;
    private selectedTool: Tool = "panTool";
    private scale: number = 1;
    private panX: number = 0;
    private panY: number = 0;
    private red: boolean;
    private green: boolean;
    private blue: boolean;
    private yellow: boolean;
    private orange: boolean;
    private purple: boolean;
    private gray: boolean;
    private white: boolean;
    private pink: boolean;

    socket: WebSocket;
    private pencilPath: { startX: number, startY: number, endX: number, endY: number }[] = []; // To store pencil path

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket,red:boolean,blue:boolean,gray:boolean,green:boolean,pink:boolean,white:boolean,orange:boolean,yellow:boolean,purple:boolean) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.clicked = false;
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
        this.red=red;
        this.blue=blue;
        this.gray=green;
        this.green=gray;
        this.pink=pink;
        this.white=white;
        this.orange=orange;
        this.yellow=yellow;
        this.purple=purple;
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
        this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
        this.canvas.removeEventListener("wheel", this.mouseWheelHandler);
    }

    setTool(tool: "circle" | "line" | "rect" | "panTool" | "pencil" | "eraser") {
        this.selectedTool = tool;
    }

    async init() {
        this.existingShapes = await getExistingShapes(this.roomId);
        const deleteShape=await chatId(this.roomId)
        console.log("chat",deleteShape)
        this.clearCanvas();
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.type === "chat") {
                const parsedShape = JSON.parse(message.message);
                this.existingShapes.push(parsedShape.shape);
                this.clearCanvas();
            }
        };
    }
    getSelectedColor(): string {
        if (this.red) return "red";
        if (this.blue) return "blue";
        if (this.green) return "green";
        if (this.yellow) return "yellow";
        if (this.orange) return "orange";
        if (this.purple) return "purple";
        if (this.gray) return "gray";
        if (this.white) return "white";
        if (this.pink) return "pink";
        return "white"; 
    }

    clearCanvas() {
        this.ctx.setTransform(this.scale, 0, 0, this.scale, this.panX, this.panY);
        this.ctx.clearRect(
            -this.panX / this.scale,
            -this.panY / this.scale,
            this.canvas.width / this.scale,
            this.canvas.height / this.scale
        );
        this.ctx.fillStyle = "rgba(18, 18, 18)";
        this.ctx.fillRect(
            -this.panX / this.scale,
            -this.panY / this.scale,
            this.canvas.width / this.scale,
            this.canvas.height / this.scale
        );

        this.existingShapes.map((shape) => {
           
            //@ts-ignore
            this.ctx.strokeStyle = shape.color ;
        
            if (shape.type === "rect") {
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "circle") {
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            } else if (shape.type === "line") {
                this.ctx.beginPath();
                this.ctx.moveTo(shape.startX, shape.startY);
                this.ctx.lineTo(shape.endX, shape.endY);
                this.ctx.stroke();
                this.ctx.closePath();
            } else if (shape.type === "pencil") {
                if (Array.isArray(shape.path)) {
                    shape.path.forEach((segment) => {
                        this.ctx.beginPath();
                        this.ctx.moveTo(segment.startX, segment.startY);
                        this.ctx.lineTo(segment.endX, segment.endY);
                        this.ctx.stroke();
                        this.ctx.closePath();
                    });
                }
            }
        });
    }

    mouseDownHandler = (e: MouseEvent) => {
        this.clicked = true;
        this.startX = e.clientX;
        this.startY = e.clientY;

        if (this.selectedTool === "eraser") {
            let mousex = this.startX;
            let mousey = this.startY;
        }

        if (this.selectedTool === "pencil") {
            this.pencilPath = [{
                startX: (this.startX - this.panX) / this.scale,
                startY: (this.startY - this.panY) / this.scale,
                endX: (this.startX - this.panX) / this.scale,
                endY: (this.startY - this.panY) / this.scale
            }];
        }
    };
   

    isPointInsideShape(x: number, y: number, shape: Shape): boolean {
        if (shape.type === "rect") {
            return x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height;
        } else if (shape.type === "circle") {
            const dx = x - shape.centerX;
            const dy = y - shape.centerY;
            return dx * dx + dy * dy <= shape.radius * shape.radius;
        } else if (shape.type === "line") {
            const distance = Math.abs((shape.endY - shape.startY) * x - (shape.endX - shape.startX) * y + shape.endX * shape.startY - shape.endY * shape.startX) / Math.hypot(shape.endY - shape.startY, shape.endX - shape.startX);
            return distance < 5;
        } else if (shape.type === "pencil") {
            return shape.path.some(segment => Math.hypot(x - segment.startX, y - segment.startY) < 5);
        }
        return false;
    }

    mouseMoveHandler = (e: MouseEvent) => {
        if (this.clicked) {
            const width = (e.clientX - this.startX) / this.scale;
            const height = (e.clientY - this.startY) / this.scale;
            this.clearCanvas();

            const selectedTool = this.selectedTool;
            if (selectedTool === "rect") {
                this.ctx.strokeStyle = "rgba(255, 255, 255)";
                this.ctx.strokeRect(
                    (this.startX - this.panX) / this.scale,
                    (this.startY - this.panY) / this.scale,
                    width,
                    height
                );
            } else if (selectedTool === "circle") {
                const radius = Math.max(width, height) / 2;
                const centerX = ((this.startX - this.panX) / this.scale) + radius;
                const centerY = ((this.startY - this.panY) / this.scale) + radius;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            } else if (selectedTool === "line") {
                this.ctx.beginPath();
                this.ctx.moveTo(
                    (this.startX - this.panX) / this.scale,
                    (this.startY - this.panY) / this.scale
                );
                this.ctx.lineTo(
                    (e.clientX - this.panX) / this.scale,
                    (e.clientY - this.panY) / this.scale
                );
                this.ctx.stroke();
                this.ctx.closePath();
            } else if (selectedTool === "pencil") {
                const newSegment = {
                    startX: (this.startX - this.panX) / this.scale,
                    startY: (this.startY - this.panY) / this.scale,
                    endX: (e.clientX - this.panX) / this.scale,
                    endY: (e.clientY - this.panY) / this.scale
                };
                this.pencilPath.push(newSegment);

                this.ctx.strokeStyle = "rgba(255, 255, 255)";
                this.pencilPath.forEach((segment) => {
                    this.ctx.beginPath();
                    this.ctx.moveTo(segment.startX, segment.startY);
                    this.ctx.lineTo(segment.endX, segment.endY);
                    this.ctx.stroke();
                    this.ctx.closePath();
                });

                this.startX = e.clientX;
                this.startY = e.clientY;
            } else if (selectedTool === "panTool") {
                const mouseX = e.clientX - this.startX;
                const mouseY = e.clientY - this.startY;

                this.panX += mouseX / this.scale;
                this.panY += mouseY / this.scale;

                this.startX = e.clientX;
                this.startY = e.clientY;

                this.clearCanvas();
            
            } else if (selectedTool == "eraser") {
                const eraser = { x: e.clientX, y: e.clientY, size: 20 };
                
                // Identify erased shapes
                const erasedShapes: Shape[] = [];
                
                this.existingShapes = this.existingShapes.filter((shape) => {
                    let shouldKeep = true;
            
                    switch (shape.type) {
                        case "rect":
                            shouldKeep = !(
                                eraser.x < shape.x + shape.width &&
                                eraser.x + eraser.size > shape.x &&
                                eraser.y < shape.y + shape.height &&
                                eraser.y + eraser.size > shape.y
                            );
                            break;
                        case "circle":
                            const dx = eraser.x - shape.centerX;
                            const dy = eraser.y - shape.centerY;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            shouldKeep = distance > shape.radius + eraser.size / 2;
                            break;
                        case "line":
                            const lineStartX = shape.startX;
                            const lineStartY = shape.startY;
                            const lineEndX = shape.endX;
                            const lineEndY = shape.endY;
                            const distanceToLine = Math.abs(
                                (lineEndY - lineStartY) * eraser.x - 
                                (lineEndX - lineStartX) * eraser.y +
                                lineEndX * lineStartY - 
                                lineEndY * lineStartX
                            ) / Math.sqrt(Math.pow(lineEndY - lineStartY, 2) + Math.pow(lineEndX - lineStartX, 2));
                            shouldKeep = distanceToLine > eraser.size;
                            break;
                        case "pencil":
                            shouldKeep = !shape.path.some(segment => {
                                const distanceToSegment = Math.hypot(
                                    eraser.x - segment.startX,
                                    eraser.y - segment.startY
                                );
                                return distanceToSegment < eraser.size;
                            });
                            break;
                    
                    }
            
                    if (!shouldKeep) {
                        erasedShapes.push(shape);
                    }
                    console.log('erase',erasedShapes)
                    return shouldKeep;
                });
            
                // Send erased shapes to the backend
                if (erasedShapes.length > 0) {
                    erasedShapes.forEach((shape) => {
                        console.log("erased",shape)
                        deleteShapeFromDB( shape); // Send request to delete shape from DB
                    });
                }
            
                this.clearCanvas();
            }
            
        }
    };

    
    mouseUpHandler = (e: MouseEvent) => {
        const width = (e.clientX - this.startX) / this.scale;
        const height = (e.clientY - this.startY) / this.scale;

        const selectedTool = this.selectedTool;
        let selectedColor = this.getSelectedColor();
        let shape: Shape | null = null;
        if (selectedTool === "rect") {

            shape = {
                id: Math.floor(Math.random() * 100000) + 1,
                type: "rect",
                x: (this.startX - this.panX) / this.scale,
                y: (this.startY - this.panY) / this.scale,
                height,
                width,
                color:selectedColor
            }
            if (!shape) {
                return;
            }
    
            this.existingShapes.push(shape);
    
            this.socket.send(JSON.stringify({
                type: "chat",
                message: JSON.stringify({
                    shape
                }),
                roomId: this.roomId
            }))
        } else if (selectedTool === "circle") {
            const radius = Math.max(width, height) / 2;
            shape = {
                id: Math.floor(Math.random() * 100000) + 1,
                type: "circle",
                radius: radius,
                centerX: ((this.startX - this.panX) / this.scale) + radius,
                centerY: ((this.startY - this.panY) / this.scale) + radius,
                color:selectedColor
            } 
            if (!shape) {
                return;
            }
    
            this.existingShapes.push(shape);
    
            this.socket.send(JSON.stringify({
                type: "chat",
                message: JSON.stringify({
                    shape
                }),
                roomId: this.roomId
            }))
        } else if (selectedTool === "line"){
            shape = {
                id: Math.floor(Math.random() * 100000) + 1,
                type: "line",
                startX: (this.startX - this.panX) / this.scale,
                startY: (this.startY - this.panY) / this.scale,
                endX: (e.clientX - this.panX) / this.scale,
                endY: (e.clientY - this.panY) / this.scale,
                color:selectedColor
            }
            if (!shape) {
                return;
            }
    
            this.existingShapes.push(shape);
    
            this.socket.send(JSON.stringify({
                type: "chat",
                message: JSON.stringify({
                    shape
                }),
                roomId: this.roomId
            }))
        } else if (selectedTool === "panTool"){
            this.startX = e.clientX 
            this.startY = e.clientY 
        }else if (this.selectedTool === "pencil") {
            
            this.socket.send(JSON.stringify({
                type: "chat",
                message: JSON.stringify({
                    shape: {
                        id: Math.floor(Math.random() * 100000) + 1,
                        type: "pencil",
                        path: this.pencilPath
                    }
                }),
                roomId: this.roomId
            }));

            this.pencilPath = [];
    }else if(this.selectedTool==="rect"){
        5
    }

        this.clicked = false;
    };

    mouseWheelHandler = (e: WheelEvent) => {
        e.preventDefault();

        const scaleAmount = -e.deltaY / 500;
        const newScale = this.scale * (1 + scaleAmount);

        const mouseX = e.clientX - this.canvas.offsetLeft;
        const mouseY = e.clientY - this.canvas.offsetTop;
       
        const canvasMouseX = (mouseX - this.panX) / this.scale;
        const canvasMouseY = (mouseY - this.panY) / this.scale;

        this.panX -= (canvasMouseX * newScale - canvasMouseX * this.scale);
        this.panY -= (canvasMouseY * newScale - canvasMouseY * this.scale);

        this.scale = newScale;

        this.clearCanvas();
    };

    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler);
        this.canvas.addEventListener("mouseup", this.mouseUpHandler);
        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
        this.canvas.addEventListener("wheel", this.mouseWheelHandler);
    }
}
