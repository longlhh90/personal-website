export interface IMe {
  id?: string;
  formalName?: string;
  legalName?: string;
  email?: string;
  linkedin?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  github?: string | null;
  resume?: string | null;
  aboutMe?: string;
  aboutMeShort?: string;
}

export class Me implements IMe {
  constructor(
    public id?: string,
    public formalName?: string,
    public legalName?: string,
    public email?: string,
    public linkedin?: string | null,
    public facebook?: string | null,
    public instagram?: string | null,
    public github?: string | null,
    public resume?: string | null,
    public aboutMe?: string,
    public aboutMeShort?: string
  ) {}
}

export function getMeIdentifier(me: IMe): string | undefined {
  return me.id;
}
