import { useEffect, useState } from 'react'
import type { UsernameModalProps } from '../types/component.types'
import Modal from './Modal'

export default function UsernameModal({ isOpen, onClose, onSubmit, initialUsername = '' }: UsernameModalProps) {
	const [value, setValue] = useState(initialUsername)
	const [error, setError] = useState('')

	useEffect(() => {
		if (isOpen) {
			setValue(initialUsername)
			setError('')
		}
	}, [isOpen, initialUsername])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const trimmed = value.trim()
		if (!trimmed) {
			setError('Username is required')
			return
		}
		if (trimmed.length < 3) {
			setError('Min 3 characters')
			return
		}
		onSubmit(trimmed)
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className='modal-container'>
				<h2 className='modal-title'>Enter username</h2>
				<form onSubmit={handleSubmit}>
					<div className='modal-field'>
						<label>Username</label>
						<input value={value} onChange={(e) => setValue(e.target.value)} placeholder='e.g. john_doe' />
						{error && <span className='error'>{error}</span>}
					</div>
					<div className='modal-actions'>
						<button type='submit' className='primary'>Continue</button>
						<button type='button' className='secondary' onClick={onClose}>Cancel</button>
					</div>
				</form>
			</div>
		</Modal>
	)
}


