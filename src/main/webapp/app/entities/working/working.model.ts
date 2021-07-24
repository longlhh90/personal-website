export interface IWorking {
  id?: number;
  position?: string;
  company?: string;
  countryName?: string;
  startMonth?: number;
  startYear?: number;
  endMonth?: number | null;
  endYear?: number | null;
  isPresent?: boolean;
  workDuty?: string;
}

export class Working implements IWorking {
  constructor(
    public id?: number,
    public position?: string,
    public company?: string,
    public countryName?: string,
    public startMonth?: number,
    public startYear?: number,
    public endMonth?: number | null,
    public endYear?: number | null,
    public isPresent?: boolean,
    public workDuty?: string
  ) {
    this.isPresent = this.isPresent ?? false;
  }
}

export function getWorkingIdentifier(working: IWorking): number | undefined {
  return working.id;
}
