export interface SchoolInfo {
  ATPT_OFCDC_SC_CODE: string;
  SD_SCHUL_CODE: string;
  SCHUL_NM: string;
}

const SCHOOL_KEY = 'school_info';

export const saveSchool = (info: SchoolInfo) => {
  localStorage.setItem(SCHOOL_KEY, JSON.stringify(info));
};

export const getSchool = (): SchoolInfo | null => {
  const data = localStorage.getItem(SCHOOL_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearSchool = () => {
  localStorage.removeItem(SCHOOL_KEY);
};
