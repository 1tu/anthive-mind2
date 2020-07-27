import { Pathfinder, Point } from '@domain/Area';
import { Ant, IGoalStage } from '@domain/Mind';
import { Goal } from '@domain/Mind/Goal/Goal';
import { Mother } from '@domain/Mother';
import { computed } from 'mobx';
import { EActionName, Action } from '@domain/Game/Action';

export class GoalFeed extends Goal {
  static DISTANCE_NO_UNLOAD = 1;
  static NEED = (current: number, max: number) => current < max / 3;

  static stageList: IGoalStage[] = [
    {
      conditionEnd: (ant, mother) => ant.payload === 0 || Pathfinder.closest(ant.point, mother.area.listFood).distance <= GoalFeed.DISTANCE_NO_UNLOAD,
      targetList: (ant, mother) => mother.area.pathfinder.neighbours(ant.point).map(p => mother.area.cellGet(p)),
      target: (ant, list) => list[0],
      targetValid: (ant, target) => target && !target.isFood,
      actionName: (distance) => EActionName.UNLOAD,
    },
    {
      conditionEnd: (ant, mother) => ant.health >= Mother.config.HEALTH_MAX,
      targetList: (ant, mother) => mother.area.listFood,
      target: (ant, list) => Pathfinder.closest(ant.point, list).cell,
      targetValid: (ant, target) => target?.isFood,
      actionName: (distance) => (distance > 1 ? EActionName.MOVE : EActionName.EAT),
    },
  ];

  get stageList() {
    return GoalFeed.stageList;
  }

  @computed get action() {
    if (!this.target || !this._targetMove) return new Action(this._ant, EActionName.STAY);
    return new Action(this._ant, this.stage.actionName(this.targetDistance), new Point(this._targetMove));
  }

  constructor(_mother: Mother, _ant: Ant) {
    super(_mother, _ant);
  }
}
