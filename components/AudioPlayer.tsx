'use client'

import { useState, useRef } from 'react'
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

interface AudioPlayerProps {
  audioUrl: string
}

export default function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume
      setVolume(newVolume)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div className="flex items-center justify-between mb-4">
        <Button onClick={togglePlay} variant="outline" size="icon">
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </Button>
        <span className="text-sm">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <Button
          onClick={() => handleSeek(0)}
          variant="outline"
          size="icon"
        >
          <RotateCcw size={24} />
        </Button>
      </div>
      <Slider
        value={[currentTime]}
        max={duration}
        step={1}
        onValueChange={(value) => handleSeek(value[0])}
        className="mb-4"
      />
      <div className="flex items-center">
        <Volume2 size={20} className="mr-2" />
        <Slider
          value={[volume]}
          max={1}
          step={0.01}
          onValueChange={(value) => handleVolumeChange(value[0])}
        />
      </div>
    </div>
  )
}