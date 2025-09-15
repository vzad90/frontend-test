import { Plus, Star } from 'lucide-react'
import type { ActionsSectionProps } from '../types/component.types'

export default function ActionsSection({
	showFavorites,
	onToggleFavorites,
	onCreate,
	username,
	onChangeUser,
}: ActionsSectionProps) {
	return (
		<div className="actions">
			{username ? (
				<span className="username-text">
					User: <b>{username}</b>
				</span>
			) : (
				<span className="username-text warn">No user</span>
			)}

			<button className="icon-button" onClick={onCreate}>
				<Plus />
			</button>

			<button
				className={`icon-button ${showFavorites ? 'favorite-button' : 'favorite-button-inactive'}`}
				onClick={onToggleFavorites}
			>
				<Star fill={showFavorites ? 'var(--color-favorite)' : 'none'} />
			</button>

			<button className="secondary user-button" onClick={onChangeUser}>
				{username ? 'Change user' : 'Set user'}
			</button>
		</div>
	)
}
