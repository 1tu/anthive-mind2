import { Pathfinder, Point } from '@domain/Area';
import { Ant, IGoalStage } from '@domain/Mind';
import { Goal } from '@domain/Mind/Goal/Goal';
import { Mother } from '@domain/Mother';
import { computed } from 'mobx';
import { EActionName, Action } from '@domain/Game/Action';

export class GoalGrow extends Goal {
  static stageList: IGoalStage[] = [
    {
      conditionEnd: (ant) => ant.payload === Mother.config.PAYLOAD_MAX,
      targetList: (ant, mother) => mother.area.listFood,
      target: (ant, list) => Pathfinder.closest(ant.point, list).cell,
      targetValid: (ant, target) => {
        const by = target?.targetBy;
        return target && target.isFood && (!by.length || by[0] === ant);
      },
      actionName: (distance) => (distance > 1 ? EActionName.MOVE : EActionName.LOAD),
    },
    {
      conditionEnd: (ant) => ant.payload === 0,
      targetList: (ant, mother) => mother.area.listHive,
      target: (ant, list) => Pathfinder.closest(ant.point, list).cell,
      targetValid: (ant, target) => {
        console.log('WRDSAFA', target?.isHiveMy);

        return target?.isHiveMy;
      },
      actionName: (distance) => (distance > 1 ? EActionName.MOVE : EActionName.UNLOAD),
    },
  ];

  get stageList() {
    return GoalGrow.stageList;
  }

  @computed get action() {
    if (!this.target || !this._targetMove) return new Action(this._ant, EActionName.STAY);
    return new Action(this._ant, this.stage.actionName(this.targetDistance), new Point(this._targetMove));
  }

  constructor(_mother: Mother, _ant: Ant) {
    super(_mother, _ant);
  }
}
