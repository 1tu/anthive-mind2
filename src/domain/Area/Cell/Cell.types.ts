import { TPlayerId as TGamePlayerId } from '@domain/Game';

export enum EPlayer {
  STRANGER = 'stranger',
}

export type TPlayerId = TGamePlayerId;
export type TAntId = TGamePlayerId;
export type TPlayerVariant = TPlayerId | EPlayer;
export type TAntVariant = TAntId | EPlayer;
