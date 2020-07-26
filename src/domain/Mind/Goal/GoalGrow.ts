import { Action, EActionName } from '@domain/Action';
import { Cell, Pathfinder, Point } from '@domain/Area';
import { Ant, IGoalStage } from '@domain/Mind';
import { Goal } from '@domain/Mind/Goal/Goal';
import { Mother } from '@domain/Mother';
import { computed, trace, observable, runInAction } from 'mobx';

export class GoalGrow extends Goal {
  static stageList: IGoalStage[] = [
    {
      conditionEnd: (ant) => ant.payload === Mother.config.PAYLOAD_MAX,
      targetList: (ant, mother) => mother.area.listFood,
      target: (ant, list) => Pathfinder.closest(ant.point, list).cell,
      targetValid: (ant, target) => target?.isFood && (!target.targetBy.length || target.targetBy.includes(ant)),
      actionName: (distance) => (distance > 1 ? EActionName.MOVE : EActionName.LOAD),
    },
    {
      conditionEnd: (ant) => ant.payload === 0,
      targetList: (ant, mother) => mother.area.listHive,
      target: (ant, list) => Pathfinder.closest(ant.point, list).cell,
      targetValid: (ant, target) => target?.isHiveMy,
      actionName: (distance) => (distance > 1 ? EActionName.MOVE : EActionName.UNLOAD),
    },
  ];

  get stageList() {
    return GoalGrow.stageList;
  }

  @computed get action() {
    if (!this._ant.canWalk || !this.target || !this._targetMove) return new Action(EActionName.STAY);
    return new Action(this.stage.actionName(this.targetDistance), new Point(this._targetMove));
  }

  // @computed private get _targetOtherList() {
  //   return this._mother.mind.list.filter(a => a !== this._ant).map(a => a.goal.target);
  // }

  // @computed private get _listFoodFree() {
  //   return this._mother.area.listFood.filter(c => !c.targetBy.length || (c.targetBy.length === 1 && c.targetBy.includes(this)));
  // }

  constructor(_mother: Mother, _ant: Ant) {
    super(_mother, _ant);
  }
}
