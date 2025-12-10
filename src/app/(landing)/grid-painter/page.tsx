"use client";

import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Direction, PulsePath } from "@/types/grid";
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { GridBackground } from "../(home)/components/grid-background";

interface Cell {
  x: number;
  y: number;
  isSelected: boolean;
  order: number;
  crossCount: number;
  ref?: React.RefObject<HTMLDivElement>;
}

interface Point {
  x: number;
  y: number;
  f: number;
  g: number;
  h: number;
  parent?: Point;
}

// Configuration parameters
const GRID_SIZE = 20;
const GRID_PADDING_PERCENT = 4; // padding on each side (8% total)
const TOTAL_PADDING_PERCENT = GRID_PADDING_PERCENT * 2;
const CELL_SIZE_PERCENT = (100 - TOTAL_PADDING_PERCENT) / GRID_SIZE;
const DOT_SIZE = 0.4; // in rem or pixel units for the dots
const HOVER_OPACITY = 0.2;
const INACTIVE_DOT_OPACITY = 0.2;

export default function GridPainter() {
  const [grid, setGrid] = useState<Cell[]>(() => {
    const cells: Cell[] = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        cells.push({
          x,
          y,
          isSelected: false,
          order: -1,
          crossCount: 0,
          ref: createRef<HTMLDivElement>(),
        });
      }
    }
    return cells;
  });

  const [selectedCount, setSelectedCount] = useState(0);
  const [lastSelectedCell, setLastSelectedCell] = useState<Cell | null>(null);
  const [hoveredCell, setHoveredCell] = useState<Cell | null>(null);
  const [isValidNextCell, setIsValidNextCell] = useState(false);
  const [currentPath, setCurrentPath] = useState<Direction[]>([]);
  const [pathHistory, setPathHistory] = useState<
    {
      cells: Cell[];
      directions: Direction[];
    }[]
  >([]);

  // A* pathfinding helper functions
  const heuristic = (a: Point, b: Point) => {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  };

  const getNeighbors = (point: Point): Point[] => {
    const neighbors: Point[] = [];
    const directions = [
      { x: 0, y: -1 }, // up
      { x: 0, y: 1 }, // down
      { x: -1, y: 0 }, // left
      { x: 1, y: 0 }, // right
      { x: 1, y: -1 }, // up-right
      { x: -1, y: -1 }, // up-left
      { x: 1, y: 1 }, // down-right
      { x: -1, y: 1 }, // down-left
    ];

    for (const dir of directions) {
      const newX = point.x + dir.x;
      const newY = point.y + dir.y;
      if (newX >= 0 && newX < 20 && newY >= 0 && newY < 20) {
        neighbors.push({ x: newX, y: newY, f: 0, g: 0, h: 0 });
      }
    }
    return neighbors;
  };

  const findPath = (start: Cell, end: Cell): Cell[] => {
    const startPoint: Point = { x: start.x, y: start.y, f: 0, g: 0, h: 0 };
    const endPoint: Point = { x: end.x, y: end.y, f: 0, g: 0, h: 0 };
    const openSet: Point[] = [startPoint];
    const closedSet: Point[] = [];

    // Create a map to track visited points
    const visited = new Map<string, Point>();
    visited.set(`${startPoint.x},${startPoint.y}`, startPoint);

    while (openSet.length > 0) {
      let current = openSet[0];
      let currentIndex = 0;

      // Find point with lowest f score
      openSet.forEach((point, index) => {
        if (point.f < current.f) {
          current = point;
          currentIndex = index;
        }
      });

      // Path found
      if (current.x === endPoint.x && current.y === endPoint.y) {
        const path: Cell[] = [];
        let temp: Point | undefined = current;
        while (temp) {
          path.push({
            x: temp.x,
            y: temp.y,
            isSelected: true,
            order: -1,
            crossCount: 0,
          });
          temp = temp.parent;
        }
        return path.reverse();
      }

      openSet.splice(currentIndex, 1);
      closedSet.push(current);

      const neighbors = getNeighbors(current);
      for (const neighbor of neighbors) {
        const key = `${neighbor.x},${neighbor.y}`;

        if (closedSet.some((p) => p.x === neighbor.x && p.y === neighbor.y)) {
          continue;
        }

        const tentativeG = current.g + 1;
        const existingNeighbor = visited.get(key);

        if (!existingNeighbor) {
          neighbor.g = tentativeG;
          neighbor.h = heuristic(neighbor, endPoint);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
          openSet.push(neighbor);
          visited.set(key, neighbor);
        } else if (tentativeG < existingNeighbor.g) {
          existingNeighbor.g = tentativeG;
          existingNeighbor.f = existingNeighbor.g + existingNeighbor.h;
          existingNeighbor.parent = current;
        }
      }
    }

    return [];
  };

  const getDirectionBetweenCells = useCallback(
    (from: Cell, to: Cell): Direction | null => {
      const dx = to.x - from.x;
      const dy = to.y - from.y;

      if (dx === 0 && dy === -1) return "up";
      if (dx === 0 && dy === 1) return "down";
      if (dx === -1 && dy === 0) return "left";
      if (dx === 1 && dy === 0) return "right";
      if (dx === 1 && dy === -1) return "up-right";
      if (dx === -1 && dy === -1) return "up-left";
      if (dx === 1 && dy === 1) return "down-right";
      if (dx === -1 && dy === 1) return "down-left";

      return null;
    },
    []
  );

  // Add state for tracking painting and current segment at the top of the component
  const [isPainting, setIsPainting] = useState(false);
  const [currentSegment, setCurrentSegment] = useState<{
    cells: Cell[];
    directions: Direction[];
  }>({ cells: [], directions: [] });

  const handleCellClick = (clickedCell: Cell, event: React.MouseEvent) => {
    // Handle first click of a new path
    if (!lastSelectedCell || selectedCount === 0) {
      setGrid((prev) =>
        prev.map((cell) =>
          cell.x === clickedCell.x && cell.y === clickedCell.y
            ? { ...cell, isSelected: true, order: 0, crossCount: 1 }
            : { ...cell, isSelected: false, order: -1, crossCount: 0 }
        )
      );
      setSelectedCount(1);
      setLastSelectedCell(clickedCell);
      setCurrentPath([]);
      setPathHistory([]);
      setCurrentSegment({ cells: [clickedCell], directions: [] });
      return;
    }

    const pathToCell = findPath(lastSelectedCell, clickedCell);
    if (pathToCell.length > 0) {
      const newDirections = pathToCell.slice(1).map((cell, index) => {
        const from = index === 0 ? lastSelectedCell : pathToCell[index];
        const to = cell;
        return getDirectionBetweenCells(from, to)!;
      });

      setCurrentSegment((prev) => ({
        cells: [...prev.cells, ...pathToCell.slice(1)],
        directions: [...prev.directions, ...newDirections],
      }));

      setCurrentPath((prev) => [...prev, ...newDirections]);

      setGrid((prev) => {
        const newGrid = [...prev];
        pathToCell.slice(1).forEach((pathCell, index) => {
          const cellIndex = newGrid.findIndex(
            (cell) => cell.x === pathCell.x && cell.y === pathCell.y
          );
          if (cellIndex !== -1) {
            const currentCell = newGrid[cellIndex];
            newGrid[cellIndex] = {
              ...currentCell,
              isSelected: true,
              order: selectedCount + index,
              crossCount: currentCell.isSelected
                ? currentCell.crossCount + 1
                : 1,
            };
          }
        });
        return newGrid;
      });

      setSelectedCount((prev) => prev + pathToCell.length - 1);
      setLastSelectedCell(clickedCell);
    }
  };

  const handleReset = () => {
    setGrid((prev) =>
      prev.map((cell) => ({
        ...cell,
        isSelected: false,
        order: -1,
        crossCount: 0,
      }))
    );
    setSelectedCount(0);
    setLastSelectedCell(null);
  };

  const getPathString = useCallback(() => {
    return JSON.stringify(currentPath, null, 2);
  }, [currentPath]);

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (pathHistory.length > 0) {
      // Get the last segment
      const lastSegment = pathHistory[pathHistory.length - 1];

      // Remove cells from this segment and recalculate remaining cells
      setGrid((prev) => {
        const newGrid = [...prev];

        // First reset all cells that were part of the last segment
        lastSegment.cells.forEach((segCell) => {
          const cellIndex = newGrid.findIndex(
            (cell) => cell.x === segCell.x && cell.y === segCell.y
          );
          if (cellIndex !== -1) {
            newGrid[cellIndex] = {
              ...newGrid[cellIndex],
              isSelected: false,
              order: -1,
              crossCount: 0,
            };
          }
        });

        // Then recalculate crossCount and isSelected for remaining paths
        const remainingSegments = pathHistory.slice(0, -1);
        remainingSegments.forEach((segment) => {
          segment.cells.forEach((segCell) => {
            const cellIndex = newGrid.findIndex(
              (cell) => cell.x === segCell.x && cell.y === segCell.y
            );
            if (cellIndex !== -1) {
              newGrid[cellIndex] = {
                ...newGrid[cellIndex],
                isSelected: true,
                crossCount: (newGrid[cellIndex].crossCount || 0) + 1,
              };
            }
          });
        });

        return newGrid;
      });

      // Update selected count
      setSelectedCount((prev) => prev - lastSegment.cells.length);

      // Update last selected cell to the last cell of the previous segment
      const previousSegment = pathHistory[pathHistory.length - 2];
      if (previousSegment) {
        const lastCell =
          previousSegment.cells[previousSegment.cells.length - 1];
        setLastSelectedCell(lastCell);
      } else {
        setLastSelectedCell(null);
      }

      // Remove the last segment from history
      setPathHistory((prev) => prev.slice(0, -1));

      // Remove the directions for this segment
      setCurrentPath((prev) => prev.slice(0, -lastSegment.directions.length));
    }
  };

  // Helper function to check if two cells are neighbors
  const areNeighbors = (cell1: Cell, cell2: Cell) => {
    const dx = Math.abs(cell1.x - cell2.x);
    const dy = Math.abs(cell1.y - cell2.y);
    return dx <= 1 && dy <= 1 && !(dx === 0 && dy === 0);
  };

  // Add this helper function
  const downloadPath = () => {
    const data = JSON.stringify(currentPath, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "grid-path.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <div className="gap-y-2 container mx-auto flex flex-col items-center py-12">
      <div className="flex gap-x-6 text-sm">
        <span>
          Draw:{" "}
          <pre className="inline-block bg-muted px-1 rounded">
            Left Click + Drag
          </pre>
        </span>
        <span>
          Undo:{" "}
          <pre className="inline-block bg-muted px-1 rounded">Right Click</pre>
        </span>
        <span>
          New Path:{" "}
          <pre className="inline-block bg-muted px-1 rounded">
            Click Any Point
          </pre>
        </span>
      </div>
      <div className="relative aspect-square w-full max-w-[600px]">
        <div
          className="grid h-full w-full bg-black p-4 rounded-lg select-none"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          }}
          onContextMenu={handleRightClick}
          onMouseUp={() => {
            if (isPainting && currentSegment.cells.length > 0) {
              setPathHistory((prev) => [...prev, currentSegment]);
              setCurrentSegment({ cells: [], directions: [] });
            }
            setIsPainting(false);
          }}
          onMouseLeave={() => {
            if (isPainting && currentSegment.cells.length > 0) {
              setPathHistory((prev) => [...prev, currentSegment]);
              setCurrentSegment({ cells: [], directions: [] });
            }
            setIsPainting(false);
          }}
          draggable={false}
        >
          {grid.map((cell) => (
            <button
              key={`${cell.x}-${cell.y}`}
              className="relative aspect-square w-full h-full transition-all duration-150 flex items-center justify-center select-none"
              style={{
                backgroundColor:
                  hoveredCell?.x === cell.x && hoveredCell?.y === cell.y
                    ? `rgba(255, 255, 255, ${HOVER_OPACITY})`
                    : undefined,
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                if (e.button === 0) {
                  setIsPainting(true);
                  handleCellClick(cell, e);
                }
              }}
              onMouseEnter={() => {
                setHoveredCell(cell);
                if (isPainting) {
                  handleCellClick(cell, { button: 0 } as React.MouseEvent);
                }
              }}
              onMouseLeave={() => setHoveredCell(null)}
              draggable={false}
            >
              <div
                ref={cell.ref}
                className="aspect-square rounded-full"
                style={{
                  width: `${DOT_SIZE}rem`,
                  height: `${DOT_SIZE}rem`,
                  backgroundColor: cell.isSelected
                    ? "white"
                    : `rgba(255, 255, 255, ${INACTIVE_DOT_OPACITY})`,
                }}
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <div className="flex gap-4">
          <Button onClick={handleReset}>Reset Grid</Button>
          <Button onClick={downloadPath}>
            Download Path to send to Christian
          </Button>
          <Button onClick={() => setPreviewOpen(true)}>
            Preview Background
          </Button>
        </div>
      </div>
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="bg-black text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle>Grid Background Preview</DialogTitle>
          </DialogHeader>
          <div className="relative flex-1 w-full h-full min-h-[400px]  rounded-lg overflow-hidden">
            <GridBackground
              predefinedPaths={[currentPath]}
              pathProbability={1}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
