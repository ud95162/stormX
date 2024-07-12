export class EmpSkills {

}

export class EmpSkillHistory {
  constructor(
    public empProfId: number,
    public empName: string,
    public prevRate: number = 0,
    public newRate: number = 0,
    public prevStatus: number = 0,
    public newStatus: number = 0,
    public createdDateTime: string
  ) {}
}
