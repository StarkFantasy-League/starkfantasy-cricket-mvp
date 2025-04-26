"use client"

import { useEffect, useRef } from "react"

interface RadarChartProps {
  stats: {
    goals: number
    assists: number
    speed: number
    dribbling: number
    hitting: number
  }
}

export default function RadarChart({ stats }: RadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) * 0.7

    // Define the 5 points of the pentagon
    const points = 5
    const angle = (Math.PI * 2) / points
    const statValues = [stats.goals, stats.assists, stats.speed, stats.dribbling, stats.hitting]
    const statLabels = ["Goals", "Assists", "Speed", "Dribbling", "Hitting"]
    const statColors = ["#F54900", "#F54900", "#F54900", "#F54900", "#F54900"]

    // Draw the background pentagon grid
    for (let level = 1; level <= 3; level++) {
      const levelRadius = (radius / 3) * level

      ctx.beginPath()
      for (let i = 0; i <= points; i++) {
        const pointAngle = angle * i - Math.PI / 2
        const x = centerX + levelRadius * Math.cos(pointAngle)
        const y = centerY + levelRadius * Math.sin(pointAngle)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      ctx.stroke()
    }

    // Draw the axes
    for (let i = 0; i < points; i++) {
      const pointAngle = angle * i - Math.PI / 2
      const x = centerX + radius * Math.cos(pointAngle)
      const y = centerY + radius * Math.sin(pointAngle)

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      ctx.stroke()

      // Draw labels
      const labelX = centerX + (radius + 15) * Math.cos(pointAngle)
      const labelY = centerY + (radius + 15) * Math.sin(pointAngle)

      ctx.fillStyle = statColors[i]
      ctx.font = "14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Adjust label position based on angle
      let offsetX = 0
      let offsetY = 0

      if (pointAngle === -Math.PI / 2) {
        // Top
        offsetY = -10
      } else if (pointAngle === Math.PI / 2) {
        // Bottom
        offsetY = 10
      } else if (pointAngle === 0) {
        // Right
        offsetX = 10
      } else if (pointAngle === Math.PI) {
        // Left
        offsetX = -10
      } else if (pointAngle > -Math.PI / 2 && pointAngle < 0) {
        // Top-right
        offsetX = 10
        offsetY = -10
      } else if (pointAngle > 0 && pointAngle < Math.PI / 2) {
        // Bottom-right
        offsetX = 10
        offsetY = 10
      } else if (pointAngle > Math.PI / 2 && pointAngle < Math.PI) {
        // Bottom-left
        offsetX = -10
        offsetY = 10
      } else {
        // Top-left
        offsetX = -10
        offsetY = -10
      }

      ctx.fillText(statLabels[i], labelX + offsetX, labelY + offsetY)
    }

    // Draw the player's stats
    ctx.beginPath()
    for (let i = 0; i < points; i++) {
      const value = statValues[i]
      const pointAngle = angle * i - Math.PI / 2
      const x = centerX + radius * value * Math.cos(pointAngle)
      const y = centerY + radius * value * Math.sin(pointAngle)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fillStyle = "rgba(204, 102, 51, 0.6)"
    ctx.fill()
    ctx.strokeStyle = "#F54900"
    ctx.lineWidth = 2
    ctx.stroke()
  }, [stats])

  return <canvas ref={canvasRef} width={300} height={300} className="max-w-full" />
}

