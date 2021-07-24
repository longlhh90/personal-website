export interface IEducation {
  id?: number;
  institution?: string;
  countryName?: string | null;
  yearGraduate?: number;
  major?: string;
}

export class Education implements IEducation {
  constructor(
    public id?: number,
    public institution?: string,
    public countryName?: string | null,
    public yearGraduate?: number,
    public major?: string
  ) {}
}

export function getEducationIdentifier(education: IEducation): number | undefined {
  return education.id;
}
