import * as dayjs from 'dayjs';

export interface IMe {
  id?: number;
  formalName?: string;
  legalName?: string;
  dob?: dayjs.Dayjs | null;
  email?: string;
  linkedin?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  resume?: string | null;
  aboutMe?: string;
  aboutMeShort?: string;
}

export class Me implements IMe {
  constructor(
    public id?: number,
    public formalName?: string,
    public legalName?: string,
    public dob?: dayjs.Dayjs | null,
    public email?: string,
    public linkedin?: string | null,
    public facebook?: string | null,
    public instagram?: string | null,
    public resume?: string | null,
    public aboutMe?: string,
    public aboutMeShort?: string
  ) {}
}

export function getMeIdentifier(me: IMe): number | undefined {
  return me.id;
}
