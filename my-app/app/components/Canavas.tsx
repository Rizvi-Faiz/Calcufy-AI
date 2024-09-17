"use client";
import { type ChangeEvent, useRef, useState, MouseEvent } from "react";
import { ReactSketchCanvas, type ReactSketchCanvasRef } from "react-sketch-canvas";
import { Rnd } from "react-rnd";

export default function Canvas() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [eraseMode, setEraseMode] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [eraserWidth, setEraserWidth] = useState(10);
  const [strokeColor, setStrokeColor] = useState("#FFFFFF");

  const handleStrokeColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStrokeColor(event.target.value);
  };

  // Handle right-click for erasing and left-click for drawing
  const handleMouseDown = (event: MouseEvent) => {
    if (event.button === 2) {
      // Right-click -> Eraser mode
      canvasRef.current?.eraseMode(true);
    } else if (event.button === 0) {
      // Left-click -> Pen mode
      canvasRef.current?.eraseMode(false);
    }
  };

  const handleEraseClick = () => {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  };

  const handlePenClick = () => {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleStrokeWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStrokeWidth(+event.target.value);
  };

  const handleEraserWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEraserWidth(+event.target.value);
  };

  const handleResetClick = () => {
    canvasRef.current?.resetCanvas();
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <div
        onMouseDown={handleMouseDown}
        onContextMenu={(e) => e.preventDefault()}
        className="flex flex-col gap-2 p-2"
      >
        <h1 className="text-3xl font-bold">Canvas</h1>
        <ReactSketchCanvas
          ref={canvasRef}
          width="100vw"
          height="100vh"
          strokeWidth={strokeWidth}
          eraserWidth={eraserWidth}
          canvasColor="black"
          strokeColor={strokeColor} // Pass strokeColor here
        />
      </div>

      <Rnd
        default={{
          x: window.innerWidth - 250,
          y: 10,
          width: 250,
          height: "auto",
        }}
        minWidth={150}
        maxWidth={300}
        bounds="window"
        className="absolute top-0 right-0 bg-gray-800 p-4 rounded-lg shadow-lg"
        style={{ zIndex: 1000 }}
      >
        <h1 className="text-2xl font-bold mb-4">Tools</h1>
        <div className="flex flex-col gap-4">
          <label htmlFor="strokeWidth" className="text-lg font-medium">
            Stroke Width
          </label>
          <input
            type="range"
            className="w-full bg-gray-700 rounded-lg"
            min="1"
            max="30"
            step="1"
            id="strokeWidth"
            value={strokeWidth}
            onChange={handleStrokeWidthChange}
          />
          <label htmlFor="eraserWidth" className="text-lg font-medium">
            Eraser Width
          </label>
          <input
            type="range"
            className="w-full bg-gray-700 rounded-lg"
            min="1"
            max="100"
            step="1"
            id="eraserWidth"
            value={eraserWidth}
            onChange={handleEraserWidthChange}
          />
          <label htmlFor="color" className="text-lg font-medium">
            Stroke color
          </label>
          <input
            type="color"
            id="color"
            value={strokeColor}
            onChange={handleStrokeColorChange}
            className="w-full" // Ensure it has enough width
          />
          <button
            type="button"
            className="btn bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
            onClick={handleResetClick}
          >
            Reset
          </button>
        </div>
      </Rnd>
    </div>
  );
}
