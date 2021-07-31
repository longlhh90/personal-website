export interface IExperience {
  id?: string;
  title?: string | null;
  major?: string | null;
  organization?: string;
  location?: string;
  startMonth?: number;
  startYear?: number;
  endMonth?: number | null;
  endYear?: number | null;
  isPresent?: boolean;
  details?: string;
  expType?: string;
}

export class Experience implements IExperience {
  constructor(
    public id?: string,
    public title?: string | null,
    public major?: string | null,
    public organization?: string,
    public location?: string,
    public startMonth?: number,
    public startYear?: number,
    public endMonth?: number | null,
    public endYear?: number | null,
    public isPresent?: boolean,
    public details?: string,
    public expType?: string
  ) {
    this.isPresent = this.isPresent ?? false;
  }
}

export function getExperienceIdentifier(experience: IExperience): string | undefined {
  return experience.id;
}
