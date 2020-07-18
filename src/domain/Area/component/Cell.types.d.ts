declare namespace MArea.Cell {
  export enum EPlayerOther {
    STRANGER = 'stranger',
  }

  type PlayerId = MGame.TInputPlayerId;
  type AntId = MGame.TInputPlayerId;
  type PlayerVariant = PlayerId | EPlayerOther;
  type AntVariant = AntId | EPlayerOther;
}
