export interface Meal {
  MMEAL_SC_NM: string;
  DDISH_NM: string;
  CAL_INFO: string;
  MLSV_YMD: string;
}

export const searchSchool = async (schoolName: string) => {
  const response = await fetch(`/api/school?SCHUL_NM=${encodeURIComponent(schoolName)}`);
  const data = await response.json();
  
  if (data.schoolInfo) {
    return data.schoolInfo[1].row;
  }
  return [];
};

export const getMeal = async (
  atptCode: string, 
  schoolCode: string, 
  date?: string, 
  fromDate?: string, 
  toDate?: string
): Promise<Meal[]> => {
  let url = `/api/meal?ATPT_OFCDC_SC_CODE=${atptCode}&SD_SCHUL_CODE=${schoolCode}`;
  if (date) url += `&MLSV_YMD=${date}`;
  if (fromDate) url += `&MLSV_FROM_YMD=${fromDate}`;
  if (toDate) url += `&MLSV_TO_YMD=${toDate}`;

  const response = await fetch(url);
  const data = await response.json();
  
  if (data.mealServiceDietInfo) {
    return data.mealServiceDietInfo[1].row;
  }
  return [];
};
