import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('should return empty string for empty input', () => {
    expect(formatTitle('')).toBe('')
    expect(formatTitle('   ')).toBe('')
  })

  it('should return empty string for null/undefined input', () => {
    expect(formatTitle(null as unknown as string)).toBe('')
    expect(formatTitle(undefined as unknown as string)).toBe('')
  })

  it('should format basic English titles correctly', () => {
    expect(formatTitle('the dark knight')).toBe('The Dark Knight')
    expect(formatTitle('inception')).toBe('Inception')
    expect(formatTitle('pulp fiction')).toBe('Pulp Fiction')
  })

  it('should handle titles with special characters', () => {
    expect(formatTitle('spider-man: no way home')).toBe('Spider Man No Way Home')
    expect(formatTitle('avengers: endgame')).toBe('Avengers Endgame')
    expect(formatTitle('the lord of the rings: the fellowship of the ring')).toBe('The Lord Of The Rings The Fellowship Of The Ring')
  })

  it('should handle titles with numbers', () => {
    expect(formatTitle('iron man 2')).toBe('Iron Man')
    expect(formatTitle('fast & furious 7')).toBe('Fast Furious')
  })

  it('should handle titles with multiple spaces', () => {
    expect(formatTitle('  the   dark   knight  ')).toBe('The Dark Knight')
    expect(formatTitle('inception    movie')).toBe('Inception Movie')
  })

  it('should handle titles with non-English characters', () => {
    expect(formatTitle('avatar')).toBe('Avatar')
    expect(formatTitle('avatar: the way of water')).toBe('Avatar The Way Of Water')
    expect(formatTitle('avatar: the way of water')).toBe('Avatar The Way Of Water')
  })

  it('should handle mixed case titles', () => {
    expect(formatTitle('THE DARK KNIGHT')).toBe('The Dark Knight')
    expect(formatTitle('InCePtIoN')).toBe('Inception')
  })

  it('should handle single word titles', () => {
    expect(formatTitle('inception')).toBe('Inception')
    expect(formatTitle('AVATAR')).toBe('Avatar')
  })

  it('should handle titles with punctuation', () => {
    expect(formatTitle('spider-man!')).toBe('Spider Man')
    expect(formatTitle('the dark knight?')).toBe('The Dark Knight')
    expect(formatTitle('inception...')).toBe('Inception')
  })
})
