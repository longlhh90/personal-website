export interface IProject {
  id?: number;
  name?: string;
  demoURL?: string;
  desc?: string;
}

export class Project implements IProject {
  constructor(public id?: number, public name?: string, public demoURL?: string, public desc?: string) {}
}

export function getProjectIdentifier(project: IProject): number | undefined {
  return project.id;
}
